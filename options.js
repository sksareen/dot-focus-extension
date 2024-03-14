// Save options to chrome.storage
function saveOptions() {
  const backgroundImage = document.getElementById('backgroundImageSelector').value;
  const dotType = document.getElementById('dotTypeSelector').value;
  const musicOn = document.getElementById('musicToggle').checked;
  const breathingExercise = document.getElementById('breathingExerciseToggle').checked;

  const userPreferences = {
    backgroundImage,
    dotType,
    musicOn,
    breathingExercise
  };

  chrome.storage.sync.set({ userPreferences }, function() {
    // Update status to let user know options were saved
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage
function restoreOptions() {
  // Use default values
  chrome.storage.sync.get({
    userPreferences: {
      backgroundImage: 'images/background.jpg',
      dotType: 'default',
      musicOn: false,
      breathingExercise: false
    }
  }, function(items) {
    document.getElementById('backgroundImageSelector').value = items.userPreferences.backgroundImage;
    document.getElementById('dotTypeSelector').value = items.userPreferences.dotType;
    document.getElementById('musicToggle').checked = items.userPreferences.musicOn;
    document.getElementById('breathingExerciseToggle').checked = items.userPreferences.breathingExercise;
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);