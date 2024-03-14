// Define the initial state of the popup
let isFocusSessionActive = false;
let focusSessionTimer = null;
let focusStartTime = null;
let focusEndTime = null;
let focusDuration = 0;

// Cache DOM elements for later use
const startButton = document.getElementById('startButton');
const endButton = document.getElementById('endButton');
const focusTimer = document.getElementById('focusTimer');
const focusRating = document.getElementById('focusRating');
const sessionSummary = document.getElementById('sessionSummary');
const breathingExerciseToggle = document.getElementById('breathingExerciseToggle');

// Function to start the focus session
function initiateFocusSession() {
  if (isFocusSessionActive) return;
  isFocusSessionActive = true;
  focusStartTime = new Date();
  focusSessionTimer = setInterval(updateTimerDisplay, 1000);
  startButton.disabled = true;
  endButton.disabled = false;
  if (breathingExerciseToggle.checked) {
    displayBreathingExercise();
  }
}

// Function to update the timer display
function updateTimerDisplay() {
  const currentTime = new Date();
  focusDuration = Math.floor((currentTime - focusStartTime) / 1000);
  focusTimer.textContent = `Time: ${focusDuration} seconds`;
}

// Function to end the focus session
function terminateFocusSession() {
  if (!isFocusSessionActive || focusDuration < 120) return;
  clearInterval(focusSessionTimer);
  focusEndTime = new Date();
  isFocusSessionActive = false;
  startButton.disabled = false;
  endButton.disabled = true;
  saveSessionData();
  showSessionSummary();
}

// Function to save session data to the database
function saveSessionData() {
  const sessionData = {
    startTime: focusStartTime,
    endTime: focusEndTime,
    focusRating: focusRating.value,
    breathingExercise: breathingExerciseToggle.checked
  };
  // Replace with actual database operation
  console.log('Session data saved:', sessionData);
}

// Function to display the summary of the session
function showSessionSummary() {
  sessionSummary.textContent = `Session ended. Total time: ${focusDuration} seconds. Focus rating: ${focusRating.value}`;
}

// Function to display guided breathing exercise prompts
function displayBreathingExercise() {
  // Replace with actual implementation
  console.log('Displaying breathing exercise prompts...');
}

// Event listeners
startButton.addEventListener('click', initiateFocusSession);
endButton.addEventListener('click', terminateFocusSession);

// Initialize the popup state
endButton.disabled = true;
focusRating.value = "3"; // Default focus rating

// Prevent interruptions
window.addEventListener('focus', preventInterruptions);
window.addEventListener('blur', preventInterruptions);

// Function to prevent interruptions during the focus session
function preventInterruptions(event) {
  if (isFocusSessionActive) {
    event.preventDefault();
    console.log('Preventing interruptions');
  }
}