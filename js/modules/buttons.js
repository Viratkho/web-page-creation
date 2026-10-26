// ============================================================================
// DEDICATED COMPREHENSIVE BUTTON LIBRARY & EXPLORER
// ============================================================================

window.BUTTON_LIBRARY = {
  // 1. Basic button styles
  basicStyles: [
    { id: 'btn-primary', name: 'Primary', class: 'btn-primary', desc: 'Main call-to-action with strong brand presence.' },
    { id: 'btn-secondary', name: 'Secondary', class: 'btn-secondary', desc: 'Subtle alternative action for balanced hierarchy.' },
    { id: 'btn-outline', name: 'Outline', class: 'btn-outline', desc: 'Transparent background with clean perimeter stroke.' },
    { id: 'btn-ghost', name: 'Ghost', class: 'btn-ghost', desc: 'Minimal presence until hovered, ideal for toolbars.' },
    { id: 'btn-text', name: 'Text Only', class: 'btn-text', desc: 'Zero border or background, behaves like inline action.' },
    { id: 'btn-link', name: 'Link Style', class: 'btn-link', desc: 'Clean hyperlink aesthetic with hover underline.' },
    { id: 'btn-destructive', name: 'Destructive', class: 'btn-destructive', desc: 'Alert red for cancellations, deletions, and warnings.' },
    { id: 'btn-success', name: 'Success', class: 'btn-success', desc: 'Emerald green for confirmations, payments, and approvals.' },
    { id: 'btn-warning', name: 'Warning', class: 'btn-warning', desc: 'Amber orange for cautionary actions and confirmations.' },
    { id: 'btn-neutral', name: 'Neutral Dark', class: 'btn-neutral', desc: 'Charcoal slate for sophisticated editorial UI.' }
  ],

  // 2. Shape variations
  shapes: [
    { id: 'shape-square', name: 'Sharp Square (0px)', class: 'btn-shape-square', radius: '0px' },
    { id: 'shape-slight', name: 'Slightly Rounded (6px)', class: 'btn-shape-slight', radius: '6px' },
    { id: 'shape-soft', name: 'Soft Rounded (14px)', class: 'btn-shape-soft', radius: '14px' },
    { id: 'shape-pill', name: 'Fully Rounded Pill (999px)', class: 'btn-shape-pill', radius: '999px' },
    { id: 'shape-circle', name: 'Circular Icon (44px)', class: 'btn-shape-circle', radius: '50%' },
    { id: 'shape-asymmetric', name: 'Asymmetric Modern', class: 'btn-shape-asymmetric', radius: '18px 4px 18px 4px' },
    { id: 'shape-leaf', name: 'Organic Leaf Shape', class: 'btn-shape-leaf', radius: '20px 2px 20px 2px' }
  ],

  // 3. Visual effects & animations
  effects: [
    { id: 'fx-gradient', name: 'Gradient Flow', class: 'btn-fx-gradient', desc: 'Multi-stop animated color gradient.' },
    { id: 'fx-gradient-border', name: 'Gradient Border', class: 'btn-fx-gradborder', desc: 'Glowing multi-color border stroke.' },
    { id: 'fx-glass', name: 'Glassmorphism', class: 'btn-fx-glass', desc: 'Translucent frosted panel with backdrop blur.' },
    { id: 'fx-soft-shadow', name: 'Soft Elevation', class: 'btn-fx-softshadow', desc: 'Multi-layer diffused drop shadow.' },
    { id: 'fx-neumorphic', name: 'Neumorphic 3D', class: 'btn-fx-neumorphic', desc: 'Dual light & dark extruded soft bevels.' },
    { id: 'fx-glow', name: 'Ambient Glow', class: 'btn-fx-glow', desc: 'Radiant outer bloom matching primary hue.' },
    { id: 'fx-neon', name: 'Cyber Neon', class: 'btn-fx-neon', desc: 'High-voltage electric outline glow.' },
    { id: 'fx-animated-border', name: 'Animated Beam Border', class: 'btn-fx-anim-border', desc: 'Travelling light stroke around edges.' },
    { id: 'fx-underline-hover', name: 'Expanding Underline', class: 'btn-fx-underline', desc: 'Center-outward sliding border indicator.' },
    { id: 'fx-fill-hover', name: 'Slide Fill on Hover', class: 'btn-fx-fill', desc: 'Solid color curtain sweeps across on hover.' },
    { id: 'fx-sliding-bg', name: 'Sliding Background', class: 'btn-fx-slidebg', desc: 'Angled backdrop slide transition.' },
    { id: 'fx-expanding', name: 'Expanding Width', class: 'btn-fx-expand', desc: 'Expands padding and reveals icon smoothly.' },
    { id: 'fx-3d-press', name: '3D Tactile Press', class: 'btn-fx-3dpress', desc: 'Physical mechanical button press down.' },
    { id: 'fx-ripple', name: 'Ripple Wave', class: 'btn-fx-ripple', desc: 'Fluid expanding wave on user click.' },
    { id: 'fx-icon-reveal', name: 'Icon Reveal Slide', class: 'btn-fx-icon-reveal', desc: 'Right-arrow translates in on hover.' },
    { id: 'fx-shimmer', name: 'Diagonal Shimmer', class: 'btn-fx-shimmer', desc: 'Travelling diagonal light beam sheen.' }
  ],

  // 4. Functional e-commerce & shop variants
  functionalVariants: [
    { id: 'fn-cart', name: 'Add to Cart', icon: '🛒', label: 'Add to Cart', class: 'btn-fn-cart', action: 'cart' },
    { id: 'fn-buynow', name: 'Buy Now (Instant)', icon: '⚡', label: 'Buy Now', class: 'btn-fn-buynow', action: 'checkout' },
    { id: 'fn-whatsapp', name: 'WhatsApp Order', icon: '💬', label: 'Order on WhatsApp', class: 'btn-fn-whatsapp', action: 'whatsapp' },
    { id: 'fn-call', name: 'Call Us Now', icon: '📞', label: 'Call Now', class: 'btn-fn-call', action: 'call' },
    { id: 'fn-view', name: 'Quick View', icon: '👁️', label: 'Quick View', class: 'btn-fn-view', action: 'quickview' },
    { id: 'fn-contact', name: 'Contact Store', icon: '✉️', label: 'Get in Touch', class: 'btn-fn-contact', action: 'contact' },
    { id: 'fn-directions', name: 'Get Directions', icon: '📍', label: 'Find Our Store', class: 'btn-fn-directions', action: 'maps' },
    { id: 'fn-book', name: 'Book Appointment', icon: '📅', label: 'Book Appointment', class: 'btn-fn-book', action: 'book' },
    { id: 'fn-download', name: 'Download PDF Menu', icon: '📥', label: 'Download Catalogue', class: 'btn-fn-download', action: 'download' },
    { id: 'fn-share', name: 'Share Store', icon: '🔗', label: 'Share Website', class: 'btn-fn-share', action: 'share' },
    { id: 'fn-loadmore', name: 'Load More Items', icon: '🔄', label: 'Load More Products', class: 'btn-fn-loadmore', action: 'loadmore' },
    { id: 'fn-submit', name: 'Submit Inquiry', icon: '🚀', label: 'Send Message', class: 'btn-fn-submit', action: 'submit' }
  ],

  // Render a button with configured classes and attributes
  render: function(opts = {}) {
    const {
      text = 'Button Action',
      icon = '',
      iconPos = 'left',
      style = 'btn-primary',
      shape = 'shape-soft',
      effect = '',
      size = 'md', // sm, md, lg
      customClass = '',
      onClick = '',
      id = '',
      type = 'button',
      fullWidth = false,
      disabled = false
    } = opts;

    const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : 'btn-md';
    const shapeObj = this.shapes.find(s => s.id === shape) || this.shapes[1];
    const shapeClass = shapeObj.class;
    const effectClass = effect ? (this.effects.find(e => e.id === effect)?.class || '') : '';
    const fullClass = fullWidth ? 'btn-block' : '';
    const disabledAttr = disabled ? 'disabled' : '';

    const iconHtml = icon ? `<span class="btn-icon">${icon}</span>` : '';
    const content = iconPos === 'right' 
      ? `<span>${text}</span>${iconHtml}`
      : `${iconHtml}<span>${text}</span>`;

    return `<button type="${type}" id="${id}" class="craft-btn ${style} ${shapeClass} ${effectClass} ${sizeClass} ${fullClass} ${customClass}" ${disabledAttr} onclick="${onClick}">
      ${content}
      <span class="btn-ripple-container"></span>
    </button>`;
  },

  // Attach ripple effect listener to any container
  initRipples: function(root) {
    if (!root) return;
    root.querySelectorAll('.craft-btn').forEach(btn => {
      if (btn._hasRipple) return;
      btn._hasRipple = true;
      btn.addEventListener('click', function(e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple-wave';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }
};
