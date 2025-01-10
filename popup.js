document.getElementById("download-divs").addEventListener("click", () => {
  // Get the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0]; // Get the first (and only) active tab
    if (activeTab && activeTab.id) {
      // Inject the content script into the active tab
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id }, // Pass the active tab's ID
        files: ["content.js"],
      });
    } else {
      console.error("No active tab found.");
    }
  });
});