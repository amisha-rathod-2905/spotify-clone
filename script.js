let currentAudio = null;

function togglePlayPause(audioId) {
    const audio = document.getElementById(audioId);

    // Pause the currently playing audio if it's different
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset the current time
    }

    // Toggle play/pause for the selected audio
    if (audio.paused) {
        audio.play();
        currentAudio = audio; // Update the currently playing audio
    } else {
        audio.pause();
    }
    
    // Update progress bar for this audio
    audio.addEventListener('timeupdate', updateProgressBar);
    audio.addEventListener('loadedmetadata', () => {
        document.getElementById('duration').textContent = formatTime(audio.duration);
    });
}

function updateProgressBar() {
    const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    document.getElementById('progressRange').value = progress;
    document.getElementById('currentTime').textContent = formatTime(currentAudio.currentTime);
}

document.getElementById('progressRange').addEventListener('input', (event) => {
    if (currentAudio) {
        const seekTime = (event.target.value / 100) * currentAudio.duration;
        currentAudio.currentTime = seekTime;
    }
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function toggleSearch() {
  const searchContainer = document.getElementById("searchContainer");
  searchContainer.style.display = searchContainer.style.display === "none" ? "block" : "none";
}

// Function to filter cards based on search input
function filterCards() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".card-container .card");
  
  cards.forEach(card => {
      const title = card.getAttribute("data-title").toLowerCase();
      if (title.includes(searchInput)) {
          card.style.display = "block";
      } else {
          card.style.display = "none";
      }
  });
}