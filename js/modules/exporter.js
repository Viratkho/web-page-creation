// ============================================================================
// EXPORT & SHARING ENGINE (HTML, ZIP, JSON, QR CODES)
// ============================================================================

window.Exporter = {
  // Compress state into URL hash token (deflate-raw with base64url)
  b64: function(u) {
    let s = '';
    for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  },

  unb: function(t) {
    t = t.replace(/-/g, '+').replace(/_/g, '/');
    return Uint8Array.from(atob(t), c => c.charCodeAt(0));
  },

  compressState: async function(state) {
    try {
      const json = JSON.stringify(state);
      const bytes = new TextEncoder().encode(json);
      if (window.CompressionStream) {
        const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
        const buf = await new Response(stream).arrayBuffer();
        return 'z' + this.b64(new Uint8Array(buf));
      }
      return 'r' + this.b64(bytes);
    } catch (e) {
      console.warn('Compression error:', e);
      return '';
    }
  },

  decompressState: async function(token) {
    try {
      const mode = token[0];
      const bytes = this.unb(token.slice(1));
      let decompressed = bytes;
      if (mode === 'z' && window.DecompressionStream) {
        const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
        decompressed = new Uint8Array(await new Response(stream).arrayBuffer());
      }
      const json = new TextDecoder().decode(decompressed);
      return JSON.parse(json);
    } catch (e) {
      console.error('Failed to decompress token:', e);
      return null;
    }
  },

  // Export standalone HTML file
  generateStandaloneHtml: function(state) {
    const storeHtml = window.StoreRenderer.renderFullStore(state);
    const cssContent = window.COMPONENTS_CSS || document.getElementById('components-css-link')?.textContent || '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${window.StoreRenderer.esc(state.store.name)} – Online Catalogue</title>
  <meta name="description" content="${window.StoreRenderer.esc(state.store.tag)}">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Playfair+Display:wght@700&family=Space+Grotesk:wght@700&family=Poppins:wght@600;700&family=Lora:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@700;800&family=Quicksand:wght@600;700&family=Nunito:wght@600;700&family=Cormorant+Garamond:wght@700&family=Oswald:wght@700&family=Raleway:wght@700&display=swap">
  <style>
    ${cssContent}
  </style>
</head>
<body>
  <div id="website-root">
    ${storeHtml}
  </div>

  <script>
    // Embedded client-side cart & interaction controller
    const STORE_DATA = ${JSON.stringify(state)};
    let CART = [];

    const CatalogCraft = {
      addToCart: function(id) {
        const p = STORE_DATA.products.find(x => x.id === id);
        if (!p) return;
        const existing = CART.find(x => x.id === id);
        if (existing) {
          existing.qty += 1;
        } else {
          CART.push({ id: p.id, n: p.n, p: p.p, op: p.op, e: p.e, qty: 1 });
        }
        this.updateCartUI();
        this.showToast('Added ' + p.n + ' to your bag!');
      },
      updateCartUI: function() {
        const count = CART.reduce((a, b) => a + b.qty, 0);
        const countEl = document.getElementById('header-cart-count');
        if (countEl) countEl.textContent = count;

        const cur = STORE_DATA.store.cur || '₹';
        const itemsEl = document.getElementById('cart-drawer-items');
        if (itemsEl) {
          if (CART.length === 0) {
            itemsEl.innerHTML = '<div style="padding:40px 20px;text-align:center;color:#888"><p>Your bag is currently empty.</p></div>';
          } else {
            itemsEl.innerHTML = CART.map(item => \`
              <div class="cart-drawer-item">
                <div class="item-info">
                  <strong>\${item.e || '🛍️'} \${item.n}</strong>
                  <div class="item-price">\${cur}\${item.p} each</div>
                </div>
                <div class="item-stepper">
                  <button type="button" onclick="CatalogCraft.changeQty('\${item.id}', -1)">−</button>
                  <span>\${item.qty}</span>
                  <button type="button" onclick="CatalogCraft.changeQty('\${item.id}', 1)">+</button>
                </div>
              </div>
            \`).join('');
          }
        }

        const total = CART.reduce((sum, item) => {
          const num = parseFloat(String(item.p).replace(/[^0-9.]/g, '')) || 0;
          return sum + (num * item.qty);
        }, 0);

        const totalEl = document.getElementById('cart-total-amount');
        if (totalEl) totalEl.textContent = cur + total.toLocaleString();
      },
      changeQty: function(id, delta) {
        const item = CART.find(x => x.id === id);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) {
          CART = CART.filter(x => x.id !== id);
        }
        this.updateCartUI();
      },
      clearCart: function() {
        CART = [];
        this.updateCartUI();
      },
      openCart: function() {
        this.updateCartUI();
        const overlay = document.getElementById('store-cart-overlay');
        if (overlay) overlay.classList.add('open');
      },
      closeCart: function(e) {
        if (e && e.target !== e.currentTarget && !e.target.classList.contains('cart-close-btn')) return;
        const overlay = document.getElementById('store-cart-overlay');
        if (overlay) overlay.classList.remove('open');
      },
      filterCategory: function(cat) {
        document.querySelectorAll('.store-cat-chip').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.cat === cat);
        });
        document.querySelectorAll('.store-product-card').forEach(card => {
          card.style.display = (!cat || card.dataset.cat === cat) ? '' : 'none';
        });
      },
      filterSearch: function(q) {
        q = (q || '').toLowerCase().trim();
        document.querySelectorAll('.store-product-card').forEach(card => {
          const text = (card.dataset.name + ' ' + card.dataset.cat).toLowerCase();
          card.style.display = (!q || text.includes(q)) ? '' : 'none';
        });
      },
      checkoutWhatsApp: function() {
        if (CART.length === 0) {
          alert('Please add at least one product to your cart first.');
          return;
        }
        const cur = STORE_DATA.store.cur || '₹';
        const lines = CART.map(i => \`• \${i.n} x\${i.qty} (\${cur}\${i.p})\`);
        const total = document.getElementById('cart-total-amount')?.textContent || '';
        const msg = encodeURIComponent(
          \`Hello \${STORE_DATA.store.name}!\nI would like to place an order:\n\n\${lines.join('\\n')}\n\nTotal: \${total}\n\nPlease confirm availability and payment instructions. Thank you!\`
        );
        const phone = (STORE_DATA.store.phone || '').replace(/[^0-9]/g, '');
        window.open('https://wa.me/' + phone + '?text=' + msg, '_blank');
      },
      handleInquiry: function(e) {
        e.preventDefault();
        const name = document.getElementById('inq-name').value;
        const phone = document.getElementById('inq-phone').value;
        const msg = document.getElementById('inq-msg').value;
        const text = encodeURIComponent(\`Hello \${STORE_DATA.store.name}!\nMy Name: \${name}\nPhone: \${phone}\nInquiry: \${msg}\`);
        const target = (STORE_DATA.store.phone || '').replace(/[^0-9]/g, '');
        window.open('https://wa.me/' + target + '?text=' + text, '_blank');
      },
      showToast: function(msg) {
        let toast = document.getElementById('floating-toast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = 'floating-toast';
          toast.className = 'comp-toast-preview floating-toast-fixed';
          document.body.appendChild(toast);
        }
        toast.innerHTML = '<span>✅</span><div class="toast-text"><strong>Notice</strong><small>' + msg + '</small></div>';
        toast.classList.add('visible');
        clearTimeout(toast._tm);
        toast._tm = setTimeout(() => toast.classList.remove('visible'), 3000);
      }
    };

    window.CatalogCraft = CatalogCraft;

    document.addEventListener('DOMContentLoaded', function() {
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver(function(entries) {
          entries.forEach(function(e) {
            if (e.isIntersecting) {
              e.target.classList.add('scroll-in-view');
            }
          });
        }, { threshold: 0.15 });
        document.querySelectorAll('.store-hero, .store-categories, .store-products-section, .store-features-section, .store-faqs-section, .store-contact-section').forEach(function(s) {
          obs.observe(s);
        });
      }
    });
  </script>
</body>
</html>`;
  },

  // Save string as file download
  downloadFile: function(filename, content, mime = 'text/html') {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  },

  // Export full ZIP with JSZip
  exportZip: async function(state) {
    if (!window.JSZip) {
      alert('JSZip library is still loading. Please download the standalone HTML instead.');
      return;
    }
    const zip = new JSZip();
    const html = this.generateStandaloneHtml(state);
    zip.file('index.html', html);
    zip.file('data.json', JSON.stringify(state, null, 2));
    zip.file('README.md', `# ${state.store.name} Website

This is a complete, static, no-code website generated with **CatalogCraft**.

## How to Deploy for Free

### Option 1: GitHub Pages (100% Free)
1. Create a new GitHub repository (e.g. \`my-store\`).
2. Upload the contents of this ZIP (\`index.html\`).
3. Go to **Settings > Pages** in your repository.
4. Select the \`main\` branch as source and click **Save**.
5. Your live website will be published in ~60 seconds!

### Option 2: Netlify Drop (100% Free)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this extracted folder.
3. Your site goes live instantly with a free SSL certificate!

### Option 3: Vercel (100% Free)
1. Run \`npx vercel\` inside this folder or import your GitHub repository into Vercel.
`);

    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (state.store.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'website') + '.zip';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    }, 100);
  },

  // Generate QR Code on target container
  generateQr: function(containerId, url) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';

    if (!window.QRCode) {
      el.innerHTML = '<p style="color:#d33">QR generator library is unavailable offline.</p>';
      return;
    }

    try {
      new QRCode(el, {
        text: url,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    } catch (e) {
      el.innerHTML = '<p style="color:#d33">Failed to create QR code: ' + e.message + '</p>';
    }
  },

  // Download QR Code canvas as high-res PNG
  downloadQrImage: function(containerId, filename = 'catalogue-qr.png') {
    const canvas = document.querySelector(`#${containerId} canvas`);
    if (!canvas) {
      alert('Please generate the QR code first.');
      return;
    }
    const border = 32;
    const outCanvas = document.createElement('canvas');
    outCanvas.width = canvas.width + border * 2;
    outCanvas.height = canvas.height + border * 2;
    const ctx = outCanvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, outCanvas.width, outCanvas.height);
    ctx.drawImage(canvas, border, border);

    outCanvas.toBlob(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
      }, 100);
    });
  }
};
