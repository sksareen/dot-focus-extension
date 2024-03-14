// background.js

let focusSessionData = {};

chrome.runtime.onInstalled.addListener(() => {
  console.log('Website Comment Chrome Extension installed.');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'startFocusSession') {
    focusSessionData.startTime = new Date().getTime();
    focusSessionData.endTime = null;
    focusSessionData.focusRating = null;
    focusSessionData.breathingExercise = request.breathingExercise || false;
    sendResponse({ status: 'Focus session started' });
  } else if (request.message === 'endFocusSession') {
    focusSessionData.endTime = new Date().getTime();
    focusSessionData.focusRating = request.focusRating;
    saveSessionData(focusSessionData);
    sendResponse({ status: 'Focus session ended', sessionData: focusSessionData });
  } else if (request.message === 'updatePreferences') {
    // Update user preferences in storage
    chrome.storage.sync.set({ userPreferences: request.preferences }, () => {
      sendResponse({ status: 'User preferences updated' });
    });
  } else if (request.message === 'retrieveSessionData') {
    // Retrieve session data from storage
    chrome.storage.sync.get(['focusSessionData'], (result) => {
      sendResponse({ status: 'Session data retrieved', sessionData: result.focusSessionData });
    });
  }
  return true; // Keep the message channel open for asynchronous response
});

function saveSessionData(sessionData) {
  // Save session data to the database
  // Placeholder for database save operation
  console.log('Saving session data:', sessionData);
  // After saving to the database, store the session data locally
  chrome.storage.sync.set({ focusSessionData: sessionData }, () => {
    console.log('Session data saved locally');
  });
}

// Preventing unwanted behavior such as pop-ups during the focus session
chrome.webRequest.onBeforeRequest.addListener(
  () => ({ cancel: true }),
  { urls: ["*://*.example.com/*"] }, // Replace with actual URLs or patterns to block
  ["blocking"]
);