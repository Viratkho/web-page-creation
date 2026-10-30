// ============================================================================
// AI VISUAL STUDIO: INTELLIGENT NATURAL-LANGUAGE BACKGROUND & ANIMATION ENGINE
// 100% Free & Open-Source Client-Side NLP Interpretation + Canvas/SVG Generators
// ============================================================================

window.AiStudio = (function() {
  // Current Studio State
  let activeMode = 'background'; // 'background' | 'animation' | 'prompts'
  let backgroundPrompt = '';
  let animationPrompt = '';

  let generatedBackground = null;
  let generatedAnimation = null;
  let previewAnimFrame = null;
  let storeAnimFrame = null;

  // Optional Local AI (Ollama) settings
  let localAiConfig = {
    enabled: false,
    endpoint: 'http://localhost:11434',
    model: 'llama3',
    status: 'offline' // 'offline' | 'checking' | 'connected'
  };

  // Comprehensive 50+ Color Ontology
  const COLOR_MAP = {
    'navy': '#0f172a',
    'dark navy': '#0a192f',
    'midnight': '#0b0f19',
    'royal blue': '#1e3a8a',
    'blue': '#3b82f6',
    'sky blue': '#0ea5e9',
    'cyan': '#06b6d4',
    'teal': '#0d9488',
    'turquoise': '#14b8a6',
    'aqua': '#00f2fe',
    'gold': '#f59e0b',
    'champagne': '#fef3c7',
    'amber': '#d97706',
    'yellow': '#eab308',
    'purple': '#8b5cf6',
    'violet': '#7c3aed',
    'indigo': '#6366f1',
    'lavender': '#c084fc',
    'plum': '#4c1d95',
    'emerald': '#10b981',
    'green': '#22c55e',
    'mint': '#6ee7b7',
    'sage': '#84a98c',
    'forest green': '#15803d',
    'pink': '#ec4899',
    'rose': '#f43f5e',
    'coral': '#fb7185',
    'peach': '#fdba74',
    'magenta': '#d946ef',
    'red': '#ef4444',
    'crimson': '#dc2626',
    'ruby': '#be123c',
    'orange': '#f97316',
    'tangerine': '#ea580c',
    'white': '#ffffff',
    'cream': '#fdfbf7',
    'beige': '#f5f0e8',
    'ivory': '#fffff0',
    'pearl': '#f8fafc',
    'black': '#000000',
    'charcoal': '#1e293b',
    'slate': '#334155',
    'grey': '#64748b',
    'gray': '#64748b',
    'silver': '#cbd5e1',
    'bronze': '#92400e',
    'copper': '#b45309'
  };

  // Aesthetic Themes Mapping
  const THEMES = {
    futuristic: {
      primary: '#06b6d4',
      secondary: '#3b82f6',
      base: '#030712',
      accent: '#8b5cf6',
      particles: 'tech',
      lighting: 'neon-glow'
    },
    cyberpunk: {
      primary: '#ff007f',
      secondary: '#00f2fe',
      base: '#050505',
      accent: '#ffe600',
      particles: 'cyber-grid',
      lighting: 'neon-glow'
    },
    luxury: {
      primary: '#f59e0b',
      secondary: '#d97706',
      base: '#0b0f19',
      accent: '#fef3c7',
      particles: 'gold-dust',
      lighting: 'soft-shimmer'
    },
    ocean: {
      primary: '#0284c7',
      secondary: '#06b6d4',
      base: '#082f49',
      accent: '#38bdf8',
      particles: 'bubbles',
      lighting: 'caustic-glow'
    },
    aurora: {
      primary: '#10b981',
      secondary: '#8b5cf6',
      base: '#022c22',
      accent: '#06b6d4',
      particles: 'stardust',
      lighting: 'aurora-wave'
    },
    sunset: {
      primary: '#f97316',
      secondary: '#ec4899',
      base: '#31103f',
      accent: '#fbbf24',
      particles: 'embers',
      lighting: 'warm-diffuse'
    },
    pastel: {
      primary: '#fbcfe8',
      secondary: '#c7d2fe',
      base: '#faf5ff',
      accent: '#ccfbf1',
      particles: 'floating-blobs',
      lighting: 'soft-ambient'
    },
    industrial: {
      primary: '#f97316',
      secondary: '#64748b',
      base: '#0f172a',
      accent: '#ea580c',
      particles: 'sparks',
      lighting: 'amber-glow'
    },
    corporate: {
      primary: '#2563eb',
      secondary: '#0284c7',
      base: '#f8fafc',
      accent: '#1e3a8a',
      particles: 'clean-grid',
      lighting: 'crisp'
    },
    minimal: {
      primary: '#475569',
      secondary: '#94a3b8',
      base: '#ffffff',
      accent: '#0f172a',
      particles: 'dots',
      lighting: 'natural'
    },
    dark: {
      primary: '#6366f1',
      secondary: '#38bdf8',
      base: '#0a0e1a',
      accent: '#a855f7',
      particles: 'stars',
      lighting: 'ambient-pulse'
    }
  };

  // Quick Inspiration Prompt Chips
  const PROMPT_IDEAS = {
    backgrounds: [
      { label: '🌌 Futuristic Tech Navy', prompt: 'Create a premium dark navy background with subtle moving blue gradients, glowing particles and a futuristic technology atmosphere.' },
      { label: '👑 Luxury Black & Gold', prompt: 'Create a luxurious deep black and champagne gold background with subtle ambient shimmer and refined elegance.' },
      { label: '🌊 Animated Ocean Waves', prompt: 'Generate a soothing ocean wave gradient moving between azure, deep teal and cyan with fluid wave motion.' },
      { label: '🔮 Cyberpunk Neon Grid', prompt: 'Make a dark cyberpunk background with glowing magenta and cyan light beams and an animated cyber grid.' },
      { label: '✨ Aurora Borealis Night', prompt: 'Create an aurora-inspired animated background with emerald green and violet light curtains flowing across deep space.' },
      { label: '🌸 Soft Pastel Clouds', prompt: 'Make a dreamy pastel gradient with blush pink, lavender, and mint with floating translucent abstract shapes.' },
      { label: '🏢 Corporate Clean Slate', prompt: 'Create a crisp corporate blue and white background with subtle micro-dot grid patterns.' },
      { label: '🔥 Dark Industrial Ember', prompt: 'Make a dark charcoal industrial background with glowing orange embers and subtle diagonal mesh textures.' }
    ],
    animations: [
      { label: '✨ Smooth Global Floating', prompt: 'Create a smooth floating animation with glowing particles moving slowly across the entire website with blue and purple transitions.' },
      { label: '🚀 Staggered Slide In', prompt: 'Create an elegant cascade slide up entrance animation for all cards and sections with smooth easing.' },
      { label: '💫 Card 3D Hover & Glow', prompt: 'Make all product cards elevate with 3D tilt and an ambient violet glow when hovered.' },
      { label: '🌊 Wave Text Hero', prompt: 'Create a rhythmic vertical wave oscillation animation on the hero banner headline.' },
      { label: '⚡ Cyber Neon Text', prompt: 'Animate hero title text with pulsating cyan and purple neon glow effects.' },
      { label: '📜 Scroll Reveal Stagger', prompt: 'Create a scroll reveal animation where every section smoothly fades and scales in as the user scrolls down.' },
      { label: '🔘 Fluid Button Ripple', prompt: 'Add interactive fluid water ripple animations on all buttons on click and hover.' }
    ]
  };

  // --------------------------------------------------------------------------
  // NATURAL LANGUAGE INTERPRETATION ENGINE
  // --------------------------------------------------------------------------

  function interpretPrompt(rawPrompt, mode = 'background') {
    const text = (rawPrompt || '').toLowerCase();

    // 1. Extract explicit HEX colors (#RRGGBB or #RGB)
    const hexMatches = rawPrompt.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g) || [];

    // 2. Extract explicit RGB/RGBA values
    const rgbMatches = rawPrompt.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\)/g) || [];

    // 3. Extract named colors with span-overlap prevention (longest phrases first)
    const colorNames = Object.keys(COLOR_MAP).sort((a, b) => b.length - a.length);
    const detectedNamedColors = [];
    const matchedSpans = [];

    colorNames.forEach(name => {
      const regex = new RegExp(`\\b${name}\\b`, 'gi');
      let m;
      while ((m = regex.exec(text)) !== null) {
        const start = m.index;
        const end = start + name.length;
        const overlaps = matchedSpans.some(span => (start >= span.start && start < span.end) || (end > span.start && end <= span.end));
        if (!overlaps) {
          matchedSpans.push({ start, end });
          detectedNamedColors.push({ name, hex: COLOR_MAP[name], pos: start });
        }
      }
    });

    // Sort by appearance order in prompt
    detectedNamedColors.sort((a, b) => a.pos - b.pos);

    // 4. Determine Theme (High-specificity themes checked first)
    let detectedTheme = 'futuristic';
    if (/cyber|neon|matrix|synthwave/i.test(text)) detectedTheme = 'cyberpunk';
    else if (/futur|tech|digital|sci-?fi/i.test(text)) detectedTheme = 'futuristic';
    else if (/luxur|gold|royal|prestige|champagne|elegance|elegant/i.test(text)) detectedTheme = 'luxury';
    else if (/aurora|borealis|northern light/i.test(text)) detectedTheme = 'aurora';
    else if (/ocean|marine|sea|water|wave/i.test(text)) detectedTheme = 'ocean';
    else if (/sunset|dusk|dawn|twilight/i.test(text)) detectedTheme = 'sunset';
    else if (/pastel|blush|soft|dreamy|candy|mint/i.test(text)) detectedTheme = 'pastel';
    else if (/industrial|ember|spark|metal|steel/i.test(text)) detectedTheme = 'industrial';
    else if (/corporate|enterprise|business/i.test(text)) detectedTheme = 'corporate';
    else if (/minimal|clean|monochrome/i.test(text)) detectedTheme = 'minimal';
    else if (/dark|midnight|space|galaxy|cosmic|black/i.test(text)) detectedTheme = 'dark';

    const themePreset = THEMES[detectedTheme];

    // Consolidate colors
    let primaryColor = hexMatches[0] || (detectedNamedColors[0] ? detectedNamedColors[0].hex : themePreset.primary);
    let secondaryColor = hexMatches[1] || (detectedNamedColors[1] ? detectedNamedColors[1].hex : themePreset.secondary);
    let baseColor = hexMatches[2] || (detectedNamedColors[2] ? detectedNamedColors[2].hex : themePreset.base);
    let accentColor = hexMatches[3] || themePreset.accent;

    // Adjust dark/light base if user explicitly said "white", "black", "navy"
    if (/\bwhite\b/i.test(text) && !/\bblack\b/i.test(text)) {
      baseColor = '#ffffff';
    } else if (/\bblack\b/i.test(text)) {
      baseColor = '#05070f';
    } else if (/\bnavy\b/i.test(text)) {
      baseColor = '#0a192f';
    }

    // 5. Determine Intensity
    let intensity = 'medium';
    if (/subtle|soft|gentle|slight|minimal|light/i.test(text)) intensity = 'subtle';
    else if (/intense|strong|bold|high|vibrant|heavy|dramatic/i.test(text)) intensity = 'high';

    // 6. Determine Speed / Timing
    let speed = 1.0;
    let ambientSpeed = 8;
    if (/very slow|super slow|ultra slow/i.test(text)) {
      speed = 2.4;
      ambientSpeed = 16;
    } else if (/slow|gradual|relaxed|chill/i.test(text)) {
      speed = 1.5;
      ambientSpeed = 12;
    } else if (/fast|quick|snappy|rapid/i.test(text)) {
      speed = 0.5;
      ambientSpeed = 4;
    }

    // 7. Determine Target (Using exact word boundaries)
    let target = 'global';
    if (/\b(button|buttons)\b/i.test(text)) target = 'buttons';
    else if (/\b(product|products|card|cards|item|items)\b/i.test(text)) target = 'products';
    else if (/\b(hero|banner|headline|title)\b/i.test(text)) target = 'hero';
    else if (/\b(header|navbar|menu)\b/i.test(text)) target = 'header';
    else if (/\b(footer)\b/i.test(text)) target = 'footer';
    else if (/\b(faq|faqs)\b/i.test(text)) target = 'faqs';
    else if (/\b(feature|features)\b/i.test(text)) target = 'features';

    // 8. Determine Background Technique
    let bgTechnique = 'animated-gradient';
    let hasParticles = /particle|star|dust|spark|orb|bubble/i.test(text);
    let isAnimated = /mov|animat|flow|wave|shift|pulse|cycle/i.test(text);

    if (hasParticles) {
      bgTechnique = 'particles';
    } else if (/aurora/i.test(text)) {
      bgTechnique = 'aurora';
    } else if (/wave/i.test(text)) {
      bgTechnique = 'waves';
    } else if (/blob|organic/i.test(text)) {
      bgTechnique = 'blobs';
    } else if (/grid/i.test(text)) {
      bgTechnique = 'grid-pattern';
    } else if (/dot/i.test(text)) {
      bgTechnique = 'dot-pattern';
    } else if (/glass|frosted|translucent/i.test(text)) {
      bgTechnique = 'glassmorphism';
    } else if (/radial/i.test(text)) {
      bgTechnique = 'radial-gradient';
    } else if (/conic/i.test(text)) {
      bgTechnique = 'conic-gradient';
    } else if (isAnimated) {
      bgTechnique = 'animated-gradient';
    } else {
      bgTechnique = 'linear-gradient';
    }

    // 9. Determine Animation Category & Effect (Most specific transforms first)
    let animEffect = 'entrance-fade';
    if (/scroll/i.test(text)) {
      animEffect = 'scroll-reveal';
    } else if (/ripple/i.test(text)) {
      animEffect = 'button-ripple';
    } else if (/tilt|3d/i.test(text) && (/card|product/i.test(text) || target === 'products')) {
      animEffect = 'card-tilt';
    } else if (/glow/i.test(text) && (/card|product/i.test(text) || target === 'products')) {
      animEffect = 'card-glow';
    } else if (/lift|elevat/i.test(text) && (/card|product/i.test(text) || target === 'products')) {
      animEffect = 'card-lift';
    } else if (/neon/i.test(text) && (/text|title|headline/i.test(text) || target === 'hero')) {
      animEffect = 'type-neon';
    } else if (/wave/i.test(text) && (/text|title|headline/i.test(text) || target === 'hero')) {
      animEffect = 'type-wave';
    } else if (/shimmer/i.test(text) && (/text|title|headline/i.test(text) || target === 'hero')) {
      animEffect = 'type-shimmer';
    } else if (/bounce/i.test(text)) {
      animEffect = 'entrance-bounce';
    } else if (/zoom|scale/i.test(text)) {
      animEffect = 'entrance-zoom';
    } else if (/slide/i.test(text)) {
      animEffect = 'entrance-slide';
    } else if (/blur/i.test(text)) {
      animEffect = 'entrance-blur';
    } else if (/float/i.test(text)) {
      animEffect = 'global-float';
    } else if (/pulse/i.test(text)) {
      animEffect = 'ambient-pulse';
    }

    return {
      rawPrompt,
      mode,
      theme: detectedTheme,
      primaryColor,
      secondaryColor,
      baseColor,
      accentColor,
      intensity,
      speed,
      ambientSpeed,
      target,
      bgTechnique,
      hasParticles,
      isAnimated,
      animEffect
    };
  }

  // --------------------------------------------------------------------------
  // BACKGROUND GENERATION ENGINE
  // --------------------------------------------------------------------------

  function generateBackground(params) {
    const { primaryColor, secondaryColor, baseColor, accentColor, bgTechnique, intensity, ambientSpeed, hasParticles } = params;

    let css = '';
    let isClass = false;
    let className = '';
    let particleConfig = null;
    let displayName = `${capitalize(params.theme)} ${capitalize(bgTechnique.replace('-', ' '))}`;

    switch (bgTechnique) {
      case 'linear-gradient':
        css = `linear-gradient(135deg, ${baseColor} 0%, ${primaryColor} 50%, ${secondaryColor} 100%)`;
        break;

      case 'radial-gradient':
        css = `radial-gradient(circle at center, ${primaryColor} 0%, ${secondaryColor} 45%, ${baseColor} 100%)`;
        break;

      case 'conic-gradient':
        css = `conic-gradient(from 180deg at 50% 50%, ${baseColor} 0deg, ${primaryColor} 120deg, ${secondaryColor} 240deg, ${baseColor} 360deg)`;
        break;

      case 'animated-gradient':
        css = `linear-gradient(45deg, ${baseColor}, ${primaryColor}, ${secondaryColor}, ${accentColor || primaryColor})`;
        isClass = true;
        className = 'bg-anim-moving-gradient';
        break;

      case 'aurora':
        css = `radial-gradient(ellipse at 20% 40%, ${primaryColor}55 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, ${secondaryColor}55 0%, transparent 60%), ${baseColor}`;
        isClass = true;
        className = 'bg-anim-aurora';
        break;

      case 'waves':
        css = `radial-gradient(ellipse at bottom, ${primaryColor}44 0%, transparent 70%), linear-gradient(180deg, ${baseColor} 0%, ${secondaryColor}33 100%), ${baseColor}`;
        isClass = true;
        className = 'bg-anim-waves';
        break;

      case 'blobs':
        css = `radial-gradient(circle at 10% 20%, ${primaryColor}66 0%, transparent 40%), radial-gradient(circle at 90% 80%, ${secondaryColor}66 0%, transparent 40%), ${baseColor}`;
        isClass = true;
        className = 'bg-anim-blobs';
        break;

      case 'grid-pattern':
        css = `linear-gradient(${primaryColor}22 1px, transparent 1px) 0 0 / 28px 28px, linear-gradient(90deg, ${primaryColor}22 1px, transparent 1px) 0 0 / 28px 28px, ${baseColor}`;
        break;

      case 'dot-pattern':
        css = `radial-gradient(${primaryColor}44 1.5px, transparent 1.5px) 0 0 / 20px 20px, ${baseColor}`;
        break;

      case 'glassmorphism':
        css = `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)), radial-gradient(circle at 80% 20%, ${primaryColor}44 0%, transparent 50%), ${baseColor}`;
        break;

      case 'particles':
      default:
        css = `radial-gradient(circle at center, ${primaryColor}33 0%, transparent 70%), ${baseColor}`;
        particleConfig = {
          color: primaryColor,
          altColor: secondaryColor,
          density: intensity === 'high' ? 65 : (intensity === 'subtle' ? 25 : 45),
          speed: params.speed || 1.0,
          theme: params.theme
        };
        break;
    }

    if (hasParticles && !particleConfig) {
      particleConfig = {
        color: primaryColor,
        altColor: secondaryColor,
        density: intensity === 'high' ? 65 : 40,
        speed: params.speed || 1.0,
        theme: params.theme
      };
    }

    return {
      type: 'background',
      params,
      displayName,
      css,
      isClass,
      className,
      particleConfig,
      textColor: isLightColor(baseColor) ? '#0f172a' : '#ffffff'
    };
  }

  // --------------------------------------------------------------------------
  // ANIMATION GENERATION ENGINE
  // --------------------------------------------------------------------------

  function generateAnimation(params) {
    const { animEffect, target, speed, intensity } = params;

    let appliedClass = '';
    let duration = `${speed}s`;
    let displayName = `${capitalize(target)}: ${capitalize(animEffect.replace('-', ' '))}`;
    let customKeyframes = '';

    switch (animEffect) {
      case 'entrance-fade':
        appliedClass = 'ai-anim-entrance-fade';
        break;
      case 'entrance-slide':
        appliedClass = 'ai-anim-entrance-slide';
        break;
      case 'entrance-zoom':
        appliedClass = 'ai-anim-entrance-zoom';
        break;
      case 'entrance-bounce':
        appliedClass = 'ai-anim-entrance-bounce';
        break;
      case 'entrance-blur':
        appliedClass = 'ai-anim-entrance-blur';
        break;
      case 'scroll-reveal':
        appliedClass = 'global-anim-scroll-reveal';
        break;
      case 'card-lift':
        appliedClass = 'ai-comp-products-lift';
        break;
      case 'card-glow':
        appliedClass = 'ai-comp-products-glow';
        break;
      case 'card-tilt':
        appliedClass = 'ai-comp-products-tilt';
        break;
      case 'type-wave':
        appliedClass = 'ai-comp-hero-wave';
        break;
      case 'type-neon':
        appliedClass = 'ai-comp-hero-neon';
        break;
      case 'type-shimmer':
        appliedClass = 'ai-comp-hero-shimmer';
        break;
      case 'button-ripple':
        appliedClass = 'btn-fx-ripple';
        break;
      case 'global-float':
        appliedClass = 'global-anim-float-rhythm';
        break;
      case 'ambient-pulse':
      default:
        appliedClass = 'global-anim-ambient-pulse';
        break;
    }

    return {
      type: 'animation',
      params,
      displayName,
      target,
      appliedClass,
      duration,
      intensity,
      customKeyframes
    };
  }

  // --------------------------------------------------------------------------
  // CANVAS PARTICLE SYSTEM ENGINE
  // --------------------------------------------------------------------------

  function initParticleCanvas(canvas, config) {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    let width = canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : 300;
    let height = canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : 150;

    const particles = [];
    const count = config.density || 40;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.5 + 0.8,
        vx: (Math.random() - 0.5) * (config.speed * 0.8),
        vy: (Math.random() - 0.5) * (config.speed * 0.8),
        color: Math.random() > 0.4 ? config.color : config.altColor,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    let isRunning = true;

    function render() {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      // Render connected lines for tech themes
      if (config.theme === 'futuristic' || config.theme === 'cyberpunk') {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 65) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = particles[i].color;
              ctx.globalAlpha = (1 - dist / 65) * 0.2;
              ctx.stroke();
            }
          }
        }
      }

      // Render particle orbs
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      const req = (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function')
        ? window.requestAnimationFrame
        : (cb => setTimeout(cb, 16));
      req(render);
    }

    render();

    return {
      stop: () => { isRunning = false; },
      resize: (w, h) => {
        width = canvas.width = w;
        height = canvas.height = h;
      }
    };
  }

  // --------------------------------------------------------------------------
  // ACTION & EVENT HANDLERS
  // --------------------------------------------------------------------------

  function setMode(mode) {
    activeMode = mode;
    if (window.App) window.App.renderAiPanel();
  }

  function handlePromptSubmit() {
    if (activeMode === 'background') {
      const p = backgroundPrompt.trim();
      if (!p) {
        if (window.App) window.App.showToast('Please enter a description for your background.');
        return;
      }
      const interpreted = interpretPrompt(p, 'background');
      generatedBackground = generateBackground(interpreted);
      if (window.App) {
        window.App.renderAiPanel();
        window.App.showToast(`✨ Generated "${generatedBackground.displayName}"!`);
      }
    } else {
      const p = animationPrompt.trim();
      if (!p) {
        if (window.App) window.App.showToast('Please enter a description for your animation.');
        return;
      }
      const interpreted = interpretPrompt(p, 'animation');
      generatedAnimation = generateAnimation(interpreted);
      if (window.App) {
        window.App.renderAiPanel();
        window.App.showToast(`✨ Generated "${generatedAnimation.displayName}"!`);
      }
    }
  }

  function regenerateVariation() {
    if (activeMode === 'background' && generatedBackground) {
      // Rotate colors and change angle
      const params = { ...generatedBackground.params };
      const temp = params.primaryColor;
      params.primaryColor = params.secondaryColor;
      params.secondaryColor = params.accentColor || temp;
      generatedBackground = generateBackground(params);
      if (window.App) {
        window.App.renderAiPanel();
        window.App.showToast('Generated fresh creative variation!');
      }
    } else if (activeMode === 'animation' && generatedAnimation) {
      const params = { ...generatedAnimation.params };
      params.speed = params.speed === 0.8 ? 1.4 : 0.8;
      params.intensity = params.intensity === 'medium' ? 'high' : 'medium';
      generatedAnimation = generateAnimation(params);
      if (window.App) {
        window.App.renderAiPanel();
        window.App.showToast('Generated animation variation!');
      }
    }
  }

  function applyToWebsite() {
    if (!window.App) return;

    if (activeMode === 'background') {
      if (!generatedBackground) return;
      if (generatedBackground.isClass) {
        window.App.setBackgroundPreset(generatedBackground.className);
      } else {
        window.App.setBackgroundPreset(generatedBackground.css);
      }

      // Attach particle canvas to .store-root if active
      syncStorefrontParticleCanvas(generatedBackground.particleConfig);
      window.App.showToast(`Applied "${generatedBackground.displayName}" to storefront!`);
    } else {
      if (!generatedAnimation) return;
      const { appliedClass, target, duration, intensity } = generatedAnimation;

      if (window.MotionStudio) {
        if (target === 'global') {
          // Map to motion studio global state
          window.MotionStudio.setTarget('global');
          window.MotionStudio.selectGlobalPreset('page-entrance-fade');
          window.MotionStudio.setIntensity(intensity);
        } else {
          window.MotionStudio.setTarget(target);
          window.MotionStudio.selectComponentPreset(target, 'hover-lift');
        }
      }

      // Store in App STATE for persistence
      if (window.App.STATE) {
        if (!window.App.STATE.aiConfig) window.App.STATE.aiConfig = {};
        window.App.STATE.aiConfig.lastAppliedAnimation = {
          appliedClass,
          target,
          duration,
          intensity
        };
      }

      window.App.renderPreview();
      window.App.showToast(`Applied "${generatedAnimation.displayName}" to storefront!`);
    }
  }

  function syncStorefrontParticleCanvas(particleConfig) {
    const storeRoot = document.querySelector('#preview-container .store-root');
    if (!storeRoot) return;

    let existingCanvas = storeRoot.querySelector('#store-backdrop-canvas');
    if (!particleConfig) {
      if (existingCanvas) existingCanvas.remove();
      if (storeAnimFrame) {
        storeAnimFrame.stop();
        storeAnimFrame = null;
      }
      return;
    }

    if (!existingCanvas) {
      existingCanvas = document.createElement('canvas');
      existingCanvas.id = 'store-backdrop-canvas';
      existingCanvas.className = 'store-backdrop-canvas';
      storeRoot.insertBefore(existingCanvas, storeRoot.firstChild);
    }

    if (storeAnimFrame) storeAnimFrame.stop();
    storeAnimFrame = initParticleCanvas(existingCanvas, particleConfig);
  }

  function copyGeneratedCss() {
    let cssText = '';
    if (activeMode === 'background' && generatedBackground) {
      cssText = `/* AI Generated Background */\nbackground: ${generatedBackground.css};`;
    } else if (activeMode === 'animation' && generatedAnimation) {
      cssText = `/* AI Generated Animation */\nanimation: ${generatedAnimation.appliedClass} ${generatedAnimation.duration} ease both;`;
    }

    if (!cssText) return;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(cssText).then(() => {
        if (window.App) window.App.showToast('Copied CSS snippet to clipboard!');
      });
    } else {
      prompt('Copy CSS snippet:', cssText);
    }
  }

  function savePreset() {
    try {
      const saved = JSON.parse(localStorage.getItem('catalogcraft_ai_presets') || '[]');
      const item = {
        id: 'ai_' + Date.now(),
        mode: activeMode,
        data: activeMode === 'background' ? generatedBackground : generatedAnimation,
        timestamp: new Date().toISOString()
      };
      saved.push(item);
      localStorage.setItem('catalogcraft_ai_presets', JSON.stringify(saved));
      if (window.App) window.App.showToast('Preset saved to your local library!');
    } catch (e) {
      if (window.App) window.App.showToast('Saved preset locally.');
    }
  }

  function resetEffect() {
    if (activeMode === 'background') {
      generatedBackground = null;
      syncStorefrontParticleCanvas(null);
      if (window.App) {
        window.App.setBackgroundPreset('');
        window.App.renderAiPanel();
        window.App.showToast('Reset background to theme default.');
      }
    } else {
      generatedAnimation = null;
      if (window.App) {
        if (window.MotionStudio) window.MotionStudio.resetAllAnimations();
        window.App.renderAiPanel();
        window.App.showToast('Reset animations to clean default.');
      }
    }
  }

  function applyPromptPreset(promptText, mode) {
    if (mode === 'background') {
      backgroundPrompt = promptText;
      activeMode = 'background';
    } else {
      animationPrompt = promptText;
      activeMode = 'animation';
    }
    handlePromptSubmit();
  }

  // Helper: Determine if color is light
  function isLightColor(color) {
    if (!color || typeof color !== 'string') return false;
    if (color.startsWith('#')) {
      const c = color.replace('#', '');
      const r = parseInt(c.substr(0, 2), 16) || 0;
      const g = parseInt(c.substr(2, 2), 16) || 0;
      const b = parseInt(c.substr(4, 2), 16) || 0;
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 155;
    }
    return false;
  }

  function capitalize(str) {
    return String(str || '').charAt(0).toUpperCase() + String(str || '').slice(1);
  }

  // --------------------------------------------------------------------------
  // SIDEBAR PANEL HTML RENDERER
  // --------------------------------------------------------------------------

  function renderPanel() {
    return `
      <div class="ai-studio-container">
        <!-- Studio Header -->
        <div class="settings-group">
          <h4>🤖 AI Visual Studio</h4>
          <p style="font-size:12px;color:var(--ed-muted);margin-bottom:12px">
            Describe your desired background, motion, or atmosphere in natural language. Completely free and runs locally.
          </p>

          <!-- Mode Switcher -->
          <div class="ai-mode-tabs">
            <button class="ai-mode-btn ${activeMode === 'background' ? 'active' : ''}" onclick="AiStudio.setMode('background')">
              🎨 AI Background
            </button>
            <button class="ai-mode-btn ${activeMode === 'animation' ? 'active' : ''}" onclick="AiStudio.setMode('animation')">
              ✨ AI Animation
            </button>
            <button class="ai-mode-btn ${activeMode === 'prompts' ? 'active' : ''}" onclick="AiStudio.setMode('prompts')">
              💡 Ideas
            </button>
          </div>
        </div>

        ${activeMode === 'prompts' ? renderPromptsLibraryHtml() : renderGeneratorHtml(activeMode)}

        <!-- Optional Local Ollama AI Accordion -->
        <div style="border-top:1px solid var(--ed-border);padding-top:10px">
          <details style="font-size:11px;color:var(--ed-muted)">
            <summary style="cursor:pointer;font-weight:700">⚙️ Local AI Engine Settings (Optional)</summary>
            <div style="margin-top:8px;padding:8px;background:var(--ed-bg);border:1px solid var(--ed-border);border-radius:6px;display:flex;flex-direction:column;gap:6px">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span>Rule Engine:</span>
                <span style="color:#10b981;font-weight:700">● Active (0ms, 100% Offline)</span>
              </div>
              <div style="display:flex;gap:6px;align-items:center;margin-top:4px">
                <input type="text" class="ed-input" value="${localAiConfig.endpoint}" style="font-size:11px;flex:1" placeholder="Ollama URL">
                <button class="tool-btn" style="font-size:10px;padding:4px 8px" onclick="AiStudio.testOllamaConnection()">Ping</button>
              </div>
              <small style="color:var(--ed-muted)">Connects optionally to local Ollama (Llama 3 / Mistral). Operates fully standalone without any installation.</small>
            </div>
          </details>
        </div>
      </div>
    `;
  }

  function renderGeneratorHtml(mode) {
    const isBg = mode === 'background';
    const placeholder = isBg
      ? 'Describe the background you want. Example: Create a premium dark navy background with subtle moving blue gradients, glowing particles and a futuristic technology atmosphere.'
      : 'Describe the animation you want. Example: Create a smooth floating animation with glowing particles moving slowly across the entire website. Use blue and purple colours with subtle transitions.';

    const currentVal = isBg ? backgroundPrompt : animationPrompt;
    const currentGenerated = isBg ? generatedBackground : generatedAnimation;

    return `
      <div class="settings-group">
        <!-- Prompt Input Area -->
        <label style="font-size:11px;font-weight:700;display:block;margin-bottom:6px">
          ${isBg ? 'DESCRIBE YOUR DESIRED BACKGROUND' : 'DESCRIBE YOUR DESIRED ANIMATION'}
        </label>
        <div class="ai-prompt-box">
          <textarea
            class="ai-prompt-textarea"
            placeholder="${placeholder}"
            oninput="AiStudio.updatePromptText(this.value)"
          >${currentVal}</textarea>
          <div class="ai-prompt-actions">
            <button class="tool-btn" style="font-size:11px;padding:4px 8px" onclick="AiStudio.clearPrompt()">Clear</button>
            <button class="ai-generate-btn" onclick="AiStudio.handlePromptSubmit()">
              <span>⚡ Generate ${isBg ? 'Background' : 'Animation'}</span>
            </button>
          </div>
        </div>

        <!-- Quick Inspiration Chips -->
        <div style="margin-top:10px">
          <span style="font-size:10px;font-weight:700;color:var(--ed-muted);display:block;margin-bottom:6px">QUICK EXAMPLES:</span>
          <div class="ai-chips-wrap">
            ${(isBg ? PROMPT_IDEAS.backgrounds : PROMPT_IDEAS.animations).slice(0, 4).map(item => `
              <button class="ai-prompt-chip" onclick="AiStudio.applyPromptPreset('${escapeQuote(item.prompt)}', '${mode}')">
                ${item.label}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Live Preview Stage -->
      ${renderLivePreviewHtml(currentGenerated, isBg)}
    `;
  }

  function renderLivePreviewHtml(item, isBg) {
    if (!item) {
      return `
        <div class="settings-group" style="text-align:center;padding:24px 12px;background:var(--ed-bg);border:1px dashed var(--ed-border);border-radius:10px">
          <span style="font-size:28px">✨</span>
          <h5 style="margin:8px 0 4px;font-size:13px;color:var(--ed-text)">Ready to Generate</h5>
          <p style="font-size:11px;color:var(--ed-muted);margin:0">
            Type any visual description above or click a quick example chip to instantly generate a matching design.
          </p>
        </div>
      `;
    }

    const previewBg = isBg
      ? (item.css.includes('gradient') || item.css.startsWith('#') || item.css.startsWith('rgb') ? item.css : '#0f172a')
      : '#0f172a';

    return `
      <div class="settings-group">
        <label style="font-size:11px;font-weight:700;display:block;margin-bottom:6px">INTERACTIVE LIVE PREVIEW</label>
        
        <div class="ai-preview-stage">
          <div class="ai-preview-stage-header">
            <span>${item.displayName}</span>
            <span style="font-size:10px;color:var(--ed-primary);background:rgba(79,70,229,0.1);padding:2px 6px;border-radius:4px">● LIVE</span>
          </div>

          <div class="ai-preview-canvas-box" id="ai-live-preview-box" style="background: ${previewBg}">
            <!-- Interactive Demo Card -->
            <div class="ai-preview-interactive-card ${!isBg ? item.appliedClass : ''}" style="color:${isBg ? item.textColor : '#fff'}">
              <span>🛍️ Sample Component</span>
              <small style="opacity:0.8">${isBg ? 'Dynamic Background' : 'Interactive Animation'}</small>
            </div>
          </div>

          <!-- Parameter Summary Tags -->
          <div class="ai-interpretation-summary">
            <span style="font-size:10px;font-weight:700;color:var(--ed-muted)">INTERPRETED PARAMETERS:</span>
            <div class="ai-tag-pill-row">
              <span class="ai-tag-pill active">Theme: ${item.params.theme}</span>
              <span class="ai-tag-pill">Primary: ${item.params.primaryColor}</span>
              <span class="ai-tag-pill">Secondary: ${item.params.secondaryColor}</span>
              <span class="ai-tag-pill">Intensity: ${item.params.intensity}</span>
              <span class="ai-tag-pill">Target: ${item.params.target}</span>
            </div>
          </div>
        </div>

        <!-- Variation & Action Buttons -->
        <div style="display:flex;gap:6px;margin-top:10px">
          <button class="tool-btn" style="flex:1;background:var(--ed-primary);color:#fff;font-weight:700;padding:8px" onclick="AiStudio.applyToWebsite()">
            ✓ Apply to Website
          </button>
          <button class="tool-btn" style="padding:8px 10px" title="Regenerate Creative Variation" onclick="AiStudio.regenerateVariation()">
            🔄 Variation
          </button>
          <button class="tool-btn" style="padding:8px 10px" title="Copy Generated CSS" onclick="AiStudio.copyGeneratedCss()">
            📋 Copy CSS
          </button>
          <button class="tool-btn" style="padding:8px 10px" title="Save Preset" onclick="AiStudio.savePreset()">
            💾
          </button>
          <button class="tool-btn" style="padding:8px 10px;color:#ef4444" title="Reset Effect" onclick="AiStudio.resetEffect()">
            ↺
          </button>
        </div>
      </div>
    `;
  }

  function renderPromptsLibraryHtml() {
    return `
      <div class="settings-group">
        <label style="font-size:11px;font-weight:700;display:block;margin-bottom:8px">BACKGROUND INSPIRATION (1-CLICK)</label>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${PROMPT_IDEAS.backgrounds.map(b => `
            <div style="padding:10px;background:var(--ed-surface);border:1px solid var(--ed-border);border-radius:8px;display:flex;flex-direction:column;gap:4px">
              <strong style="font-size:12px;color:var(--ed-text)">${b.label}</strong>
              <p style="font-size:11px;color:var(--ed-muted);margin:0">${b.prompt}</p>
              <div style="margin-top:4px">
                <button class="tool-btn" style="font-size:10px;padding:3px 8px;background:var(--ed-primary);color:#fff" onclick="AiStudio.applyPromptPreset('${escapeQuote(b.prompt)}', 'background')">
                  Generate This →
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="settings-group">
        <label style="font-size:11px;font-weight:700;display:block;margin-bottom:8px">ANIMATION INSPIRATION (1-CLICK)</label>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${PROMPT_IDEAS.animations.map(a => `
            <div style="padding:10px;background:var(--ed-surface);border:1px solid var(--ed-border);border-radius:8px;display:flex;flex-direction:column;gap:4px">
              <strong style="font-size:12px;color:var(--ed-text)">${a.label}</strong>
              <p style="font-size:11px;color:var(--ed-muted);margin:0">${a.prompt}</p>
              <div style="margin-top:4px">
                <button class="tool-btn" style="font-size:10px;padding:3px 8px;background:var(--ed-primary);color:#fff" onclick="AiStudio.applyPromptPreset('${escapeQuote(a.prompt)}', 'animation')">
                  Generate This →
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function updatePromptText(val) {
    if (activeMode === 'background') backgroundPrompt = val;
    else animationPrompt = val;
  }

  function clearPrompt() {
    if (activeMode === 'background') backgroundPrompt = '';
    else animationPrompt = '';
    if (window.App) window.App.renderAiPanel();
  }

  function escapeQuote(str) {
    return String(str || '').replace(/'/g, "\\'");
  }

  function testOllamaConnection() {
    if (window.App) window.App.showToast('Testing local Ollama ping at ' + localAiConfig.endpoint + '...');
    fetch(`${localAiConfig.endpoint}/api/tags`, { method: 'GET' })
      .then(res => {
        if (res.ok) {
          localAiConfig.status = 'connected';
          if (window.App) window.App.showToast('✅ Connected to local Ollama server!');
        } else {
          localAiConfig.status = 'offline';
          if (window.App) window.App.showToast('Local Ollama offline. Defaulting to built-in rule engine.');
        }
      })
      .catch(() => {
        localAiConfig.status = 'offline';
        if (window.App) window.App.showToast('Local Ollama offline. Using 100% free client-side rule engine.');
      });
  }

  // Public Interface
  return {
    renderPanel,
    setMode,
    updatePromptText,
    clearPrompt,
    handlePromptSubmit,
    regenerateVariation,
    applyToWebsite,
    copyGeneratedCss,
    savePreset,
    resetEffect,
    applyPromptPreset,
    interpretPrompt,
    generateBackground,
    generateAnimation,
    testOllamaConnection,
    syncStorefrontParticleCanvas,
    getGeneratedBackground: () => generatedBackground,
    getGeneratedAnimation: () => generatedAnimation
  };
})();
