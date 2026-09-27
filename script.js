const audio = document.getElementById('music');
const play = document.getElementById('play');
const progress = document.getElementById('progress');
const heart = document.getElementById('heart');

play.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        play.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause preview-icon"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>';
    }
    else {
        audio.pause();
        play.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play preview-icon"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>';
    }
});

audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener('ended', () => {
    play.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play preview-icon"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>';
});

heart.addEventListener('click', () => {
    heart.classList.toggle('is-active');
});