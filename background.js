let tabId = null;
let screenshotCount = 0;
let intervalId = null;
let pressedKeys = [];
let activeTimestamp = null;
let inactiveTimestamp = null;
let targetUrl = "google.com";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("MESSAGE NAME :::::", message);

  if (message.keyPressed) {
    storePressedKeys();
  }
  console.log("Message:::", message);
});

chrome.tabs.onCreated.addListener((tab) => {
  checkTab();
  addTime();
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log("Active Info::", activeInfo);
  checkTab();
  addTime();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("TAB CHANGED");
  checkTab();
});

function checkTab() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      const tab = tabs[0];
      tabData = tabs[0];
      if (tabData.url) {
        if (tabData.url.includes(targetUrl)) {
          intervalId = setInterval(function () {
            captureScreenshot(tabData.id);
          }, 15000);
        } else {
          intervalId = clearInterval(intervalId);
          intervalId = null;
          const date = Date.now();
          console.log("OUT DATE::::", date);
        }
      }
    }
  );
}

function addTime() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      const tab = tabs[0];
      tabData = tabs[0];
      if (tabData.url) {
        if (tabData.url.includes(targetUrl)) {
          const date = Date.now();
          console.log("Date::", date);
        }
      }
    }
  );
}

function captureScreenshot(tabId) {
  if (tabId) {
    // Check if the tab still exists
    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error checking tab existence:",
          chrome.runtime.lastError.message
        );
        console.error(chrome.runtime.lastError.stack);
        return;
      }

      if (tab) {
        chrome.tabs.captureVisibleTab(
          tab.windowId,
          { format: "png" },
          (dataUrl) => {
            if (chrome.runtime.lastError) {
              console.error(
                "Error capturing screenshot:",
                chrome.runtime.lastError.message
              );
              console.error(chrome.runtime.lastError.stack);
              return;
            }

            if (dataUrl) {
              console.log("DATA URL ::", dataUrl);
              screenshotCount++;
              chrome.storage.local.set({ screenshotCount });
            }
          }
        );
      } else {
        console.error("Tab with ID", tabId, "no longer exists.");
        clearInterval(intervalId); // Clear the interval
        tabId = null;
      }
    });
  }
}

function storePressedKeys() {
  chrome.input.ime.onKeyEvent.addListener((engineID, keyData) => {
    if (keyData.type === "keydown") {
      pressedKeys.push(keyData.key);
      console.log("Pressed keys:", pressedKeys);
      chrome.storage.local.set({ pressedKeys });
    }
  });
}

// Listen for tab removal
chrome.tabs.onRemoved.addListener((removedTabId) => {
  if (tabId === removedTabId) {
    clearInterval(intervalId); // Clear the interval
    tabId = null;
    inactiveTimestamp = Date.now(); // Record the inactive timestamp when tab is removed
    chrome.storage.local.set({ inactiveTimestamp });
    chrome.storage.sync.set({ inactiveTimestamp });

    chrome.storage.local.remove(
      ["activeTimestamp", "screenshotCount"],
      function () {
        var error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        } else {
          console.log("Called");
        }
        // do something more
      }
    );
  }
});
