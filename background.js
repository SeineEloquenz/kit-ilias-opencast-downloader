
let urls = new Map();

//Remove download urls when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => urls.delete(tabId));

//Toggle our buttons and manage download urls
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request['name'] === 'recording') {
        let videoUrl = request['videoUrl'];
        showPageAction(sender.tab.id);
        if (!urls.has(sender.tab.id)) {
            chrome.pageAction.onClicked.addListener((tab) => download(tab.id, sender.tab.id));
        }
        urls.set(sender.tab.id, videoUrl);
    } else if (request['name'] === 'no-recording') {
        hidePageAction(sender.tab.id);
        urls.delete(sender.tab.id);
    }
});

//Download file if on the correct tab
function download(tabId, wantedTabId) {
    if (tabId === wantedTabId) {
        chrome.downloads.download({url: urls.get(tabId)});
    }
}

function showPageAction(tabId) {
    chrome.pageAction.show(tabId);
    chrome.pageAction.setIcon({tabId: tabId, path: 'icon128_green.png'});
}

function hidePageAction(tabId) {
    chrome.pageAction.hide(tabId);
    chrome.pageAction.setIcon({tabId: tabId, path: 'icon128.png'});
}
