const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const songCurrentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const seekBar = document.getElementById('seek-bar');
const shuffleBtn = document.getElementById('shuffle-btn');
const prevBtn = document.getElementById('prev-btn');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
const repeatBtn = document.getElementById('repeat-btn');
const audio = document.getElementById('audio');

// Settings popup
const settingsBtn = document.getElementById('settings-btn');
const popup = document.getElementById('settings-popup');
const popupClose = document.getElementById('popup-close');
const popupVolume = document.getElementById('popup-volume');
const popupSpeed = document.getElementById('popup-speed');
const popupPitch = document.getElementById('popup-pitch');
const popupBass = document.getElementById('popup-bass');
const popupTreble = document.getElementById('popup-treble');
const popupBalance = document.getElementById('popup-balance');
const resetBtn = document.getElementById('reset-settings');

// Value display elements
const volumeValue = document.getElementById('volume-value');
const speedValue = document.getElementById('speed-value');
const pitchValue = document.getElementById('pitch-value');
const bassValue = document.getElementById('bass-value');
const trebleValue = document.getElementById('treble-value');
const balanceValue = document.getElementById('balance-value');

// Web Audio API
let audioContext;
let sourceNode;
let gainNode;
let bassFilter;
let trebleFilter;
let panner;
let isAudioContextReady = false;
let isShuffled = false;
let repeatMode = 0;

function playSong(file) {
    audio.src = URL.createObjectURL(file);
    audio.play();
    playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause preview-icon"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>';
    playBtn.classList.add('playing');
    document.querySelector('.cover').classList.add('playing');

    // Highlight the active playlist item
    const playlistItems = document.querySelectorAll('#playlist li');
    playlistItems.forEach(item => item.classList.remove('active'));
    if (currentIndex >= 0 && currentIndex < playlistItems.length) {
        playlistItems[currentIndex].classList.add('active');
    }

    jsmediatags.read(file, {
    onSuccess: function(tag) {
        const artist = tag.tags.artist || 'Unknown Artist';
        const title = tag.tags.title || file.name.replace('.mp3', '');
        songTitle.textContent = title;
        songArtist.textContent = artist;
        const coverArt = document.getElementById('cover-art');
        const picture = tag.tags.picture;

        if (picture) {
        const blob = new Blob([new Uint8Array(picture.data)], { type: picture.format });
        const url = URL.createObjectURL(blob);
        coverArt.src = url;
        } else {
            coverArt.src = 'assets/SLEEK_SILVER_MUSIC_NOTE.png';
        }
    },
    onError: function() {
        songTitle.textContent = file.name.replace('.mp3', '');
        songArtist.textContent = 'Unknown Artist';
        coverArt.src = 'assets/SLEEK_SILVER_MUSIC_NOTE.png';
    }
    });
};

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause preview-icon"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>';
        playBtn.classList.add('playing');
        document.querySelector('.cover').classList.add('playing');
    }
    else {
        audio.pause();
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play preview-icon"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>';
        playBtn.classList.remove('playing');
        document.querySelector('.cover').classList.remove('playing');
    }
});

audio.addEventListener('timeupdate', () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
    songCurrentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
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

repeatBtn.addEventListener('click', () => {
    repeatMode = (repeatMode + 1) % 3;
    
    if (repeatMode === 0) {
        repeatBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat-off preview-icon"><path d="M11.656 6H21l-4-4"/><path d="M17.898 17.898A4 4 0 0 1 17 18H3l4-4"/><path d="m2 2 20 20"/><path d="M21 13v1a4 4 0 0 1-.171 1.159"/><path d="m21 6-4 4"/><path d="M3 11v-1a4 4 0 0 1 3.102-3.898"/><path d="m7 22-4-4"/></svg>`;
        repeatBtn.classList.remove('active')
    }
    else if (repeatMode === 1) {
        repeatBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat preview-icon"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>`;
        repeatBtn.classList.add('active')
    }
    else if (repeatMode === 2) {
        repeatBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat-1 preview-icon"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/><path d="M11 10h1v4"/></svg>`;
        repeatBtn.classList.add('active')
    }
});

audio.addEventListener('ended', () => {
    if (repeatMode === 2) {
        audio.play();
    }
    else {
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
    }
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formatedSec = secs < 10 ? '0' + secs : secs; 

    return `${mins}:${formatedSec}`;
}

// ===== Web Audio API Setup =====
function initAudioContext() {
    if (isAudioContextReady) return;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    sourceNode = audioContext.createMediaElementSource(audio);
    gainNode = audioContext.createGain();
    bassFilter = audioContext.createBiquadFilter();
    trebleFilter = audioContext.createBiquadFilter();

    // Bass: lowshelf at 150 Hz
    bassFilter.type = 'lowshelf';
    bassFilter.frequency.value = 150;
    bassFilter.gain.value = 0;

    // Treble: highshelf at 3 kHz
    trebleFilter.type = 'highshelf';
    trebleFilter.frequency.value = 3000;
    trebleFilter.gain.value = 0;

    // Panning for balance
    panner = audioContext.createStereoPanner();
    panner.pan.value = 0;

    // Volume gain
    gainNode.gain.value = popupVolume.value / 100;

    // Connect chain: source → bass → treble → panner → gain → destination
    sourceNode.connect(bassFilter);
    bassFilter.connect(trebleFilter);
    trebleFilter.connect(panner);
    panner.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Audio element volume is neutral since gainNode controls it
    audio.volume = 1;

    isAudioContextReady = true;
}

// Resume audio context on user interaction (required by some browsers)
function resumeAudioContext() {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

// ===== Popup Open/Close =====
settingsBtn.addEventListener('click', () => {
    initAudioContext();
    resumeAudioContext();
    popup.classList.add('active');
});

popupClose.addEventListener('click', () => {
    popup.classList.remove('active');
});

// Close popup when clicking outside the popup content
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.remove('active');
    }
});

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        popup.classList.remove('active');
    }
});

// ===== Control Event Listeners =====

// Volume
popupVolume.addEventListener('input', () => {
    const val = popupVolume.value;
    volumeValue.textContent = val + '%';

    if (gainNode) {
        gainNode.gain.value = val / 100;
    } else {
        audio.volume = val / 100;
    }
});

// Speed
popupSpeed.addEventListener('input', () => {
    const val = parseFloat(popupSpeed.value);
    speedValue.textContent = val.toFixed(2) + 'x';
    updatePlaybackRate();
});

// Pitch
popupPitch.addEventListener('input', () => {
    const val = parseFloat(popupPitch.value);
    pitchValue.textContent = val.toFixed(2) + 'x';
    updatePlaybackRate();
});

// Bass (EQ)
popupBass.addEventListener('input', () => {
    const val = popupBass.value;
    bassValue.textContent = val + ' dB';
    if (bassFilter) {
        bassFilter.gain.value = parseFloat(val);
    }
});

// Treble (EQ)
popupTreble.addEventListener('input', () => {
    const val = popupTreble.value;
    trebleValue.textContent = val + ' dB';
    if (trebleFilter) {
        trebleFilter.gain.value = parseFloat(val);
    }
});

// Balance
popupBalance.addEventListener('input', () => {
    const val = parseFloat(popupBalance.value);
    if (val === 0) {
        balanceValue.textContent = 'Center';
    } else if (val < 0) {
        balanceValue.textContent = 'L' + Math.abs(val).toFixed(2);
    } else {
        balanceValue.textContent = 'R' + val.toFixed(2);
    }
    if (panner) {
        panner.pan.value = val;
    }
});

// Update playback rate = speed × pitch
function updatePlaybackRate() {
    audio.playbackRate = parseFloat(popupSpeed.value) * parseFloat(popupPitch.value);
}

// Reset All
resetBtn.addEventListener('click', () => {
    popupVolume.value = 100;
    popupSpeed.value = 1;
    popupPitch.value = 1;
    popupBass.value = 0;
    popupTreble.value = 0;
    popupBalance.value = 0;

    volumeValue.textContent = '100%';
    speedValue.textContent = '1.00x';
    pitchValue.textContent = '1.00x';
    bassValue.textContent = '0 dB';
    trebleValue.textContent = '0 dB';
    balanceValue.textContent = 'Center';

    updatePlaybackRate();

    if (gainNode) gainNode.gain.value = 1;
    if (bassFilter) bassFilter.gain.value = 0;
    if (trebleFilter) trebleFilter.gain.value = 0;
    if (panner) panner.pan.value = 0;
});