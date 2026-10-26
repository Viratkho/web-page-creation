// ============================================================================
// COMPONENT REGISTRY & REUSABLE UI SYSTEM
// ============================================================================

window.COMPONENT_REGISTRY = [
  // --------------------------------------------------------------------------
  // 1. NAVIGATION COMPONENTS
  // --------------------------------------------------------------------------
  {
    id: 'nav-header-modern',
    name: 'Modern Clean Header',
    category: 'nav',
    desc: 'Full-width header with brand logo, nav links, search bar, and cart badge icon.',
    variants: ['Default White', 'Dark Minimal', 'Border Bottom', 'Shadow Floating'],
    previewHtml: `
      <header class="comp-nav-preview">
        <div class="comp-nav-inner">
          <div class="comp-nav-logo"><strong>ModernShop</strong></div>
          <nav class="comp-nav-links">
            <a href="javascript:void(0)" class="active">Home</a>
            <a href="javascript:void(0)">Catalog</a>
            <a href="javascript:void(0)">About</a>
            <a href="javascript:void(0)">Contact</a>
          </nav>
          <div class="comp-nav-actions">
            <button class="comp-icon-btn" title="Search">🔍</button>
            <button class="comp-icon-btn cart-badge-wrap" title="Cart">🛒<span class="comp-badge">3</span></button>
          </div>
        </div>
      </header>
    `
  },
  {
    id: 'nav-header-glass',
    name: 'Sticky Glassmorphism Header',
    category: 'nav',
    desc: 'Translucent frosted header that blurs content behind it with 16px backdrop blur.',
    variants: ['Frosted Glass', 'Ultra Dark Glass', 'Neon Border'],
    previewHtml: `
      <header class="comp-nav-glass-preview">
        <div class="comp-nav-inner">
          <div class="comp-nav-logo">✨ <strong>AuraLuxe</strong></div>
          <nav class="comp-nav-links">
            <a href="javascript:void(0)">Trending</a>
            <a href="javascript:void(0)">Curated</a>
            <a href="javascript:void(0)">Story</a>
          </nav>
          <div class="comp-nav-actions">
            <button class="craft-btn btn-primary btn-shape-pill btn-sm">Sign In</button>
          </div>
        </div>
      </header>
    `
  },
  {
    id: 'nav-announcement',
    name: 'Announcement & Promo Bar',
    category: 'nav',
    desc: 'Top-of-page alert banner with promo coupon, countdown badge, and dismiss button.',
    variants: ['Gradient Banner', 'Flash Sale Red', 'Minimal Dark', 'Pastel Info'],
    previewHtml: `
      <div class="comp-announcement-preview">
        <span>🎉 <strong>FESTIVE SALE:</strong> Use code <code class="comp-code">CRAFT20</code> for extra 20% off all orders!</span>
        <button class="comp-close-btn" title="Dismiss">✕</button>
      </div>
    `
  },
  {
    id: 'nav-bottom-mobile',
    name: 'Mobile App Bottom Nav',
    category: 'nav',
    desc: 'Fixed bottom thumb-friendly navigation bar designed specifically for mobile shoppers.',
    variants: ['5-Item Standard', 'Floating Pill', 'Center Plus Button'],
    previewHtml: `
      <div class="comp-bottom-nav-preview">
        <a href="javascript:void(0)" class="active"><span>🏠</span><small>Home</small></a>
        <a href="javascript:void(0)"><span>🔍</span><small>Explore</small></a>
        <a href="javascript:void(0)" class="cart-badge-wrap"><span>🛒</span><small>Cart</small><span class="comp-badge">2</span></a>
        <a href="javascript:void(0)"><span>❤️</span><small>Wishlist</small></a>
        <a href="javascript:void(0)"><span>👤</span><small>Profile</small></a>
      </div>
    `
  },
  {
    id: 'nav-tabs-pill',
    name: 'Sliding Category Filter Tabs',
    category: 'nav',
    desc: 'Smooth interactive filter tabs with counter badges and horizontal scroll.',
    variants: ['Pills with Counts', 'Underline Indicator', 'Segmented Control'],
    previewHtml: `
      <div class="comp-tabs-preview">
        <button class="comp-tab active">All Items <span class="tab-count">36</span></button>
        <button class="comp-tab">Best Sellers <span class="tab-count">12</span></button>
        <button class="comp-tab">New In <span class="tab-count">8</span></button>
        <button class="comp-tab">Sale <span class="tab-count">16</span></button>
      </div>
    `
  },

  // --------------------------------------------------------------------------
  // 2. CARDS & PRODUCT DISPLAYS
  // --------------------------------------------------------------------------
  {
    id: 'card-product-modern',
    name: 'Modern E-Commerce Card',
    category: 'cards',
    desc: 'High-converting product card with badge, rating, wishlist button, and quick-add action.',
    variants: ['Standard Grid', 'Bordered Outline', 'Soft Elevation', 'Minimal Clean'],
    previewHtml: `
      <div class="comp-product-card-preview">
        <div class="card-img-wrap">
          <span class="card-badge-top">HOT DEAL</span>
          <button class="card-wishlist-btn" title="Add to Wishlist">🤍</button>
          <div class="card-emoji-hero">🥐</div>
        </div>
        <div class="card-info">
          <div class="card-category">Pastries & Bakery</div>
          <h4 class="card-title">Pure Butter Croissant</h4>
          <div class="card-rating">⭐⭐⭐⭐⭐ <small>(4.9)</small></div>
          <div class="card-price-row">
            <span class="card-price">₹120</span>
            <span class="card-old-price">₹150</span>
          </div>
          <button class="craft-btn btn-primary btn-shape-soft btn-sm btn-block">🛒 Add to Cart</button>
        </div>
      </div>
    `
  },
  {
    id: 'card-horizontal-strip',
    name: 'Horizontal Menu / List Card',
    category: 'cards',
    desc: 'Horizontal card ideal for restaurant menus, digital downloads, or service lists.',
    variants: ['Compact Menu', 'Service Detailed', 'Dashed Divider'],
    previewHtml: `
      <div class="comp-card-horizontal-preview">
        <div class="card-thumb">🍕</div>
        <div class="card-body-flex">
          <div class="card-head-row">
            <h4>Truffle Funghi Pizza</h4>
            <span class="card-price">₹480</span>
          </div>
          <p>Wild mushrooms, fresh buffalo mozzarella, aromatic white truffle oil, and fresh thyme.</p>
          <div class="card-footer-tags">
            <span class="comp-mini-tag">VEG</span>
            <span class="comp-mini-tag">CHEF SPECIAL</span>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'card-glass-frost',
    name: 'Frosted Glass Product Card',
    category: 'cards',
    desc: 'Translucent glass card with delicate border glow and blurred underlying background.',
    variants: ['Dark Frost', 'Light Frost', 'Iridescent Shimmer'],
    previewHtml: `
      <div class="comp-glass-card-preview">
        <div class="glass-icon-circle">🎧</div>
        <h3>Apex ANC Headphones</h3>
        <p>Titanium drivers with 65h battery life and active spatial audio.</p>
        <div class="glass-price-row">
          <span class="card-price">₹3,999</span>
          <button class="craft-btn btn-outline btn-shape-pill btn-sm">Buy Now</button>
        </div>
      </div>
    `
  },
  {
    id: 'card-pricing-tier',
    name: 'Pricing / Service Tier Card',
    category: 'cards',
    desc: 'Structured comparison card with feature checklist, highlighted popular banner, and CTA.',
    variants: ['Recommended Highlight', 'Standard Flat', 'Dark Tech'],
    previewHtml: `
      <div class="comp-pricing-card-preview featured">
        <span class="comp-pricing-badge">MOST POPULAR</span>
        <h3>Pro Store Plan</h3>
        <div class="comp-pricing-val"><span class="cur">₹</span>1,499<small>/month</small></div>
        <ul class="comp-pricing-list">
          <li>✓ Unlimited Products & Categories</li>
          <li>✓ 0% Transaction Fees</li>
          <li>✓ WhatsApp Instant Ordering</li>
          <li>✓ Custom Domain & QR Code</li>
        </ul>
        <button class="craft-btn btn-primary btn-shape-soft btn-block">Get Started</button>
      </div>
    `
  },
  {
    id: 'card-testimonial',
    name: 'Customer Review & Testimonial Card',
    category: 'cards',
    desc: 'Trust-building testimonial card with verified buyer badge, 5-star rating, and avatar.',
    variants: ['Minimal Quote', 'Verified Buyer', 'Star Header'],
    previewHtml: `
      <div class="comp-testimonial-preview">
        <div class="testi-stars">⭐⭐⭐⭐⭐</div>
        <p>"The sourdough bread arrived still warm and with the most incredible crust! Ordering on WhatsApp took literally 20 seconds. Absolutely hooked!"</p>
        <div class="testi-author">
          <div class="testi-avatar">👩‍💼</div>
          <div>
            <strong>Priya Sharma</strong>
            <small>Verified Customer • Mumbai</small>
          </div>
        </div>
      </div>
    `
  },

  // --------------------------------------------------------------------------
  // 3. FORMS & INPUT CONTROLS
  // --------------------------------------------------------------------------
  {
    id: 'form-search-instant',
    name: 'Instant Product Search Input',
    category: 'forms',
    desc: 'Search input with icon, clear button, and shortcut badge indicator.',
    variants: ['Rounded Pill', 'Minimal Border', 'Filled Slate'],
    previewHtml: `
      <div class="comp-search-preview">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Search bakery, cakes, artisan loaves..." class="comp-input" readonly>
        <span class="comp-kbd">⌘K</span>
      </div>
    `
  },
  {
    id: 'form-quantity-stepper',
    name: 'Cart Quantity Stepper',
    category: 'forms',
    desc: 'Tactile decrement / increment stepper with animated count value.',
    variants: ['Pill Stepper', 'Boxed Stepper', 'Minimal Ghost'],
    previewHtml: `
      <div class="comp-stepper-preview">
        <button class="stepper-btn">−</button>
        <span class="stepper-val">2</span>
        <button class="stepper-btn">+</button>
      </div>
    `
  },
  {
    id: 'form-newsletter',
    name: 'Newsletter Subscription Form',
    category: 'forms',
    desc: 'High-converting inline email subscription box with submit button and privacy notice.',
    variants: ['Inline Box', 'Stacked Floating', 'Dark Mode Accent'],
    previewHtml: `
      <div class="comp-newsletter-preview">
        <input type="email" placeholder="Enter your email address..." class="comp-input" readonly>
        <button class="craft-btn btn-primary btn-shape-soft">Subscribe</button>
      </div>
    `
  },
  {
    id: 'form-checkout-whatsapp',
    name: 'WhatsApp Quick-Order Card',
    category: 'forms',
    desc: 'Direct checkout form collecting customer name, address, and delivery notes.',
    variants: ['Clean Card', 'Popup Modal', 'Slide-over Drawer'],
    previewHtml: `
      <div class="comp-form-whatsapp-preview">
        <label>Your Name</label>
        <input type="text" placeholder="e.g. Rahul Verma" class="comp-input" readonly>
        <label>Delivery Address</label>
        <input type="text" placeholder="House no, Street, Landmark" class="comp-input" readonly>
        <button class="craft-btn btn-primary btn-shape-soft btn-block" style="background:#25D366;color:#fff;border-color:#25D366">
          💬 Send Order via WhatsApp
        </button>
      </div>
    `
  },

  // --------------------------------------------------------------------------
  // 4. FEEDBACK & OVERLAYS
  // --------------------------------------------------------------------------
  {
    id: 'feedback-toast',
    name: 'Interactive Toast Notification',
    category: 'feedback',
    desc: 'Non-intrusive floating alert for cart updates, order confirmations, and copies.',
    variants: ['Success Green', 'Info Blue', 'Warning Amber', 'Cart Item Added'],
    previewHtml: `
      <div class="comp-toast-preview">
        <span class="toast-icon">✅</span>
        <div class="toast-text">
          <strong>Added to Cart!</strong>
          <small>Butter Croissant (x1) was added to your bag.</small>
        </div>
        <button class="comp-close-btn">✕</button>
      </div>
    `
  },
  {
    id: 'feedback-cart-drawer',
    name: 'Slide-Over Shopping Cart Drawer',
    category: 'feedback',
    desc: 'Interactive cart overlay showing selected items, quantities, subtotal, and checkout.',
    variants: ['Right Slide-over', 'Bottom Sheet', 'Centered Modal'],
    previewHtml: `
      <div class="comp-cart-preview">
        <div class="cart-head">
          <h4>Your Shopping Bag (2)</h4>
          <span class="cart-close">✕</span>
        </div>
        <div class="cart-item">
          <span>🥐 Butter Croissant (x2)</span>
          <strong>₹240</strong>
        </div>
        <div class="cart-item">
          <span>🍞 Sourdough Boule (x1)</span>
          <strong>₹260</strong>
        </div>
        <div class="cart-foot">
          <div class="cart-subtotal"><span>Subtotal:</span> <strong>₹500</strong></div>
          <button class="craft-btn btn-primary btn-shape-soft btn-block">Order via WhatsApp</button>
        </div>
      </div>
    `
  },
  {
    id: 'feedback-skeleton',
    name: 'Skeleton Loader Placeholders',
    category: 'feedback',
    desc: 'Smooth animated shimmer loading placeholders that prevent layout shifts.',
    variants: ['Card Skeleton', 'Text Lines', 'Avatar & Title'],
    previewHtml: `
      <div class="comp-skeleton-preview">
        <div class="skeleton-img"></div>
        <div class="skeleton-line line-70"></div>
        <div class="skeleton-line line-40"></div>
      </div>
    `
  },

  // --------------------------------------------------------------------------
  // 5. INTERACTIVE & LAYOUT SECTIONS
  // --------------------------------------------------------------------------
  {
    id: 'section-faq-accordion',
    name: 'FAQ Collapsible Accordion',
    category: 'interactive',
    desc: 'Smooth CSS-animated question and answer accordion for store policies and questions.',
    variants: ['Bordered Cards', 'Minimal Line Separator', 'Elevated Tiles'],
    previewHtml: `
      <div class="comp-accordion-preview">
        <details class="comp-details" open>
          <summary>How do I place an order? <span class="arrow">▼</span></summary>
          <p>Browse our catalog, click "Add to Cart", and click "Order via WhatsApp" to instantly submit your request.</p>
        </details>
        <details class="comp-details">
          <summary>What are your store hours? <span class="arrow">▼</span></summary>
          <p>We are open Monday to Saturday from 9 AM to 9 PM, and Sunday from 10 AM to 6 PM.</p>
        </details>
      </div>
    `
  },
  {
    id: 'section-countdown-banner',
    name: 'Urgency Countdown Timer Banner',
    category: 'interactive',
    desc: 'Live countdown timer tiles that drive urgent sales conversions.',
    variants: ['Dark Digital', 'Bright Red Flash', 'Clean Minimal'],
    previewHtml: `
      <div class="comp-countdown-preview">
        <div class="count-tile"><strong>04</strong><small>Days</small></div>
        <div class="count-tile"><strong>18</strong><small>Hours</small></div>
        <div class="count-tile"><strong>42</strong><small>Mins</small></div>
        <div class="count-tile"><strong>15</strong><small>Secs</small></div>
      </div>
    `
  },
  {
    id: 'section-floating-action',
    name: 'Floating Action Buttons (FAB)',
    category: 'interactive',
    desc: 'Fixed bottom-right action buttons for direct WhatsApp chat and Back-to-Top scroll.',
    variants: ['WhatsApp Chat + Back to Top', 'Single Pulse WhatsApp', 'Minimal Icon'],
    previewHtml: `
      <div class="comp-fab-preview">
        <div class="fab-circle fab-whatsapp" title="Chat on WhatsApp">💬</div>
        <div class="fab-circle fab-top" title="Back to Top">↑</div>
      </div>
    `
  }
];
