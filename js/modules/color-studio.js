// ============================================================================
// ADVANCED COLOUR BLENDING & PALETTE STUDIO
// ============================================================================

window.ColorStudio = {
  activeColorA: '#4f46e5',
  activeColorB: '#06b6d4',
  activeColorC: '#f43f5e',
  blendRatio: 50, // 0 to 100%
  gradientType: 'linear', // 'linear', 'radial', 'conic'
  gradientAngle: 135,
  recentColors: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#111827', '#ffffff'],
  customPalettes: [],

  // Convert HEX to RGB
  hexToRgb: function(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  },

  // Convert RGB to HEX
  rgbToHex: function(r, g, b) {
    const toHex = c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  },

  // Convert RGB to HSL
  rgbToHsl: function(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  },

  // Convert HSL to HEX
  hslToHex: function(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return this.rgbToHex(r * 255, g * 255, b * 255);
  },

  // Color Interpolation / Blending
  blendColors: function(color1, color2, weight) {
    const c1 = this.hexToRgb(color1);
    const c2 = this.hexToRgb(color2);
    const w = weight / 100;
    const r = c1.r * (1 - w) + c2.r * w;
    const g = c1.g * (1 - w) + c2.g * w;
    const b = c1.b * (1 - w) + c2.b * w;
    return this.rgbToHex(r, g, b);
  },

  // Calculate Relative Luminance and Contrast Ratio for WCAG compliance
  getLuminance: function(r, g, b) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  },

  getContrastRatio: function(hex1, hex2) {
    const c1 = this.hexToRgb(hex1);
    const c2 = this.hexToRgb(hex2);
    const l1 = this.getLuminance(c1.r, c1.g, c1.b);
    const l2 = this.getLuminance(c2.r, c2.g, c2.b);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
  },

  // Eyedropper API Tool
  pickFromScreen: async function(targetInputId) {
    if (!window.EyeDropper) {
      alert('The native EyeDropper API is supported in modern Chrome/Edge browsers.');
      return;
    }
    try {
      const eye = new EyeDropper();
      const res = await eye.open();
      if (res && res.sRGBHex) {
        const input = document.getElementById(targetInputId);
        if (input) {
          input.value = res.sRGBHex;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    } catch (e) {
      // User cancelled
    }
  },

  // Render the Color Studio Modal
  renderModal: function() {
    if (typeof document === 'undefined') return;
    let modal = document.getElementById('color-studio-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'color-studio-modal';
      modal.className = 'fc-modal-overlay';
      modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('open');
      };
      document.body.appendChild(modal);
    }

    const blended = this.blendColors(this.activeColorA, this.activeColorB, this.blendRatio);
    const contrastOnWhite = this.getContrastRatio(blended, '#ffffff');
    const contrastOnBlack = this.getContrastRatio(blended, '#111111');
    const passAA = contrastOnWhite >= 4.5 || contrastOnBlack >= 4.5;
    const passAAA = contrastOnWhite >= 7.0 || contrastOnBlack >= 7.0;

    let gradientCss = '';
    if (this.gradientType === 'linear') {
      gradientCss = `linear-gradient(${this.gradientAngle}deg, ${this.activeColorA}, ${this.activeColorB})`;
    } else if (this.gradientType === 'radial') {
      gradientCss = `radial-gradient(circle, ${this.activeColorA}, ${this.activeColorB})`;
    } else {
      gradientCss = `conic-gradient(from ${this.gradientAngle}deg, ${this.activeColorA}, ${this.activeColorB}, ${this.activeColorA})`;
    }

    modal.innerHTML = `
      <div class="fc-modal-card" onclick="event.stopPropagation()">
        <div class="fc-modal-header">
          <h3>🎨 Advanced Colour Blending Studio & Palette Mixer</h3>
          <button class="fc-btn" onclick="document.getElementById('color-studio-modal').classList.remove('open')">✕</button>
        </div>

        <div class="fc-modal-body">
          <!-- 1. Color Blend Swatch Header -->
          <div class="color-blend-row">
            <div>
              <label style="font-size:12px;font-weight:700;display:block;margin-bottom:6px">Blended Output (${this.blendRatio}%)</label>
              <div class="blend-swatch-box" style="background:${blended}">
                <span>${blended.toUpperCase()}</span>
                <div style="margin-top:6px;display:flex;gap:6px">
                  <span class="wcag-badge ${passAA ? 'wcag-pass' : 'wcag-fail'}">WCAG AA: ${contrastOnWhite}</span>
                  <span class="wcag-badge ${passAAA ? 'wcag-pass' : 'wcag-fail'}">AAA: ${contrastOnBlack}</span>
                </div>
              </div>
            </div>

            <div>
              <label style="font-size:12px;font-weight:700;display:block;margin-bottom:6px">Gradient Preview (${this.gradientType})</label>
              <div class="blend-swatch-box" style="background:${gradientCss}">
                <span style="font-size:11px">${gradientCss}</span>
              </div>
            </div>
          </div>

          <!-- 2. Interactive Blending Controls -->
          <div style="background:var(--ed-bg);border:1px solid var(--ed-border);border-radius:10px;padding:16px;margin-bottom:20px">
            <h4 style="margin:0 0 12px;font-size:12px;text-transform:uppercase;color:var(--ed-muted)">Colour Blending Inputs</h4>
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px">
              <div>
                <label style="font-size:12px;font-weight:600;display:flex;justify-content:space-between;margin-bottom:6px">
                  <span>Color A (Base)</span>
                  <button type="button" class="fc-layer-btn" onclick="ColorStudio.pickFromScreen('cs-input-color-a')">🔍 Eyedropper</button>
                </label>
                <div style="display:flex;gap:8px;align-items:center">
                  <input type="color" id="cs-input-color-a" value="${this.activeColorA}" style="height:36px;width:50px;border-radius:6px;cursor:pointer" oninput="ColorStudio.setColorA(this.value)">
                  <input type="text" class="fc-input-text" value="${this.activeColorA}" oninput="ColorStudio.setColorA(this.value)">
                </div>
              </div>

              <div>
                <label style="font-size:12px;font-weight:600;display:flex;justify-content:space-between;margin-bottom:6px">
                  <span>Color B (Accent)</span>
                  <button type="button" class="fc-layer-btn" onclick="ColorStudio.pickFromScreen('cs-input-color-b')">🔍 Eyedropper</button>
                </label>
                <div style="display:flex;gap:8px;align-items:center">
                  <input type="color" id="cs-input-color-b" value="${this.activeColorB}" style="height:36px;width:50px;border-radius:6px;cursor:pointer" oninput="ColorStudio.setColorB(this.value)">
                  <input type="text" class="fc-input-text" value="${this.activeColorB}" oninput="ColorStudio.setColorB(this.value)">
                </div>
              </div>
            </div>

            <!-- Ratio Slider -->
            <div style="margin-bottom:14px">
              <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:6px">
                <span>Blend Ratio</span>
                <span>${this.blendRatio}% Color B</span>
              </div>
              <input type="range" min="0" max="100" value="${this.blendRatio}" style="width:100%" oninput="ColorStudio.setBlendRatio(this.value)">
            </div>

            <!-- Gradient Controls -->
            <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
              <label style="font-size:12px;font-weight:600">Gradient Type:</label>
              <button class="fc-btn ${this.gradientType === 'linear' ? 'active' : ''}" onclick="ColorStudio.setGradientType('linear')">Linear</button>
              <button class="fc-btn ${this.gradientType === 'radial' ? 'active' : ''}" onclick="ColorStudio.setGradientType('radial')">Radial</button>
              <button class="fc-btn ${this.gradientType === 'conic' ? 'active' : ''}" onclick="ColorStudio.setGradientType('conic')">Conic</button>

              <label style="font-size:12px;font-weight:600;margin-left:10px">Angle (${this.gradientAngle}°):</label>
              <input type="range" min="0" max="360" value="${this.gradientAngle}" style="width:100px" oninput="ColorStudio.setGradientAngle(this.value)">
            </div>
          </div>

          <!-- 3. Target Application Actions -->
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button class="fc-btn" onclick="ColorStudio.applyToSelected('background', '${blended}')">Apply Solid to Selected</button>
            <button class="fc-btn" onclick="ColorStudio.applyToSelected('background', '${gradientCss}')">Apply Gradient to Selected</button>
            <button class="fc-btn fc-btn-primary" onclick="ColorStudio.applyGlobalTheme('${blended}', '${gradientCss}')">Apply to Entire Theme</button>
          </div>
        </div>
      </div>
    `;
  },

  open: function() {
    this.renderModal();
    const modal = document.getElementById('color-studio-modal');
    if (modal) modal.classList.add('open');
  },

  setColorA: function(hex) {
    if (/^#[0-9a-f]{6}$/i.test(hex)) {
      this.activeColorA = hex;
      this.renderModal();
    }
  },

  setColorB: function(hex) {
    if (/^#[0-9a-f]{6}$/i.test(hex)) {
      this.activeColorB = hex;
      this.renderModal();
    }
  },

  setBlendRatio: function(val) {
    this.blendRatio = parseInt(val);
    this.renderModal();
  },

  setGradientType: function(type) {
    this.gradientType = type;
    this.renderModal();
  },

  setGradientAngle: function(angle) {
    this.gradientAngle = parseInt(angle);
    this.renderModal();
  },

  // Apply to currently selected element in Full Control Canvas
  applyToSelected: function(prop, val) {
    if (window.FullControl && window.FullControl.selectedElement) {
      window.FullControl.setElementStyle(prop, val);
      document.getElementById('color-studio-modal')?.classList.remove('open');
      if (window.App) window.App.showToast('Applied color to selected element!');
    } else {
      alert('Please select an element on the canvas first to apply locally.');
    }
  },

  // Apply to global store theme token
  applyGlobalTheme: function(solidColor, gradientCss) {
    if (window.App) {
      window.App.setOverride('primary', solidColor);
      window.App.setOverride('card', '#ffffff');
      document.getElementById('color-studio-modal')?.classList.remove('open');
      window.App.showToast('Applied blended palette to global theme!');
    }
  }
};
