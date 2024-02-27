const urlContains = "google.com";

// if (window.location.href.includes(urlContains)) {
//   chrome.runtime.sendMessage({ start: true });
// } else {
//   chrome.runtime.sendMessage({ stop: true });
// }

window.addEventListener("keypress", function (key) {
  console.log(key.key);
  let keyvalue = key.key;
  chrome.runtime.sendMessage({ keyPressed: true, keyvalue });
});

window.addEventListener("load", function () {
  console.log("SCRIPTED LOADED SUCCESS");
});
