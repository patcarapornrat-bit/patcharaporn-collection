/**
 * ============================================================================
 * 1. WEB AUDIO API DARK HORROR AMBIENT & SFX SYNTHESIZER
 * ============================================================================
 */
let soundEnabled = true;
let audioCtx = null;
let ambientDroneStarted = false;
let droneGainNode = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  if (audioCtx && !ambientDroneStarted && soundEnabled) {
    startDarkAmbientDrone();
  }
}

function startDarkAmbientDrone() {
  try {
    if (!audioCtx || ambientDroneStarted) return;
    ambientDroneStarted = true;
    const now = audioCtx.currentTime;

    // Deep eerie sub-bass drone
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    droneGainNode = audioCtx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, now); // Low A1
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(58.27, now); // Dissonant minor second beating

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);

    droneGainNode.gain.setValueAtTime(0.025, now);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(droneGainNode);
    droneGainNode.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
  } catch (e) {}
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const iconOn = document.getElementById('soundIconOn');
  const iconOff = document.getElementById('soundIconOff');
  const titleIndicator = document.getElementById('titleSoundIndicator');
  if (soundEnabled) {
    iconOn.classList.remove('hidden');
    iconOff.classList.add('hidden');
    if (titleIndicator) titleIndicator.textContent = '🔊';
    initAudio();
    if (droneGainNode && audioCtx) {
      droneGainNode.gain.setTargetAtTime(0.025, audioCtx.currentTime, 0.2);
    }
    playTone('sparkle');
  } else {
    iconOn.classList.add('hidden');
    iconOff.classList.remove('hidden');
    if (titleIndicator) titleIndicator.textContent = '🔇';
    if (droneGainNode && audioCtx) {
      droneGainNode.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.1);
    }
  }
}

function playTone(type = 'click') {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'whisper') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.14);
      gain.gain.setValueAtTime(0.022, now);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.17);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(390, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.09);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.13);
    } else if (type === 'sparkle') {
      // Cold glass chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1174.66, now + 0.08);
      osc.frequency.setValueAtTime(1318.51, now + 0.16);
      gain.gain.setValueAtTime(0.055, now);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.42);
      osc.start(now);
      osc.stop(now + 0.44);
    } else if (type === 'stoneGate') {
      // Heavy rumbling stone & heartbeat thud
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(85, now);
      osc.frequency.exponentialRampToValueAtTime(42, now + 0.55);
      gain.gain.setValueAtTime(0.11, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.62);
    } else if (type === 'celebrate') {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.connect(g);
        g.connect(audioCtx.destination);
        o.frequency.setValueAtTime(freq, now + i * 0.1);
        g.gain.setValueAtTime(0.07, now + i * 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.48);
        o.start(now + i * 0.1);
        o.stop(now + i * 0.1 + 0.5);
      });
    }
  } catch (e) {}
}

/**
 * ============================================================================
 * 3. REALISTIC HORROR PANORAMA & TITLE DIGITAL PAINTING CANVAS
 * ============================================================================
 */
function buildPanoramaHTML() {
  return `
    <div class="w-full h-full relative bg-gradient-to-b from-[#04060c] via-[#0e1528] to-[#1e1633]">
      <!-- Eerie Pale Moon behind Storm Clouds -->
      <div class="absolute top-10 right-16 w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-200 via-slate-100 to-amber-100 opacity-85 shadow-[0_0_65px_20px_rgba(165,243,252,0.3)]"></div>
      <!-- Volumetric Cold Mist & Festival Glows -->
      <div class="absolute top-1/4 left-12 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl"></div>
      <div class="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-500/25 blur-3xl"></div>

      <!-- Realistic Grim City Skyline SVG (Cracked Towers, Twisted Scaffolding & Flickering Neon) -->
      <svg class="absolute bottom-0 left-0 w-full h-[80%]" viewBox="0 0 1200 420" preserveAspectRatio="none">
        <defs>
          <linearGradient id="farSkyline" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#090d16" />
            <stop offset="50%" stop-color="#172038" />
            <stop offset="100%" stop-color="#2a1942" />
          </linearGradient>
          <linearGradient id="midSkyline" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0e7490" />
            <stop offset="40%" stop-color="#4338ca" />
            <stop offset="75%" stop-color="#9d174d" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>
          <linearGradient id="groundGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#05070c" />
            <stop offset="50%" stop-color="#111827" />
            <stop offset="100%" stop-color="#1e1b4b" />
          </linearGradient>
        </defs>

        <!-- Distant Ruined Spires & Foggy Cathedral Silhouettes -->
        <path fill="url(#farSkyline)" opacity="0.85" d="M0,335 L0,195 L45,195 L55,145 L65,195 L115,195 L115,235 L185,235 L195,115 L210,115 L220,235 L290,235 L290,165 L355,165 L355,245 L440,245 L450,95 L465,110 L475,245 L560,245 L560,175 L645,175 L645,230 L735,230 L750,110 L768,110 L780,230 L875,230 L875,155 L965,155 L965,215 L1065,215 L1080,125 L1100,125 L1115,215 L1200,215 L1200,335 Z" />

        <!-- Midground Crumbling Buildings & Twisted Iron Frames -->
        <path fill="url(#midSkyline)" opacity="0.9" d="M0,348 L0,245 L50,245 L50,185 L115,192 L115,265 L175,265 L175,165 L245,172 L245,245 L325,245 L325,210 L405,210 L405,262 L485,262 L485,155 L565,162 L565,250 L650,250 L650,180 L735,180 L735,255 L825,255 L825,160 L915,168 L915,242 L1000,242 L1000,148 L1115,148 L1115,235 L1200,235 L1200,348 Z" />

        <!-- Structural Cracks & Broken Windows -->
        <g fill="#a5f3fc" opacity="0.65">
          <rect x="72" y="210" width="10" height="16" rx="1" />
          <rect x="92" y="214" width="10" height="12" rx="1" />
          <rect x="198" y="192" width="12" height="18" rx="1" />
          <rect x="508" y="182" width="12" height="22" rx="1" />
          <rect x="672" y="202" width="12" height="18" rx="1" />
          <rect x="845" y="188" width="14" height="20" rx="1" />
          <rect x="1030" y="172" width="22" height="24" rx="2" fill="#fde68a" />
          <rect x="1065" y="172" width="22" height="24" rx="2" fill="#fde68a" />
        </g>

        <!-- Shadowy Watching Figures in Alleyways -->
        <g fill="#020409" opacity="0.9">
          <ellipse cx="365" cy="312" rx="7" ry="18" />
          <circle cx="365" cy="291" r="5" />
          <circle cx="363" cy="290" r="1" fill="#67e8f9" />
          <circle cx="367" cy="290" r="1" fill="#67e8f9" />

          <ellipse cx="785" cy="314" rx="7" ry="17" />
          <circle cx="785" cy="294" r="5" />
          <circle cx="783" cy="293" r="1" fill="#67e8f9" />
          <circle cx="787" cy="293" r="1" fill="#67e8f9" />
        </g>

        <!-- Wet Reflective Promenade Ground -->
        <rect x="0" y="340" width="1200" height="80" fill="url(#groundGrad)" />
        <line x1="0" y1="340" x2="1200" y2="340" stroke="#67e8f9" stroke-width="1.5" stroke-opacity="0.35" />
      </svg>
    </div>
  `;
}

function initVisualStage() {
  const panorama = buildPanoramaHTML();
  document.getElementById('stageGrayLayer').innerHTML = panorama;
  document.getElementById('stageColorLayer').innerHTML = panorama;

  initTitleRealisticPaintingCanvas();
  initStageWeatherCanvas();

  // Create floating ash & ghostly ember particles
  const container = document.getElementById('particlesContainer');
  const colors = ['#a5f3fc', '#cbd5e1', '#5eead4', '#fde047', '#94a3b8'];
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3.5 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 96}%`;
    p.style.top = `${Math.random() * 88}%`;
    p.style.backgroundColor = colors[i % colors.length];
    p.style.boxShadow = `0 0 8px ${colors[i % colors.length]}`;
    p.style.animationDuration = `${Math.random() * 8 + 6}s`;
    p.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(p);
  }
}

/**
 * Realistic Chiaroscuro Digital Painting Renderer on Title Screen Canvas
 * Paints:
 * - Ruined grim city silhouettes & twisted steel on left/bottom
 * - Volumetric cold cyan-emerald fog clouds
 * - Realistic shaded hooded traveler with wide-brimmed hat, half-shadowed face & glowing eyes
 * - Ornate antique lantern casting realistic light falloff & ghostly wisps
 * - Lurking shadow figures with faint eyes in the deep mist
 */
function initTitleRealisticPaintingCanvas() {
  const canvas = document.getElementById('titleAtmosphereCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    if (!canvas) return;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const ashMotes = Array.from({ length: 65 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2.2 + 0.6,
    vx: (Math.random() - 0.5) * 0.35,
    vy: -Math.random() * 0.45 - 0.12,
    alpha: Math.random() * 0.65 + 0.15,
    isSpirit: Math.random() > 0.65
  }));

  const wisps = [
    { offsetX: 145, offsetY: -125, speed: 0.0016, radius: 4.5 },
    { offsetX: -135, offsetY: 85, speed: 0.0021, radius: 3.5 },
    { offsetX: 165, offsetY: 55, speed: 0.0013, radius: 3.0 }
  ];

  function drawChiaroscuroScene(time) {
    const overlay = document.getElementById('titleScreenOverlay');
    if (overlay && !overlay.classList.contains('hidden')) {
      ctx.clearRect(0, 0, w, h);

      // 1. Deep Abyssal Atmospheric Tint Overlay (Lets the foggy street background shine through)
      const bgGrad = ctx.createRadialGradient(w * 0.73, h * 0.48, 20, w * 0.68, h * 0.5, w * 0.65);
      bgGrad.addColorStop(0, 'rgba(11, 37, 48, 0.28)');
      bgGrad.addColorStop(0.38, 'rgba(7, 19, 28, 0.48)');
      bgGrad.addColorStop(0.75, 'rgba(3, 5, 8, 0.76)');
      bgGrad.addColorStop(1, 'rgba(1, 2, 3, 0.92)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Distant Subtle Wire & Spire Accents
      ctx.fillStyle = 'rgba(4, 7, 12, 0.45)';
      const ruins = [
        [0.52, 0.25, 0.05], [0.59, 0.38, 0.04], [0.66, 0.22, 0.06],
        [0.84, 0.30, 0.05], [0.91, 0.18, 0.06]
      ];
      ruins.forEach(([rx, rh, rw]) => {
        const bx = w * rx;
        const bw = w * rw;
        const bh = h * rh;
        ctx.fillRect(bx, h - bh, bw, bh);
        // Jagged broken roof & antenna
        ctx.beginPath();
        ctx.moveTo(bx, h - bh);
        ctx.lineTo(bx + bw * 0.35, h - bh - 18);
        ctx.lineTo(bx + bw * 0.65, h - bh + 8);
        ctx.lineTo(bx + bw, h - bh - 10);
        ctx.lineTo(bx + bw, h - bh + 20);
        ctx.closePath();
        ctx.fill();
      });

      // 3. Lurking Shadow Watchers in the Background Mist
      const watcherX = w * 0.87;
      const watcherY = h * 0.66;
      ctx.save();
      ctx.fillStyle = 'rgba(2, 4, 8, 0.88)';
      ctx.beginPath();
      ctx.ellipse(watcherX, watcherY + 45, 22, 58, 0, 0, Math.PI * 2);
      ctx.arc(watcherX, watcherY - 18, 15, 0, Math.PI * 2);
      ctx.fill();
      // Faint cold eyes staring out of fog
      ctx.fillStyle = 'rgba(103, 232, 249, 0.55)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#22d3ee';
      ctx.beginPath();
      ctx.arc(watcherX - 5, watcherY - 19, 1.8, 0, Math.PI * 2);
      ctx.arc(watcherX + 4, watcherY - 19, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Focal Point: Realistic Hooded Traveler & Antique Lantern (Right Side)
      const cx = w < 768 ? w * 0.54 : w * 0.72;
      const cy = w < 768 ? h * 0.58 : h * 0.52;
      const scale = Math.min(w, h) / 760;
      const floatY = Math.sin(time * 0.0018) * 10 * scale;

      ctx.save();
      ctx.translate(cx, cy + floatY);
      ctx.scale(Math.max(0.68, scale), Math.max(0.68, scale));

      // Volumetric Lantern Aura (Cold Ghostly Cyan-Emerald Glow)
      const lanternX = -68;
      const lanternY = 18;
      const pulse = 1 + Math.sin(time * 0.0045) * 0.06;
      const aura = ctx.createRadialGradient(lanternX, lanternY, 4, lanternX, lanternY, 220 * pulse);
      aura.addColorStop(0, 'rgba(204, 251, 241, 0.85)');
      aura.addColorStop(0.15, 'rgba(45, 212, 191, 0.42)');
      aura.addColorStop(0.45, 'rgba(14, 116, 144, 0.16)');
      aura.addColorStop(1, 'rgba(2, 6, 12, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(lanternX, lanternY, 220 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Tattered Cloak & Mantle (Dark Realistic Shading + Rim Light from Lantern)
      const cloakGrad = ctx.createLinearGradient(-85, -30, 85, 160);
      cloakGrad.addColorStop(0, '#164e63'); // Rim lit edge facing lantern
      cloakGrad.addColorStop(0.35, '#0f172a');
      cloakGrad.addColorStop(1, '#020408'); // Deep shadow on right
      ctx.fillStyle = cloakGrad;
      ctx.beginPath();
      ctx.moveTo(-42, -25);
      ctx.bezierCurveTo(-95, 25, -110, 115, -125, 185);
      ctx.lineTo(-75, 168);
      ctx.lineTo(-45, 195);
      ctx.lineTo(-10, 172);
      ctx.lineTo(35, 198);
      ctx.lineTo(75, 172);
      ctx.lineTo(115, 190);
      ctx.bezierCurveTo(95, 105, 78, 22, 42, -25);
      ctx.closePath();
      ctx.fill();

      // Cloak Rim Highlight Stroke
      ctx.strokeStyle = 'rgba(103, 232, 249, 0.38)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Wide-Brimmed Weathered Explorer Hat & Hood
      const hatGrad = ctx.createLinearGradient(-95, -90, 95, -35);
      hatGrad.addColorStop(0, '#2dd4bf');
      hatGrad.addColorStop(0.35, '#0f172a');
      hatGrad.addColorStop(1, '#020408');
      ctx.fillStyle = hatGrad;
      // Brim
      ctx.beginPath();
      ctx.ellipse(0, -52, 92, 22, -0.08, 0, Math.PI * 2);
      ctx.fill();
      // Pointed Crown
      ctx.beginPath();
      ctx.moveTo(-48, -54);
      ctx.quadraticCurveTo(-20, -125, 42, -138);
      ctx.quadraticCurveTo(32, -92, 48, -54);
      ctx.closePath();
      ctx.fill();

      // Half-Shadowed Face under Hat Brim (Chiaroscuro)
      ctx.fillStyle = '#03050a';
      ctx.beginPath();
      ctx.arc(0, -32, 28, 0, Math.PI * 2);
      ctx.fill();

      // Subtle Skin Rim Light on Left Cheek facing Lantern
      const faceRim = ctx.createRadialGradient(-16, -28, 2, -10, -28, 24);
      faceRim.addColorStop(0, 'rgba(153, 246, 228, 0.45)');
      faceRim.addColorStop(1, 'rgba(3, 5, 10, 0)');
      ctx.fillStyle = faceRim;
      ctx.beginPath();
      ctx.arc(0, -32, 27, 0, Math.PI * 2);
      ctx.fill();

      // Piercing Cold Luminous Eyes
      ctx.fillStyle = '#ccfbf1';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#22d3ee';
      ctx.beginPath();
      ctx.ellipse(-11, -33, 3.2, 1.8, -0.1, 0, Math.PI * 2);
      ctx.ellipse(7, -34, 2.8, 1.6, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Wooden / Iron Staff Held in Hand
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(-64, -45);
      ctx.lineTo(-52, 185);
      ctx.stroke();

      // Ornate Hanging Lantern Cage & Soul Flame
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-64, -12);
      ctx.lineTo(lanternX, lanternY - 14);
      ctx.stroke();

      // Lantern Frame
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#99f6e4';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(lanternX - 10, lanternY - 12);
      ctx.lineTo(lanternX + 10, lanternY - 12);
      ctx.lineTo(lanternX + 13, lanternY + 12);
      ctx.lineTo(lanternX - 13, lanternY + 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner Soul Flame Core
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 22;
      ctx.shadowColor = '#2dd4bf';
      ctx.beginPath();
      ctx.arc(lanternX, lanternY + 1, 6.5 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Orbiting Ghostly Wisps around Traveler
      wisps.forEach((sp, idx) => {
        const wx = sp.offsetX + Math.cos(time * sp.speed + idx) * 24;
        const wy = sp.offsetY + Math.sin(time * sp.speed * 1.3 + idx) * 18;
        const wGrad = ctx.createRadialGradient(wx, wy, 1, wx, wy, sp.radius * 6);
        wGrad.addColorStop(0, 'rgba(224, 242, 254, 0.95)');
        wGrad.addColorStop(0.4, 'rgba(34, 211, 238, 0.45)');
        wGrad.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.fillStyle = wGrad;
        ctx.beginPath();
        ctx.arc(wx, wy, sp.radius * 6, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // 5. Drifting Ash & Ghostly Spore Particles across Foreground
      for (const m of ashMotes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = m.isSpirit
          ? `rgba(103, 232, 249, ${m.alpha})`
          : `rgba(148, 163, 184, ${m.alpha * 0.7})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(drawChiaroscuroScene);
  }
  requestAnimationFrame(drawChiaroscuroScene);
}

/**
 * Subtle Drizzling Rain & Drifting Mist on the Gameplay Stage
 */
function initStageWeatherCanvas() {
  const canvas = document.getElementById('stageWeatherCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resize();
  window.addEventListener('resize', resize);

  const drops = Array.from({ length: 45 }, () => ({
    x: Math.random() * 1000,
    y: Math.random() * 600,
    len: Math.random() * 14 + 8,
    speed: Math.random() * 5 + 4
  }));

  function drawWeather() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(186, 230, 253, 0.14)';
    ctx.lineWidth = 1;
    for (const d of drops) {
      d.y += d.speed;
      d.x -= d.speed * 0.22;
      if (d.y > h) {
        d.y = -20;
        d.x = Math.random() * (w + 100);
      }
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 3, d.y + d.len);
      ctx.stroke();
    }
    requestAnimationFrame(drawWeather);
  }
  drawWeather();
}

/**
 * ============================================================================
 * 2. STORY & MAJOR CONFIGURATION DATA
 * ============================================================================
 */
const MAJORS = {
  DGA: {
    code: 'DGA',
    shortName: 'Digital Arts',
    fullName: 'สาขา Digital Arts',
    roleTitle: 'นักรังสรรค์จินตนาการ',
    badgeBg: 'bg-pink-500/20 text-pink-200 border-pink-400/40',
    gradient: 'from-pink-400 to-rose-500',
    endingDesc: 'ภาพวาดของเธอคือสีแรกที่ย้อมเมืองให้กลับมามีชีวิต ทุกคนเงยหน้ามองแล้วพูดตรงกันว่า "นี่แหละโลกที่เราเคยฝันถึง"',
    careers: [
      'Illustrator', 'Concept Artist', 'Character Designer',
      'Webtoon / Comic Artist', 'Storyboard Artist', 'Background Artist',
      'Art Toy Designer', 'Sticker / LINE Creator', "Children's Book Illustrator",
      'Visual Development Artist'
    ]
  },
  DGD: {
    code: 'DGD',
    shortName: 'Digital Graphic Design',
    fullName: 'สาขา Digital Graphic Design',
    roleTitle: 'นักสร้างอัตลักษณ์แห่งธานี',
    badgeBg: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
    gradient: 'from-sky-400 to-indigo-500',
    endingDesc: 'ภาพลักษณ์ใหม่ที่เธอออกแบบทำให้ทั้งเมืองมีหน้าตาเป็นของตัวเอง ไม่มีใครสับสนอีกแล้วว่าที่นี่คือที่ไหน',
    careers: [
      'Graphic Designer', 'Brand Identity Designer', 'Art Director',
      'UI Designer', 'Packaging Designer', 'Editorial Designer',
      'Social Media Designer', 'Motion Graphic Designer',
      'Poster / Key Visual Designer', 'Creative Director'
    ]
  },
  IGD: {
    code: 'IGD',
    shortName: 'Interactive and Game Design',
    fullName: 'สาขา Interactive and Game Design',
    roleTitle: 'นักสร้างเป้าหมายแห่งเกม',
    badgeBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
    gradient: 'from-emerald-400 to-teal-500',
    endingDesc: 'ทั้งเมืองกลายเป็นสนามเล่นของเธอ ทุกคนหัวเราะ ตื่นเต้น และไม่มีใครอยากให้เกมจบ',
    careers: [
      'Game Designer', 'Level Designer', 'Game Artist',
      'UI/UX Designer for Games', 'VR / AR Designer', 'Game Producer',
      'Narrative Designer', 'Technical Artist', 'Playtest Designer',
      'Esports Content Producer'
    ]
  },
  AFX: {
    code: 'AFX',
    shortName: 'Computer Animation and Visual Effects',
    fullName: 'สาขา Computer Animation and Visual Effects',
    roleTitle: 'ผู้มอบชีวิตแด่ภาพ',
    badgeBg: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
    gradient: 'from-purple-400 to-violet-600',
    endingDesc: 'ภาพเคลื่อนไหวของเธอทำให้ท้องฟ้าสว่างวาบ ไม่มีใครเชื่อว่าทั้งหมดนี้เป็นฝีมือคนคนเดียว',
    careers: [
      '3D Animator', '3D Modeler', 'VFX Artist',
      'Compositor', 'Rigging Artist', 'Lighting Artist',
      'Texture Artist', 'Motion Capture Artist',
      'Layout / Previs Artist', 'Visual Effects Supervisor'
    ]
  },
  DEN: {
    code: 'DEN',
    shortName: 'Digital Entertainment',
    fullName: 'สาขา Digital Entertainment',
    roleTitle: 'ผู้รวมใจให้เป็นหนึ่ง',
    badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
    gradient: 'from-amber-400 to-orange-500',
    endingDesc: 'เธอไม่ได้ขึ้นเวทีคนเดียว เธอทำให้ทั้งเมืองได้ขึ้นเวทีไปพร้อมกัน',
    careers: [
      'Content Creator', 'Event / Show Producer', 'Streaming Producer',
      'VTuber / Virtual Talent Producer', 'Entertainment Marketer',
      'Social Media Manager', 'Video Producer', 'Community Manager',
      'Scriptwriter', 'Brand Experience Designer'
    ]
  }
};

const HYBRID_TITLES = {
  'DGA+DGD': 'นักออกแบบที่เล่าเรื่องด้วยภาพวาด',
  'AFX+DGD': 'นักออกแบบที่ทำให้ภาพขยับ',
  'DGD+IGD': 'นักออกแบบประสบการณ์',
  'DEN+DGD': 'นักออกแบบที่เล่าเรื่องเก่ง',
  'AFX+DGA': 'นักวาดที่ทำให้ภาพมีชีวิต',
  'DGA+IGD': 'นักวาดโลกของเกม',
  'DEN+DGA': 'ครีเอเตอร์สายวาด',
  'AFX+IGD': 'นักสร้างโลกเสมือนจริง',
  'AFX+DEN': 'นักเล่าเรื่องด้วยภาพยนตร์',
  'DEN+IGD': 'นักสร้างสนามเล่นให้คนมารวมกัน'
};

function getHybridTitle(code1, code2) {
  const key = [code1, code2].sort().join('+');
  return HYBRID_TITLES[key] || `${MAJORS[code1].roleTitle} × ${MAJORS[code2].roleTitle}`;
}

const SCENES_BEFORE_DISTRICT = [
  {
    id: '1.1',
    chapter: 'บทที่ 1 ตื่นขึ้นในเมืองไร้สี',
    title: 'ตื่นขึ้นมา',
    landmarkIcon: '🏛️',
    landmarkName: 'จัตุรัสกลางเมืองไร้สี',
    propEmoji: '🕯️',
    propCaption: 'ดวงไฟนำทางกระซิบข้างหูเธอ',
    narration: 'ทุกอย่างรอบตัวเธอเป็นสีเทา แต่มือของเธอยังขยับได้ และยังมีอะไรให้ทำอีกเยอะ ดวงไฟลอยมาใกล้ ๆ แล้วกระซิบว่า "เหลือเวลาถึงคืนนี้เท่านั้นนะ ช่วยเมืองนี้ด้วย" สิ่งแรกที่เธอทำคือ…',
    saturation: 8,
    positionPct: 10,
    options: [
      { text: 'หยิบชอล์กขึ้นมาแล้วลงสีบนกำแพง', major: 'DGA' },
      { text: 'เดินดูป้ายที่ตัวอักษรซีดจนอ่านไม่ออก แล้วลองจัดใหม่ให้อ่านง่ายขึ้น', major: 'DGD' },
      { text: 'ถามดวงไฟว่าเมืองนี้มีกติกาอะไร แล้วจะผ่านด่านไปได้ยังไง', major: 'IGD' },
      { text: 'ลองดันของรอบตัวเบา ๆ ว่าทำไมทุกอย่างถึงนิ่งสนิทแบบนี้', major: 'AFX' },
      { text: 'ตะโกนเรียกคนในเมืองให้มารวมกันที่จัตุรัส', major: 'DEN' }
    ]
  },
  {
    id: '1.2',
    chapter: 'บทที่ 1 ตื่นขึ้นในเมืองไร้สี',
    title: 'ของติดตัว',
    landmarkIcon: '🎒',
    landmarkName: 'แท่นศิลาแห่งจุดเริ่มต้น',
    propEmoji: '✨',
    propCaption: 'เลือกอุปกรณ์คู่ใจเพียงหนึ่งชิ้น',
    narration: 'ดวงไฟบอกว่าพกไปได้แค่ชิ้นเดียว เธอเลือกหยิบ…',
    saturation: 16,
    positionPct: 16,
    options: [
      { text: 'สมุดสเก็ตช์ที่วาดได้ไม่มีวันหมดหน้า', major: 'DGA' },
      { text: 'ชุดสีกับตัวอักษรวิเศษที่ทำให้อะไรก็ดูเข้าที่เข้าทาง', major: 'DGD' },
      { text: 'ตลับเกมเก่า ๆ ที่ยังไม่มีใครรู้วิธีเล่น', major: 'IGD' },
      { text: 'กล้องฟิล์มที่ถ่ายแล้วภาพเคลื่อนไหวได้', major: 'AFX' },
      { text: 'ไมโครโฟนที่เสียงดังไปทั่วทั้งเมือง', major: 'DEN' }
    ]
  },
  {
    id: '1.3',
    chapter: ' ตื่นขึ้นในเมืองไร้สี',
    title: 'ทางแยกห้าสาย',
    landmarkIcon: '🧭',
    landmarkName: 'วงเวียนห้าเส้นทาง',
    propEmoji: '🛤️',
    propCaption: 'ถนนทั้งห้าสายทอดยาวไปข้างหน้า',
    narration: 'ปลายจัตุรัสมีถนนห้าสาย แต่ละสายมีกลิ่นกับเสียงไม่เหมือนกัน เธอเดินเข้าสายไหนก่อน',
    saturation: 24,
    positionPct: 22,
    options: [
      { text: 'สายที่ผนังทั้งสองข้างเต็มไปด้วยภาพวาด', major: 'DGA' },
      { text: 'สายที่เต็มไปด้วยป้ายร้านและโลโก้', major: 'DGD' },
      { text: 'สายที่มีเสียงเกมกับแสงไฟหลากสี', major: 'IGD' },
      { text: 'สายที่มีเสียงเครื่องฉายหนังกับควันเอฟเฟกต์', major: 'AFX' },
      { text: 'สายที่มีเสียงเพลงและผู้คนมายืนรวมกัน', major: 'DEN' }
    ]
  },
  {
    id: '2.1',
    chapter: 'ปัญหาของชาวเมือง',
    title: 'สะพานที่พังครึ่งหนึ่ง',
    landmarkIcon: '🌉',
    landmarkName: 'สะพานข้ามแม่น้ำกลางเมือง',
    propEmoji: '🌊',
    propCaption: 'ฝั่งโน้นมีชาวเมืองกำลังรอความช่วยเหลือ',
    narration: 'เดินไปได้ไม่กี่ก้าว เธอก็เจอคนที่ต้องการความช่วยเหลือทุกมุมถนน สะพานข้ามแม่น้ำพังไปครึ่งทาง ฝั่งโน้นมีคนรออยู่ เธอจะข้ามไปยังไง',
    saturation: 33,
    positionPct: 29,
    options: [
      { text: 'วาดสะพานขึ้นมาใหม่ด้วยเส้นและสีในแบบของเธอ', major: 'DGA' },
      { text: 'ทำป้ายเตือนกับป้ายบอกทางอ้อม ให้ทุกคนเดินตามได้โดยไม่งง', major: 'DGD' },
      { text: 'ไขกลไกของสะพานให้กลับมาทำงานอีกครั้ง', major: 'IGD' },
      { text: 'ทำภาพสะพานที่ค่อย ๆ ประกอบตัวเองขึ้นมาให้ทุกคนเห็น', major: 'AFX' },
      { text: 'ชวนชาวเมืองมาช่วยกันซ่อม แล้วจัดเป็นงานฉลองเล็ก ๆ', major: 'DEN' }
    ]
  },
  {
    id: '2.2',
    chapter: ' ปัญหาของชาวเมือง',
    title: ' เด็กน้อยร้องไห้',
    landmarkIcon: '🧸',
    landmarkName: 'ตรอกแห่งความทรงจำ',
    propEmoji: '💫',
    propCaption: 'ตัวการ์ตูนที่รักที่สุดเลือนหายไป',
    narration: 'เด็กคนหนึ่งนั่งร้องไห้อยู่ข้างทาง เธอบอกว่าตัวการ์ตูนที่รักที่สุดหายไปจากเมืองแล้ว เธอช่วยหนูน้อยยังไง',
    saturation: 42,
    positionPct: 36,
    options: [
      { text: 'วาดตัวการ์ตูนตัวนั้นขึ้นมาใหม่ให้', major: 'DGA' },
      { text: 'ทำสติกเกอร์ โปสเตอร์ และของที่ระลึกให้เธอเก็บไว้', major: 'DGD' },
      { text: 'สร้างเกมเล็ก ๆ ให้เธอได้เล่นกับตัวการ์ตูนตัวนั้น', major: 'IGD' },
      { text: 'ทำให้ตัวการ์ตูนมีชีวิตขึ้นมา เดินและพูดกับเธอได้', major: 'AFX' },
      { text: 'ชวนเด็ก ๆ คนอื่นมานั่งล้อมวงฟังเรื่องของตัวการ์ตูนตัวนั้น', major: 'DEN' }
    ]
  },
  {
    id: '2.3',
    chapter: ' ปัญหาของชาวเมือง',
    title: ' ร้านเก่าแก่ที่ใกล้ปิด',
    landmarkIcon: '🏪',
    landmarkName: 'ย่านการค้าเก่าแก่',
    propEmoji: '🏮',
    propCaption: 'ป้ายร้านเก่าที่กำลังจะปิดตัวลง',
    narration: 'เจ้าของร้านเก่าแก่เล่าว่าไม่มีใครรู้จักร้านเขาแล้ว เธอตอบเขาว่า…',
    saturation: 50,
    positionPct: 43,
    options: [
      { text: '“หนูจะวาดภาพให้ร้านนี้มีเอกลักษณ์ไม่เหมือนใคร”', major: 'DGA' },
      { text: '“หนูจะทำแบรนด์ใหม่ให้ ตั้งแต่โลโก้ไปจนถึงป้ายหน้าร้าน”', major: 'DGD' },
      { text: '“หนูจะทำให้การเดินเข้าร้านเป็นเหมือนเล่นเกมสนุก ๆ”', major: 'IGD' },
      { text: '“หนูจะทำคลิปแนะนำร้านที่ดูแล้วขนลุก”', major: 'AFX' },
      { text: '“หนูจะจัดงานแล้วช่วยโปรโมต ให้คนแห่กันมา”', major: 'DEN' }
    ]
  }
];

const DISTRICTS = {
  DGA: {
    major: 'DGA',
    chapter: 'บทที่ 3 ย่านศิลป์: ตรอกจินตนาการ',
    title: 'ย่านศิลป์: ตรอกจินตนาการ',
    landmarkIcon: '🎨',
    landmarkName: 'ย่านศิลป์: ตรอกจินตนาการ',
    propEmoji: '🖌️',
    propCaption: 'ขวดสีวิเศษส่องประกายในมือ',
    narration: 'ศิลปินสูงวัยคนหนึ่งยื่นขวดสีวิเศษให้ แล้วถามว่า "เธออยากเป็นคนแบบไหนในเมืองนี้"',
    options: [
      { text: 'คนที่สร้างตัวละครให้ทั้งโลกจำได้', priorityCareers: ['Character Designer'] },
      { text: 'คนที่วาดโลกและฉากหลังให้เรื่องเล่ามีชีวิต', priorityCareers: ['Concept Artist', 'Background Artist'] },
      { text: 'คนที่เล่าเรื่องด้วยภาพหลายช่อง', priorityCareers: ['Webtoon / Comic Artist', 'Storyboard Artist'] },
      { text: 'คนที่ทำให้ภาพวาดกลายเป็นสินค้าหรือของสะสม', priorityCareers: ['Illustrator', 'Art Toy Designer', 'Sticker / LINE Creator'] }
    ]
  },
  DGD: {
    major: 'DGD',
    chapter: 'บทที่ 3 ย่านดีไซน์: ถนนเอกลักษณ์',
    title: 'ย่านดีไซน์: ถนนเอกลักษณ์',
    landmarkIcon: '✒️',
    landmarkName: 'ย่านดีไซน์: ถนนเอกลักษณ์',
    propEmoji: '🪧',
    propCaption: 'ป้ายหน้าร้านที่รอการออกแบบ',
    narration: 'นักออกแบบคนหนึ่งยืนอยู่หน้าร้านที่ป้ายยังว่างเปล่า แล้วถามว่า "ถ้าได้ฝากลายเซ็นไว้ที่ไหนสักแห่งในเมืองนี้ เธออยากให้เป็นที่ไหน"',
    options: [
      { text: 'ป้ายและโลโก้ที่ทุกคนเห็นทุกวัน', priorityCareers: ['Brand Identity Designer'] },
      { text: 'หน้าจอแอปและเว็บไซต์ของเมือง', priorityCareers: ['UI Designer'] },
      { text: 'กล่องและแพ็กเกจที่ใคร ๆ ก็อยากเก็บไว้', priorityCareers: ['Packaging Designer'] },
      { text: 'โปสเตอร์ใหญ่กลางเมืองที่คนเดินผ่านแล้วต้องหันมอง', priorityCareers: ['Art Director', 'Poster / Key Visual Designer'] }
    ]
  },
  IGD: {
    major: 'IGD',
    chapter: 'บทที่ 3 ย่านเกม: สนามแห่งการเล่น',
    title: 'ย่านเกม: สนามแห่งการเล่น',
    landmarkIcon: '🎮',
    landmarkName: 'ย่านเกม: สนามแห่งการเล่น',
    propEmoji: '🕹️',
    propCaption: 'กลไกสนามเกมเริ่มสว่างขึ้น',
    narration: 'หัวหน้าสนามเกมเดินมาหา แล้วถามว่า "เกมของเธอจะเริ่มจากอะไร"',
    options: [
      { text: 'คิดกติกาและระบบให้คนเล่นแล้วติดใจ', priorityCareers: ['Game Designer', 'Level Designer'] },
      { text: 'ออกแบบฉากและตัวละครในเกม', priorityCareers: ['Game Artist'] },
      { text: 'สร้างโลกเสมือนที่เดินเข้าไปได้จริง', priorityCareers: ['VR / AR Designer'] },
      { text: 'ดูแลทีมให้เกมไปถึงมือผู้เล่นได้', priorityCareers: ['Game Producer'] }
    ]
  },
  AFX: {
    major: 'AFX',
    chapter: 'บทที่ 3 ย่านภาพยนตร์: กำแพงแห่งเรื่องราว',
    title: 'ย่านภาพยนตร์: กำแพงแห่งเรื่องราว',
    landmarkIcon: '🎬',
    landmarkName: 'ย่านภาพยนตร์: กำแพงแห่งเรื่องราว',
    propEmoji: '🎞️',
    propCaption: 'สคริปต์ภาพยนตร์แห่งจินตนาการ',
    narration: 'ผู้กำกับลึกลับคนหนึ่งยื่นสคริปต์มาให้ แล้วถามว่า "เธออยากคุมฉากไหนของหนังเรื่องนี้"',
    options: [
      { text: 'ตัวละครที่ขยับเหมือนมีชีวิตจริง', priorityCareers: ['3D Animator', 'Rigging Artist'] },
      { text: 'ของและตัวละครที่ปั้นขึ้นมาจากความว่างเปล่า', priorityCareers: ['3D Modeler', 'Texture Artist'] },
      { text: 'ฉากระเบิด ไฟ น้ำ ควัน ที่ทำให้คนดูตกใจ', priorityCareers: ['VFX Artist'] },
      { text: 'การรวมทุกชั้นภาพให้ดูเหมือนถ่ายจริงชิ้นเดียว', priorityCareers: ['Compositor'] }
    ]
  },
  DEN: {
    major: 'DEN',
    chapter: 'บทที่ 3 ย่านบันเทิง: เวทีแห่งตัวตน',
    title: 'ย่านบันเทิง: เวทีแห่งตัวตน',
    landmarkIcon: '🎤',
    landmarkName: 'ย่านบันเทิง: เวทีแห่งตัวตน',
    propEmoji: '🌟',
    propCaption: 'สปอตไลต์ส่องลงกลางลานเวที',
    narration: 'พิธีกรประจำเมืองยื่นไมค์มาให้ แล้วถามว่า "บทบาทไหนทำให้เธอใจเต้นแรงที่สุด"',
    options: [
      { text: 'คนคิดรายการและคอนเทนต์ที่ทุกคนรอดูทุกสัปดาห์', priorityCareers: ['Content Creator', 'Scriptwriter'] },
      { text: 'คนจัดงานที่ทำให้คนนับพันได้ประสบการณ์เดียวกัน', priorityCareers: ['Event / Show Producer'] },
      { text: 'คนเบื้องหลังตัวตนเสมือนและสตรีมเมอร์', priorityCareers: ['VTuber / Virtual Talent Producer', 'Streaming Producer'] },
      { text: 'คนที่ทำให้ชุมชนแฟนคลับเติบโต', priorityCareers: ['Entertainment Marketer', 'Community Manager'] }
    ]
  }
};

const SCENES_AFTER_DISTRICT = [
  {
    id: 'gate',
    chapter: 'ด่านทดสอบหน้าประตูหินผา',
    title: 'ด่านทดสอบหน้าประตูหินผา',
    landmarkIcon: '🗿',
    landmarkName: 'ประตูหินผาโบราณ',
    propEmoji: '⛩️',
    propCaption: 'ประตูหินบานใหญ่ขวางเส้นทางอยู่',
    narration: 'ไม่ว่าเธอจะเดินมาจากย่านไหน ทุกคนต้องเจอประตูหินบานใหญ่ก่อนไปต่อ ประตูถามว่า "เธอพร้อมฝึกอะไรทุกวัน"',
    saturation: 66,
    positionPct: 54,
    isStoneGate: true,
    options: [
      { text: 'วาดรูปและสังเกตโลกรอบตัวให้ละเอียดขึ้น', major: 'DGA' },
      { text: 'จัดองค์ประกอบ สี และตัวอักษรให้ลงตัว', major: 'DGD' },
      { text: 'คิดเป็นระบบ เป็นขั้นเป็นตอน', major: 'IGD' },
      { text: 'ทำให้ภาพเคลื่อนไหวและดูสมจริง', major: 'AFX' },
      { text: 'พูด เล่าเรื่อง และประสานคนให้ไปทางเดียวกัน', major: 'DEN' }
    ]
  },
  {
    id: '4.1',
    chapter: ' เพื่อนร่วมทาง',
    title: ' เจอเพื่อนสี่คน',
    landmarkIcon: '⛲',
    landmarkName: 'ลานน้ำพุแห่งมิตรภาพ',
    propEmoji: '🤝',
    propCaption: 'นักเดินทางทั้ง 4 คนเข้าร่วมทีมกับเธอ!',
    narration: 'ประตูหินเปิดออก และเธอไม่ได้เดินต่อคนเดียวอีกแล้ว ที่ลานน้ำพุ เธอเจอนักเดินทางอีกสี่คน แต่ละคนมีของที่ตัวเองยังทำไม่ได้ เธอเลือกเป็นคนที่…',
    saturation: 74,
    positionPct: 56,
    showCompanions: true,
    options: [
      { text: 'ช่วยวาดภาพให้ทุกคนเห็นตรงกัน', major: 'DGA' },
      { text: 'ทำไกด์ให้ทุกอย่างดูลงตัวและเป็นระเบียบ', major: 'DGD' },
      { text: 'คิดวิธีให้ทุกคนทำงานด้วยกันแล้วสนุก', major: 'IGD' },
      { text: 'ทำตัวอย่างสั้น ๆ ให้เห็นว่าแผนจะออกมาหน้าตาเป็นยังไง', major: 'AFX' },
      { text: 'เป็นคนกลางที่ทำให้ทุกคนอยากเดินต่อไปด้วยกัน', major: 'DEN' }
    ]
  },
  {
    id: '4.2',
    chapter: ' เพื่อนร่วมทาง',
    title: ' เพื่อนเห็นไม่ตรงกัน',
    landmarkIcon: '🔀',
    landmarkName: 'ทางแยกก่อนเข้าสู่ลานเทศกาล',
    propEmoji: '⚖️',
    propCaption: 'ทีมกำลังตัดสินใจเลือกเส้นทางสุดท้าย',
    narration: 'กลางทางมีสองแยก ทีมเถียงกันว่าจะไปทางไหน เธอทำอะไร',
    saturation: 82,
    positionPct: 62,
    showCompanions: true,
    options: [
      { text: 'วาดแผนที่ให้เห็นภาพว่าแต่ละทางไปไหนบ้าง', major: 'DGA' },
      { text: 'ทำตารางเปรียบเทียบให้ตัดสินใจง่ายขึ้น', major: 'DGD' },
      { text: 'เสนอให้ลองไปทั้งสองทางแล้วดูผลลัพธ์', major: 'IGD' },
      { text: 'ทำภาพจำลองให้เห็นว่าปลายทางของแต่ละทางเป็นยังไง', major: 'AFX' },
      { text: 'ฟังทุกคนก่อน แล้วหาจุดที่ทุกคนรับได้', major: 'DEN' }
    ]
  },
  {
    id: '5.1',
    chapter: ' คืนเทศกาล',
    title: ' ขึ้นเวที',
    landmarkIcon: '🎪',
    landmarkName: 'ลานใหญ่ Imagine Design Event',
    propEmoji: '🎆',
    propCaption: 'เวทีใหญ่กลางเมืองกำลังรอเธอขึ้นแสดง',
    narration: 'ฟ้ามืดลงแล้ว ไฟทั่วเมืองเริ่มติด เหลือแค่เวทีใหญ่ที่ยังว่างอยู่ ไฮไลต์ที่เธออยากมอบให้ทั้งเมืองคือ…',
    saturation: 91,
    positionPct: 68,
    showCompanions: true,
    options: [
      { text: 'ภาพวาดขนาดยักษ์ที่คนทั้งเมืองเงยหน้ามอง', major: 'DGA' },
      { text: 'ภาพลักษณ์ใหม่ของเมือง ที่ทำให้ทุกมุมดูมีสไตล์เดียวกัน', major: 'DGD' },
      { text: 'เกมที่คนทั้งเมืองเข้ามาเล่นพร้อมกัน', major: 'IGD' },
      { text: 'โชว์ภาพเคลื่อนไหวกับเอฟเฟกต์ที่ทำให้ทั้งลานตะลึง', major: 'AFX' },
      { text: 'การแสดงสดที่ทุกคนมีส่วนร่วมได้', major: 'DEN' }
    ]
  },
  {
    id: '5.2',
    chapter: 'คืนเทศกาล',
    title: ' สีกลับมาแล้ว',
    landmarkIcon: '🌈',
    landmarkName: 'เวทีหลัก Imagine City',
    propEmoji: '✨',
    propCaption: 'สีสันสว่างไสวไปทั่วทั้งขอบฟ้า!',
    narration: 'เมื่อสีค่อย ๆ กลับมาทั่วเมือง ผู้คนหันมามองเธอ เธออยากให้พวกเขาจำเธอว่าเป็นใคร',
    saturation: 100,
    positionPct: 73,
    showCompanions: true,
    isTieBreaker: true,
    options: [
      { text: 'คนที่ให้กำเนิดตัวละครที่ทุกคนรัก', major: 'DGA' },
      { text: 'คนที่ทำให้เมืองนี้ดูดีและมีเอกลักษณ์', major: 'DGD' },
      { text: 'คนที่สร้างโลกให้ทุกคนได้เข้ามาเล่น', major: 'IGD' },
      { text: 'คนที่ทำให้สิ่งที่ดูเป็นไปไม่ได้กลายเป็นจริง', major: 'AFX' },
      { text: 'คนที่ทำให้ทุกคนมารวมกันได้', major: 'DEN' }
    ]
  }
];

/**
 * ============================================================================
 * 3. GAME STATE & STAGE PANORAMA RENDERER
 * ============================================================================
 */
let state = {
  screen: 'prologue', // 'prologue' | 'scene_before' | 'district' | 'scene_after' | 'passport' | 'result'
  scores: { DGA: 0, DGD: 0, IGD: 0, AFX: 0, DEN: 0 },
  beforeIndex: 0,
  districtQueue: [],
  districtIndex: 0,
  afterIndex: 0,
  priorityCareersByMajor: { DGA: [], DGD: [], IGD: [], AFX: [], DEN: [] },
  tieBreakerMajor: null,
  history: [],
  passportData: {
    nickname: '',
    grade: '',
    track: '',
    province: '',
    source: '',
    factors: [],
    stage: '',
    experiences: [],
    contactChannel: ''
  }
};

function buildPanoramaHTML() {
  return `
    <div class="w-full h-full relative bg-gradient-to-b from-[#0b1026] via-[#27184b] to-[#581c5c]">
      <!-- Glowing Moon / Festival Sun -->
      <div class="absolute top-12 right-16 w-24 h-24 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-white opacity-90 shadow-[0_0_50px_15px_rgba(253,224,71,0.45)]"></div>
      <!-- Ambient Nebula Glows -->
      <div class="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-cyan-400/25 blur-3xl"></div>
      <div class="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-pink-500/25 blur-3xl"></div>

      <!-- Panoramic City Skyline SVG (Multi-layered) -->
      <svg class="absolute bottom-0 left-0 w-full h-[78%]" viewBox="0 0 1200 420" preserveAspectRatio="none">
        <defs>
          <linearGradient id="farSkyline" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1e293b" />
            <stop offset="50%" stop-color="#312e81" />
            <stop offset="100%" stop-color="#4c1d95" />
          </linearGradient>
          <linearGradient id="midSkyline" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="35%" stop-color="#7c3aed" />
            <stop offset="70%" stop-color="#db2777" />
            <stop offset="100%" stop-color="#f59e0b" />
          </linearGradient>
          <linearGradient id="groundGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="50%" stop-color="#1e1b4b" />
            <stop offset="100%" stop-color="#3b0764" />
          </linearGradient>
        </defs>

        <!-- Distant Mountains / Towers -->
        <path fill="url(#farSkyline)" opacity="0.7" d="M0,330 L0,210 L65,210 L65,170 L130,170 L130,230 L210,230 L210,130 L290,130 L290,220 L370,220 L370,150 L460,150 L460,240 L540,240 L540,110 L630,110 L630,200 L720,200 L720,145 L810,145 L810,225 L900,225 L900,120 L995,120 L995,190 L1085,190 L1085,140 L1200,140 L1200,330 Z" />

        <!-- Midground Stylized Buildings, Ferris Wheel & Festival Stage -->
        <path fill="url(#midSkyline)" opacity="0.88" d="M0,345 L0,250 L55,250 L55,195 L125,195 L125,265 L185,265 L185,175 L255,175 L255,245 L330,245 L330,215 L415,215 L415,260 L490,260 L490,165 L570,165 L570,250 L650,250 L650,185 L735,185 L735,255 L825,255 L825,170 L915,170 L915,240 L1000,240 L1000,155 L1115,155 L1115,235 L1200,235 L1200,345 Z" />

        <!-- Lit Windows Accents -->
        <g fill="#fef08a" opacity="0.75">
          <rect x="75" y="215" width="12" height="16" rx="2" />
          <rect x="98" y="215" width="12" height="16" rx="2" />
          <rect x="205" y="195" width="14" height="18" rx="2" />
          <rect x="228" y="195" width="14" height="18" rx="2" />
          <rect x="512" y="188" width="14" height="20" rx="2" />
          <rect x="536" y="188" width="14" height="20" rx="2" />
          <rect x="672" y="205" width="14" height="18" rx="2" />
          <rect x="845" y="192" width="16" height="20" rx="2" />
          <rect x="872" y="192" width="16" height="20" rx="2" />
          <rect x="1030" y="178" width="22" height="24" rx="3" />
          <rect x="1065" y="178" width="22" height="24" rx="3" />
        </g>

        <!-- Foreground Promenade Ground -->
        <rect x="0" y="340" width="1200" height="80" fill="url(#groundGrad)" />
        <line x1="0" y1="340" x2="1200" y2="340" stroke="#fbbf24" stroke-width="2" stroke-opacity="0.4" />
      </svg>
    </div>
  `;
}

function initVisualStage() {
  const panorama = buildPanoramaHTML();
  document.getElementById('stageGrayLayer').innerHTML = panorama;
  document.getElementById('stageColorLayer').innerHTML = panorama;

  initTitleCanvasParticles();

  // Create floating firefly particles
  const container = document.getElementById('particlesContainer');
  const colors = ['#fde047', '#f472b6', '#38bdf8', '#4ade80', '#c084fc'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 3;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 96}%`;
    p.style.top = `${Math.random() * 85}%`;
    p.style.backgroundColor = colors[i % colors.length];
    p.style.boxShadow = `0 0 8px ${colors[i % colors.length]}`;
    p.style.animationDuration = `${Math.random() * 7 + 5}s`;
    p.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(p);
  }
}

function initTitleCanvasParticles() {
  const canvas = document.getElementById('titleAtmosphereCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    if (!canvas) return;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const motes = Array.from({ length: 42 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2.4 + 0.8,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -Math.random() * 0.35 - 0.1,
    alpha: Math.random() * 0.6 + 0.2,
    hue: Math.random() > 0.3 ? '125, 211, 252' : '253, 224, 71'
  }));

  function draw() {
    const overlay = document.getElementById('titleScreenOverlay');
    if (overlay && !overlay.classList.contains('hidden')) {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${m.hue}, ${m.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${m.hue}, 0.8)`;
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

function openHowToPlayModal() {
  playTone('click');
  showModal(
    'วิธีเล่น Imagine City',
    '• ไม่มีคำตอบถูกหรือผิด เลือกข้อที่ใกล้ใจเธอที่สุดในตอนนี้ • อย่าคิดนาน ข้อที่นึกถึงก่อนมักเป็นข้อที่ใช่ • เรื่องจะเดินไปเรื่อย ๆ จนถึงคืนเทศกาล แล้วเธอจะรู้ว่าตัวเองเป็นนักเดินทางแบบไหน และเหมาะกับสาขาใดใน School of Digital Media (SDM)',
    '🕯️'
  );
}

function updateStageVisuals({
  chapterTag = 'ก่อนออกเดินทาง',
  saturation = 0,
  positionPct = 6,
  landmarkIcon = '🏛️',
  landmarkName = 'จัตุรัสกลางเมืองไร้สี',
  propEmoji = '🕯️',
  propCaption = 'ดวงไฟนำทางกำลังรอเธออยู่',
  showCompanions = false,
  stepIndex = 0,
  totalWaypoints = 12
}) {
  // Update Header
  document.getElementById('headerChapterTag').textContent = chapterTag;
  document.getElementById('colorMeterBar').style.width = `${saturation}%`;
  document.getElementById('colorPercentLabel').textContent = `${Math.round(saturation)}%`;

  // Update Color Wave Wipe
  document.documentElement.style.setProperty('--city-saturation', `${saturation}%`);

  // แสดงแท็ก <img id="img_..."> ของฉากปัจจุบัน หากมีการใส่ src="..." ไว้
  const currentKey = getCurrentSceneKey();
  document.querySelectorAll('.scene-bg-img').forEach(imgEl => {
    imgEl.classList.add('hidden');
  });
  const activeImgEl = document.getElementById(`img_${currentKey}`);
  if (activeImgEl) {
    const rawSrc = (activeImgEl.getAttribute('src') || '').trim();
    if (rawSrc) {
      const normalized = normalizeImageUrl(rawSrc);
      if (normalized.url !== rawSrc) {
        activeImgEl.setAttribute('src', normalized.url);
        if (normalized.driveId) {
          activeImgEl.onerror = () => handleGDriveImgError(activeImgEl, normalized.driveId);
        }
      }
      activeImgEl.style.filter = `grayscale(${Math.max(0, 75 - saturation)}%) brightness(${0.92 + (saturation / 100) * 0.12}) contrast(1.08)`;
      activeImgEl.classList.remove('hidden');
    }
  }

  // ตรวจสอบรูปภาพหน้าเปิดเกม <img id="img_title_screen" src="..." />
  const titleImgEl = document.getElementById('img_title_screen');
  if (titleImgEl && !(titleImgEl.getAttribute('src') || '').trim()) {
    titleImgEl.style.display = 'none';
  }

  // Update Landmark & Center Vignette
  document.getElementById('stageLandmarkIcon').textContent = landmarkIcon;
  document.getElementById('stageLandmarkName').textContent = landmarkName;

  if (state.screen === 'result') {
    const res = calculateFinalResult();
    const char1Url = getEndingCharacterUrl(res.primaryMajor.code);

    if (char1Url) {
      const imgSizeClass = 'h-56 sm:h-80 lg:h-[26rem] max-w-[85vw] sm:max-w-[46vw]';

      document.getElementById('scenePropOverlay').innerHTML = `
        <div class="relative flex items-end justify-center w-full h-full pb-2">
          <div class="char-bob flex flex-col items-center justify-end h-full">
            <img src="${char1Url}" referrerpolicy="no-referrer" alt="${res.primaryMajor.roleTitle}"
              class="${imgSizeClass} w-auto object-contain drop-shadow-[0_14px_34px_rgba(0,0,0,0.95)] rounded-2xl transition-transform duration-500" />
            <span class="mt-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-black/85 text-amber-200 border border-amber-300/45 shadow-lg">
              ${res.primaryMajor.roleTitle}
            </span>
          </div>
        </div>
      `;
    } else {
      document.getElementById('scenePropOverlay').innerHTML = '';
    }
  } else {
    document.getElementById('scenePropOverlay').innerHTML = '';
  }

  // Move Character & Ground Progress
  const clampedLeft = Math.min(76, Math.max(6, positionPct));
  document.getElementById('travelerGroup').style.left = `${clampedLeft}%`;
  document.getElementById('groundPathProgress').style.width = `${Math.min(100, clampedLeft + 10)}%`;

  // Render Waypoint Dots
  const dotsEl = document.getElementById('waypointDots');
  let dotsHtml = '';
  for (let i = 1; i <= totalWaypoints; i++) {
    const active = i <= stepIndex;
    dotsHtml += `<span class="w-2 h-2 rounded-full transition-all ${active ? 'bg-amber-300 scale-110 shadow-[0_0_6px_#fde047]' : 'bg-white/20'}"></span>`;
  }
  dotsEl.innerHTML = dotsHtml;
}

function resetGame() {
  state = {
    screen: 'prologue',
    scores: { DGA: 0, DGD: 0, IGD: 0, AFX: 0, DEN: 0 },
    beforeIndex: 0,
    districtQueue: [],
    districtIndex: 0,
    afterIndex: 0,
    priorityCareersByMajor: { DGA: [], DGD: [], IGD: [], AFX: [], DEN: [] },
    tieBreakerMajor: null,
    history: [],
    passportData: {
      nickname: '',
      grade: '',
      track: '',
      province: '',
      source: '',
      factors: [],
      stage: '',
      experiences: [],
      contactChannel: ''
    }
  };
  render();
  document.getElementById('storyActionPanel').scrollTop = 0;
}

/**
 * ============================================================================
 * 3.5 TITLE SCREEN, RESTART & EXIT NAVIGATION CONTROLS
 * ============================================================================
 */
function enterGameFromTitle(forceReset = false) {
  playTone('sparkle');
  const titleOverlay = document.getElementById('titleScreenOverlay');
  const exitOverlay = document.getElementById('exitScreenOverlay');
  if (exitOverlay) {
    exitOverlay.classList.add('hidden');
    exitOverlay.classList.remove('flex');
  }
  if (titleOverlay) {
    titleOverlay.classList.add('hidden');
  }

  if (forceReset) {
    resetGame();
    startGame();
  } else {
    // If already mid-game or finished, continue or start prologue cleanly
    if (state.screen === 'prologue') {
      startGame();
    } else {
      render();
    }
  }
}

function returnToTitleScreen() {
  playTone('click');
  const exitOverlay = document.getElementById('exitScreenOverlay');
  if (exitOverlay) {
    exitOverlay.classList.add('hidden');
    exitOverlay.classList.remove('flex');
  }
  const titleOverlay = document.getElementById('titleScreenOverlay');
  if (titleOverlay) {
    titleOverlay.classList.remove('hidden');
  }
}

function openExitScreen() {
  playTone('click');
  const titleOverlay = document.getElementById('titleScreenOverlay');
  if (titleOverlay) {
    titleOverlay.classList.add('hidden');
  }
  const exitOverlay = document.getElementById('exitScreenOverlay');
  if (exitOverlay) {
    exitOverlay.classList.remove('hidden');
    exitOverlay.classList.add('flex');
  }
}

function confirmRestartInGame() {
  playTone('click');
  showConfirmModal(
    'เริ่มการเดินทางใหม่?',
    'คะแนนและความคืบหน้าปัจจุบันจะถูกรีเซ็ตกลับไปเริ่มต้นใหม่อีกครั้ง',
    '↻',
    () => {
      closeModal();
      playTone('sparkle');
      resetGame();
      startGame();
    }
  );
}

function restartFromEnding() {
  playTone('sparkle');
  resetGame();
  startGame();
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pushHistorySnapshot() {
  state.history.push(JSON.parse(JSON.stringify({
    screen: state.screen,
    scores: state.scores,
    beforeIndex: state.beforeIndex,
    districtQueue: state.districtQueue,
    districtIndex: state.districtIndex,
    afterIndex: state.afterIndex,
    priorityCareersByMajor: state.priorityCareersByMajor,
    tieBreakerMajor: state.tieBreakerMajor
  })));
}

function goBack() {
  if (!state.history || state.history.length === 0) return;
  playTone('click');
  const prev = state.history.pop();
  state.screen = prev.screen;
  state.scores = prev.scores;
  state.beforeIndex = prev.beforeIndex;
  state.districtQueue = prev.districtQueue;
  state.districtIndex = prev.districtIndex;
  state.afterIndex = prev.afterIndex;
  state.priorityCareersByMajor = prev.priorityCareersByMajor;
  state.tieBreakerMajor = prev.tieBreakerMajor;
  render();
  document.getElementById('storyActionPanel').scrollTop = 0;
}

function renderBackButtonHTML() {
  if (!state.history || state.history.length === 0) return '';
  return `
    <div class="pt-1">
      <button type="button" onclick="goBack()"
        class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-amber-200 bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-amber-300/40 transition">
        <span>←</span>
        <span>ย้อนกลับไปฉากก่อนหน้า</span>
      </button>
    </div>
  `;
}

/**
 * ============================================================================
 * 4. GAME PROGRESSION & SCORING LOGIC
 * ============================================================================
 */
function startGame() {
  playTone('sparkle');
  pushHistorySnapshot();
  state.screen = 'scene_before';
  state.beforeIndex = 0;
  render();
}

function handleBeforeChoice(majorCode) {
  playTone('click');
  pushHistorySnapshot();
  state.scores[majorCode] += 1;

  if (state.beforeIndex + 1 < SCENES_BEFORE_DISTRICT.length) {
    state.beforeIndex += 1;
    render();
    document.getElementById('storyActionPanel').scrollTop = 0;
  } else {
    // พาผู้เล่นเดินสำรวจครบทั้ง 5 ย่านเรียงตามลำดับ: DGA -> DGD -> IGD -> AFX -> DEN
    state.districtQueue = ['DGA', 'DGD', 'IGD', 'AFX', 'DEN'];
    state.districtIndex = 0;
    state.screen = 'district';
    render();
    document.getElementById('storyActionPanel').scrollTop = 0;
  }
}

function handleDistrictChoice(majorCode, priorityCareers) {
  playTone('sparkle');
  pushHistorySnapshot();
  state.priorityCareersByMajor[majorCode] = priorityCareers;

  if (state.districtIndex + 1 < state.districtQueue.length) {
    state.districtIndex += 1;
    render();
    document.getElementById('storyActionPanel').scrollTop = 0;
  } else {
    state.screen = 'scene_after';
    state.afterIndex = 0;
    render();
    document.getElementById('storyActionPanel').scrollTop = 0;
  }
}

function handleAfterChoice(majorCode, isTieBreaker) {
  pushHistorySnapshot();
  state.scores[majorCode] += 1;
  if (isTieBreaker) {
    state.tieBreakerMajor = majorCode;
  }

  if (state.afterIndex + 1 < SCENES_AFTER_DISTRICT.length) {
    const nextScene = SCENES_AFTER_DISTRICT[state.afterIndex + 1];
    if (nextScene && nextScene.isStoneGate) {
      playTone('stoneGate');
    } else {
      playTone('click');
    }
    state.afterIndex += 1;
    render();
    document.getElementById('storyActionPanel').scrollTop = 0;
  } else {
    playTone('sparkle');
    state.screen = 'passport';
    render();
    document.getElementById('storyActionPanel').scrollTop = 0;
  }
}

function goToResult() {
  playTone('celebrate');
  pushHistorySnapshot();
  state.screen = 'result';
  render();
  document.getElementById('storyActionPanel').scrollTop = 0;
}

function calculateFinalResult() {
  const entries = Object.keys(state.scores).map(code => ({
    code,
    score: state.scores[code]
  }));

  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.code === state.tieBreakerMajor) return -1;
    if (b.code === state.tieBreakerMajor) return 1;
    return 0;
  });

  const first = entries[0];
  const second = entries[1];
  const isHybrid = (first.score - second.score) <= 1;

  const buildOrderedCareers = (majorCode) => {
    const priority = state.priorityCareersByMajor[majorCode] || [];
    const all = MAJORS[majorCode].careers;
    const remaining = all.filter(c => !priority.includes(c));
    return {
      highlighted: priority,
      others: remaining
    };
  };

  return {
    entries,
    first,
    second,
    isHybrid,
    primaryMajor: MAJORS[first.code],
    secondaryMajor: isHybrid ? MAJORS[second.code] : null,
    hybridTitle: isHybrid ? getHybridTitle(first.code, second.code) : null,
    primaryCareers: buildOrderedCareers(first.code),
    secondaryCareers: isHybrid ? buildOrderedCareers(second.code) : null
  };
}

/**
 * ============================================================================
 * 5. RIGHT-HAND PANEL RENDERERS (Compact Widescreen Layout)
 * ============================================================================
 */
function render() {
  const panel = document.getElementById('storyActionPanel');
  const totalWaypoints = 12 + state.districtQueue.length;
  const headerBackBtn = document.getElementById('headerBackBtn');
  if (headerBackBtn) {
    if (state.history && state.history.length > 0 && state.screen !== 'result') {
      headerBackBtn.classList.remove('hidden');
    } else {
      headerBackBtn.classList.add('hidden');
    }
  }

  if (state.screen === 'prologue') {
    updateStageVisuals({
      chapterTag: 'ก่อนออกเดินทาง',
      saturation: 0,
      positionPct: 6,
      landmarkIcon: '🏛️',
      landmarkName: 'จัตุรัสกลางเมืองไร้สี',
      propEmoji: '🕯️',
      propCaption: 'ดวงไฟดวงเล็ก ๆ ลอยอยู่ตรงหน้าเธอ',
      showCompanions: false,
      stepIndex: 0,
      totalWaypoints: 12
    });
    panel.innerHTML = renderProloguePanel();
  } else if (state.screen === 'scene_before') {
    const scene = SCENES_BEFORE_DISTRICT[state.beforeIndex];
    updateStageVisuals({
      chapterTag: scene.chapter,
      saturation: scene.saturation,
      positionPct: scene.positionPct,
      landmarkIcon: scene.landmarkIcon,
      landmarkName: scene.landmarkName,
      propEmoji: scene.propEmoji,
      propCaption: scene.propCaption,
      showCompanions: false,
      stepIndex: state.beforeIndex + 1,
      totalWaypoints: 13
    });
    panel.innerHTML = renderScenePanel(scene, 'before');
  } else if (state.screen === 'district') {
    const majorCode = state.districtQueue[state.districtIndex];
    const district = DISTRICTS[majorCode];
    updateStageVisuals({
      chapterTag: `บทที่ 3 ย่านของเธอ (${state.districtIndex + 1}/${state.districtQueue.length})`,
      saturation: 52 + (state.districtIndex * 2),
      positionPct: 45 + state.districtIndex,
      landmarkIcon: district.landmarkIcon,
      landmarkName: district.landmarkName,
      propEmoji: district.propEmoji,
      propCaption: district.propCaption,
      showCompanions: false,
      stepIndex: 7 + state.districtIndex,
      totalWaypoints
    });
    panel.innerHTML = renderDistrictPanel(district, state.districtIndex, state.districtQueue.length);
  } else if (state.screen === 'scene_after') {
    const scene = SCENES_AFTER_DISTRICT[state.afterIndex];
    const stepIdx = 7 + state.districtQueue.length + state.afterIndex;
    updateStageVisuals({
      chapterTag: scene.chapter,
      saturation: scene.saturation,
      positionPct: scene.positionPct,
      landmarkIcon: scene.landmarkIcon,
      landmarkName: scene.landmarkName,
      propEmoji: scene.propEmoji,
      propCaption: scene.propCaption,
      showCompanions: Boolean(scene.showCompanions),
      stepIndex: stepIdx,
      totalWaypoints
    });
    panel.innerHTML = renderScenePanel(scene, 'after');
  } else if (state.screen === 'passport') {
    updateStageVisuals({
      chapterTag: 'ประตูสุดท้าย: บัตรผ่านนักเดินทาง',
      saturation: 100,
      positionPct: 75,
      landmarkIcon: '🎫',
      landmarkName: 'ซุ้มประตูเวทีใหญ่',
      propEmoji: '🪪',
      propCaption: 'ผู้เฝ้าประตูขอดูบัตรผ่านก่อนขึ้นเวที',
      showCompanions: true,
      stepIndex: totalWaypoints,
      totalWaypoints
    });
    panel.innerHTML = renderPassportPanel();
  } else if (state.screen === 'result') {
    updateStageVisuals({
      chapterTag: 'ฉากจบ: คืนเทศกาล Imagine Design Event',
      saturation: 100,
      positionPct: 76,
      landmarkIcon: '🌈',
      landmarkName: 'Imagine City กลับมามีสีสันสมบูรณ์!',
      propEmoji: '🎉',
      propCaption: 'ทั้งเมืองเปล่งประกายด้วยฝีมือของเธอ!',
      showCompanions: true,
      stepIndex: totalWaypoints,
      totalWaypoints
    });
    panel.innerHTML = renderResultPanel();
  }
}

function renderProloguePanel() {
  return `
    <div class="panel-enter space-y-4 my-auto">
      <div>
        <span class="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-300/15 text-amber-200 border border-amber-300/30 mb-2">
          ก่อนออกเดินทาง • School of Digital Media (SDM)
        </span>
        <h1 class="text-2xl lg:text-3xl font-bold text-white leading-snug">
          คืนนี้สีสันของ <span class="text-amber-300">Imagine City</span> กำลังจะหายไปทั้งเมือง
        </h1>
      </div>

      <div class="space-y-2.5 text-slate-200 text-xs sm:text-sm leading-relaxed bg-black/35 p-4 rounded-2xl border border-white/10">
        <p>
          Imagine City เคยเป็นเมืองที่เต็มไปด้วยภาพวาด ป้ายไฟ เสียงเพลง และเกมที่ใครก็เล่นได้ แต่ตอนนี้ทุกอย่างซีดเป็นสีเทา เหลือเวลาอีกแค่คืนเดียวก่อนที่สีจะหายไปตลอดกาล ถ้ามีใครขึ้นเวทีในเทศกาล <strong class="text-amber-200">Imagine Design Event</strong> แล้วทำให้คนทั้งเมืองกลับมายิ้มได้ สีทั้งหมดก็จะกลับมา
        </p>
        <p>
          เธอตื่นขึ้นกลางจัตุรัสโดยไม่รู้ว่ามาได้ยังไง ตรงหน้ามี <strong class="text-amber-300">ดวงไฟดวงเล็ก ๆ</strong> ลอยอยู่ มันบอกว่าจะนำทางให้ แต่ต้องให้เธอเป็นคนตัดสินใจเองทุกอย่าง
        </p>
      </div>

      <div class="bg-white/[0.04] rounded-2xl p-3.5 border border-white/10">
        <div class="text-xs font-semibold text-amber-200 mb-1.5">✨ วิธีเล่น</div>
        <ul class="space-y-1 text-xs text-slate-300">
          <li>• ไม่มีคำตอบถูกหรือผิด เลือกข้อที่ใกล้ใจเธอที่สุดในตอนนี้</li>
          <li>• อย่าคิดนาน ข้อที่นึกถึงก่อนมักเป็นข้อที่ใช่</li>
          <li>• เรื่องจะเดินไปเรื่อย ๆ จนถึงคืนเทศกาล แล้วเธอจะรู้ว่าตัวเองเป็นนักเดินทางแบบไหน</li>
        </ul>
      </div>

      <button type="button" onclick="startGame()"
        class="w-full py-3.5 px-6 rounded-2xl font-semibold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-slate-100 via-amber-200 to-amber-400 hover:brightness-110 transition shadow-lg flex items-center justify-center gap-2 group">
        <span>ก้าวออกเดินทางตามดวงไฟ</span>
        <svg class="w-5 h-5 transform group-hover:translate-x-1 transition" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  `;
}

function renderScenePanel(scene, phase) {
  const randomizedOptions = shuffleArray(scene.options);

  const optionsHtml = randomizedOptions.map((opt, idx) => {
    const handler = phase === 'before'
      ? `handleBeforeChoice('${opt.major}')`
      : `handleAfterChoice('${opt.major}', ${Boolean(scene.isTieBreaker)})`;

    return `
      <button type="button" onclick="${handler}"
        class="choice-btn w-full text-left p-3 sm:p-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/15 hover:border-amber-300/70 flex items-center gap-3 group">
        <span class="w-7 h-7 rounded-lg bg-white/10 group-hover:bg-amber-300 group-hover:text-slate-950 text-slate-300 font-semibold text-xs flex items-center justify-center shrink-0 transition">
          ${idx + 1}
        </span>
        <span class="text-xs sm:text-sm text-slate-100 group-hover:text-white leading-snug">
          ${opt.text}
        </span>
      </button>
    `;
  }).join('');

  return `
    <div class="panel-enter space-y-3.5 my-auto">
      <div>
        <div class="text-[11px] sm:text-xs font-medium text-amber-200/90 mb-0.5">${scene.chapter}</div>
        <h2 class="text-xl lg:text-2xl font-bold text-white">${scene.title}</h2>
      </div>

      <p class="text-slate-200 text-xs sm:text-sm leading-relaxed bg-black/35 p-3.5 sm:p-4 rounded-2xl border border-white/10">
        ${scene.narration}
      </p>

      <div class="space-y-2">
        ${optionsHtml}
      </div>

      ${renderBackButtonHTML()}
    </div>
  `;
}

function renderDistrictPanel(district, districtIndex, totalDistricts) {
  const randomizedOptions = shuffleArray(district.options);
  const majorMeta = MAJORS[district.major];

  const optionsHtml = randomizedOptions.map((opt, idx) => {
    const careersJson = JSON.stringify(opt.priorityCareers).replace(/"/g, '&quot;');
    return `
      <button type="button" onclick="handleDistrictChoice('${district.major}', ${careersJson})"
        class="choice-btn w-full text-left p-3 sm:p-3.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.16] border border-white/15 hover:border-amber-300/75 flex items-center gap-3 group">
        <span class="w-7 h-7 rounded-lg bg-white/10 group-hover:bg-amber-300 group-hover:text-slate-950 text-slate-200 font-semibold text-xs flex items-center justify-center shrink-0 transition">
          ${idx + 1}
        </span>
        <span class="text-xs sm:text-sm text-slate-100 group-hover:text-white leading-snug">
          ${opt.text}
        </span>
      </button>
    `;
  }).join('');

  return `
    <div class="panel-enter space-y-3.5 my-auto">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-[11px] sm:text-xs font-medium text-amber-200">
          บทที่ 3 สำรวจย่านทั้ง 5 แห่ง (${districtIndex + 1}/${totalDistricts})
        </span>
        <span class="px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${majorMeta.badgeBg}">
          ${majorMeta.shortName}
        </span>
      </div>

      <h2 class="text-xl lg:text-2xl font-bold text-white">${district.title}</h2>

      <p class="text-slate-200 text-xs sm:text-sm leading-relaxed bg-black/35 p-3.5 sm:p-4 rounded-2xl border border-white/10">
        ${district.narration}
      </p>

      <div class="space-y-2">
        ${optionsHtml}
      </div>

      ${renderBackButtonHTML()}
    </div>
  `;
}

/**
 * ============================================================================
 * 6. TRAVELER PASSPORT FORM (Compact Landscape Grid)
 * ============================================================================
 */
function toggleMultiSelect(field, value, maxLimit, btnEl) {
  playTone('click');
  const arr = state.passportData[field];
  const idx = arr.indexOf(value);

  if (idx > -1) {
    arr.splice(idx, 1);
    btnEl.classList.remove('bg-amber-300', 'text-slate-950', 'border-amber-300', 'font-semibold');
    btnEl.classList.add('bg-white/5', 'text-slate-200', 'border-white/15');
  } else {
    if (maxLimit && arr.length >= maxLimit) {
      showModal('เลือกได้สูงสุด ' + maxLimit + ' ข้อ', 'หากต้องการเปลี่ยนตัวเลือก ให้กดยกเลิกข้อที่เลือกไว้ก่อนหน้านี้ได้เลยครับ', '💡');
      return;
    }
    arr.push(value);
    btnEl.classList.remove('bg-white/5', 'text-slate-200', 'border-white/15');
    btnEl.classList.add('bg-amber-300', 'text-slate-950', 'border-amber-300', 'font-semibold');
  }
}

function submitPassport(e) {
  e.preventDefault();
  state.passportData.nickname = document.getElementById('passNickname').value.trim();
  state.passportData.grade = document.getElementById('passGrade').value;
  state.passportData.track = document.getElementById('passTrack').value;
  state.passportData.province = document.getElementById('passProvince').value.trim();
  state.passportData.source = document.getElementById('passSource').value;
  state.passportData.stage = document.getElementById('passStage').value;
  state.passportData.contactChannel = document.getElementById('passContact').value;
  goToResult();
}

function renderPassportPanel() {
  const factorChoices = [
    'ค่าเทอม', 'ทุนการศึกษา', 'ชื่อเสียงมหาวิทยาลัย', 'อาชีพหลังเรียนจบ',
    'ผลงานของรุ่นพี่', 'การเดินทาง', 'ความชอบของตัวเอง', 'ผู้ปกครองสนับสนุน'
  ];
  const expChoices = [
    'วาดรูป', 'ออกแบบ', 'ตัดต่อวิดีโอ', 'ทำเกม', 'จัดกิจกรรม', 'ถ่ายคอนเทนต์', 'ยังไม่เคยเลย'
  ];

  return `
    <div class="panel-enter space-y-3.5">
      <div>
        <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-400/20 text-amber-200 border border-amber-300/30 mb-1">
          ประตูสุดท้ายก่อนขึ้นเวทีใหญ่
        </span>
        <h2 class="text-xl lg:text-2xl font-bold text-white">บัตรผ่านนักเดินทาง</h2>
        <p class="text-slate-300 text-xs leading-relaxed">
          กรอกเท่าที่สะดวกได้เลย ข้อไหนไม่อยากตอบก็ข้ามได้ทันที
        </p>
      </div>

      <form id="passportForm" onsubmit="submitPassport(event)" class="space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">1. ชื่อเล่นของเธอ</label>
            <input id="passNickname" type="text" placeholder="เช่น มิน, นนท์, ฟ้า..."
              class="w-full px-3 py-2 rounded-xl bg-black/35 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-amber-300 text-xs" />
          </div>

          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">2. ตอนนี้เรียนอยู่ชั้นไหน</label>
            <select id="passGrade"
              class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-300 text-xs">
              <option value="">-- ข้ามได้ --</option>
              <option value="ม.4">ม.4</option>
              <option value="ม.5">ม.5</option>
              <option value="ม.6">ม.6</option>
              <option value="ปวช.">ปวช.</option>
              <option value="ปวส.">ปวส.</option>
              <option value="อื่น ๆ">อื่น ๆ</option>
            </select>
          </div>

          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">3. เรียนสายอะไรอยู่</label>
            <select id="passTrack"
              class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-300 text-xs">
              <option value="">-- ข้ามได้ --</option>
              <option value="ศิลป์-คำนวณ">ศิลป์-คำนวณ</option>
              <option value="ศิลป์-ภาษา">ศิลป์-ภาษา</option>
              <option value="วิทย์-คณิต">วิทย์-คณิต</option>
              <option value="สายอาชีพ">สายอาชีพ</option>
              <option value="อื่น ๆ">อื่น ๆ</option>
            </select>
          </div>

          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">4. อยู่จังหวัดอะไร</label>
            <input id="passProvince" type="text" placeholder="เช่น ระยอง, กรุงเทพฯ..."
              class="w-full px-3 py-2 rounded-xl bg-black/35 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-amber-300 text-xs" />
          </div>

          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">5. รู้จักคณะนี้จากที่ไหน</label>
            <select id="passSource"
              class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-300 text-xs">
              <option value="">-- ข้ามได้ --</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="เพื่อนหรือรุ่นพี่">เพื่อนหรือรุ่นพี่</option>
              <option value="ครูแนะแนว">ครูแนะแนว</option>
              <option value="งานกิจกรรม">งานกิจกรรม</option>
              <option value="อื่น ๆ">อื่น ๆ</option>
            </select>
          </div>

          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">7. ขั้นตอนการเลือกคณะ</label>
            <select id="passStage"
              class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-300 text-xs">
              <option value="">-- ข้ามได้ --</option>
              <option value="เพิ่งเริ่มหาข้อมูล">เพิ่งเริ่มหาข้อมูล</option>
              <option value="กำลังเปรียบเทียบหลายที่">กำลังเปรียบเทียบหลายที่</option>
              <option value="ตั้งใจสมัครแล้ว">ตั้งใจสมัครแล้ว</option>
              <option value="รอผลสอบที่อื่นก่อน">รอผลสอบที่อื่นก่อน</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">
            6. เลือกคณะโดยดูจากอะไรมากที่สุด <span class="text-amber-300">(เลือกได้ 2 ข้อ)</span>
          </label>
          <div class="flex flex-wrap gap-1.5">
            ${factorChoices.map(item => `
              <button type="button" onclick="toggleMultiSelect('factors', '${item}', 2, this)"
                class="px-2.5 py-1 rounded-lg text-[11px] bg-white/5 text-slate-200 border border-white/15 hover:border-amber-300/50 transition">
                ${item}
              </button>
            `).join('')}
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">
            8. เคยทำงานสร้างสรรค์อะไรมาบ้าง
          </label>
          <div class="flex flex-wrap gap-1.5">
            ${expChoices.map(item => `
              <button type="button" onclick="toggleMultiSelect('experiences', '${item}', null, this)"
                class="px-2.5 py-1 rounded-lg text-[11px] bg-white/5 text-slate-200 border border-white/15 hover:border-amber-300/50 transition">
                ${item}
              </button>
            `).join('')}
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-medium text-slate-300 mb-1">9. อยากรับข่าวสารของคณะทางไหน</label>
          <select id="passContact"
            class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-300 text-xs">
            <option value="">-- ข้ามได้ --</option>
            <option value="LINE">LINE</option>
            <option value="อีเมล">อีเมล</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="โทรศัพท์">โทรศัพท์</option>
          </select>
        </div>

        <div class="pt-2 flex flex-col sm:flex-row gap-2">
          <button type="submit"
            class="flex-1 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 hover:brightness-110 transition shadow-lg">
            บันทึกบัตรผ่านและขึ้นเวที ✨
          </button>
          <button type="button" onclick="goToResult()"
            class="py-3 px-4 rounded-xl font-medium text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition">
            ข้าม / ขึ้นเวทีเลย
          </button>
        </div>
        ${renderBackButtonHTML()}
      </form>
    </div>
  `;
}

/**
 * ============================================================================
 * 7. FINAL RESULT PANEL (Single or Hybrid Ending + Career Priority + CTA)
 * ============================================================================
 */
function renderResultPanel() {
  const res = calculateFinalResult();
  const nickname = state.passportData.nickname ? `คุณ${state.passportData.nickname}` : 'นักเดินทาง';
  const char1Url = getEndingCharacterUrl(res.primaryMajor.code);

  const renderCareerBox = (majorObj, careerGroup) => {
    const highlightedHtml = careerGroup.highlighted.map(c => `
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold bg-amber-300 text-slate-950 shadow">
        <span>★</span> ${c}
      </span>
    `).join('');

    const othersHtml = careerGroup.others.map(c => `
      <span class="inline-block px-2.5 py-1 rounded-lg text-[11px] sm:text-xs bg-white/10 text-slate-100 border border-white/15">
        ${c}
      </span>
    `).join('');

    return `
      <div class="bg-black/35 rounded-2xl p-4 border border-white/15 space-y-2.5">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div class="text-[10px] uppercase tracking-wider text-slate-400">เรียนได้ที่ School of Digital Media (SDM)</div>
            <h3 class="text-base sm:text-lg font-bold text-white">${majorObj.fullName}</h3>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${majorObj.badgeBg}">
            ${majorObj.roleTitle}
          </span>
        </div>

        <p class="text-slate-300 text-xs leading-relaxed">
          ${majorObj.endingDesc}
        </p>

        <div>
          <div class="text-[11px] font-medium text-amber-200 mb-1.5">
            อาชีพที่เกี่ยวข้อง ${careerGroup.highlighted.length > 0 ? '(★ ตรงกับตัวเลือกในย่านของเธอ)' : ''}:
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${highlightedHtml}
            ${othersHtml}
          </div>
        </div>
      </div>
    `;
  };

  const maxPossible = 11;
  const barsHtml = res.entries.map(item => {
    const m = MAJORS[item.code];
    const widthPct = Math.max(8, Math.round((item.score / maxPossible) * 100));
    return `
      <div>
        <div class="flex justify-between text-[11px] mb-1">
          <span class="text-slate-200 font-medium">${m.roleTitle} <span class="text-slate-400">(${m.shortName})</span></span>
          <span class="text-amber-200 font-semibold">${item.score}/${maxPossible}</span>
        </div>
        <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div class="h-full rounded-full bg-gradient-to-r ${m.gradient}" style="width: ${widthPct}%"></div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="panel-enter space-y-4">
      <div>
        <span class="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold bg-amber-300/20 text-amber-200 border border-amber-300/30 mb-1.5">
          ✨ ฉากจบ: เธอคือนักเดินทางแบบไหน
        </span>
        <div class="text-xs text-slate-300">ตัวตนของ${nickname}ในค่ำคืนนี้คือ...</div>

        ${res.isHybrid ? `
          <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-cyan-200 leading-tight mt-0.5">
            ${res.hybridTitle}
          </h1>
          <p class="text-xs text-amber-200/90 font-medium mt-0.5">
            ผสานพลังระหว่าง ${res.primaryMajor.roleTitle} × ${res.secondaryMajor.roleTitle}
          </p>
        ` : `
          <h1 class="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-cyan-200 leading-tight mt-0.5">
            ${res.primaryMajor.roleTitle}
          </h1>
          <p class="text-xs sm:text-sm text-amber-200 font-medium mt-0.5">
            ${res.primaryMajor.fullName}
          </p>
        `}
      </div>

      ${char1Url ? `
        <div class="flex items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-white/[0.08] to-black/40 border border-white/15">
          <div class="flex flex-col items-center">
            <img src="${char1Url}" referrerpolicy="no-referrer" alt="${res.primaryMajor.roleTitle}"
              class="h-32 sm:h-36 w-auto object-contain rounded-xl drop-shadow-[0_6px_16px_rgba(0,0,0,0.85)]" />
            <span class="mt-1 text-[11px] font-medium text-amber-200">${res.primaryMajor.roleTitle}</span>
          </div>
        </div>
      ` : ''}

      <div class="space-y-3">
        ${renderCareerBox(res.primaryMajor, res.primaryCareers)}
        ${res.isHybrid ? renderCareerBox(res.secondaryMajor, res.secondaryCareers) : ''}
      </div>

      <div class="bg-black/30 rounded-2xl p-3.5 border border-white/10">
        <div class="text-xs font-semibold text-white mb-2.5">📊 คะแนนความถนัดทั้ง 5 ด้าน</div>
        <div class="space-y-2.5">
          ${barsHtml}
        </div>
      </div>

      <div class="space-y-2.5 pt-1">
        <p class="text-xs text-slate-300 text-center">
          ไม่ว่าเธอจะเป็นนักเดินทางแบบไหน เมืองนี้ยังมีที่ว่างรออยู่
        </p>
        <button type="button" onclick="handleSubscribeClick()"
          class="w-full py-3.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300 hover:brightness-110 transition shadow-lg">
          สมัครสมาชิก เพื่อรับข่าวกิจกรรมของ SDM และข้อมูลทุนการศึกษาก่อนใคร
        </button>
        <div class="grid grid-cols-2 gap-2.5">
          <button type="button" onclick="restartFromEnding()"
            class="py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-amber-200 bg-white/10 hover:bg-white/20 border border-amber-300/35 transition flex items-center justify-center gap-1.5">
            <span>↻</span>
            <span>เล่นอีกครั้ง</span>
          </button>
          <button type="button" onclick="openExitScreen()"
            class="py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 bg-white/[0.06] hover:bg-rose-500/20 border border-white/15 hover:border-rose-400/40 transition flex items-center justify-center gap-1.5">
            <span>✕</span>
            <span>ออก</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function handleSubscribeClick() {
  playTone('celebrate');
  const nick = state.passportData.nickname ? `คุณ${state.passportData.nickname}` : 'นักเดินทาง';
  const channel = state.passportData.contactChannel ? `ทาง ${state.passportData.contactChannel}` : '';
  showModal(
    'ลงทะเบียนรับข่าวสาร SDM เรียบร้อย!',
    `ขอบคุณ${nick}ที่ร่วมคืนสีสันให้ Imagine City! ระบบได้บันทึกข้อมูลนักเดินทางเรียบร้อยแล้ว เตรียมพบกับข่าวสารกิจกรรมและทุนการศึกษาจาก School of Digital Media (SDM) ${channel} เร็ว ๆ นี้`,
    '🎉'
  );
}

function showModal(title, body, icon = '✨') {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent = body;
  document.getElementById('modalIcon').textContent = icon;
  document.getElementById('modalActions').innerHTML = `
    <button type="button" onclick="closeModal()"
      class="w-full py-3 px-5 rounded-2xl font-semibold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 hover:brightness-110 transition">
      ตกลง
    </button>
  `;
  const modal = document.getElementById('customModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function showConfirmModal(title, body, icon = '↻', onConfirm) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent = body;
  document.getElementById('modalIcon').textContent = icon;
  const actionsEl = document.getElementById('modalActions');
  actionsEl.innerHTML = `
    <button type="button" id="modalConfirmBtn"
      class="flex-1 py-3 px-5 rounded-2xl font-semibold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 hover:brightness-110 transition">
      ยืนยันเริ่มใหม่
    </button>
    <button type="button" onclick="closeModal()"
      class="flex-1 py-3 px-5 rounded-2xl font-medium text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition">
      ยกเลิก
    </button>
  `;
  document.getElementById('modalConfirmBtn').onclick = onConfirm;
  const modal = document.getElementById('customModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal() {
  playTone('click');
  const modal = document.getElementById('customModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

/**
 * ============================================================================
 * 8. SCENE KEY HELPER FOR SCENE_IMAGES_CONFIG
 * ============================================================================
 */
function getCurrentSceneKey() {
  if (state.screen === 'prologue') return 'prologue';
  if (state.screen === 'scene_before') {
    const scene = SCENES_BEFORE_DISTRICT[state.beforeIndex];
    return scene ? `scene_${scene.id}` : 'scene_1.1';
  }
  if (state.screen === 'district') {
    const majorCode = state.districtQueue[state.districtIndex];
    return majorCode ? `district_${majorCode}` : 'district_DGA';
  }
  if (state.screen === 'scene_after') {
    const scene = SCENES_AFTER_DISTRICT[state.afterIndex];
    return scene ? `scene_${scene.id}` : 'scene_gate';
  }
  if (state.screen === 'passport') return 'passport';
  if (state.screen === 'result') return 'result';
  return 'prologue';
}

function getEndingCharacterUrl(majorCode) {
  const el = document.getElementById(`img_ending_char_${majorCode}`);
  if (!el) return '';
  const rawSrc = (el.getAttribute('src') || '').trim();
  if (!rawSrc) return '';
  const normalized = normalizeImageUrl(rawSrc);
  if (normalized.url !== rawSrc) {
    el.setAttribute('src', normalized.url);
  }
  return normalized.url;
}

function normalizeImageUrl(rawUrl) {
  const clean = (rawUrl || '').replace(/\s+/g, '').trim();
  const match = clean.match(/(?:\/file\/d\/|[?&]id=|\/d\/)([a-zA-Z0-9_-]{20,})/);
  if (match && clean.includes('google.com')) {
    const fileId = match[1];
    return {
      url: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920`,
      driveId: fileId
    };
  }
  return { url: clean, driveId: null };
}

function handleGDriveImgError(imgEl, fileId) {
  const step = parseInt(imgEl.dataset.retry || '0', 10);
  if (step === 0) {
    imgEl.dataset.retry = '1';
    imgEl.src = `https://lh3.googleusercontent.com/d/${fileId}=w1920`;
  } else if (step === 1) {
    imgEl.dataset.retry = '2';
    imgEl.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920`;
  } else if (step === 2) {
    imgEl.dataset.retry = '3';
    imgEl.src = `https://drive.google.com/uc?export=view&id=${fileId}`;
  } else {
    imgEl.classList.add('hidden');
  }
}

function preloadSceneImages() {
  document.querySelectorAll('#sceneImagesBank img').forEach(imgEl => {
    const rawSrc = (imgEl.getAttribute('src') || '').trim();
    if (rawSrc) {
      const normalized = normalizeImageUrl(rawSrc);
      imgEl.setAttribute('src', normalized.url);
      if (normalized.driveId) {
        imgEl.onerror = () => handleGDriveImgError(imgEl, normalized.driveId);
      }
      const loader = new Image();
      loader.referrerPolicy = 'no-referrer';
      loader.src = normalized.url;
    }
  });
}

window.onload = function () {
  preloadSceneImages();
  initVisualStage();
  render();
};