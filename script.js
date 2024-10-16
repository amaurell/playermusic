const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const playlistElement = document.getElementById('playlist');
const fileInput = document.getElementById('file-input');
let playlist = [];
let currentTrackIndex = 0;

// Carregar arquivos MP3
fileInput.addEventListener('change', (event) => {
  const files = Array.from(event.target.files);
  playlist = files;
  renderPlaylist();
  loadTrack(0);
});

function renderPlaylist() {
  playlistElement.innerHTML = '';
  playlist.forEach((file, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = file.name;
    listItem.addEventListener('click', () => loadTrack(index));
    playlistElement.appendChild(listItem);
  });
}

function loadTrack(index) {
  if (index >= 0 && index < playlist.length) {
    const track = playlist[index];
    audio.src = URL.createObjectURL(track);
    document.getElementById('track-title').textContent = track.name;
    currentTrackIndex = index;
    playAudio();
  }
}

function playAudio() {
  audio.play();
  playButton.textContent = 'Pause';
}

function pauseAudio() {
  audio.pause();
  playButton.textContent = 'Play';
}

// Botão de Play/Pause
playButton.addEventListener('click', () => {
  if (audio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
});

// Próxima faixa
nextButton.addEventListener('click', () => {
  if (currentTrackIndex < playlist.length - 1) {
    loadTrack(currentTrackIndex + 1);
  }
});

// Faixa anterior
prevButton.addEventListener('click', () => {
  if (currentTrackIndex > 0) {
    loadTrack(currentTrackIndex - 1);
  }
});

// Tocar a próxima faixa automaticamente
audio.addEventListener('ended', () => {
  if (currentTrackIndex < playlist.length - 1) {
    loadTrack(currentTrackIndex + 1);
  }
});
