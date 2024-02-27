chrome.storage.local.get(["screenshotCount"], (result) => {
  const screenshotCount = result.screenshotCount || 0;
  document.getElementById("screenshotCount").textContent =
    screenshotCount.toString();
});
chrome.storage.local.get(["activeTimestamp"], (result) => {
  const activeTimestamp = result.activeTimestamp || 0;
  document.getElementById("activeTimestamp").textContent =
    activeTimestamp.toString();
});
chrome.storage.local.get(["inactiveTimestamp"], (result) => {
  const inactiveTimestamp = result.inactiveTimestamp || 0;
  document.getElementById("inactiveTimestamp").textContent =
    inactiveTimestamp.toString();
});
