// ============================================================================
// COMPREHENSIVE STOREFRONT RENDERER (LIVE PREVIEW & EXPORT)
// ============================================================================

window.StoreRenderer = {
  // Generate CSS style variables from Design System tokens and custom overrides
  getThemeStyles: function(state) {
    const ds = window.DESIGN_SYSTEMS.find(d => d.id === state.designSystem) || window.DESIGN_SYSTEMS[0];
    const tok = { ...ds.tokens, ...(state.tokenOverrides || {}) };

    // Background style
    let bgCss = tok.bg;
    if (state.bgPreset) {
      bgCss = state.bgPreset;
    }

    return {
      cssVars: `
        --ds-bg: ${bgCss};
        --ds-surface: ${tok.surface};
        --ds-card: ${tok.card};
        --ds-card-border: ${tok.cardBorder};
        --ds-card-shadow: ${tok.cardShadow};
        --ds-text: ${tok.text};
        --ds-text-muted: ${tok.textMuted};
        --ds-primary: ${tok.primary};
        --ds-primary-text: ${tok.primaryText};
        --ds-primary-hover: ${tok.primaryHover};
        --ds-accent: ${tok.accent};
        --ds-border: ${tok.border};
        --ds-font-heading: ${state.fontHeading || tok.fontHeading};
        --ds-font-body: ${state.fontBody || tok.fontBody};
        --ds-radius: ${state.radius ? state.radius + 'px' : tok.radius};
        --ds-btn-radius: ${state.buttonRadius ? state.buttonRadius + 'px' : tok.buttonRadius};
        --ds-btn-shadow: ${tok.buttonShadow};
        --ds-badge-radius: ${tok.badgeRadius};
        --ds-shadow: ${tok.shadow};
      `,
      styleClass: ds.tokens.styleClass || ''
    };
  },

  // Helper to escape HTML strings safely
  esc: function(str) {
    return String(str ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  },

  // Render individual sections
  renderAnnouncement: function(state) {
    if (!state.sections.announcement?.enabled) return '';
    const text = state.sections.announcement.text || '🎉 FESTIVE OFFER: Use coupon code CRAFT20 for 20% off all orders!';
    return `
      <div class="store-announcement" role="region" aria-label="Announcement">
        <div class="store-container announcement-inner">
          <span>${this.esc(text)}</span>
        </div>
      </div>
    `;
  },

  renderHeader: function(state) {
    if (!state.sections.header?.enabled) return '';
    const s = state.store;
    return `
      <header class="store-header" role="banner">
        <div class="store-container header-inner">
          <a href="#top" class="store-brand">
            <span class="brand-name">${this.esc(s.name)}</span>
          </a>
          <nav class="store-nav" aria-label="Main Navigation">
            <a href="#products">Catalog</a>
            <a href="#features">Why Us</a>
            <a href="#faqs">FAQs</a>
            <a href="#contact">Contact</a>
          </nav>
          <div class="store-header-actions">
            <button class="store-cart-trigger" onclick="CatalogCraft.openCart()" aria-label="Shopping Cart">
              <span>🛒</span>
              <span class="store-cart-count" id="header-cart-count">0</span>
            </button>
            <a href="https://wa.me/${encodeURIComponent((s.phone || '').replace(/[^0-9]/g, ''))}" target="_blank" rel="noopener" class="craft-btn btn-primary btn-sm btn-shape-soft store-header-btn">
              <span>💬 WhatsApp</span>
            </a>
          </div>
        </div>
      </header>
    `;
  },

  renderHero: function(state) {
    if (!state.sections.hero?.enabled) return '';
    const h = state.sections.hero;
    const s = state.store;
    return `
      <section class="store-hero" id="top">
        <div class="store-container hero-inner">
          <div class="hero-content">
            ${h.badge ? `<span class="store-badge">${this.esc(h.badge)}</span>` : ''}
            <h1 class="hero-title">${this.esc(h.title || s.tag)}</h1>
            <p class="hero-subtitle">${this.esc(h.subtitle || s.sub)}</p>
            <div class="hero-actions">
              <a href="#products" class="craft-btn btn-primary btn-lg btn-shape-soft">
                <span>${this.esc(h.cta || 'Browse Catalogue')}</span>
              </a>
              <a href="#contact" class="craft-btn btn-outline btn-lg btn-shape-soft">
                <span>Store Info</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  renderCategories: function(state) {
    if (!state.sections.categories?.enabled) return '';
    const cats = [...new Set(state.products.map(p => p.c).filter(Boolean))];
    if (!cats.length) return '';

    return `
      <div class="store-categories-bar">
        <div class="store-container categories-inner">
          <button class="store-cat-chip active" data-cat="" onclick="CatalogCraft.filterCategory('')">All Products</button>
          ${cats.map(c => `
            <button class="store-cat-chip" data-cat="${this.esc(c)}" onclick="CatalogCraft.filterCategory('${this.esc(c)}')">
              ${this.esc(c)}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderProducts: function(state) {
    if (!state.sections.products?.enabled) return '';
    const products = state.products || [];
    const cur = state.store.cur || '₹';
    const layout = state.layout || 'grid'; // grid, list, masonry, bento

    return `
      <section class="store-products-section" id="products">
        <div class="store-container">
          <div class="section-head">
            <h2 class="section-title">Our Products & Menu</h2>
            <p class="section-subtitle">Handcrafted with care. Tap any item to view or add to your order.</p>
          </div>

          <div class="store-products-toolbar">
            <div class="store-search-box">
              <span class="search-icon">🔍</span>
              <input type="text" id="store-product-search" placeholder="Search by name or category..." oninput="CatalogCraft.filterSearch(this.value)">
            </div>
          </div>

          ${products.length === 0 ? `
            <div class="store-empty-state">
              <div class="empty-icon">🛍️</div>
              <h3>No products added yet</h3>
              <p>Add products in the visual editor to populate your catalogue.</p>
            </div>
          ` : `
            <div class="store-products-grid layout-${layout}" id="store-products-container">
              ${products.map(p => this.renderProductCard(p, cur, state)).join('')}
            </div>
          `}
        </div>
      </section>
    `;
  },

  renderProductCard: function(p, cur, state) {
    const btnShape = state.buttonShape || 'shape-soft';
    const btnEffect = state.buttonEffect || '';

    return `
      <article class="store-product-card" data-id="${p.id}" data-cat="${this.esc(p.c)}" data-name="${this.esc(p.n)}">
        <div class="card-media">
          ${p.x ? `<span class="card-badge">${this.esc(p.x)}</span>` : ''}
          ${p.f ? `<span class="card-featured-star" title="Featured">★</span>` : ''}
          <div class="card-visual">
            ${p.i ? `<img src="${p.i}" alt="${this.esc(p.n)}" loading="lazy">` : `<span class="card-emoji">${this.esc(p.e || '🛍️')}</span>`}
          </div>
        </div>
        <div class="card-content">
          ${p.c ? `<div class="card-cat-label">${this.esc(p.c)}</div>` : ''}
          <h3 class="card-item-title">${this.esc(p.n)}</h3>
          ${p.d ? `<p class="card-desc">${this.esc(p.d)}</p>` : ''}
          ${p.rating ? `<div class="card-rating-stars">⭐⭐⭐⭐⭐ <small>(${p.rating})</small></div>` : ''}
          <div class="card-pricing-bar">
            <div class="price-wrap">
              <span class="price-current">${this.esc(cur)}${this.esc(p.p)}</span>
              ${p.op ? `<span class="price-old">${this.esc(cur)}${this.esc(p.op)}</span>` : ''}
            </div>
          </div>
          <div class="card-btn-action">
            <button type="button" class="craft-btn btn-primary btn-sm btn-block ${btnShape} ${btnEffect}" onclick="CatalogCraft.addToCart('${p.id}')">
              <span>🛒 Add to Cart</span>
            </button>
          </div>
        </div>
      </article>
    `;
  },

  renderFeatures: function(state) {
    if (!state.sections.features?.enabled) return '';
    const feats = state.features || [];
    if (!feats.length) return '';

    return `
      <section class="store-features-section" id="features">
        <div class="store-container">
          <div class="section-head">
            <h2 class="section-title">Why Choose Our Shop</h2>
            <p class="section-subtitle">Our commitment to exceptional craft, quality, and community service.</p>
          </div>
          <div class="store-features-grid">
            ${feats.map(f => `
              <div class="store-feature-card">
                <div class="feature-icon">${this.esc(f.icon || '⭐')}</div>
                <h3 class="feature-title">${this.esc(f.title)}</h3>
                <p class="feature-desc">${this.esc(f.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  },

  renderFaqs: function(state) {
    if (!state.sections.faqs?.enabled) return '';
    const faqs = state.faqs || [];
    if (!faqs.length) return '';

    return `
      <section class="store-faqs-section" id="faqs">
        <div class="store-container">
          <div class="section-head">
            <h2 class="section-title">Frequently Asked Questions</h2>
            <p class="section-subtitle">Everything you need to know about ordering, delivery, and payment.</p>
          </div>
          <div class="store-faqs-accordion">
            ${faqs.map((f, idx) => `
              <details class="store-faq-item" ${idx === 0 ? 'open' : ''}>
                <summary>
                  <span>${this.esc(f.q)}</span>
                  <span class="faq-icon">▼</span>
                </summary>
                <div class="faq-answer">
                  <p>${this.esc(f.a)}</p>
                </div>
              </details>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  },

  renderContact: function(state) {
    if (!state.sections.contact?.enabled) return '';
    const s = state.store;

    return `
      <section class="store-contact-section" id="contact">
        <div class="store-container">
          <div class="section-head">
            <h2 class="section-title">Get in Touch with Us</h2>
            <p class="section-subtitle">Visit our store, send an order inquiry, or reach us on WhatsApp.</p>
          </div>
          <div class="store-contact-grid">
            <div class="store-contact-info">
              <div class="info-item">
                <span class="info-icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <p>${this.esc(s.address || 'High Street Market')}</p>
                </div>
              </div>
              <div class="info-item">
                <span class="info-icon">⏰</span>
                <div>
                  <strong>Store Hours</strong>
                  <p>${this.esc(s.hours || 'Open Daily 9:00 AM - 9:00 PM')}</p>
                </div>
              </div>
              <div class="info-item">
                <span class="info-icon">📞</span>
                <div>
                  <strong>Phone / WhatsApp</strong>
                  <p><a href="tel:${this.esc(s.phone)}">${this.esc(s.phone || 'Contact available')}</a></p>
                </div>
              </div>
              <div class="info-item">
                <span class="info-icon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:${this.esc(s.email)}">${this.esc(s.email || 'hello@store.com')}</a></p>
                </div>
              </div>
            </div>

            <div class="store-inquiry-card">
              <h3>Send an Instant Inquiry</h3>
              <form onsubmit="CatalogCraft.handleInquiry(event)">
                <div class="form-row">
                  <input type="text" id="inq-name" placeholder="Your Name" required class="comp-input">
                </div>
                <div class="form-row">
                  <input type="tel" id="inq-phone" placeholder="Your Phone Number" required class="comp-input">
                </div>
                <div class="form-row">
                  <textarea id="inq-msg" rows="3" placeholder="Which products or services are you interested in?" required class="comp-input"></textarea>
                </div>
                <button type="submit" class="craft-btn btn-primary btn-shape-soft btn-block">
                  <span>Send Message via WhatsApp 💬</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  renderFooter: function(state) {
    if (!state.sections.footer?.enabled) return '';
    const s = state.store;
    const year = new Date().getFullYear();

    return `
      <footer class="store-footer">
        <div class="store-container footer-inner">
          <div class="footer-col">
            <div class="brand-name">${this.esc(s.name)}</div>
            <p>${this.esc(s.tag)}</p>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <a href="#products">Catalog</a>
            <a href="#features">About Us</a>
            <a href="#contact">Contact</a>
          </div>
          <div class="footer-col">
            <h4>Order Directly</h4>
            <p>${this.esc(s.contact)}</p>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="store-container">
            <p>© ${year} ${this.esc(s.name)}. Powered by <a href="#" target="_blank" rel="noopener">CatalogCraft</a>.</p>
          </div>
        </div>
      </footer>
    `;
  },

  renderFab: function(state) {
    if (!state.sections.fab?.enabled) return '';
    const phone = (state.store.phone || '').replace(/[^0-9]/g, '');

    return `
      <div class="store-fab-group">
        <a href="https://wa.me/${phone}" target="_blank" rel="noopener" class="store-fab fab-whatsapp" title="Chat on WhatsApp" aria-label="Chat on WhatsApp">
          💬
        </a>
        <button type="button" class="store-fab fab-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" title="Back to top" aria-label="Back to top">
          ↑
        </button>
      </div>
    `;
  },

  renderCartDrawer: function(state) {
    const cur = state.store.cur || '₹';
    return `
      <div class="store-cart-overlay" id="store-cart-overlay" onclick="CatalogCraft.closeCart(event)">
        <div class="store-cart-drawer" onclick="event.stopPropagation()">
          <div class="cart-drawer-header">
            <h3>Your Shopping Bag</h3>
            <button class="cart-close-btn" onclick="CatalogCraft.closeCart()" aria-label="Close Cart">✕</button>
          </div>
          <div class="cart-drawer-items" id="cart-drawer-items">
            <!-- Dynamic items rendered via JS -->
          </div>
          <div class="cart-drawer-footer">
            <div class="cart-summary-line">
              <span>Total Amount:</span>
              <strong id="cart-total-amount">${cur}0</strong>
            </div>
            <div class="cart-checkout-actions">
              <button class="craft-btn btn-primary btn-shape-soft btn-block" style="background:#25D366;border-color:#25D366;color:#ffffff" onclick="CatalogCraft.checkoutWhatsApp()">
                <span>💬 Checkout via WhatsApp</span>
              </button>
              <button class="craft-btn btn-outline btn-shape-soft btn-block btn-sm" onclick="CatalogCraft.clearCart()">
                <span>Clear Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Full composite render
  renderFullStore: function(state) {
    const { cssVars, styleClass } = this.getThemeStyles(state);

    let overridesCss = '';
    const overrides = (window.FullControl && window.FullControl.elementOverrides) || state.elementOverrides || {};
    Object.keys(overrides).forEach(sel => {
      const rules = overrides[sel];
      if (rules) {
        overridesCss += `${sel} {\n`;
        Object.keys(rules).forEach(prop => {
          if (rules[prop]) overridesCss += `  ${prop}: ${rules[prop]} !important;\n`;
        });
        overridesCss += `}\n`;
      }
    });

    return `
      <div class="store-root ${styleClass}" style="${cssVars}">
        ${overridesCss ? `<style id="fc-injected-overrides">${overridesCss}</style>` : ''}
        ${this.renderAnnouncement(state)}
        ${this.renderHeader(state)}
        ${this.renderHero(state)}
        ${this.renderCategories(state)}
        ${this.renderProducts(state)}
        ${this.renderFeatures(state)}
        ${this.renderFaqs(state)}
        ${this.renderContact(state)}
        ${this.renderFooter(state)}
        ${this.renderFab(state)}
        ${this.renderCartDrawer(state)}
      </div>
    `;
  }
};
