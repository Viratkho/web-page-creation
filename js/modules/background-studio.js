// ============================================================================
// COMPLETE BACKGROUND & PATTERN CREATOR
// ============================================================================

window.BackgroundStudio = {
  currentType: 'gradient', // 'solid', 'gradient', 'pattern', 'mesh'
  color1: '#0f172a',
  color2: '#1e1b4b',
  color3: '#312e81',
  angle: 135,
  pattern: 'dots',
  patternScale: 20,
  opacity: 100,

  patterns: [
    { id: 'dots', name: 'Subtle Dots', css: 'radial-gradient(rgba(255,255,255,0.15) 1.5px, transparent 1.5px) 0 0 / 20px 20px' },
    { id: 'grid', name: 'Clean Grid', css: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px) 0 0 / 24px 24px, linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px) 0 0 / 24px 24px' },
    { id: 'stripes', name: 'Diagonal Stripes', css: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.06) 10px, rgba(255,255,255,0.06) 20px)' },
    { id: 'checks', name: 'Modern Checks', css: 'conic-gradient(rgba(255,255,255,0.06) 25%, transparent 0 50%, rgba(255,255,255,0.06) 0 75%, transparent 0) 0 0 / 40px 40px' },
    { id: 'waves', name: 'Waves Mesh', css: 'radial-gradient(circle at 100% 50%, transparent 20%, rgba(255,255,255,0.08) 21%, rgba(255,255,255,0.08) 34%, transparent 35%, transparent), radial-gradient(circle at 0% 50%, transparent 20%, rgba(255,255,255,0.08) 21%, rgba(255,255,255,0.08) 34%, transparent 35%, transparent) 0 0 / 40px 40px' },
    { id: 'isometric', name: 'Isometric Cubes', css: 'linear-gradient(30deg, rgba(255,255,255,0.07) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.07) 87.5%, rgba(255,255,255,0.07)), linear-gradient(150deg, rgba(255,255,255,0.07) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.07) 87.5%, rgba(255,255,255,0.07)) 0 0 / 40px 70px' }
  ],

  getGeneratedCss: function() {
    if (this.currentType === 'solid') {
      return this.color1;
    }
    if (this.currentType === 'gradient') {
      return `linear-gradient(${this.angle}deg, ${this.color1}, ${this.color2}, ${this.color3})`;
    }
    if (this.currentType === 'mesh') {
      return `radial-gradient(at 0% 0%, ${this.color1} 0px, transparent 50%), radial-gradient(at 100% 0%, ${this.color2} 0px, transparent 50%), radial-gradient(at 50% 100%, ${this.color3} 0px, transparent 50%), #0f172a`;
    }
    if (this.currentType === 'pattern') {
      const pat = this.patterns.find(p => p.id === this.pattern) || this.patterns[0];
      return `${pat.css}, linear-gradient(${this.angle}deg, ${this.color1}, ${this.color2})`;
    }
    return this.color1;
  },

  renderModal: function() {
    if (typeof document === 'undefined') return;
    let modal = document.getElementById('background-studio-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'background-studio-modal';
      modal.className = 'fc-modal-overlay';
      modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('open');
      };
      document.body.appendChild(modal);
    }

    const cssVal = this.getGeneratedCss();

    modal.innerHTML = `
      <div class="fc-modal-card" onclick="event.stopPropagation()">
        <div class="fc-modal-header">
          <h3>🖼️ Complete Background & Pattern Studio</h3>
          <button class="fc-btn" onclick="document.getElementById('background-studio-modal').classList.remove('open')">✕</button>
        </div>

        <div class="fc-modal-body">
          <!-- Background Large Preview Swatch -->
          <div style="height:140px;border-radius:10px;border:1px solid var(--ed-border);background:${cssVal};margin-bottom:18px;display:flex;align-items:flex-end;padding:14px;color:#ffffff;text-shadow:0 1px 4px rgba(0,0,0,0.7);font-weight:700">
            <span>${this.currentType.toUpperCase()} BACKGROUND</span>
          </div>

          <!-- Type Switcher -->
          <div style="display:flex;gap:8px;margin-bottom:18px">
            <button class="fc-btn ${this.currentType === 'gradient' ? 'active' : ''}" onclick="BackgroundStudio.setType('gradient')">3-Stop Gradient</button>
            <button class="fc-btn ${this.currentType === 'mesh' ? 'active' : ''}" onclick="BackgroundStudio.setType('mesh')">Mesh Glow</button>
            <button class="fc-btn ${this.currentType === 'pattern' ? 'active' : ''}" onclick="BackgroundStudio.setType('pattern')">Geometric Pattern</button>
            <button class="fc-btn ${this.currentType === 'solid' ? 'active' : ''}" onclick="BackgroundStudio.setType('solid')">Solid Color</button>
          </div>

          <!-- Colors Selector -->
          <div style="background:var(--ed-bg);border:1px solid var(--ed-border);border-radius:8px;padding:14px;margin-bottom:18px">
            <h4 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;color:var(--ed-muted)">Palette Gradient Stops</h4>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px">
              <div>
                <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px">Color 1</label>
                <input type="color" value="${this.color1}" style="width:100%;height:32px;cursor:pointer" oninput="BackgroundStudio.setColor(1, this.value)">
              </div>
              <div>
                <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px">Color 2</label>
                <input type="color" value="${this.color2}" style="width:100%;height:32px;cursor:pointer" oninput="BackgroundStudio.setColor(2, this.value)">
              </div>
              <div>
                <label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px">Color 3</label>
                <input type="color" value="${this.color3}" style="width:100%;height:32px;cursor:pointer" oninput="BackgroundStudio.setColor(3, this.value)">
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center">
              <label style="font-size:12px;font-weight:600">Gradient Angle (${this.angle}°):</label>
              <input type="range" min="0" max="360" value="${this.angle}" style="width:180px" oninput="BackgroundStudio.setAngle(this.value)">
            </div>
          </div>

          ${this.currentType === 'pattern' ? `
            <!-- Pattern Selection Tiles -->
            <div style="margin-bottom:18px">
              <h4 style="margin:0 0 8px;font-size:11px;text-transform:uppercase;color:var(--ed-muted)">SVG Geometric Patterns</h4>
              <div class="bg-patterns-grid">
                ${this.patterns.map(p => `
                  <div class="bg-pattern-tile ${this.pattern === p.id ? 'active' : ''}" style="background:${p.css}, #ffffff" onclick="BackgroundStudio.setPattern('${p.id}')">
                    <span>${p.name}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Apply Target Actions -->
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button class="fc-btn" onclick="BackgroundStudio.applyToSelected('${cssVal}')">Apply to Selected Section</button>
            <button class="fc-btn fc-btn-primary" onclick="BackgroundStudio.applyGlobal('${cssVal}')">Set Global Page Background</button>
          </div>
        </div>
      </div>
    `;
  },

  open: function() {
    this.renderModal();
    const modal = document.getElementById('background-studio-modal');
    if (modal) modal.classList.add('open');
  },

  setType: function(type) {
    this.currentType = type;
    this.renderModal();
  },

  setColor: function(idx, val) {
    if (idx === 1) this.color1 = val;
    if (idx === 2) this.color2 = val;
    if (idx === 3) this.color3 = val;
    this.renderModal();
  },

  setAngle: function(ang) {
    this.angle = parseInt(ang);
    this.renderModal();
  },

  setPattern: function(id) {
    this.pattern = id;
    this.renderModal();
  },

  applyToSelected: function(cssVal) {
    if (window.FullControl && window.FullControl.selectedElement) {
      window.FullControl.setElementStyle('background', cssVal);
      document.getElementById('background-studio-modal')?.classList.remove('open');
      if (window.App) window.App.showToast('Background applied to selected section!');
    } else {
      alert('Please select a section or container on the canvas first.');
    }
  },

  applyGlobal: function(cssVal) {
    if (window.App) {
      window.App.setBackgroundPreset(cssVal);
      document.getElementById('background-studio-modal')?.classList.remove('open');
      window.App.showToast('Global background updated!');
    }
  }
};
