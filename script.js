const loader = document.getElementById('loader');
const enterOverlay = document.getElementById('enterOverlay');
const mainContent = document.getElementById('mainContent');
const bgMusic = document.getElementById('bgMusic');
const social = document.getElementById('social');

/* ============================================
   LOADING → ENTER
   ============================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    enterOverlay.classList.add('show');
  }, 1400);
});

enterOverlay.addEventListener('click', () => {
  enterOverlay.classList.add('hidden');
  mainContent.classList.add('visible');
  social.classList.add('visible');

  bgMusic.volume = 0;
  bgMusic.load();
  bgMusic.play().catch(() => {});

  let vol = 0;
  const targetVol = 0.5;
  const fade = setInterval(() => {
    vol += 0.04;
    if (vol >= targetVol) {
      vol = targetVol;
      clearInterval(fade);
    }
    bgMusic.volume = vol;
  }, 80);
});

/* ============================================
   MUSIC FADE HELPERS
   ============================================ */
function fadeMusic(to, dur = 400) {
  const start = bgMusic.volume;
  const diff = to - start;
  const steps = Math.max(1, Math.floor(dur / 40));
  let i = 0;
  const iv = setInterval(() => {
    i++;
    bgMusic.volume = start + diff * (i / steps);
    if (i >= steps) {
      bgMusic.volume = to;
      clearInterval(iv);
    }
  }, 40);
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) fadeMusic(0, 300);
  else if (enterOverlay.classList.contains('hidden')) fadeMusic(0.5, 600);
});

window.addEventListener('pagehide', () => fadeMusic(0, 200));
window.addEventListener('pageshow', () => {
  if (enterOverlay.classList.contains('hidden')) fadeMusic(0.5, 600);
});

document.querySelectorAll('.social-link').forEach(el => {
  el.addEventListener('click', () => fadeMusic(0, 200));
});

/* ============================================
   SCOOTER POPUP
   ============================================ */
const bikeBtn = document.getElementById('bikeBtn');
const bikePopup = document.getElementById('bikePopup');
const popupClose = document.getElementById('popupClose');

bikeBtn.addEventListener('click', () => bikePopup.classList.add('show'));

function closePopup() {
  bikePopup.classList.remove('show');
}

popupClose.addEventListener('click', closePopup);
bikePopup.addEventListener('click', (e) => {
  if (e.target === bikePopup) closePopup();
});

/* ============================================
   CLEANUP
   ============================================ */
window.addEventListener('beforeunload', () => {
  if (bgMusic && !bgMusic.paused) bgMusic.pause();
});
