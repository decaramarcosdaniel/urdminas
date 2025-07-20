
document.getElementById('enter-button').addEventListener('click', () => {
  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('main-content').classList.remove('hidden');
  document.getElementById('bg-music').play();
  document.getElementById('music-container').classList.remove('hidden');
  document.getElementById('music-icon').textContent = '⏸️';
});

document.getElementById('music-toggle').addEventListener('click', () => {
  const music = document.getElementById('bg-music');
  const icon = document.getElementById('music-icon');
  if (music.paused) {
    music.play();
    icon.textContent = '⏸️';
  } else {
    music.pause();
    icon.textContent = '▶️';
  }
});

// Contador regresivo
function updateCountdown() {
  const countdown = document.getElementById("countdown");
  const targetDate = new Date("2025-08-01T17:00:00").getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `
    <div>${days}<span class="label">DÍAS</span></div>
    <div>${hours}<span class="label">HORAS</span></div>
    <div>${minutes}<span class="label">MINUTOS</span></div>
    <div>${seconds}<span class="label">SEGUNDOS</span></div>
  `;
}
setInterval(updateCountdown, 1000);
updateCountdown();
