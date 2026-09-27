const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const seekBar = document.getElementById('seek-bar');
const shuffleBtn = document.getElementById('shuffle-btn');
const prevBtn = document.getElementById('prev-btn');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
const repeatBtn = document.getElementById('repeat-btn');
const volumeBar = document.getElementById('volume-bar');
const audio = document.getElementById('audio');
const song = document.querySelector('#playlist li');
let isShuffled = false;

function playSong(file) {
    audio.src = URL.createObjectURL(file);
    audio.play();
    playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause preview-icon"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>';

    jsmediatags.read(file, {
    onSuccess: function(tag) {
        const artist = tag.tags.artist || 'Unknown Artist';
        const title = tag.tags.title || file.name.replace('.mp3', '');
        songTitle.textContent = title;
        songArtist.textContent = artist;
    },
    onError: function() {
        songTitle.textContent = file.name.replace('.mp3', '');
        songArtist.textContent = 'Unknown Artist';
    }
    });
};

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause preview-icon"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>';
    }
    else {
        audio.pause();
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play preview-icon"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>';
    }
});

audio.addEventListener('timeupdate', () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
});

seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});

nextBtn.addEventListener('click', () => {

    if (isShuffled) {
        currentIndex = Math.floor(Math.random() * songs.length)
    }
    else {
        currentIndex++;

        if (currentIndex >= songs.length) {
            currentIndex = 0;
        }
    }

    playSong(songs[currentIndex]);
});

prevBtn.addEventListener('click', () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = songs.length - 1;
    }

    playSong(songs[currentIndex]);
});

shuffleBtn.addEventListener('click', () => {
    isShuffled = !isShuffled;
    shuffleBtn.classList.toggle('active');
});