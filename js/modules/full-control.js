// ============================================================================
// FULL CONTROL CUSTOMIZATION STUDIO - COMPLETE CONTROLLER
// ============================================================================

window.FullControl = {
  isOpen: false,
  selectedElement: null,
  selectedElementId: null,
  activeTab: 'layers', // 'layers', 'insert', 'sections'
  zoomLevel: 100, // percentage
  viewport: 'desktop', // 'desktop', 'tablet', 'mobile'
  snapGrid: true,
  gridSize: 8,
  checkpoints: [],
  elementOverrides: {}, // Keyed by element data-id or selector

  // Open Full Control Customization Mode
  openStudio: function() {
    this.isOpen = true;
    let root = document.getElementById('full-control-studio-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'full-control-studio-root';
      root.className = 'fc-studio-root';
      document.body.appendChild(root);
    }
    root.style.display = 'flex';
    this.renderStudio();
    this.refreshCanvas();
    this.buildLayerTree();
  },

  // Close Studio and return to standard builder
  closeStudio: function() {
    this.isOpen = false;
    const root = document.getElementById('full-control-studio-root');
    if (root) root.style.display = 'none';
    if (window.App) window.App.renderAll();
  },

  // Render the entire 3-panel visual workspace
  renderStudio: function() {
    const root = document.getElementById('full-control-studio-root');
    if (!root) return;

    root.innerHTML = `
      <!-- 1. Top Control Bar -->
      <header class="fc-top-bar">
        <div class="fc-bar-group">
          <div class="fc-mode-pill">
            <button class="fc-mode-btn" onclick="FullControl.closeStudio()">🎨 Standard Editor</button>
            <button class="fc-mode-btn active">⚡ Full Control Studio</button>
          </div>
          <div class="fc-tool-divider"></div>
          <button class="fc-btn" onclick="App.undo()" title="Undo (Ctrl+Z)">↶</button>
          <button class="fc-btn" onclick="App.redo()" title="Redo (Ctrl+Y)">↷</button>
          <div class="fc-tool-divider"></div>
          <button class="fc-btn ${this.snapGrid ? 'active' : ''}" id="fc-btn-snap" onclick="FullControl.toggleSnap()" title="Snap to 8px Grid">
            🧲 Snap: 8px
          </button>
          <button class="fc-btn" onclick="FullControl.saveCheckpoint()" title="Save Checkpoint">
            🚩 Save Checkpoint
          </button>
        </div>

        <!-- Center Viewport & Zoom Controls -->
        <div class="fc-bar-group">
          <div class="device-switcher" style="margin:0">
            <button class="device-btn ${this.viewport === 'desktop' ? 'active' : ''}" onclick="FullControl.setViewport('desktop')">🖥️ Desktop</button>
            <button class="device-btn ${this.viewport === 'tablet' ? 'active' : ''}" onclick="FullControl.setViewport('tablet')">📱 Tablet</button>
            <button class="device-btn ${this.viewport === 'mobile' ? 'active' : ''}" onclick="FullControl.setViewport('mobile')">📱 Mobile</button>
          </div>
          <div class="fc-tool-divider"></div>
          <button class="fc-btn" onclick="FullControl.adjustZoom(-10)">−</button>
          <span style="font-size:12px;font-weight:700;width:42px;text-align:center" id="fc-zoom-val">${this.zoomLevel}%</span>
          <button class="fc-btn" onclick="FullControl.adjustZoom(10)">+</button>
          <button class="fc-btn" onclick="FullControl.resetZoom()">Reset</button>
        </div>

        <!-- Right Quick Actions -->
        <div class="fc-bar-group">
          <button class="fc-btn" onclick="ColorStudio.open()">🎨 Color Studio</button>
          <button class="fc-btn" onclick="BackgroundStudio.open()">🖼️ Backgrounds</button>
          <div class="fc-tool-divider"></div>
          <button class="fc-btn fc-btn-primary" onclick="App.exportHtml()">📥 Export HTML</button>
          <button class="fc-btn" onclick="FullControl.closeStudio()">✕ Exit</button>
        </div>
      </header>

      <!-- 2. Main 3-Panel Workspace -->
      <main class="fc-main-workspace" id="fc-main-workspace">
        <!-- Left Panel: Layers & Elements -->
        <aside class="fc-left-panel">
          <div class="fc-panel-header">
            <span>EXPLORER & LAYERS</span>
            <div style="display:flex;gap:4px">
              <button class="fc-layer-btn" onclick="FullControl.buildLayerTree()" title="Refresh Layers">🔄</button>
              <button class="fc-layer-btn" onclick="FullControl.togglePanel('left')" title="Collapse Panel">◀</button>
            </div>
          </div>
          <nav class="fc-panel-tabs">
            <button class="fc-panel-tab ${this.activeTab === 'layers' ? 'active' : ''}" onclick="FullControl.setTab('layers')">Layers</button>
            <button class="fc-panel-tab ${this.activeTab === 'insert' ? 'active' : ''}" onclick="FullControl.setTab('insert')">+ Add Elements</button>
            <button class="fc-panel-tab ${this.activeTab === 'checkpoints' ? 'active' : ''}" onclick="FullControl.setTab('checkpoints')">Checkpoints</button>
          </nav>
          <div class="fc-left-body" id="fc-left-body">
            <!-- Rendered dynamically -->
          </div>
        </aside>

        <!-- Center Canvas -->
        <section class="fc-canvas-center" id="fc-canvas-center">
          <div class="fc-canvas-wrapper fc-view-${this.viewport}" id="fc-canvas-wrapper" style="transform: scale(${this.zoomLevel / 100})">
            <div class="fc-grid-overlay ${this.snapGrid ? 'active' : ''}" id="fc-grid-overlay"></div>
            <div id="fc-canvas-inner">
              <!-- Live Storefront rendered here -->
            </div>
          </div>
        </section>

        <!-- Right Panel: Properties Inspector -->
        <aside class="fc-right-panel" id="fc-right-panel">
          <div class="fc-panel-header">
            <span id="fc-inspector-header-title">INSPECTOR</span>
            <button class="fc-layer-btn" onclick="FullControl.togglePanel('right')" title="Collapse Panel">▶</button>
          </div>
          <div class="fc-right-body" id="fc-right-body">
            <div style="padding:40px 10px;text-align:center;color:var(--ed-muted)">
              <div style="font-size:32px;margin-bottom:10px">👆</div>
              <p>Select any element or section on the canvas to inspect and edit its layout, dimensions, colors, and typography.</p>
            </div>
          </div>
        </aside>
      </main>

      <!-- 3. Bottom Status Bar -->
      <footer class="fc-bottom-bar">
        <div class="fc-breadcrumbs" id="fc-breadcrumbs">
          <span>Root</span> <span>&gt;</span> <span class="fc-crumb">Storefront Canvas</span>
        </div>
        <div style="display:flex;gap:16px">
          <span id="fc-status-dims">Dimensions: 1180 × Auto</span>
          <span id="fc-status-pos">Position: Normal Flow</span>
          <span id="fc-status-snap">Snapping: ${this.snapGrid ? '8px (ON)' : 'OFF'}</span>
          <span style="color:var(--ed-success)">● Autosave Active</span>
        </div>
      </footer>

      <!-- Live Dimension Dragging Tooltip -->
      <div class="fc-dimension-tooltip" id="fc-dim-tooltip"></div>
    `;

    this.renderLeftBody();
    this.initCanvasEvents();
  },

  // Toggle Left / Right Panel Collapse
  togglePanel: function(side) {
    const ws = document.getElementById('fc-main-workspace');
    if (!ws) return;
    if (side === 'left') {
      ws.classList.toggle('left-collapsed');
    } else {
      ws.classList.toggle('right-collapsed');
    }
  },

  // Zoom controls
  adjustZoom: function(delta) {
    this.zoomLevel = Math.max(50, Math.min(150, this.zoomLevel + delta));
    const wrapper = document.getElementById('fc-canvas-wrapper');
    const valEl = document.getElementById('fc-zoom-val');
    if (wrapper) wrapper.style.transform = `scale(${this.zoomLevel / 100})`;
    if (valEl) valEl.textContent = `${this.zoomLevel}%`;
  },

  resetZoom: function() {
    this.zoomLevel = 100;
    this.adjustZoom(0);
  },

  // Set Viewport Breakpoint
  setViewport: function(vp) {
    this.viewport = vp;
    const wrapper = document.getElementById('fc-canvas-wrapper');
    if (wrapper) {
      wrapper.className = `fc-canvas-wrapper fc-view-${vp}`;
    }
    document.querySelectorAll('.fc-top-bar .device-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.toLowerCase().includes(vp));
    });
    this.updateSelectionHandles();
  },

  // Toggle 8px Grid Snapping
  toggleSnap: function() {
    this.snapGrid = !this.snapGrid;
    const btn = document.getElementById('fc-btn-snap');
    const overlay = document.getElementById('fc-grid-overlay');
    const status = document.getElementById('fc-status-snap');
    if (btn) btn.classList.toggle('active', this.snapGrid);
    if (overlay) overlay.classList.toggle('active', this.snapGrid);
    if (status) status.textContent = `Snapping: ${this.snapGrid ? '8px (ON)' : 'OFF'}`;
  },

  // Switch Left Panel Tab
  setTab: function(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.fc-panel-tab').forEach(t => {
      t.classList.toggle('active', t.textContent.toLowerCase().includes(tabId));
    });
    this.renderLeftBody();
  },

  // Render content of left panel
  renderLeftBody: function() {
    const body = document.getElementById('fc-left-body');
    if (!body) return;

    if (this.activeTab === 'layers') {
      this.buildLayerTree();
    } else if (this.activeTab === 'insert') {
      body.innerHTML = `
        <div class="fc-insert-grid">
          <div class="fc-insert-card" onclick="FullControl.insertElement('h1')">
            <span class="fc-insert-icon">H1</span>
            <span class="fc-insert-label">Heading 1</span>
          </div>
          <div class="fc-insert-card" onclick="FullControl.insertElement('h2')">
            <span class="fc-insert-icon">H2</span>
            <span class="fc-insert-label">Heading 2</span>
          </div>
          <div class="fc-insert-card" onclick="FullControl.insertElement('p')">
            <span class="fc-insert-icon">¶</span>
            <span class="fc-insert-label">Paragraph</span>
          </div>
          <div class="fc-insert-card" onclick="FullControl.insertElement('btn')">
            <span class="fc-insert-icon">🔘</span>
            <span class="fc-insert-label">Action Button</span>
          </div>
          <div class="fc-insert-card" onclick="FullControl.insertElement('box')">
            <span class="fc-insert-icon">📦</span>
            <span class="fc-insert-label">Container Box</span>
          </div>
          <div class="fc-insert-card" onclick="FullControl.insertElement('grid2')">
            <span class="fc-insert-icon">⚏</span>
            <span class="fc-insert-label">2-Column Grid</span>
          </div>
          <div class="fc-insert-card" onclick="FullControl.insertElement('card')">
            <span class="fc-insert-icon">🎴</span>
            <span class="fc-insert-label">Product Card</span>
          </div>
          <div class="fc-insert-card" onclick="FullControl.insertElement('faq')">
            <span class="fc-insert-icon">❓</span>
            <span class="fc-insert-label">FAQ Accordion</span>
          </div>
          <div class="fc-insert-card" onclick="FullControl.insertElement('divider')">
            <span class="fc-insert-icon">―</span>
            <span class="fc-insert-label">Divider Line</span>
          </div>
          <div class="fc-insert-card" onclick="FullControl.insertElement('spacer')">
            <span class="fc-insert-icon">↕️</span>
            <span class="fc-insert-label">Spacer Gap</span>
          </div>
        </div>
      `;
    } else if (this.activeTab === 'checkpoints') {
      body.innerHTML = `
        <button class="fc-btn fc-btn-primary" style="width:100%;margin-bottom:12px" onclick="FullControl.saveCheckpoint()">
          + Save Current State Checkpoint
        </button>
        <div style="display:flex;flex-direction:column;gap:8px" id="fc-checkpoints-list">
          ${this.checkpoints.length === 0 ? '<p style="font-size:12px;color:var(--ed-muted);text-align:center">No checkpoints saved yet.</p>' : ''}
          ${this.checkpoints.map((cp, idx) => `
            <div style="padding:10px;background:var(--ed-bg);border:1px solid var(--ed-border);border-radius:6px;display:flex;justify-content:space-between;align-items:center">
              <div>
                <strong style="font-size:12px;display:block">${cp.name}</strong>
                <small style="color:var(--ed-muted)">${cp.time}</small>
              </div>
              <button class="fc-btn" style="padding:4px 8px;font-size:11px" onclick="FullControl.restoreCheckpoint(${idx})">Restore</button>
            </div>
          `).join('')}
        </div>
      `;
    }
  },

  // Build the hierarchical Layer Tree from live canvas
  buildLayerTree: function() {
    const body = document.getElementById('fc-left-body');
    if (!body || this.activeTab !== 'layers') return;

    const sections = [
      { id: 'sec-announcement', name: 'Announcement Bar', selector: '.store-announcement', icon: '📢' },
      { id: 'sec-header', name: 'Header & Navigation', selector: '.store-header', icon: '🧭' },
      { id: 'sec-hero', name: 'Hero Welcome Banner', selector: '.store-hero', icon: '✨' },
      { id: 'sec-categories', name: 'Category Filter Chips', selector: '.store-categories-bar', icon: '🏷️' },
      { id: 'sec-products', name: 'Products Catalog Grid', selector: '.store-products-section', icon: '🛍️' },
      { id: 'sec-features', name: 'Why Choose Us', selector: '.store-features-section', icon: '⭐' },
      { id: 'sec-faqs', name: 'FAQ Accordion', selector: '.store-faqs-section', icon: '❓' },
      { id: 'sec-contact', name: 'Contact & Inquiry', selector: '.store-contact-section', icon: '📍' },
      { id: 'sec-footer', name: 'Storefront Footer', selector: '.store-footer', icon: '📄' }
    ];

    body.innerHTML = `
      <div class="fc-layer-tree">
        ${sections.map(sec => {
          const el = document.querySelector(`#fc-canvas-inner ${sec.selector}`);
          if (!el) return '';
          const isSelected = this.selectedElement === el;
          return `
            <div class="fc-layer-item ${isSelected ? 'selected' : ''}" onclick="FullControl.selectElementBySelector('${sec.selector}')">
              <span class="fc-layer-title">
                <span>${sec.icon}</span>
                <span>${sec.name}</span>
              </span>
              <div class="fc-layer-actions">
                <button class="fc-layer-btn" onclick="event.stopPropagation(); FullControl.toggleVisibility('${sec.selector}')" title="Hide/Show">👁️</button>
                <button class="fc-layer-btn" onclick="event.stopPropagation(); FullControl.duplicateSection('${sec.selector}')" title="Duplicate">📋</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  // Refresh live storefront inside canvas
  refreshCanvas: function() {
    const canvasInner = document.getElementById('fc-canvas-inner');
    if (!canvasInner) return;

    if (window.StoreRenderer && window.App) {
      canvasInner.innerHTML = window.StoreRenderer.renderFullStore(window.App.getState ? window.App.getState() : (window.STATE || {}));
    }

    // Apply any saved custom element style overrides
    Object.keys(this.elementOverrides).forEach(selector => {
      const el = canvasInner.querySelector(selector);
      if (el) {
        Object.assign(el.style, this.elementOverrides[selector]);
      }
    });

    // Make canvas elements selectable & interactive
    this.attachSelectableHooks();
  },

  // Attach click-to-select and double-click inline text edit listeners
  attachSelectableHooks: function() {
    const canvas = document.getElementById('fc-canvas-inner');
    if (!canvas) return;

    const targets = canvas.querySelectorAll('h1, h2, h3, h4, p, button, a, .store-product-card, .store-feature-card, .store-faq-item, .store-hero, .store-header, .store-footer, section');
    targets.forEach(el => {
      el.classList.add('fc-selectable');

      // Click to select
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.selectElement(el);
      });

      // Double-click for inline content editable
      el.addEventListener('dblclick', (e) => {
        if (['H1','H2','H3','H4','P','SPAN','A','BUTTON'].includes(el.tagName)) {
          e.stopPropagation();
          el.contentEditable = 'true';
          el.focus();
          el.onblur = () => {
            el.contentEditable = 'false';
            if (window.App) window.App.snap();
          };
        }
      });
    });
  },

  // Select an element on the canvas
  selectElement: function(el) {
    if (this.selectedElement) {
      this.selectedElement.classList.remove('fc-active-selection');
      this.removeResizeHandles();
    }

    this.selectedElement = el;
    el.classList.add('fc-active-selection');

    // Attach 8 resize handles
    this.attachResizeHandles(el);

    // Update status bar breadcrumbs & dimensions
    this.updateStatusBar(el);

    // Render detailed properties in right inspector
    this.renderInspector(el);

    // Synchronize left layers tree
    this.buildLayerTree();
  },

  selectElementBySelector: function(selector) {
    const el = document.querySelector(`#fc-canvas-inner ${selector}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.selectElement(el);
    }
  },

  // Attach 8 resize handles to active selection
  attachResizeHandles: function(el) {
    this.removeResizeHandles();

    const handles = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
    handles.forEach(pos => {
      const h = document.createElement('div');
      h.className = `fc-resize-handle handle-${pos}`;
      h.dataset.handle = pos;
      h.addEventListener('mousedown', (e) => this.startResize(e, el, pos));
      el.appendChild(h);
    });

    // Add element type tag badge
    const tag = document.createElement('div');
    tag.className = 'fc-selection-tag';
    tag.id = 'fc-active-tag';
    const rect = el.getBoundingClientRect();
    tag.textContent = `<${el.tagName.toLowerCase()}> ${Math.round(rect.width)} × ${Math.round(rect.height)}px`;
    el.appendChild(tag);
  },

  removeResizeHandles: function() {
    document.querySelectorAll('.fc-resize-handle, #fc-active-tag').forEach(n => n.remove());
  },

  updateSelectionHandles: function() {
    if (this.selectedElement) {
      this.attachResizeHandles(this.selectedElement);
      this.updateStatusBar(this.selectedElement);
    }
  },

  // Interactive Resizing Engine with Snapping and Aspect Ratio Locking
  startResize: function(e, el, handle) {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startRect = el.getBoundingClientRect();
    const startW = startRect.width;
    const startH = startRect.height;
    const aspectRatio = startW / startH;
    const tooltip = document.getElementById('fc-dim-tooltip');
    const self = this;

    function onMouseMove(ev) {
      let deltaX = ev.clientX - startX;
      let deltaY = ev.clientY - startY;

      let newW = startW;
      let newH = startH;

      if (handle.includes('e')) newW = startW + deltaX;
      if (handle.includes('w')) newW = startW - deltaX;
      if (handle.includes('s')) newH = startH + deltaY;
      if (handle.includes('n')) newH = startH - deltaY;

      // Lock Aspect Ratio if Shift key is pressed
      if (ev.shiftKey) {
        newH = newW / aspectRatio;
      }

      // Snap to 8px grid
      if (self.snapGrid) {
        newW = Math.round(newW / self.gridSize) * self.gridSize;
        newH = Math.round(newH / self.gridSize) * self.gridSize;
      }

      newW = Math.max(20, newW);
      newH = Math.max(20, newH);

      el.style.width = `${Math.round(newW)}px`;
      if (!['P', 'H1', 'H2', 'H3', 'H4'].includes(el.tagName)) {
        el.style.height = `${Math.round(newH)}px`;
      }

      // Show live dimension tooltip
      if (tooltip) {
        tooltip.style.display = 'block';
        tooltip.style.left = `${ev.clientX + 14}px`;
        tooltip.style.top = `${ev.clientY + 14}px`;
        tooltip.textContent = `W: ${Math.round(newW)}px  H: ${Math.round(newH)}px`;
      }

      const tag = document.getElementById('fc-active-tag');
      if (tag) tag.textContent = `<${el.tagName.toLowerCase()}> ${Math.round(newW)} × ${Math.round(newH)}px`;
      self.updateStatusBar(el);
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (tooltip) tooltip.style.display = 'none';
      self.recordElementOverride(el);
      if (window.App) window.App.snap();
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  },

  // Save specific CSS property to element and overrides registry
  setElementStyle: function(property, value) {
    if (!this.selectedElement) return;
    this.selectedElement.style[property] = value;
    this.recordElementOverride(this.selectedElement);
    this.updateSelectionHandles();
    if (window.App) window.App.snap();
  },

  recordElementOverride: function(el) {
    const selector = this.getElementUniqueSelector(el);
    if (!this.elementOverrides[selector]) this.elementOverrides[selector] = {};
    this.elementOverrides[selector].width = el.style.width;
    this.elementOverrides[selector].height = el.style.height;
    this.elementOverrides[selector].background = el.style.background;
    this.elementOverrides[selector].color = el.style.color;
    this.elementOverrides[selector].fontSize = el.style.fontSize;
    this.elementOverrides[selector].borderRadius = el.style.borderRadius;
    this.elementOverrides[selector].padding = el.style.padding;
    this.elementOverrides[selector].margin = el.style.margin;
  },

  getElementUniqueSelector: function(el) {
    if (el.id) return `#${el.id}`;
    if (el.dataset.id) return `[data-id="${el.dataset.id}"]`;
    let path = el.tagName.toLowerCase();
    if (el.className) {
      const cls = Array.from(el.classList).filter(c => !c.startsWith('fc-')).join('.');
      if (cls) path += `.${cls}`;
    }
    return path;
  },

  // Update Bottom Status Bar
  updateStatusBar: function(el) {
    const dims = document.getElementById('fc-status-dims');
    const pos = document.getElementById('fc-status-pos');
    const crumbs = document.getElementById('fc-breadcrumbs');
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (dims) dims.textContent = `Dimensions: ${Math.round(rect.width)} × ${Math.round(rect.height)}px`;
    if (pos) pos.textContent = `Position: (${Math.round(rect.left)}, ${Math.round(rect.top)})`;
    if (crumbs) {
      crumbs.innerHTML = `
        <span>Storefront</span> <span>&gt;</span>
        <span>${el.parentElement?.tagName.toLowerCase() || 'body'}</span> <span>&gt;</span>
        <span class="fc-crumb">${el.tagName.toLowerCase()}</span>
      `;
    }
  },

  // Render Detailed Properties Inspector (Right Panel)
  renderInspector: function(el) {
    const body = document.getElementById('fc-right-body');
    const title = document.getElementById('fc-inspector-header-title');
    if (!body || !el) return;

    if (title) title.textContent = `PROPERTIES: <${el.tagName.toLowerCase()}>`;

    const computed = window.getComputedStyle(el);

    body.innerHTML = `
      <!-- Element Info Summary -->
      <div class="fc-prop-section">
        <div class="fc-prop-header">Element Info</div>
        <div class="fc-prop-row">
          <label>Tag / Name</label>
          <span style="font-weight:700;font-size:12px">&lt;${el.tagName.toLowerCase()}&gt;</span>
        </div>
        <div style="display:flex;gap:6px;margin-top:8px">
          <button class="fc-btn" style="flex:1" onclick="FullControl.duplicateSelected()">📋 Duplicate</button>
          <button class="fc-btn" style="color:var(--ed-danger)" onclick="FullControl.deleteSelected()">🗑️ Delete</button>
        </div>
      </div>

      <!-- Dimensions & Sizing -->
      <div class="fc-prop-section">
        <div class="fc-prop-header">Dimensions & Sizing</div>
        <div class="fc-prop-row">
          <label>Width</label>
          <div class="fc-prop-control">
            <input type="text" class="fc-input-text" value="${el.style.width || computed.width}" onchange="FullControl.setElementStyle('width', this.value)">
          </div>
        </div>
        <div class="fc-prop-row">
          <label>Height</label>
          <div class="fc-prop-control">
            <input type="text" class="fc-input-text" value="${el.style.height || computed.height}" onchange="FullControl.setElementStyle('height', this.value)">
          </div>
        </div>
        <div class="fc-prop-row">
          <label>Max Width</label>
          <div class="fc-prop-control">
            <input type="text" class="fc-input-text" value="${el.style.maxWidth || 'none'}" onchange="FullControl.setElementStyle('maxWidth', this.value)">
          </div>
        </div>
      </div>

      <!-- Typography -->
      <div class="fc-prop-section">
        <div class="fc-prop-header">Typography & Fonts</div>
        <div class="fc-prop-row">
          <label>Font Family</label>
          <div class="fc-prop-control">
            <select class="fc-select" onchange="FullControl.setElementStyle('fontFamily', this.value)">
              <option value="'Inter', sans-serif">Inter</option>
              <option value="'Poppins', sans-serif">Poppins</option>
              <option value="'Playfair Display', serif">Playfair Display</option>
              <option value="'Space Grotesk', sans-serif">Space Grotesk</option>
              <option value="'Cormorant Garamond', serif">Cormorant Garamond</option>
              <option value="'Montserrat', sans-serif">Montserrat</option>
              <option value="'Lora', serif">Lora</option>
              <option value="'Nunito', sans-serif">Nunito</option>
              <option value="'Oswald', sans-serif">Oswald</option>
            </select>
          </div>
        </div>
        <div class="fc-prop-row">
          <label>Font Size</label>
          <div class="fc-prop-control">
            <input type="text" class="fc-input-text" value="${el.style.fontSize || computed.fontSize}" onchange="FullControl.setElementStyle('fontSize', this.value)">
          </div>
        </div>
        <div class="fc-prop-row">
          <label>Text Align</label>
          <div class="fc-prop-control" style="gap:2px">
            <button class="fc-btn" onclick="FullControl.setElementStyle('textAlign', 'left')">Left</button>
            <button class="fc-btn" onclick="FullControl.setElementStyle('textAlign', 'center')">Center</button>
            <button class="fc-btn" onclick="FullControl.setElementStyle('textAlign', 'right')">Right</button>
          </div>
        </div>
        <div class="fc-prop-row">
          <label>Text Color</label>
          <div class="fc-prop-control">
            <input type="color" value="${FullControl.rgbToHexColor(computed.color)}" oninput="FullControl.setElementStyle('color', this.value)">
          </div>
        </div>
      </div>

      <!-- Color & Background -->
      <div class="fc-prop-section">
        <div class="fc-prop-header">Background & Surface</div>
        <div class="fc-prop-row">
          <label>Background Color</label>
          <div class="fc-prop-control">
            <input type="color" value="${FullControl.rgbToHexColor(computed.backgroundColor)}" oninput="FullControl.setElementStyle('background', this.value)">
          </div>
        </div>
        <div style="display:flex;gap:6px;margin-top:8px">
          <button class="fc-btn" style="flex:1" onclick="ColorStudio.open()">🎨 Color Mixer</button>
          <button class="fc-btn" style="flex:1" onclick="BackgroundStudio.open()">🖼️ Backgrounds</button>
        </div>
      </div>

      <!-- Borders & Corners -->
      <div class="fc-prop-section">
        <div class="fc-prop-header">Borders & Rounded Corners</div>
        <div class="fc-prop-row">
          <label>Border Width</label>
          <div class="fc-prop-control">
            <input type="text" class="fc-input-text" value="${el.style.borderWidth || computed.borderWidth}" onchange="FullControl.setElementStyle('borderWidth', this.value)">
          </div>
        </div>
        <div class="fc-prop-row">
          <label>Border Color</label>
          <div class="fc-prop-control">
            <input type="color" value="${FullControl.rgbToHexColor(computed.borderColor)}" oninput="FullControl.setElementStyle('borderColor', this.value)">
          </div>
        </div>
        <div class="fc-prop-row">
          <label>Corner Radius</label>
          <div class="fc-prop-control">
            <input type="text" class="fc-input-text" value="${el.style.borderRadius || computed.borderRadius}" onchange="FullControl.setElementStyle('borderRadius', this.value)">
          </div>
        </div>
      </div>

      <!-- Box Model Margins & Paddings -->
      <div class="fc-prop-section">
        <div class="fc-prop-header">Spacing (Padding & Margin)</div>
        <div class="fc-prop-row">
          <label>Padding</label>
          <div class="fc-prop-control">
            <input type="text" class="fc-input-text" value="${el.style.padding || computed.padding}" onchange="FullControl.setElementStyle('padding', this.value)">
          </div>
        </div>
        <div class="fc-prop-row">
          <label>Margin</label>
          <div class="fc-prop-control">
            <input type="text" class="fc-input-text" value="${el.style.margin || computed.margin}" onchange="FullControl.setElementStyle('margin', this.value)">
          </div>
        </div>
      </div>
    `;
  },

  rgbToHexColor: function(rgbStr) {
    if (!rgbStr || rgbStr.startsWith('#')) return rgbStr || '#000000';
    const match = rgbStr.match(/\d+/g);
    if (!match || match.length < 3) return '#000000';
    const r = parseInt(match[0]);
    const g = parseInt(match[1]);
    const b = parseInt(match[2]);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  },

  // Duplicate Selected Element
  duplicateSelected: function() {
    if (!this.selectedElement) return;
    const clone = this.selectedElement.cloneNode(true);
    this.selectedElement.parentElement.insertBefore(clone, this.selectedElement.nextSibling);
    this.selectElement(clone);
    this.attachSelectableHooks();
    if (window.App) {
      window.App.snap();
      window.App.showToast('Element duplicated!');
    }
  },

  // Delete Selected Element
  deleteSelected: function() {
    if (!this.selectedElement) return;
    const parent = this.selectedElement.parentElement;
    this.selectedElement.remove();
    this.removeResizeHandles();
    this.selectedElement = null;
    this.buildLayerTree();
    const body = document.getElementById('fc-right-body');
    if (body) {
      body.innerHTML = '<div style="padding:40px 10px;text-align:center;color:var(--ed-muted)"><p>Element deleted.</p></div>';
    }
    if (window.App) {
      window.App.snap();
      window.App.showToast('Element deleted.');
    }
  },

  // Insert a new component element onto the canvas
  insertElement: function(type) {
    const canvas = document.getElementById('fc-canvas-inner');
    if (!canvas) return;

    let newEl = document.createElement('div');
    if (type === 'h1') {
      newEl = document.createElement('h1');
      newEl.textContent = 'New Display Headline';
      newEl.style.fontSize = '36px';
      newEl.style.fontWeight = '800';
    } else if (type === 'h2') {
      newEl = document.createElement('h2');
      newEl.textContent = 'Subheading Section Title';
      newEl.style.fontSize = '24px';
    } else if (type === 'p') {
      newEl = document.createElement('p');
      newEl.textContent = 'This is a custom paragraph text block. Double-click to edit directly or adjust typography in the inspector.';
      newEl.style.fontSize = '15px';
    } else if (type === 'btn') {
      newEl = document.createElement('button');
      newEl.className = 'craft-btn btn-primary btn-shape-soft btn-md';
      newEl.innerHTML = '<span>⚡ Custom Action Button</span>';
    } else if (type === 'box') {
      newEl.style.padding = '24px';
      newEl.style.border = '1px solid #e2e8f0';
      newEl.style.borderRadius = '12px';
      newEl.style.background = '#ffffff';
      newEl.innerHTML = '<p>Container Box. Drag or insert elements inside.</p>';
    } else if (type === 'grid2') {
      newEl.style.display = 'grid';
      newEl.style.gridTemplateColumns = '1fr 1fr';
      newEl.style.gap = '16px';
      newEl.innerHTML = `
        <div style="padding:18px;border:1px dashed #cbd5e1;border-radius:8px">Column 1</div>
        <div style="padding:18px;border:1px dashed #cbd5e1;border-radius:8px">Column 2</div>
      `;
    } else if (type === 'divider') {
      newEl = document.createElement('hr');
      newEl.style.border = 'none';
      newEl.style.borderTop = '1px solid #e2e8f0';
      newEl.style.margin = '24px 0';
    } else if (type === 'spacer') {
      newEl.style.height = '40px';
      newEl.style.background = 'transparent';
    }

    newEl.style.margin = newEl.style.margin || '14px 0';
    
    // Insert into selected container or append to canvas
    if (this.selectedElement && this.selectedElement.parentElement) {
      this.selectedElement.parentElement.insertBefore(newEl, this.selectedElement.nextSibling);
    } else {
      canvas.appendChild(newEl);
    }

    this.attachSelectableHooks();
    this.selectElement(newEl);
    this.buildLayerTree();
    if (window.App) {
      window.App.snap();
      window.App.showToast(`Inserted new ${type} element!`);
    }
  },

  // Save named Checkpoint
  saveCheckpoint: function() {
    const name = prompt('Enter a name for this checkpoint:', `Checkpoint ${this.checkpoints.length + 1}`) || `Checkpoint ${this.checkpoints.length + 1}`;
    const time = new Date().toLocaleTimeString();
    const stateCopy = JSON.parse(JSON.stringify(window.App ? window.App.getState() : (window.STATE || {})));
    this.checkpoints.push({ name, time, state: stateCopy });
    if (this.activeTab === 'checkpoints') this.renderLeftBody();
    if (window.App) window.App.showToast(`Checkpoint "${name}" saved!`);
  },

  // Restore Checkpoint
  restoreCheckpoint: function(idx) {
    const cp = this.checkpoints[idx];
    if (!cp) return;
    if (confirm(`Restore checkpoint "${cp.name}"?`)) {
      if (window.App) {
        window.App.setState(cp.state);
        this.refreshCanvas();
        window.App.showToast(`Restored "${cp.name}"!`);
      }
    }
  },

  initCanvasEvents: function() {
    const center = document.getElementById('fc-canvas-center');
    if (!center) return;
    center.addEventListener('click', (e) => {
      if (e.target === center || e.target.id === 'fc-canvas-wrapper') {
        if (this.selectedElement) {
          this.selectedElement.classList.remove('fc-active-selection');
          this.removeResizeHandles();
          this.selectedElement = null;
        }
      }
    });
  }
};
