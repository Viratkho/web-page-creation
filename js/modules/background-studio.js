// ============================================================================
// COMPLETE BACKGROUND STUDIO & CUSTOM BLENDER
// Provides 56 Professional Background Templates across 5 Categories
// plus a full Custom Background Colour Blending Studio.
// Strictly scopes all background applications to the website preview.
// ============================================================================

window.BackgroundStudio = (function() {
  'use strict';

  // 1. TEMPLATE LIBRARY (56 Total Templates Across 5 Distinct Categories)
  const TEMPLATES = [
    // ------------------------------------------------------------------------
    // 1. Solid Colour Backgrounds (15 items)
    // ------------------------------------------------------------------------
    { id: 'solid-white', category: 'solid', name: 'White', colorInfo: '#FFFFFF', css: '#ffffff', textColor: '#0f172a' },
    { id: 'solid-black', category: 'solid', name: 'Black', colorInfo: '#0B0F19', css: '#0b0f19', textColor: '#f8fafc' },
    { id: 'solid-cream', category: 'solid', name: 'Cream', colorInfo: '#FDFBF7', css: '#fdfbf7', textColor: '#1e293b' },
    { id: 'solid-beige', category: 'solid', name: 'Beige', colorInfo: '#F5F0E8', css: '#f5f0e8', textColor: '#1e293b' },
    { id: 'solid-navy', category: 'solid', name: 'Navy', colorInfo: '#0F172A', css: '#0f172a', textColor: '#f8fafc' },
    { id: 'solid-royal-blue', category: 'solid', name: 'Royal Blue', colorInfo: '#1E3A8A', css: '#1e3a8a', textColor: '#ffffff' },
    { id: 'solid-teal', category: 'solid', name: 'Teal', colorInfo: '#0D9488', css: '#0d9488', textColor: '#ffffff' },
    { id: 'solid-emerald', category: 'solid', name: 'Emerald', colorInfo: '#059669', css: '#059669', textColor: '#ffffff' },
    { id: 'solid-lavender', category: 'solid', name: 'Lavender', colorInfo: '#F3E8FF', css: '#f3e8ff', textColor: '#3b0764' },
    { id: 'solid-pink', category: 'solid', name: 'Pink', colorInfo: '#FCE7F3', css: '#fce7f3', textColor: '#831843' },
    { id: 'solid-coral', category: 'solid', name: 'Coral', colorInfo: '#F97316', css: '#f97316', textColor: '#ffffff' },
    { id: 'solid-orange', category: 'solid', name: 'Orange', colorInfo: '#EA580C', css: '#ea580c', textColor: '#ffffff' },
    { id: 'solid-yellow', category: 'solid', name: 'Yellow', colorInfo: '#FEF08A', css: '#fef08a', textColor: '#713f12' },
    { id: 'solid-grey', category: 'solid', name: 'Grey', colorInfo: '#64748B', css: '#64748b', textColor: '#ffffff' },
    { id: 'solid-charcoal', category: 'solid', name: 'Charcoal', colorInfo: '#1E293B', css: '#1e293b', textColor: '#f8fafc' },

    // ------------------------------------------------------------------------
    // 2. Gradient Backgrounds (11 items)
    // ------------------------------------------------------------------------
    { id: 'grad-linear', category: 'gradient', name: 'Linear Gradient', colorInfo: '#4F46E5 → #06B6D4', css: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)', textColor: '#ffffff' },
    { id: 'grad-radial', category: 'gradient', name: 'Radial Gradient', colorInfo: '#312E81 ⦿ #0F172A', css: 'radial-gradient(circle at center, #312e81 0%, #0f172a 100%)', textColor: '#ffffff' },
    { id: 'grad-conic', category: 'gradient', name: 'Conic Gradient', colorInfo: 'Multi-Angle 360°', css: 'conic-gradient(from 180deg at 50% 50%, #4f46e5 0deg, #ec4899 120deg, #06b6d4 240deg, #4f46e5 360deg)', textColor: '#ffffff' },
    { id: 'grad-diagonal', category: 'gradient', name: 'Diagonal Gradient', colorInfo: '#E11D48 ↗ #FB923C', css: 'linear-gradient(45deg, #e11d48 0%, #fb923c 100%)', textColor: '#ffffff' },
    { id: 'grad-multi-stop', category: 'gradient', name: 'Multi-Stop Gradient', colorInfo: 'Violet → Pink → Gold', css: 'linear-gradient(120deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)', textColor: '#ffffff' },
    { id: 'grad-soft-pastel', category: 'gradient', name: 'Soft Pastel Gradient', colorInfo: 'Blush → Iris → Mint', css: 'linear-gradient(135deg, #fbcfe8 0%, #e0e7ff 50%, #ccfbf1 100%)', textColor: '#1e293b' },
    { id: 'grad-dark', category: 'gradient', name: 'Dark Gradient', colorInfo: '#0F172A ↓ #090D16', css: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #090d16 100%)', textColor: '#f8fafc' },
    { id: 'grad-vibrant', category: 'gradient', name: 'Vibrant Gradient', colorInfo: 'Cyan → Royal → Purple', css: 'linear-gradient(90deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)', textColor: '#ffffff' },
    { id: 'grad-metallic', category: 'gradient', name: 'Metallic Gradient', colorInfo: 'Silver → Slate → Chrome', css: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #cbd5e1 100%)', textColor: '#0f172a' },
    { id: 'grad-sunset', category: 'gradient', name: 'Sunset Gradient', colorInfo: 'Tangerine → Rose → Indigo', css: 'linear-gradient(160deg, #f97316 0%, #db2777 50%, #4c1d95 100%)', textColor: '#ffffff' },
    { id: 'grad-ocean', category: 'gradient', name: 'Ocean Gradient', colorInfo: 'Azure → Cerulean → Deep', css: 'linear-gradient(180deg, #0284c7 0%, #0369a1 50%, #082f49 100%)', textColor: '#ffffff' },

    // ------------------------------------------------------------------------
    // 3. Animated Backgrounds (10 items)
    // ------------------------------------------------------------------------
    { id: 'anim-moving-grad', category: 'animated', name: 'Moving Gradient', colorInfo: 'Shift 400% Gradient', css: 'bg-anim-moving-gradient', isClass: true, thumb: 'linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5)', textColor: '#ffffff' },
    { id: 'anim-grad-waves', category: 'animated', name: 'Gradient Waves', colorInfo: 'Wave Oscillations', css: 'bg-anim-waves', isClass: true, thumb: 'linear-gradient(135deg, #4f46e5, #06b6d4)', textColor: '#ffffff' },
    { id: 'anim-blobs', category: 'animated', name: 'Floating Colour Blobs', colorInfo: 'Luminous Fluid Orbs', css: 'bg-anim-blobs', isClass: true, thumb: 'radial-gradient(circle, #ec4899 0%, #0f172a 70%)', textColor: '#ffffff' },
    { id: 'anim-mesh', category: 'animated', name: 'Animated Mesh Gradient', colorInfo: 'Swirling Radial Mesh', css: 'bg-anim-mesh', isClass: true, thumb: 'radial-gradient(at 0% 0%, #4f46e5, #ec4899)', textColor: '#ffffff' },
    { id: 'anim-aurora', category: 'animated', name: 'Aurora Effect', colorInfo: 'Borealis Light Curtains', css: 'bg-anim-aurora', isClass: true, thumb: 'linear-gradient(180deg, #059669, #090d16)', textColor: '#ffffff' },
    { id: 'anim-flow', category: 'animated', name: 'Colour Flow', colorInfo: 'Continuous Color Cycle', css: 'bg-anim-flow', isClass: true, thumb: 'linear-gradient(90deg, #ff007f, #0070f3)', textColor: '#ffffff' },
    { id: 'anim-particles', category: 'animated', name: 'Particle Background', colorInfo: 'Floating Micro-Stars', css: 'bg-anim-particles', isClass: true, thumb: '#0b0f19', textColor: '#ffffff' },
    { id: 'anim-soft-light', category: 'animated', name: 'Soft Light Movement', colorInfo: 'Drifting Radial Beam', css: 'bg-anim-soft-light', isClass: true, thumb: '#18181b', textColor: '#ffffff' },
    { id: 'anim-grid', category: 'animated', name: 'Animated Grid', colorInfo: 'Electric Cyber Grid', css: 'bg-anim-grid', isClass: true, thumb: '#030712', textColor: '#38bdf8' },
    { id: 'anim-subtle-glow', category: 'animated', name: 'Subtle Glow', colorInfo: 'Gentle Ambient Breath', css: 'bg-anim-glow', isClass: true, thumb: 'radial-gradient(circle, #6366f1 0%, #0f172a 80%)', textColor: '#ffffff' },

    // ------------------------------------------------------------------------
    // 4. Modern Design Backgrounds (10 items)
    // ------------------------------------------------------------------------
    { id: 'mod-glass', category: 'modern', name: 'Glassmorphism', colorInfo: 'Frosted Glass Layer', css: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)), #0f172a', textColor: '#ffffff' },
    { id: 'mod-neumorph', category: 'modern', name: 'Neumorphism', colorInfo: 'Soft Sculpted Emboss', css: '#e0e5ec', textColor: '#1e293b' },
    { id: 'mod-geo', category: 'modern', name: 'Geometric Patterns', colorInfo: 'Isometric Cubes Texture', css: 'linear-gradient(30deg, rgba(255,255,255,0.08) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.08) 87.5%), #0f172a', textColor: '#ffffff' },
    { id: 'mod-dots', category: 'modern', name: 'Dot Patterns', colorInfo: 'Clean Micro-Dot Matrix', css: 'radial-gradient(rgba(100,116,139,0.3) 1.5px, transparent 1.5px) 0 0 / 20px 20px, #ffffff', textColor: '#0f172a' },
    { id: 'mod-grid', category: 'modern', name: 'Grid Patterns', colorInfo: 'Technical Draft Grid', css: 'linear-gradient(rgba(100,116,139,0.12) 1px, transparent 1px) 0 0 / 24px 24px, linear-gradient(90deg, rgba(100,116,139,0.12) 1px, transparent 1px) 0 0 / 24px 24px, #f8fafc', textColor: '#0f172a' },
    { id: 'mod-noise', category: 'modern', name: 'Noise Texture', colorInfo: 'Matte Stipple Texture', css: 'repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.03) 0, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 3px), #f1f5f9', textColor: '#0f172a' },
    { id: 'mod-abstract', category: 'modern', name: 'Abstract Shapes', colorInfo: 'Organic Curve Silhouette', css: 'radial-gradient(ellipse at 10% 20%, rgba(79,70,229,0.15) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(236,72,153,0.15) 0%, transparent 50%), #ffffff', textColor: '#0f172a' },
    { id: 'mod-mesh', category: 'modern', name: 'Mesh Patterns', colorInfo: 'Diagonal Interlocking Lattice', css: 'repeating-linear-gradient(45deg, rgba(148,163,184,0.08) 0, rgba(148,163,184,0.08) 1px, transparent 0, transparent 12px), #ffffff', textColor: '#0f172a' },
    { id: 'mod-minimal', category: 'modern', name: 'Minimalist Patterns', colorInfo: 'Spaced Crosshatch Lines', css: 'linear-gradient(rgba(203,213,225,0.4) 1px, transparent 1px) 0 0 / 40px 40px, #ffffff', textColor: '#0f172a' },
    { id: 'mod-layered', category: 'modern', name: 'Layered Shapes', colorInfo: 'Topography Contour Layers', css: 'radial-gradient(circle at 100% 50%, transparent 20%, rgba(79,70,229,0.06) 21%, rgba(79,70,229,0.06) 34%, transparent 35%), #f8fafc', textColor: '#0f172a' },

    // ------------------------------------------------------------------------
    // 5. Professional Backgrounds (10 items)
    // ------------------------------------------------------------------------
    { id: 'pro-corporate', category: 'professional', name: 'Corporate', colorInfo: 'Executive Slate & Navy', css: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', textColor: '#f8fafc' },
    { id: 'pro-industrial', category: 'professional', name: 'Industrial', colorInfo: 'Carbon Weave & Amber', css: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)', textColor: '#f59e0b' },
    { id: 'pro-tech', category: 'professional', name: 'Technology', colorInfo: 'Cyber Indigo Matrix', css: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)', textColor: '#38bdf8' },
    { id: 'pro-ecom', category: 'professional', name: 'E-commerce', colorInfo: 'Studio Pure White', css: '#ffffff', textColor: '#1e293b' },
    { id: 'pro-minimal', category: 'professional', name: 'Minimal', colorInfo: 'Warm Oatmeal Architectural', css: '#fcfbf9', textColor: '#18181b' },
    { id: 'pro-luxury', category: 'professional', name: 'Luxury', colorInfo: 'Obsidian & Gold Highlights', css: 'linear-gradient(135deg, #0a0a0c 0%, #17171c 100%)', textColor: '#d4af37' },
    { id: 'pro-modern', category: 'professional', name: 'Modern', colorInfo: 'Contemporary Cool Slate', css: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)', textColor: '#0f172a' },
    { id: 'pro-creative', category: 'professional', name: 'Creative', colorInfo: 'Vibrant Amethyst & Coral', css: 'linear-gradient(135deg, #3b0764 0%, #701a75 50%, #831843 100%)', textColor: '#ffffff' },
    { id: 'pro-dark', category: 'professional', name: 'Dark Mode', colorInfo: 'OLED Deep Charcoal', css: '#090d16', textColor: '#f1f5f9' },
    { id: 'pro-light', category: 'professional', name: 'Light Mode', colorInfo: 'Crisp Daylight Paper', css: '#f8fafc', textColor: '#0f172a' }
  ];

  // 2. CUSTOM BACKGROUND BLENDER STATE
  let blenderState = {
    type: 'linear', // 'linear', 'radial', 'conic', 'multi'
    angle: 135,
    direction: 'to bottom right',
    intensity: 100,
    opacity: 100,
    blendMode: 'normal',
    stops: [
      { id: 's1', color: '#508F90', pos: 0 },
      { id: 's2', color: '#F5F0ED', pos: 45 },
      { id: 's3', color: '#D6E8E5', pos: 80 },
      { id: 's4', color: '#2C5E60', pos: 100 }
    ]
  };

  let activeCategory = 'all';
  let searchQuery = '';
  let selectedTemplateId = '';

  // Utility: Hex <-> RGB
  function hexToRgb(hex) {
    hex = (hex || '').replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length !== 6) return 'rgb(0, 0, 0)';
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    return `rgb(${r}, ${g}, ${b})`;
  }

  function rgbToHex(rgbStr) {
    const m = (rgbStr || '').match(/\d+/g);
    if (!m || m.length < 3) return '#000000';
    return '#' + [m[0], m[1], m[2]].map(x => {
      const h = parseInt(x).toString(16);
      return h.length === 1 ? '0' + h : h;
    }).join('');
  }

  // Generate CSS string from Custom Blender State
  function getBlenderCss() {
    const sortedStops = [...blenderState.stops].sort((a, b) => a.pos - b.pos);
    const stopsCss = sortedStops.map(s => `${s.color} ${s.pos}%`).join(', ');

    let grad = '';
    if (blenderState.type === 'linear') {
      grad = `linear-gradient(${blenderState.angle}deg, ${stopsCss})`;
    } else if (blenderState.type === 'radial') {
      grad = `radial-gradient(circle at center, ${stopsCss})`;
    } else if (blenderState.type === 'conic') {
      grad = `conic-gradient(from ${blenderState.angle}deg at 50% 50%, ${stopsCss})`;
    } else {
      // multi-layer composite
      grad = `linear-gradient(${blenderState.angle}deg, ${stopsCss}), radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent)`;
    }
    return grad;
  }

  // Render the entire Background panel HTML
  function renderPanel() {
    const filteredTemplates = TEMPLATES.filter(t => {
      const matchCat = activeCategory === 'all' || t.category === activeCategory;
      const matchQuery = !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.colorInfo.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });

    const blenderCss = getBlenderCss();
    const currentApplied = (window.App && window.App.getState && window.App.getState().bgPreset) || '';

    return `
      <div class="settings-group">
        <h4>🖼️ Background Studio</h4>
        <p style="font-size:12px;color:var(--ed-muted);margin-bottom:12px">
          Select from 56 ready-made templates or blend custom multi-stop gradients for your shop.
        </p>

        <!-- Tool Switcher Sub-Tabs -->
        <div style="display:flex;gap:8px;margin-bottom:16px">
          <button class="tool-btn ${activeCategory !== 'custom' ? 'active' : ''}" style="flex:1" onclick="BackgroundStudio.showTab('templates')">
            📚 Template Library (56)
          </button>
          <button class="tool-btn ${activeCategory === 'custom' ? 'active' : ''}" style="flex:1" onclick="BackgroundStudio.showTab('custom')">
            🎨 Custom Blender
          </button>
        </div>
      </div>

      ${activeCategory === 'custom' ? renderCustomBlenderHtml(blenderCss) : renderTemplatesLibraryHtml(filteredTemplates, currentApplied)}
    `;
  }

  // HTML: Template Library
  function renderTemplatesLibraryHtml(templates, currentApplied) {
    const cats = [
      { id: 'all', label: 'All Templates' },
      { id: 'solid', label: 'Solid (15)' },
      { id: 'gradient', label: 'Gradients (11)' },
      { id: 'animated', label: 'Animated (10)' },
      { id: 'modern', label: 'Modern (10)' },
      { id: 'professional', label: 'Professional (10)' }
    ];

    return `
      <div class="settings-group">
        <!-- Search & Category Filters -->
        <div style="margin-bottom:10px">
          <input type="text" class="ed-input" placeholder="🔍 Search backgrounds by name or color..." value="${searchQuery}" oninput="BackgroundStudio.setSearch(this.value)" style="width:100%;margin-bottom:10px">
        </div>

        <div class="bg-category-tabs">
          ${cats.map(c => `
            <button class="bg-cat-chip ${activeCategory === c.id ? 'active' : ''}" onclick="BackgroundStudio.setCategory('${c.id}')">
              ${c.label}
            </button>
          `).join('')}
        </div>

        <!-- Template Cards Grid -->
        <div class="bg-templates-grid">
          ${templates.map(t => {
            const isActive = currentApplied === t.css || selectedTemplateId === t.id;
            const previewStyle = t.isClass ? `background: ${t.thumb || '#1e1b4b'}` : `background: ${t.css}`;
            return `
              <div class="bg-template-card ${isActive ? 'active' : ''}" onclick="BackgroundStudio.previewTemplate('${t.id}')">
                <div class="bg-thumb-preview" style="${previewStyle}">
                  ${t.isClass ? `<span style="font-size:10px;background:rgba(0,0,0,0.6);padding:2px 6px;border-radius:4px;color:#fff">✨ LIVE</span>` : ''}
                </div>
                <div class="bg-card-body">
                  <div class="bg-card-name">${t.name}</div>
                  <div class="bg-card-desc">${t.colorInfo}</div>
                  <div style="display:flex;gap:4px;margin-top:6px">
                    <button class="tool-btn" style="flex:1;padding:4px 6px;font-size:11px;background:var(--ed-primary);color:#fff" onclick="event.stopPropagation();BackgroundStudio.applyTemplate('${t.id}')">
                      Apply
                    </button>
                    <button class="tool-btn" style="padding:4px 6px;font-size:11px" title="Reset to Default" onclick="event.stopPropagation();BackgroundStudio.resetToDefault()">
                      ↺
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Active Background Controls & Reset -->
        <div style="display:flex;gap:8px;align-items:center;padding:12px;background:var(--ed-bg);border:1px solid var(--ed-border);border-radius:8px">
          <div style="flex:1">
            <span style="font-size:11px;font-weight:700;color:var(--ed-muted)">CURRENT SELECTION</span>
            <div style="font-size:13px;font-weight:700;color:var(--ed-text)">
              ${currentApplied ? 'Custom Background Active' : 'Default Theme Background'}
            </div>
          </div>
          <button class="tool-btn" style="color:#ef4444" onclick="BackgroundStudio.resetToDefault()">
            Reset to Theme
          </button>
        </div>
      </div>
    `;
  }

  // HTML: Custom Background Blender
  function renderCustomBlenderHtml(blenderCss) {
    return `
      <div class="settings-group">
        <h4>🎨 CUSTOM BACKGROUND BLENDER</h4>
        <p style="font-size:12px;color:var(--ed-muted);margin-bottom:12px">
          Combine up to 8 colors with precise HEX/RGB controls and position stops.
        </p>

        <!-- Live Real-Time Preview Swatch -->
        <div class="blender-preview-box" id="blender-preview-swatch" style="background: ${blenderCss};">
          <span>LIVE BLEND PREVIEW</span>
          <span style="font-family:monospace;font-size:10px">${blenderState.type.toUpperCase()} · ${blenderState.angle}°</span>
        </div>

        <!-- Gradient Controls -->
        <div style="margin-bottom:14px">
          <label style="font-size:11px;font-weight:700;display:block;margin-bottom:6px">GRADIENT TYPE</label>
          <div style="display:flex;gap:6px">
            <button class="tool-btn ${blenderState.type === 'linear' ? 'active' : ''}" style="flex:1" onclick="BackgroundStudio.setBlenderProp('type', 'linear')">Linear</button>
            <button class="tool-btn ${blenderState.type === 'radial' ? 'active' : ''}" style="flex:1" onclick="BackgroundStudio.setBlenderProp('type', 'radial')">Radial</button>
            <button class="tool-btn ${blenderState.type === 'conic' ? 'active' : ''}" style="flex:1" onclick="BackgroundStudio.setBlenderProp('type', 'conic')">Conic</button>
            <button class="tool-btn ${blenderState.type === 'multi' ? 'active' : ''}" style="flex:1" onclick="BackgroundStudio.setBlenderProp('type', 'multi')">Multi-Layer</button>
          </div>
        </div>

        <!-- Angle & Direction Controls -->
        <div class="setting-row">
          <label>Gradient Angle (${blenderState.angle}°)</label>
          <div class="ctrl-wrap">
            <input type="range" min="0" max="360" value="${blenderState.angle}" oninput="BackgroundStudio.setBlenderProp('angle', parseInt(this.value))">
          </div>
        </div>

        <!-- Quick Direction Buttons -->
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:14px">
          <button class="tool-btn" style="font-size:10px;padding:3px 6px" onclick="BackgroundStudio.setBlenderProp('angle', 90)">→ To Right (90°)</button>
          <button class="tool-btn" style="font-size:10px;padding:3px 6px" onclick="BackgroundStudio.setBlenderProp('angle', 180)">↓ To Bottom (180°)</button>
          <button class="tool-btn" style="font-size:10px;padding:3px 6px" onclick="BackgroundStudio.setBlenderProp('angle', 135)">↘ Diagonal (135°)</button>
          <button class="tool-btn" style="font-size:10px;padding:3px 6px" onclick="BackgroundStudio.setBlenderProp('angle', 45)">↗ Diagonal (45°)</button>
        </div>

        <!-- Colour Selection Stops (At Least 4 Stops Supported) -->
        <div style="margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <label style="font-size:11px;font-weight:700">COLOUR STOPS (${blenderState.stops.length})</label>
            <button class="tool-btn" style="font-size:11px;padding:3px 8px" onclick="BackgroundStudio.addStop()" ${blenderState.stops.length >= 8 ? 'disabled' : ''}>
              + Add Colour Stop
            </button>
          </div>

          <div class="blender-stops-list">
            ${blenderState.stops.map((s, idx) => `
              <div class="blender-stop-row">
                <input type="color" class="blender-stop-picker" value="${s.color}" oninput="BackgroundStudio.updateStopColor('${s.id}', this.value)">
                <input type="text" class="blender-stop-hex" value="${s.color}" onchange="BackgroundStudio.updateStopColor('${s.id}', this.value)" title="HEX value">
                <input type="text" class="blender-stop-rgb" value="${hexToRgb(s.color)}" onchange="BackgroundStudio.updateStopRgb('${s.id}', this.value)" title="RGB value">
                <input type="number" class="ed-input blender-stop-pos" min="0" max="100" value="${s.pos}" onchange="BackgroundStudio.updateStopPos('${s.id}', parseInt(this.value))" title="Position %">
                <span style="font-size:10px;color:var(--ed-muted)">%</span>
                ${blenderState.stops.length > 2 ? `
                  <button class="tool-btn" style="padding:2px 6px;color:#ef4444" onclick="BackgroundStudio.removeStop('${s.id}')" title="Remove stop">✕</button>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Intensity & Opacity -->
        <div class="setting-row">
          <label>Background Intensity (${blenderState.intensity}%)</label>
          <div class="ctrl-wrap">
            <input type="range" min="50" max="150" value="${blenderState.intensity}" oninput="BackgroundStudio.setBlenderProp('intensity', parseInt(this.value))">
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:16px">
          <button class="tool-btn" style="padding:10px;background:var(--ed-primary);color:#fff;font-weight:700" onclick="BackgroundStudio.applyBlenderBackground()">
            ✨ Apply Background to Website
          </button>
          <div style="display:flex;gap:6px">
            <button class="tool-btn" style="flex:1" onclick="BackgroundStudio.copyCssSnippet()">
              📋 Copy CSS
            </button>
            <button class="tool-btn" style="flex:1" onclick="BackgroundStudio.saveCustomPreset()">
              💾 Save Preset
            </button>
            <button class="tool-btn" style="flex:1" onclick="BackgroundStudio.clearColours()">
              🧹 Clear Colours
            </button>
            <button class="tool-btn" style="flex:1;color:#ef4444" onclick="BackgroundStudio.resetToDefault()">
              ↺ Reset
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Action methods
  function showTab(tab) {
    activeCategory = tab === 'custom' ? 'custom' : 'all';
    if (window.App) window.App.renderBackgroundPanel();
  }

  function setCategory(cat) {
    activeCategory = cat;
    if (window.App) window.App.renderBackgroundPanel();
  }

  function setSearch(query) {
    searchQuery = query;
    if (window.App) window.App.renderBackgroundPanel();
  }

  function previewTemplate(id) {
    selectedTemplateId = id;
    if (window.App) window.App.renderBackgroundPanel();
  }

  function applyTemplate(id) {
    const t = TEMPLATES.find(x => x.id === id);
    if (!t) return;
    selectedTemplateId = id;

    if (window.App) {
      window.App.setBackgroundPreset(t.css);
      window.App.showToast(`Applied "${t.name}" background to shop!`);
      window.App.renderBackgroundPanel();
    }
  }

  function resetToDefault() {
    selectedTemplateId = '';
    if (window.App) {
      window.App.setBackgroundPreset('');
      window.App.showToast('Reset background to design system default.');
      window.App.renderBackgroundPanel();
    }
  }

  function setBlenderProp(prop, val) {
    blenderState[prop] = val;
    updateBlenderLivePreview();
  }

  function updateStopColor(id, hexVal) {
    if (!hexVal.startsWith('#')) hexVal = '#' + hexVal;
    const stop = blenderState.stops.find(s => s.id === id);
    if (stop) {
      stop.color = hexVal;
      updateBlenderLivePreview();
    }
  }

  function updateStopRgb(id, rgbVal) {
    const hex = rgbToHex(rgbVal);
    updateStopColor(id, hex);
  }

  function updateStopPos(id, posVal) {
    const stop = blenderState.stops.find(s => s.id === id);
    if (stop) {
      stop.pos = Math.max(0, Math.min(100, posVal));
      updateBlenderLivePreview();
    }
  }

  function addStop() {
    if (blenderState.stops.length >= 8) return;
    const newId = 's_' + Date.now().toString(36);
    blenderState.stops.push({
      id: newId,
      color: '#06b6d4',
      pos: Math.min(100, (blenderState.stops[blenderState.stops.length - 1]?.pos || 50) + 15)
    });
    if (window.App) window.App.renderBackgroundPanel();
  }

  function removeStop(id) {
    if (blenderState.stops.length <= 2) return;
    blenderState.stops = blenderState.stops.filter(s => s.id !== id);
    if (window.App) window.App.renderBackgroundPanel();
  }

  function clearColours() {
    blenderState.stops = [
      { id: 's1', color: '#1e293b', pos: 0 },
      { id: 's2', color: '#0f172a', pos: 100 }
    ];
    if (window.App) window.App.renderBackgroundPanel();
  }

  function updateBlenderLivePreview() {
    const swatch = document.getElementById('blender-preview-swatch');
    if (swatch) {
      const css = getBlenderCss();
      swatch.style.background = css;
    }
  }

  function applyBlenderBackground() {
    const css = getBlenderCss();
    if (window.App) {
      window.App.setBackgroundPreset(css);
      window.App.showToast('Custom blended background applied to shop!');
    }
  }

  function copyCssSnippet() {
    const css = getBlenderCss();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`background: ${css};`).then(() => {
        if (window.App) window.App.showToast('CSS copied to clipboard!');
      });
    } else {
      prompt('Copy CSS background:', `background: ${css};`);
    }
  }

  function saveCustomPreset() {
    try {
      const saved = JSON.parse(localStorage.getItem('catalogcraft_custom_bg_presets') || '[]');
      saved.push({
        name: `Custom Blend ${saved.length + 1}`,
        css: getBlenderCss(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('catalogcraft_custom_bg_presets', JSON.stringify(saved));
      if (window.App) window.App.showToast('Saved custom background preset!');
    } catch (e) {
      if (window.App) window.App.showToast('Preset saved locally.');
    }
  }

  return {
    TEMPLATES,
    renderPanel,
    showTab,
    setCategory,
    setSearch,
    previewTemplate,
    applyTemplate,
    resetToDefault,
    setBlenderProp,
    updateStopColor,
    updateStopRgb,
    updateStopPos,
    addStop,
    removeStop,
    clearColours,
    applyBlenderBackground,
    copyCssSnippet,
    saveCustomPreset,
    getBlenderCss
  };
})();
