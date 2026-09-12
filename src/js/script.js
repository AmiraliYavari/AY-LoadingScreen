/* ==========================================================================
   AY ROLEPLAY — LOADING SCREEN LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     0. INTRO CURTAIN CLEANUP (avoid it blocking clicks after it fades)
  --------------------------------------------------------------------- */
  const curtain = document.getElementById('intro-curtain');
  if (curtain) {
    setTimeout(() => curtain.remove(), 1800);
  }

  /* ---------------------------------------------------------------------
     1. TAB NAVIGATION (with sliding indicator)
  --------------------------------------------------------------------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.panel');
  const indicator = document.getElementById('tab-indicator');

  function moveIndicatorTo(btn) {
    if (!indicator || !btn) return;
    const INSET = 14; // px shaved off each side so the line reads as a short accent mark
    const width = Math.max(btn.offsetWidth - INSET * 2, 10);
    indicator.style.width = width + 'px';
    indicator.style.transform = 'translateX(' + (btn.offsetLeft + INSET) + 'px)';
  }

  const initialActive = document.querySelector('.tab-btn.active');
  requestAnimationFrame(() => moveIndicatorTo(initialActive));
  window.addEventListener('resize', () => {
    moveIndicatorTo(document.querySelector('.tab-btn.active'));
  });

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
      moveIndicatorTo(btn);
    });
  });

  /* ---------------------------------------------------------------------
     2. BACKGROUND SLIDESHOW (GTA-style crossfade transition)
  --------------------------------------------------------------------- */
  const slides = document.querySelectorAll('.bg-slide');
  let slideIndex = 0;
  const SLIDE_INTERVAL = 7000;

  function nextSlide() {
    const current = slides[slideIndex];
    slideIndex = (slideIndex + 1) % slides.length;
    const next = slides[slideIndex];

    current.classList.remove('active');
    current.classList.add('leaving');
    next.classList.add('active');

    setTimeout(() => current.classList.remove('leaving'), 1800);
  }
  setInterval(nextSlide, SLIDE_INTERVAL);

  /* ---------------------------------------------------------------------
     3. LIVE STATUS LABEL
     (dispatch tips now scroll via the CSS-only ticker marquee)
  --------------------------------------------------------------------- */
  const statPlayers = document.getElementById('stat-players');
  setTimeout(() => { statPlayers.textContent = 'Connecting to city grid…'; }, 1200);

  /* ---------------------------------------------------------------------
     4. PROGRESS BAR — synced to the real FiveM resource load
     FiveM's client fires postMessage events at window with an
     eventName of "loadProgress" and a loadFraction between 0 and 1
     while resources/streaming assets are being mounted.
  --------------------------------------------------------------------- */
  const fill = document.getElementById('progress-fill');
  const glow = document.getElementById('progress-glow');
  const percentLabel = document.getElementById('progress-percent');
  const statusLabel = document.getElementById('progress-status');

  let realProgressReceived = false;
  let displayedPercent = 0;
  let targetPercent = 0;
  let rafHandle = null;

  function renderProgress() {
    const diff = targetPercent - displayedPercent;
    displayedPercent += diff * 0.18;
    if (Math.abs(diff) < 0.05) displayedPercent = targetPercent;

    fill.style.width = displayedPercent + '%';
    glow.style.left = 'calc(' + displayedPercent + '% - 13px)';
    percentLabel.textContent = Math.round(displayedPercent) + '%';

    if (displayedPercent !== targetPercent) {
      rafHandle = requestAnimationFrame(renderProgress);
    } else {
      rafHandle = null;
    }
  }

  function setProgress(pct, statusText) {
    targetPercent = Math.max(0, Math.min(100, pct));
    if (statusText) statusLabel.textContent = statusText;
    if (!rafHandle) rafHandle = requestAnimationFrame(renderProgress);
  }

  window.addEventListener('message', (event) => {
    const data = event.data || {};

    switch (data.eventName) {
      case 'loadProgress':
        realProgressReceived = true;
        setProgress(data.loadFraction * 100, 'Loading resources…');
        break;

      case 'startInit':
        realProgressReceived = true;
        statusLabel.textContent = 'Starting initialization…';
        break;

      case 'performMapLoading':
        realProgressReceived = true;
        statusLabel.textContent = 'Loading map data…';
        break;

      case 'loadDrawSettings':
        realProgressReceived = true;
        statusLabel.textContent = 'Applying settings…';
        break;

      case 'onYouTubeIframeAPIReady':
        // Not used, present for compatibility with some FiveM builds.
        break;
    }
  });

  // Fallback so the page still looks alive in a normal browser preview.
  // If FiveM never sends a real loadProgress event within 1.5s, run a
  // demo sequence — this block is inert once real events start arriving.
  setTimeout(() => {
    if (realProgressReceived) return;

    statusLabel.textContent = 'Loading resources…';
    let demo = 0;
    const demoTimer = setInterval(() => {
      if (realProgressReceived) { clearInterval(demoTimer); return; }
      demo += Math.random() * 6 + 2;
      if (demo >= 100) {
        demo = 100;
        clearInterval(demoTimer);
        statusLabel.textContent = 'Ready';
      }
      setProgress(demo);
    }, 380);
  }, 1500);

  /* ---------------------------------------------------------------------
     5. MUSIC PLAYER
  --------------------------------------------------------------------- */
  const audio = document.getElementById('bg-audio');
  const playBtn = document.getElementById('player-play');
  const playIcon = document.getElementById('player-play-icon');
  const seekBar = document.getElementById('player-seek');
  const seekFill = document.getElementById('player-seek-fill');
  const volumeSlider = document.getElementById('player-volume');
  const muteBtn = document.getElementById('player-mute');
  const volIcon = document.getElementById('player-vol-icon');
  const eqBars = document.getElementById('eq-bars');

  audio.volume = volumeSlider.value / 100;

  function playAudio() {
    audio.play().then(() => {
      playIcon.classList.remove('fa-play');
      playIcon.classList.add('fa-pause');
      if (eqBars) eqBars.classList.remove('paused');
    }).catch(() => {
      // Autoplay blocked — wait for user gesture.
    });
  }

  function pauseAudio() {
    audio.pause();
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    if (eqBars) eqBars.classList.add('paused');
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) playAudio(); else pauseAudio();
  });

  // Attempt autoplay on load; browsers/CEF may block until first interaction.
  playAudio();

  // Unlock audio on first user interaction anywhere on the page.
  ['click', 'keydown'].forEach(evt => {
    document.body.addEventListener(evt, () => {
      if (audio.paused) playAudio();
    }, { once: true });
  });

  audio.addEventListener('timeupdate', () => {
    const pct = (audio.currentTime / (audio.duration || 1)) * 100;
    seekFill.style.width = pct + '%';
  });

  seekBar.addEventListener('click', (e) => {
    const rect = seekBar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    if (audio.duration) audio.currentTime = ratio * audio.duration;
  });

  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
    audio.muted = false;
    updateVolIcon();
  });

  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    updateVolIcon();
  });

  function updateVolIcon() {
    volIcon.className = 'fa-solid';
    if (audio.muted || audio.volume === 0) {
      volIcon.classList.add('fa-volume-xmark');
    } else if (audio.volume < 0.5) {
      volIcon.classList.add('fa-volume-low');
    } else {
      volIcon.classList.add('fa-volume-high');
    }
  }

  // Prev/Next are wired up for a future multi-track playlist —
  // currently AY Radio ships with a single ambient track, so they just restart it.
  document.getElementById('player-prev').addEventListener('click', () => { audio.currentTime = 0; });
  document.getElementById('player-next').addEventListener('click', () => { audio.currentTime = 0; });

});
