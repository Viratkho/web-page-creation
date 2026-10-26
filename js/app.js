// ============================================================================
// CATALOGCRAFT MAIN APPLICATION CONTROLLER
// ============================================================================

(function() {
  // Global Application State
  let STATE = {
    store: {
      name: 'Artisan Bakery Corner',
      tag: 'Baked Fresh Every Morning at Dawn',
      sub: 'Golden flaky pastries, sourdough loaves, birthday cakes, and European confections.',
      contact: 'Call or WhatsApp us to order. Fresh from the oven daily.',
      address: '8 Baker Street, Flour & Butter Corner',
      hours: 'Tue - Sun: 7:30 AM - 8:30 PM (Closed Mondays)',
      phone: '+91 98333 44556',
      email: 'orders@buttercroissant.com',
      cur: '₹'
    },
    designSystem: 'modern-saas',
    tokenOverrides: {},
    bgPreset: '',
    layout: 'grid',
    buttonShape: 'shape-soft',
    buttonEffect: '',
    sections: {
      announcement: { enabled: true, text: '🎉 PROMO: Use code CRAFT20 for 20% off all orders!' },
      header: { enabled: true },
      hero: {
        enabled: true,
        title: 'Golden Crust, Pillowy Soft Crumb',
        subtitle: 'Pure French butter croissants layered with 27 delicate folds and baked to perfection.',
        cta: 'Browse Bakery Items',
        badge: 'HOT FROM THE OVEN'
      },
      categories: { enabled: true },
      products: { enabled: true },
      features: { enabled: true },
      faqs: { enabled: true },
      contact: { enabled: true },
      footer: { enabled: true },
      fab: { enabled: true }
    },
    products: [],
    features: [],
    faqs: []
  };

  // Undo / Redo History
  let historyStack = [];
  let historyIndex = -1;
  let saveTimer = null;
  let currentViewport = 'desktop';

  // Load starter data from category
  function loadStarterCategory(catKey) {
    const data = window.SHOP_CATEGORIES[catKey] || window.SHOP_CATEGORIES.Bakery;
    STATE.store.name = data.name;
    STATE.store.tag = data.tag;
    STATE.store.sub = data.sub;
    STATE.store.contact = data.contact;
    STATE.store.address = data.address;
    STATE.store.hours = data.hours;
    STATE.store.phone = data.phone;
    STATE.store.email = data.email;
    STATE.store.cur = data.cur;

    if (data.theme && window.DESIGN_SYSTEMS.some(d => d.id === data.theme)) {
      STATE.designSystem = data.theme;
    }

    if (data.hero) {
      STATE.sections.hero.title = data.hero.title;
      STATE.sections.hero.subtitle = data.hero.subtitle;
      STATE.sections.hero.cta = data.hero.cta;
      STATE.sections.hero.badge = data.hero.badge;
    }

    STATE.products = JSON.parse(JSON.stringify(data.products || []));
    STATE.features = JSON.parse(JSON.stringify(data.features || []));
    STATE.faqs = JSON.parse(JSON.stringify(data.faqs || []));

    snap();
    renderAll();
    showToast('Loaded ' + data.name + ' starter template!');
  }

  // Snapshot state for undo / redo and local autosave
  function snap() {
    const json = JSON.stringify(STATE);
    if (historyStack[historyIndex] !== json) {
      historyStack = historyStack.slice(0, historyIndex + 1);
      historyStack.push(json);
      if (historyStack.length > 60) historyStack.shift();
      historyIndex = historyStack.length - 1;
    }
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem('catalogcraft_state', json);
      } catch (e) {}
      if (window.CatalogCraftAPI && window.CatalogCraftAPI.isBackendAvailable()) {
        window.CatalogCraftAPI.scheduleAutoSave(() => STATE);
      }
    }, 400);
  }

  function undo() {
    if (historyIndex > 0) {
      historyIndex--;
      STATE = JSON.parse(historyStack[historyIndex]);
      renderAll();
      showToast('Undone');
    }
  }

  function redo() {
    if (historyIndex < historyStack.length - 1) {
      historyIndex++;
      STATE = JSON.parse(historyStack[historyIndex]);
      renderAll();
      showToast('Redone');
    }
  }

  // Render Preview Frame
  function renderPreview() {
    const container = document.getElementById('preview-container');
    if (!container) return;
    container.innerHTML = window.StoreRenderer.renderFullStore(STATE);
    if (window.BUTTON_LIBRARY) {
      window.BUTTON_LIBRARY.initRipples(container);
    }
  }

  // Toast notification in editor
  function showToast(msg) {
    const toast = document.getElementById('builder-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._tm);
    toast._tm = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // Render Sidebar Panels
  function renderSidebar() {
    renderDesignPanel();
    renderContentPanel();
    renderButtonsPanel();
    renderComponentsPanel();
    renderSharePanel();
  }

  function renderAll() {
    renderSidebar();
    renderPreview();
  }

  // 1. DESIGN PANEL
  function renderDesignPanel() {
    const panel = document.getElementById('panel-design');
    if (!panel) return;

    const currentDs = window.DESIGN_SYSTEMS.find(d => d.id === STATE.designSystem) || window.DESIGN_SYSTEMS[0];

    panel.innerHTML = `
      <div class="settings-group">
        <h4>Design Systems (20 Directions)</h4>
        <div class="ds-cards-grid">
          ${window.DESIGN_SYSTEMS.map(ds => `
            <div class="ds-select-card ${ds.id === STATE.designSystem ? 'active' : ''}" onclick="App.setDesignSystem('${ds.id}')">
              <span class="ds-card-title">${ds.name}</span>
              <span class="ds-card-badge">${ds.badge}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="settings-group">
        <h4>Selected System Details</h4>
        <p style="font-size:12px;color:var(--ed-muted);margin-bottom:12px">${currentDs.desc}</p>
        <div class="setting-row">
          <label>Primary Brand Color</label>
          <input type="color" class="input-color-picker" value="${currentDs.tokens.primary}" onchange="App.setOverride('primary', this.value)">
        </div>
        <div class="setting-row">
          <label>Surface / Sheet Color</label>
          <input type="color" class="input-color-picker" value="${currentDs.tokens.surface.slice(0,7)}" onchange="App.setOverride('surface', this.value)">
        </div>
        <div class="setting-row">
          <label>Corner Radius (px)</label>
          <div class="ctrl-wrap">
            <input type="range" min="0" max="32" value="${parseInt(STATE.radius || currentDs.tokens.radius)}" oninput="App.setRadius(this.value)">
          </div>
        </div>
      </div>

      <div class="settings-group">
        <h4>Catalog Grid Layout</h4>
        <div class="setting-row">
          <label>Product Card Display</label>
          <div class="ctrl-wrap">
            <select class="ed-select" onchange="App.setLayout(this.value)">
              <option value="grid" ${STATE.layout === 'grid' ? 'selected' : ''}>Standard Grid (Responsive)</option>
              <option value="list" ${STATE.layout === 'list' ? 'selected' : ''}>Horizontal Restaurant / Menu List</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }

  // 2. CONTENT & STORE PANEL
  function renderContentPanel() {
    const panel = document.getElementById('panel-content');
    if (!panel) return;

    panel.innerHTML = `
      <div class="settings-group">
        <h4>Load Business Starter (22 Categories)</h4>
        <div style="display:flex;gap:8px;margin-bottom:14px">
          <select id="starter-category-select" class="ed-select">
            ${Object.keys(window.SHOP_CATEGORIES).map(k => `
              <option value="${k}" ${STATE.store.name.includes(window.SHOP_CATEGORIES[k].name) ? 'selected' : ''}>
                ${window.SHOP_CATEGORIES[k].icon} ${window.SHOP_CATEGORIES[k].name}
              </option>
            `).join('')}
          </select>
          <button class="tool-btn" style="background:var(--ed-primary);color:#fff" onclick="App.loadStarter()">Load</button>
        </div>
      </div>

      <div class="settings-group">
        <h4>Storefront Details</h4>
        <div class="setting-row">
          <label>Store Name</label>
          <div class="ctrl-wrap">
            <input type="text" class="ed-input" value="${StoreRenderer.esc(STATE.store.name)}" oninput="App.setStoreProp('name', this.value)">
          </div>
        </div>
        <div class="setting-row">
          <label>Tagline / Headline</label>
          <div class="ctrl-wrap">
            <input type="text" class="ed-input" value="${StoreRenderer.esc(STATE.store.tag)}" oninput="App.setStoreProp('tag', this.value)">
          </div>
        </div>
        <div class="setting-row">
          <label>Currency Symbol</label>
          <div class="ctrl-wrap">
            <input type="text" class="ed-input" style="width:60px" value="${StoreRenderer.esc(STATE.store.cur)}" oninput="App.setStoreProp('cur', this.value)">
          </div>
        </div>
        <div class="setting-row">
          <label>WhatsApp / Phone</label>
          <div class="ctrl-wrap">
            <input type="text" class="ed-input" value="${StoreRenderer.esc(STATE.store.phone)}" oninput="App.setStoreProp('phone', this.value)">
          </div>
        </div>
      </div>

      <div class="settings-group">
        <h4>Products & Items (${STATE.products.length})</h4>
        <button class="tool-btn" style="width:100%;margin-bottom:12px;background:var(--ed-primary);color:#fff" onclick="App.addProduct()">+ Add New Product</button>
        <div id="product-editor-items">
          ${STATE.products.map((p, idx) => `
            <div class="product-item-row">
              <div class="product-item-header" onclick="App.toggleProduct(${idx})">
                <span>${StoreRenderer.esc(p.e || '🛍️')} <strong>${StoreRenderer.esc(p.n || 'Untitled')}</strong></span>
                <span>${STATE.store.cur}${StoreRenderer.esc(p.p)} ▼</span>
              </div>
              <div class="product-item-body" id="p-body-${idx}" style="display:none">
                <div class="setting-row">
                  <label>Name</label>
                  <input type="text" class="ed-input" value="${StoreRenderer.esc(p.n)}" oninput="App.setProductProp(${idx}, 'n', this.value)">
                </div>
                <div class="setting-row">
                  <label>Price</label>
                  <input type="text" class="ed-input" value="${StoreRenderer.esc(p.p)}" oninput="App.setProductProp(${idx}, 'p', this.value)">
                </div>
                <div class="setting-row">
                  <label>Category</label>
                  <input type="text" class="ed-input" value="${StoreRenderer.esc(p.c)}" oninput="App.setProductProp(${idx}, 'c', this.value)">
                </div>
                <div class="setting-row">
                  <label>Badge Tag (e.g. -20%)</label>
                  <input type="text" class="ed-input" value="${StoreRenderer.esc(p.x || '')}" oninput="App.setProductProp(${idx}, 'x', this.value)">
                </div>
                <div class="setting-row">
                  <label>Emoji Icon</label>
                  <input type="text" class="ed-input" style="width:60px" value="${StoreRenderer.esc(p.e || '🛍️')}" oninput="App.setProductProp(${idx}, 'e', this.value)">
                </div>
                <div class="setting-row">
                  <label>Upload Photo</label>
                  <input type="file" accept="image/*" onchange="App.handleProductImage(${idx}, this.files[0])">
                </div>
                <div style="display:flex;gap:6px;margin-top:6px">
                  <button class="tool-btn" onclick="App.moveProduct(${idx}, -1)">↑ Up</button>
                  <button class="tool-btn" onclick="App.moveProduct(${idx}, 1)">↓ Down</button>
                  <button class="tool-btn" style="color:var(--ed-danger)" onclick="App.removeProduct(${idx})">Delete</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 3. BUTTON STUDIO PANEL
  function renderButtonsPanel() {
    const panel = document.getElementById('panel-buttons');
    if (!panel) return;

    panel.innerHTML = `
      <div class="settings-group">
        <h4>Live Button Playground</h4>
        <div style="padding:24px;background:var(--ed-bg);border-radius:8px;text-align:center;margin-bottom:14px" id="button-playground-target">
          ${window.BUTTON_LIBRARY.render({
            text: 'Add to Cart',
            icon: '🛒',
            style: 'btn-primary',
            shape: STATE.buttonShape,
            effect: STATE.buttonEffect,
            size: 'lg'
          })}
        </div>
      </div>

      <div class="settings-group">
        <h4>Shape Variations</h4>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
          ${window.BUTTON_LIBRARY.shapes.map(s => `
            <button class="tool-btn ${s.id === STATE.buttonShape ? 'active' : ''}" onclick="App.setButtonShape('${s.id}')">
              ${s.name}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="settings-group">
        <h4>Visual Effects & Animations</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:14px">
          <button class="tool-btn ${STATE.buttonEffect === '' ? 'active' : ''}" onclick="App.setButtonEffect('')">Standard Solid</button>
          ${window.BUTTON_LIBRARY.effects.map(e => `
            <button class="tool-btn ${e.id === STATE.buttonEffect ? 'active' : ''}" onclick="App.setButtonEffect('${e.id}')">
              ${e.name}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="settings-group">
        <h4>Functional Actions Explorer</h4>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${window.BUTTON_LIBRARY.functionalVariants.map(fn => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--ed-surface);border:1px solid var(--ed-border);border-radius:6px">
              <span>${fn.icon} <strong>${fn.name}</strong></span>
              <button class="craft-btn btn-primary btn-sm btn-shape-soft" onclick="App.testButtonAction('${fn.action}')">
                <span>Test Action</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 4. COMPONENTS PANEL
  function renderComponentsPanel() {
    const panel = document.getElementById('panel-components');
    if (!panel) return;

    panel.innerHTML = `
      <div class="settings-group">
        <h4>UI Component Explorer</h4>
        <p style="font-size:12px;color:var(--ed-muted);margin-bottom:14px">
          Browse and toggle interchangeable sections from the unified library.
        </p>

        <div style="display:flex;flex-direction:column;gap:10px">
          ${[
            { id: 'announcement', name: 'Announcement Bar', icon: '📢' },
            { id: 'header', name: 'Header & Navigation', icon: '🧭' },
            { id: 'hero', name: 'Hero Welcome Banner', icon: '✨' },
            { id: 'categories', name: 'Category Filter Chips', icon: '🏷️' },
            { id: 'products', name: 'Products / Menu Grid', icon: '🛍️' },
            { id: 'features', name: 'Why Us / Highlights', icon: '⭐' },
            { id: 'faqs', name: 'FAQ Accordion', icon: '❓' },
            { id: 'contact', name: 'Contact & Direct Inquiry', icon: '📍' },
            { id: 'footer', name: 'Storefront Footer', icon: '📄' },
            { id: 'fab', name: 'Floating WhatsApp Button', icon: '💬' }
          ].map(sec => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:var(--ed-surface);border:1px solid var(--ed-border);border-radius:8px">
              <span>${sec.icon} <strong>${sec.name}</strong></span>
              <label style="cursor:pointer">
                <input type="checkbox" ${STATE.sections[sec.id]?.enabled ? 'checked' : ''} onchange="App.toggleSection('${sec.id}', this.checked)">
                <span style="font-size:12px;margin-left:4px">${STATE.sections[sec.id]?.enabled ? 'Active' : 'Hidden'}</span>
              </label>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 5. EXPORT & SHARE PANEL
  function renderSharePanel() {
    const panel = document.getElementById('panel-share');
    if (!panel) return;

    const isOnline = window.CatalogCraftAPI && window.CatalogCraftAPI.isBackendAvailable();
    const currentProjId = window.CatalogCraftAPI ? window.CatalogCraftAPI.getCurrentProjectId() : null;

    panel.innerHTML = `
      <div class="settings-group">
        <h4>Backend Storage (FastAPI + SQLite)</h4>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${isOnline ? '#10b981' : '#f59e0b'}"></span>
          <span style="font-size:12px;font-weight:600;color:${isOnline ? '#059669' : '#d97706'}">
            ${isOnline ? '🟢 Connected to FastAPI Server' : '🟡 Offline Mode (Local Storage)'}
          </span>
        </div>
        <p style="font-size:12px;color:var(--ed-muted);margin-bottom:10px">
          ${isOnline 
            ? 'Your store data persists in SQLite database across restarts.' 
            : 'Changes are saved locally to your browser. Start the FastAPI backend for SQLite database persistence.'}
        </p>
        <div style="display:flex;gap:8px;margin-bottom:8px">
          <button class="tool-btn" style="flex:1;background:var(--ed-primary);color:#fff" onclick="App.saveToServer()">
            💾 Save to Database
          </button>
          <button class="tool-btn" style="flex:1" onclick="App.openProjectsModal()">
            📂 My Projects
          </button>
        </div>
        ${currentProjId ? `<div style="font-size:11px;color:var(--ed-muted);word-break:break-all">Active Project ID: <code>${currentProjId}</code></div>` : ''}
      </div>

      <div class="settings-group">
        <h4>Standalone Website Export</h4>
        <p style="font-size:12px;color:var(--ed-muted)">
          Download your website as a 100% self-contained static site. Zero server required!
        </p>
        <button class="tool-btn" style="width:100%;padding:12px;margin-bottom:8px;background:var(--ed-primary);color:#fff" onclick="App.exportHtml()">
          📥 Download Standalone HTML (.html)
        </button>
        <button class="tool-btn" style="width:100%;padding:10px;margin-bottom:14px" onclick="App.exportZip()">
          📦 Download Full Project ZIP (.zip)
        </button>
      </div>

      <div class="settings-group">
        <h4>QR Code Generator</h4>
        <div class="setting-row">
          <label>Website URL</label>
          <input type="text" id="share-target-url" class="ed-input" value="${location.href.split('#')[0]}">
        </div>
        <button class="tool-btn" style="width:100%;margin-bottom:12px" onclick="App.generateQrCode()">
          Generate QR Code
        </button>
        <div style="text-align:center;padding:14px;background:#ffffff;border-radius:12px;border:1px solid var(--ed-border);margin-bottom:10px">
          <div id="qr-code-canvas-box" style="display:inline-block"></div>
        </div>
        <button class="tool-btn" style="width:100%" onclick="App.downloadQr()">
          💾 Download QR Image (PNG)
        </button>
      </div>

      <div class="settings-group">
        <h4>Project Backup</h4>
        <div style="display:flex;gap:8px">
          <button class="tool-btn" style="flex:1" onclick="App.exportJson()">Export JSON</button>
          <label class="tool-btn" style="flex:1;text-align:center;cursor:pointer">
            Import JSON
            <input type="file" accept=".json,application/json" style="display:none" onchange="App.importJson(this.files[0])">
          </label>
        </div>
      </div>

      <div class="settings-group">
        <h4>Free 100% Hosting Guides</h4>
        <p style="font-size:12px;color:var(--ed-muted)">
          • <strong>GitHub Pages:</strong> Push <code>index.html</code> to your repo, enable Pages under Settings.<br>
          • <strong>Netlify:</strong> Drag and drop your exported folder into Netlify Drop for free HTTPS.<br>
          • <strong>Vercel:</strong> Run <code>npx vercel</code> or link your GitHub repo.
        </p>
      </div>
    `;

    setTimeout(() => App.generateQrCode(), 100);
  }

  // App API Object
  window.App = {
    setTab: function(tabId) {
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
      });
      document.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('active', p.id === 'panel-' + tabId);
      });
    },

    setViewport: function(mode) {
      currentViewport = mode;
      document.querySelectorAll('.device-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === mode);
      });
      const frame = document.getElementById('preview-frame');
      if (frame) {
        frame.className = 'preview-frame-container frame-' + mode;
      }
    },

    setDesignSystem: function(id) {
      STATE.designSystem = id;
      snap();
      renderAll();
    },

    setOverride: function(key, val) {
      STATE.tokenOverrides[key] = val;
      snap();
      renderPreview();
    },

    setRadius: function(val) {
      STATE.radius = val;
      snap();
      renderPreview();
    },

    setLayout: function(val) {
      STATE.layout = val;
      snap();
      renderPreview();
    },

    setStoreProp: function(key, val) {
      STATE.store[key] = val;
      snap();
      renderPreview();
    },

    setButtonShape: function(id) {
      STATE.buttonShape = id;
      snap();
      renderAll();
    },

    setButtonEffect: function(id) {
      STATE.buttonEffect = id;
      snap();
      renderAll();
    },

    testButtonAction: function(act) {
      if (act === 'cart') {
        showToast('Add to cart clicked!');
        if (STATE.products.length > 0) {
          CatalogCraft.addToCart(STATE.products[0].id);
        }
      } else if (act === 'whatsapp') {
        showToast('Opening WhatsApp checkout flow...');
        CatalogCraft.openCart();
      } else {
        showToast('Button action triggered: ' + act);
      }
    },

    toggleSection: function(secId, enabled) {
      if (!STATE.sections[secId]) STATE.sections[secId] = {};
      STATE.sections[secId].enabled = enabled;
      snap();
      renderAll();
    },

    loadStarter: function() {
      const select = document.getElementById('starter-category-select');
      if (select) loadStarterCategory(select.value);
    },

    addProduct: function() {
      STATE.products.push({
        id: 'p_' + Date.now(),
        n: 'New Handcrafted Item',
        p: '499',
        op: '650',
        c: 'General',
        e: '🛍️',
        d: 'Crafted with premium materials and designed to delight.',
        x: 'NEW',
        f: false,
        rating: 5.0
      });
      snap();
      renderAll();
      showToast('Product added!');
    },

    toggleProduct: function(idx) {
      const el = document.getElementById('p-body-' + idx);
      if (el) el.style.display = el.style.display === 'none' ? 'flex' : 'none';
    },

    setProductProp: function(idx, prop, val) {
      if (STATE.products[idx]) {
        STATE.products[idx][prop] = val;
        snap();
        renderPreview();
      }
    },

    handleProductImage: function(idx, file) {
      if (!file) return;
      const img = new Image();
      img.onload = () => {
        const maxDim = 320;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        STATE.products[idx].i = canvas.toDataURL('image/jpeg', 0.65);
        snap();
        renderAll();
        showToast('Photo added and optimized.');
      };
      img.src = URL.createObjectURL(file);
    },

    removeProduct: function(idx) {
      STATE.products.splice(idx, 1);
      snap();
      renderAll();
      showToast('Product deleted');
    },

    moveProduct: function(idx, delta) {
      const target = idx + delta;
      if (target < 0 || target >= STATE.products.length) return;
      const temp = STATE.products[idx];
      STATE.products[idx] = STATE.products[target];
      STATE.products[target] = temp;
      snap();
      renderAll();
    },

    exportHtml: function() {
      const html = window.Exporter.generateStandaloneHtml(STATE);
      const filename = (STATE.store.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'website') + '.html';
      window.Exporter.downloadFile(filename, html, 'text/html');
      showToast('Exported standalone HTML website!');
    },

    exportZip: function() {
      window.Exporter.exportZip(STATE);
      showToast('Generating ZIP package...');
    },

    exportJson: function() {
      const json = JSON.stringify(STATE, null, 2);
      window.Exporter.downloadFile('catalogcraft-project.json', json, 'application/json');
      showToast('Project JSON exported');
    },

    importJson: function(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        try {
          STATE = JSON.parse(e.target.result);
          snap();
          renderAll();
          showToast('Project successfully imported!');
        } catch (err) {
          alert('Invalid JSON project file.');
        }
      };
      reader.readAsText(file);
    },

    generateQrCode: function() {
      const url = document.getElementById('share-target-url')?.value || location.href;
      window.Exporter.generateQr('qr-code-canvas-box', url);
    },

    downloadQr: function() {
      window.Exporter.downloadQrImage('qr-code-canvas-box', 'store-qr-code.png');
    },

    toggleTheme: function() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    },

    getState: function() {
      return STATE;
    },

    setState: function(newState) {
      STATE = newState;
      snap();
      renderAll();
    },

    setBackgroundPreset: function(preset) {
      STATE.bgPreset = preset;
      snap();
      renderAll();
    },

    showToast: showToast,
    snap: snap,
    renderAll: renderAll,
    undo: undo,
    redo: redo,

    saveToServer: async function() {
      try {
        showToast('Saving to server...');
        const res = await window.CatalogCraftAPI.saveProject(STATE);
        if (res && res.id) {
          window.CatalogCraftAPI.setCurrentProjectId(res.id);
          showToast('✅ Saved "' + (STATE.store.name || 'Shop') + '" to SQLite database!');
          renderSharePanel();
        } else {
          showToast('Saved locally in browser.');
        }
      } catch (err) {
        console.error(err);
        showToast('⚠️ Save failed: ' + err.message);
      }
    },

    loadFromServer: async function(id) {
      try {
        showToast('Loading project...');
        const data = await window.CatalogCraftAPI.loadProject(id);
        if (data) {
          STATE = {
            store: data.store || {},
            designSystem: data.designSystem || 'modern-saas',
            tokenOverrides: data.tokenOverrides || {},
            bgPreset: data.bgPreset || '',
            layout: data.layout || 'grid',
            buttonShape: data.buttonShape || 'shape-soft',
            buttonEffect: data.buttonEffect || '',
            sections: data.sections || {},
            products: data.products || [],
            features: data.features || [],
            faqs: data.faqs || []
          };
          if (data.elementOverrides && window.FullControl) {
            window.FullControl.elementOverrides = data.elementOverrides;
          }
          snap();
          renderAll();
          App.closeProjectsModal();
          showToast('✅ Loaded "' + (STATE.store.name || 'Shop') + '"!');
        }
      } catch (err) {
        console.error(err);
        showToast('⚠️ Load failed: ' + err.message);
      }
    },

    openProjectsModal: async function() {
      let modal = document.getElementById('projects-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'projects-modal';
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
        modal.innerHTML = `
          <div style="background:var(--ed-surface,#fff);border:1px solid var(--ed-border,#e2e8f0);border-radius:16px;width:100%;max-width:540px;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);overflow:hidden">
            <div style="padding:16px 20px;border-bottom:1px solid var(--ed-border,#e2e8f0);display:flex;justify-content:space-between;align-items:center">
              <h3 style="margin:0;font-size:16px;font-weight:700">📂 Saved Shop Projects</h3>
              <button onclick="App.closeProjectsModal()" style="border:none;background:none;font-size:20px;cursor:pointer;color:var(--ed-muted,#64748b)">&times;</button>
            </div>
            <div id="projects-modal-list" style="padding:16px 20px;overflow-y:auto;flex:1">
              <p style="color:var(--ed-muted);font-size:13px">Loading projects...</p>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
      }
      modal.style.display = 'flex';

      const listEl = document.getElementById('projects-modal-list');
      try {
        const list = await window.CatalogCraftAPI.listProjects();
        if (!list || list.length === 0) {
          listEl.innerHTML = `
            <div style="text-align:center;padding:30px 10px;color:var(--ed-muted)">
              <div style="font-size:32px;margin-bottom:8px">📦</div>
              <p style="font-size:13px;margin:0">No saved projects found on server.</p>
              <button class="tool-btn" style="margin-top:12px;background:var(--ed-primary);color:#fff" onclick="App.saveToServer();App.closeProjectsModal()">Save Current Project Now</button>
            </div>
          `;
          return;
        }
        listEl.innerHTML = list.map(item => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border:1px solid var(--ed-border,#e2e8f0);border-radius:10px;margin-bottom:8px;background:var(--ed-panel-bg,#f8fafc)">
            <div>
              <div style="font-weight:700;font-size:14px">${item.name || 'Untitled Shop'}</div>
              <div style="font-size:11px;color:var(--ed-muted)">Last saved: ${new Date(item.updated_at).toLocaleString()}</div>
            </div>
            <div style="display:flex;gap:6px">
              <button class="tool-btn" style="padding:6px 10px;font-size:12px" onclick="App.loadFromServer('${item.id}')">Open</button>
              <button class="tool-btn" style="padding:6px 10px;font-size:12px" onclick="App.duplicateProjectOnServer('${item.id}')" title="Duplicate">📑</button>
              <button class="tool-btn" style="padding:6px 10px;font-size:12px;color:#ef4444" onclick="App.deleteProjectFromServer('${item.id}')" title="Delete">🗑️</button>
            </div>
          </div>
        `).join('');
      } catch (err) {
        listEl.innerHTML = `<p style="color:#ef4444;font-size:13px">Failed to load projects: ${err.message}</p>`;
      }
    },

    closeProjectsModal: function() {
      const modal = document.getElementById('projects-modal');
      if (modal) modal.style.display = 'none';
    },

    deleteProjectFromServer: async function(id) {
      if (!confirm('Are you sure you want to delete this project?')) return;
      try {
        await window.CatalogCraftAPI.deleteProject(id);
        showToast('Project deleted');
        App.openProjectsModal();
        renderSharePanel();
      } catch (err) {
        showToast('⚠️ Delete failed: ' + err.message);
      }
    },

    duplicateProjectOnServer: async function(id) {
      try {
        const copy = await window.CatalogCraftAPI.duplicateProject(id);
        showToast('Project duplicated as "' + copy.store.name + '"');
        App.openProjectsModal();
      } catch (err) {
        showToast('⚠️ Duplicate failed: ' + err.message);
      }
    }
  };

  // Keyboard Shortcuts (Ctrl+Z, Ctrl+Y)
  window.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) redo(); else undo();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
      e.preventDefault();
      redo();
    }
  });

  // Client-Side Cart in Preview Execution Context
  let PREVIEW_CART = [];
  window.CatalogCraft = {
    addToCart: function(id) {
      const p = STATE.products.find(x => x.id === id);
      if (!p) return;
      const existing = PREVIEW_CART.find(x => x.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        PREVIEW_CART.push({ id: p.id, n: p.n, p: p.p, op: p.op, e: p.e, qty: 1 });
      }
      this.updateCartUI();
      showToast('Added ' + p.n + ' to your bag!');
    },
    updateCartUI: function() {
      const count = PREVIEW_CART.reduce((a, b) => a + b.qty, 0);
      const countEl = document.getElementById('header-cart-count');
      if (countEl) countEl.textContent = count;

      const cur = STATE.store.cur || '₹';
      const itemsEl = document.getElementById('cart-drawer-items');
      if (itemsEl) {
        if (PREVIEW_CART.length === 0) {
          itemsEl.innerHTML = '<div style="padding:40px 20px;text-align:center;color:#888"><p>Your bag is currently empty.</p></div>';
        } else {
          itemsEl.innerHTML = PREVIEW_CART.map(item => `
            <div class="cart-drawer-item">
              <div class="item-info">
                <strong>${item.e || '🛍️'} ${item.n}</strong>
                <div class="item-price">${cur}${item.p} each</div>
              </div>
              <div class="item-stepper">
                <button type="button" onclick="CatalogCraft.changeQty('${item.id}', -1)">−</button>
                <span>${item.qty}</span>
                <button type="button" onclick="CatalogCraft.changeQty('${item.id}', 1)">+</button>
              </div>
            </div>
          `).join('');
        }
      }

      const total = PREVIEW_CART.reduce((sum, item) => {
        const num = parseFloat(String(item.p).replace(/[^0-9.]/g, '')) || 0;
        return sum + (num * item.qty);
      }, 0);

      const totalEl = document.getElementById('cart-total-amount');
      if (totalEl) totalEl.textContent = cur + total.toLocaleString();
    },
    changeQty: function(id, delta) {
      const item = PREVIEW_CART.find(x => x.id === id);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) {
        PREVIEW_CART = PREVIEW_CART.filter(x => x.id !== id);
      }
      this.updateCartUI();
    },
    clearCart: function() {
      PREVIEW_CART = [];
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
      if (PREVIEW_CART.length === 0) {
        alert('Please add at least one product to your cart first.');
        return;
      }
      const cur = STATE.store.cur || '₹';
      const lines = PREVIEW_CART.map(i => `• ${i.n} x${i.qty} (${cur}${i.p})`);
      const total = document.getElementById('cart-total-amount')?.textContent || '';
      const msg = encodeURIComponent(
        `Hello ${STATE.store.name}!\nI would like to place an order:\n\n${lines.join('\n')}\n\nTotal: ${total}\n\nPlease confirm availability and payment instructions. Thank you!`
      );
      const phone = (STATE.store.phone || '').replace(/[^0-9]/g, '');
      window.open('https://wa.me/' + phone + '?text=' + msg, '_blank');
    },
    handleInquiry: function(e) {
      e.preventDefault();
      const name = document.getElementById('inq-name').value;
      const phone = document.getElementById('inq-phone').value;
      const msg = document.getElementById('inq-msg').value;
      const text = encodeURIComponent(`Hello ${STATE.store.name}!\nMy Name: ${name}\nPhone: ${phone}\nInquiry: ${msg}`);
      const target = (STATE.store.phone || '').replace(/[^0-9]/g, '');
      window.open('https://wa.me/' + target + '?text=' + text, '_blank');
    }
  };

  // Initialization
  window.addEventListener('DOMContentLoaded', async () => {
    try {
      const saved = localStorage.getItem('catalogcraft_state');
      if (saved) {
        STATE = JSON.parse(saved);
      } else {
        loadStarterCategory('Bakery');
      }
    } catch (e) {
      loadStarterCategory('Bakery');
    }
    snap();
    renderAll();

    // Check FastAPI Backend Connection
    if (window.CatalogCraftAPI) {
      const isOnline = await window.CatalogCraftAPI.checkBackend();
      if (isOnline) {
        window.CatalogCraftAPI.enableAutoSave();
        renderSharePanel();
        showToast('🟢 Connected to FastAPI backend with SQLite persistence');
      }
    }
  });
})();
