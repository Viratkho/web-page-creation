// ============================================================================
// COMPLETE MOTION STUDIO & GLOBAL ANIMATION ENGINE
// Supports Global Website Animations and Component-Level Animations
// Scoped exclusively to the website preview (#preview-container .store-root)
// ============================================================================

window.MotionStudio = (function() {
  'use strict';

  // Target Options
  const TARGETS = [
    { id: 'global', name: '🌐 GLOBAL WEBSITE', desc: 'Applies coordinated motion across the entire store' },
    { id: 'hero', name: '✨ Hero Banner', desc: 'Welcome headlines, subtitle & CTA badge' },
    { id: 'header', name: '🧭 Header & Nav', desc: 'Navigation bar, logo & cart triggers' },
    { id: 'products', name: '🛍️ Product Cards', desc: 'Catalog cards, badges, prices & steppers' },
    { id: 'buttons', name: '🔘 All Buttons', desc: 'Interactive hover, ripples & clicks' },
    { id: 'features', name: '⭐ Features / Why Us', desc: 'Highlight cards, icons & descriptions' },
    { id: 'faqs', name: '❓ FAQ Accordion', desc: 'Interactive disclosure panels' },
    { id: 'footer', name: '📄 Storefront Footer', desc: 'Copyright, brand statement & links' }
  ];

  // Presets by Target
  const GLOBAL_PRESETS = [
    { id: 'page-entrance-fade', name: 'Smooth Fade In', category: 'entrance', desc: 'Fluid 0.8s opacity entrance across all sections', class: 'global-anim-entrance-fade' },
    { id: 'page-entrance-slide', name: 'Cascade Slide Up', category: 'entrance', desc: 'Elevates content with subtle 28px translateY slide', class: 'global-anim-entrance-slide' },
    { id: 'page-entrance-scale', name: 'Scale In Focus', category: 'entrance', desc: 'Smooth cinematic 0.97 to 1.0 zoom focus reveal', class: 'global-anim-entrance-scale' },
    { id: 'global-symphony', name: 'Symphony Orchestration', category: 'entrance', desc: 'Header slides down → Hero rises → Cards stagger pop', class: 'global-anim-symphony' },
    { id: 'ambient-pulse', name: 'Subtle Ambient Pulse', category: 'ambient', desc: 'Gentle continuous 6-second rhythmic luminance breath', class: 'global-anim-ambient-pulse' },
    { id: 'luminous-flow', name: 'Radiant Luminous Flow', category: 'ambient', desc: 'Prismatic edge glow shift across page containers', class: 'global-anim-luminous-flow' },
    { id: 'float-rhythm', name: 'Floating Rhythm', category: 'motion', desc: 'Website-wide subtle floating motion on badges and media', class: 'global-anim-float-rhythm' },
    { id: 'hover-elevation', name: 'Global 3D Elevation', category: 'hover', desc: 'All store cards & containers smoothly elevate on hover', class: 'global-anim-hover-elevation' },
    { id: 'scroll-reveal', name: 'Scroll Reveal Stagger', category: 'scroll', desc: 'Sections fluidly fade and slide in as you scroll', class: 'global-anim-scroll-reveal' }
  ];

  const COMPONENT_PRESETS = {
    hero: [
      { id: 'wave-text', name: 'Wave Text Flow', class: 'anim-hero-wave', desc: 'Rhythmic vertical oscillation on hero title' },
      { id: 'pulse-glow', name: 'Pulse Glow Badge', class: 'anim-hero-pulse', desc: 'Radiant glowing outer bloom on promo badge' },
      { id: 'float-visual', name: 'Floating Visual Banner', class: 'anim-hero-float', desc: 'Gentle buoyant floating motion on hero artwork' }
    ],
    header: [
      { id: 'blur-drop', name: 'Slide Down Glass Blur', class: 'anim-header-blur-drop', desc: 'Header slides in with frosted blur backdrop' }
    ],
    products: [
      { id: 'hover-lift', name: 'Hover Lift & Shadow', class: 'anim-products-hover-lift', desc: 'Smooth 6px translateY elevation with shadow' },
      { id: 'zoom-tilt', name: 'Zoom & Tilt Sheen', class: 'anim-products-zoom-tilt', desc: '1.02x scale with delicate subtle rotation' }
    ],
    buttons: [
      { id: 'btn-ripple', name: 'Fluid Ripple Wave', class: 'btn-fx-ripple', desc: 'Expanding circular water ripple on click' },
      { id: 'btn-3d-press', name: '3D Tactile Press', class: 'btn-fx-3dpress', desc: 'Mechanical button depression response' },
      { id: 'btn-shimmer', name: 'Diagonal Shimmer Beam', class: 'btn-fx-shimmer', desc: 'Travelling light beam sweep across button' }
    ],
    features: [
      { id: 'icon-spin', name: 'Icon Spin On Hover', class: 'anim-features-spin-icon', desc: 'Smooth 360° icon spin upon cursor hover' }
    ],
    faqs: [
      { id: 'smooth-expand', name: 'Fluid Accordion Expand', class: 'anim-faqs-expand', desc: 'Smooth spring transition when expanding questions' }
    ],
    footer: [
      { id: 'fade-entrance', name: 'Fade Up Entrance', class: 'anim-footer-fade', desc: 'Subtle entrance reveal when reaching page bottom' }
    ]
  };

  // State
  let currentTarget = 'global';
  let motionState = {
    global: {
      enabled: true,
      preset: 'page-entrance-fade',
      intensity: 'medium', // 'subtle', 'medium', 'high'
      speed: 0.8, // seconds
      delay: 0, // seconds
      desktop: true,
      mobile: true,
      reducedMotion: true
    },
    components: {
      hero: '',
      header: '',
      products: 'hover-lift',
      buttons: 'btn-ripple',
      features: '',
      faqs: '',
      footer: ''
    }
  };

  let scrollObserver = null;

  // Initialize Scroll Observer for preview frame
  function setupScrollObserver() {
    if (scrollObserver) {
      scrollObserver.disconnect();
      scrollObserver = null;
    }

    const previewFrame = document.getElementById('preview-frame');
    if (!previewFrame) return;

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-in-view');
        }
      });
    }, {
      root: previewFrame,
      threshold: 0.15
    });

    const sections = previewFrame.querySelectorAll(
      '.store-hero, .store-categories, .store-products-section, .store-features-section, .store-faqs-section, .store-contact-section'
    );
    sections.forEach(s => scrollObserver.observe(s));
  }

  // Get CSS classes and styles to apply to .store-root in the preview
  function getAppliedMotionClasses() {
    const classes = [];

    // Global
    if (motionState.global.enabled && motionState.global.preset) {
      const gObj = GLOBAL_PRESETS.find(p => p.id === motionState.global.preset);
      if (gObj && gObj.class) classes.push(gObj.class);
      classes.push(`intensity-${motionState.global.intensity}`);
      if (!motionState.global.desktop) classes.push('disable-desktop-anim');
      if (!motionState.global.mobile) classes.push('disable-mobile-anim');
    }

    // Component classes
    Object.keys(motionState.components).forEach(target => {
      const presetId = motionState.components[target];
      if (presetId) {
        const presets = COMPONENT_PRESETS[target] || [];
        const pObj = presets.find(p => p.id === presetId);
        if (pObj && pObj.class) classes.push(pObj.class);
      }
    });

    return classes.join(' ');
  }

  function getAppliedInlineStyles() {
    if (!motionState.global.enabled) return '';
    return `
      --global-anim-duration: ${motionState.global.speed}s;
      --global-anim-delay: ${motionState.global.delay}s;
    `;
  }

  // Render the Motion Studio Sidebar Panel
  function renderPanel() {
    const isGlobal = currentTarget === 'global';

    return `
      <div class="settings-group">
        <h4>✨ Motion Studio & Global Animation</h4>
        <p style="font-size:12px;color:var(--ed-muted);margin-bottom:14px">
          Apply coordinated animations across the entire shop or configure individual interactive elements.
        </p>

        <!-- Target Selector -->
        <label style="font-size:11px;font-weight:700;display:block;margin-bottom:6px">SELECT TARGET FOR ANIMATION</label>
        <div class="motion-target-tabs">
          ${TARGETS.map(t => `
            <button class="motion-target-chip ${currentTarget === t.id ? 'active' : ''}" onclick="MotionStudio.setTarget('${t.id}')">
              ${t.name}
            </button>
          `).join('')}
        </div>
      </div>

      ${isGlobal ? renderGlobalControlsHtml() : renderComponentControlsHtml(currentTarget)}
    `;
  }

  // HTML: Global Website Animation Controls
  function renderGlobalControlsHtml() {
    const g = motionState.global;

    return `
      <div class="settings-group">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div>
            <h4 style="margin:0">🌐 Global Website Animation</h4>
            <span style="font-size:11px;color:var(--ed-muted)">Affects the entire created storefront</span>
          </div>
          <label style="cursor:pointer;display:flex;align-items:center;gap:6px">
            <input type="checkbox" ${g.enabled ? 'checked' : ''} onchange="MotionStudio.toggleGlobal(this.checked)">
            <span style="font-size:12px;font-weight:700">${g.enabled ? 'Enabled' : 'Disabled'}</span>
          </label>
        </div>

        <!-- Animation Presets Grid -->
        <label style="font-size:11px;font-weight:700;display:block;margin-bottom:8px">GLOBAL ANIMATION PRESETS</label>
        <div class="motion-presets-grid">
          ${GLOBAL_PRESETS.map(p => {
            const isActive = g.enabled && g.preset === p.id;
            return `
              <div class="motion-preset-card ${isActive ? 'active' : ''}" onclick="MotionStudio.selectGlobalPreset('${p.id}')">
                <div class="motion-card-body">
                  <div class="motion-card-name">${p.name}</div>
                  <div class="motion-card-desc">${p.desc}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Global Tuning Controls -->
        <div style="background:var(--ed-bg);border:1px solid var(--ed-border);border-radius:8px;padding:14px;margin-bottom:14px">
          <h4 style="font-size:11px;text-transform:uppercase;color:var(--ed-muted);margin:0 0 12px">Global Tuning Controls</h4>

          <!-- Intensity -->
          <div style="margin-bottom:12px">
            <label style="font-size:11px;font-weight:700;display:block;margin-bottom:6px">ANIMATION INTENSITY</label>
            <div style="display:flex;gap:6px">
              ${['subtle', 'medium', 'high'].map(lvl => `
                <button class="tool-btn ${g.intensity === lvl ? 'active' : ''}" style="flex:1;text-transform:capitalize" onclick="MotionStudio.setIntensity('${lvl}')">
                  ${lvl}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Speed / Duration -->
          <div class="setting-row">
            <label>Duration / Speed (${g.speed}s)</label>
            <div class="ctrl-wrap">
              <input type="range" min="0.3" max="3.0" step="0.1" value="${g.speed}" oninput="MotionStudio.setSpeed(parseFloat(this.value))">
            </div>
          </div>

          <!-- Delay -->
          <div class="setting-row">
            <label>Initial Delay (${g.delay}s)</label>
            <div class="ctrl-wrap">
              <input type="range" min="0" max="1.5" step="0.1" value="${g.delay}" oninput="MotionStudio.setDelay(parseFloat(this.value))">
            </div>
          </div>

          <!-- Device & Accessibility Toggles -->
          <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;padding-top:10px;border-top:1px solid var(--ed-border)">
            <label style="font-size:12px;display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" ${g.desktop ? 'checked' : ''} onchange="MotionStudio.setDevice('desktop', this.checked)">
              <span>Enable on Desktop Viewports</span>
            </label>
            <label style="font-size:12px;display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" ${g.mobile ? 'checked' : ''} onchange="MotionStudio.setDevice('mobile', this.checked)">
              <span>Enable on Mobile & Tablet Viewports</span>
            </label>
            <label style="font-size:12px;display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" ${g.reducedMotion ? 'checked' : ''} onchange="MotionStudio.setReducedMotion(this.checked)">
              <span>Reduced Motion Compatibility (Accessibility)</span>
            </label>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex;gap:8px">
          <button class="tool-btn" style="flex:1;background:var(--ed-primary);color:#fff;font-weight:700" onclick="MotionStudio.applyGlobalToPreview()">
            Apply to Target
          </button>
          <button class="tool-btn" style="flex:1;color:#ef4444" onclick="MotionStudio.removeGlobalAnimation()">
            Remove Global
          </button>
          <button class="tool-btn" style="flex:1" onclick="MotionStudio.resetAllAnimations()">
            Reset All
          </button>
        </div>
      </div>
    `;
  }

  // HTML: Component-Level Animation Controls
  function renderComponentControlsHtml(targetId) {
    const targetObj = TARGETS.find(t => t.id === targetId) || TARGETS[1];
    const presets = COMPONENT_PRESETS[targetId] || [];
    const currentPreset = motionState.components[targetId] || '';

    return `
      <div class="settings-group">
        <h4>${targetObj.name} Animation</h4>
        <p style="font-size:12px;color:var(--ed-muted);margin-bottom:14px">${targetObj.desc}</p>

        <!-- Presets -->
        <label style="font-size:11px;font-weight:700;display:block;margin-bottom:8px">AVAILABLE PRESETS</label>
        <div class="motion-presets-grid">
          ${presets.map(p => `
            <div class="motion-preset-card ${currentPreset === p.id ? 'active' : ''}" onclick="MotionStudio.selectComponentPreset('${targetId}', '${p.id}')">
              <div class="motion-card-body">
                <div class="motion-card-name">${p.name}</div>
                <div class="motion-card-desc">${p.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="display:flex;gap:8px;margin-top:14px">
          <button class="tool-btn" style="flex:1;background:var(--ed-primary);color:#fff" onclick="MotionStudio.applyComponentPreset('${targetId}')">
            Apply to ${targetObj.name}
          </button>
          <button class="tool-btn" style="flex:1;color:#ef4444" onclick="MotionStudio.removeComponentPreset('${targetId}')">
            Remove Effect
          </button>
        </div>
      </div>
    `;
  }

  // Public methods
  function setTarget(target) {
    currentTarget = target;
    if (window.App) window.App.renderMotionPanel();
  }

  function toggleGlobal(enabled) {
    motionState.global.enabled = !!enabled;
    applyMotionToPreview();
    if (window.App) {
      window.App.renderMotionPanel();
      window.App.showToast(`Global Animation ${enabled ? 'Enabled' : 'Disabled'}`);
    }
  }

  function selectGlobalPreset(presetId) {
    motionState.global.preset = presetId;
    motionState.global.enabled = true;
    applyMotionToPreview();
    if (window.App) {
      window.App.renderMotionPanel();
      const p = GLOBAL_PRESETS.find(x => x.id === presetId);
      window.App.showToast(`Applied "${p ? p.name : presetId}" globally!`);
    }
  }

  function setIntensity(lvl) {
    motionState.global.intensity = lvl;
    applyMotionToPreview();
    if (window.App) window.App.renderMotionPanel();
  }

  function setSpeed(val) {
    motionState.global.speed = val;
    applyMotionToPreview();
    if (window.App) window.App.renderMotionPanel();
  }

  function setDelay(val) {
    motionState.global.delay = val;
    applyMotionToPreview();
    if (window.App) window.App.renderMotionPanel();
  }

  function setDevice(device, enabled) {
    motionState.global[device] = !!enabled;
    applyMotionToPreview();
    if (window.App) window.App.renderMotionPanel();
  }

  function setReducedMotion(enabled) {
    motionState.global.reducedMotion = !!enabled;
    applyMotionToPreview();
    if (window.App) window.App.renderMotionPanel();
  }

  function selectComponentPreset(targetId, presetId) {
    motionState.components[targetId] = presetId;
    applyMotionToPreview();
    if (window.App) {
      window.App.renderMotionPanel();
      window.App.showToast(`Applied preset to ${targetId}!`);
    }
  }

  function applyComponentPreset(targetId) {
    applyMotionToPreview();
    if (window.App) window.App.showToast(`Updated ${targetId} animations!`);
  }

  function removeComponentPreset(targetId) {
    motionState.components[targetId] = '';
    applyMotionToPreview();
    if (window.App) {
      window.App.renderMotionPanel();
      window.App.showToast(`Removed ${targetId} animation.`);
    }
  }

  function applyGlobalToPreview() {
    motionState.global.enabled = true;
    applyMotionToPreview();
    if (window.App) window.App.showToast('Global Website Animation applied!');
  }

  function removeGlobalAnimation() {
    motionState.global.enabled = false;
    applyMotionToPreview();
    if (window.App) {
      window.App.renderMotionPanel();
      window.App.showToast('Removed Global Website Animation.');
    }
  }

  function resetAllAnimations() {
    motionState.global = {
      enabled: false,
      preset: '',
      intensity: 'medium',
      speed: 0.8,
      delay: 0,
      desktop: true,
      mobile: true,
      reducedMotion: true
    };
    motionState.components = {
      hero: '',
      header: '',
      products: '',
      buttons: '',
      features: '',
      faqs: '',
      footer: ''
    };
    applyMotionToPreview();
    if (window.App) {
      window.App.renderMotionPanel();
      window.App.showToast('Reset all store animations to clean default.');
    }
  }

  // Bind animation classes directly to the preview DOM element (.store-root)
  function applyMotionToPreview() {
    const previewContainer = document.getElementById('preview-container');
    if (!previewContainer) return;

    const storeRoot = previewContainer.querySelector('.store-root');
    if (!storeRoot) return;

    // Remove old motion classes
    GLOBAL_PRESETS.forEach(p => {
      if (p.class) storeRoot.classList.remove(p.class);
    });
    storeRoot.classList.remove(
      'intensity-subtle', 'intensity-medium', 'intensity-high',
      'disable-desktop-anim', 'disable-mobile-anim'
    );

    Object.keys(COMPONENT_PRESETS).forEach(t => {
      COMPONENT_PRESETS[t].forEach(p => {
        if (p.class) storeRoot.classList.remove(p.class);
      });
    });

    // Re-apply current motion classes
    if (motionState.global.enabled && motionState.global.preset) {
      const g = GLOBAL_PRESETS.find(x => x.id === motionState.global.preset);
      if (g && g.class) storeRoot.classList.add(g.class);
      storeRoot.classList.add(`intensity-${motionState.global.intensity}`);
      if (!motionState.global.desktop) storeRoot.classList.add('disable-desktop-anim');
      if (!motionState.global.mobile) storeRoot.classList.add('disable-mobile-anim');

      storeRoot.style.setProperty('--global-anim-duration', `${motionState.global.speed}s`);
      storeRoot.style.setProperty('--global-anim-delay', `${motionState.global.delay}s`);

      if (motionState.global.preset === 'scroll-reveal') {
        setTimeout(setupScrollObserver, 150);
      }
    }

    // Component classes
    Object.keys(motionState.components).forEach(target => {
      const presetId = motionState.components[target];
      if (presetId) {
        const pList = COMPONENT_PRESETS[target] || [];
        const pObj = pList.find(x => x.id === presetId);
        if (pObj && pObj.class) storeRoot.classList.add(pObj.class);
      }
    });

    // Keep state updated in App.STATE
    if (window.App && window.App.getState) {
      const st = window.App.getState();
      st.motion = JSON.parse(JSON.stringify(motionState));
    }
  }

  // Restore motion state (e.g. from saved state)
  function setMotionState(state) {
    if (state && typeof state === 'object') {
      if (state.global) motionState.global = { ...motionState.global, ...state.global };
      if (state.components) motionState.components = { ...motionState.components, ...state.components };
    }
    applyMotionToPreview();
  }

  function getMotionState() {
    return JSON.parse(JSON.stringify(motionState));
  }

  return {
    renderPanel,
    setTarget,
    toggleGlobal,
    selectGlobalPreset,
    setIntensity,
    setSpeed,
    setDelay,
    setDevice,
    setReducedMotion,
    selectComponentPreset,
    applyComponentPreset,
    removeComponentPreset,
    applyGlobalToPreview,
    removeGlobalAnimation,
    resetAllAnimations,
    applyMotionToPreview,
    getAppliedMotionClasses,
    getAppliedInlineStyles,
    setMotionState,
    getMotionState,
    setupScrollObserver
  };
})();
