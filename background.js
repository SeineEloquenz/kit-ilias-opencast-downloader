
/**
 KIT Ilias OpenCast Downloader - a browser extension to simplify downloading videos from the KIT Ilias system
 Copyright (C) 2020-present Alexander Linder
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see {http://www.gnu.org/licenses/}.

 Home: https://github.com/SeineEloquenz/kit-ilias-opencast-downloader
 */

let urls = new Map();

//Remove download urls when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => urls.delete(tabId));

//Toggle our buttons and manage download urls
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request['name'] === 'recording') {
        let videoUrl = request['videoUrl'];
        let title = request['title']
        showPageAction(sender.tab.id);
        if (!urls.has(sender.tab.id)) {
            chrome.pageAction.onClicked.addListener((tab) => download(tab.id, sender.tab.id, title));
        }
        urls.set(sender.tab.id, videoUrl);
    } else if (request['name'] === 'no-recording') {
        hidePageAction(sender.tab.id);
        urls.delete(sender.tab.id);
    }
});

//Download file if on the correct tab
function download(tabId, wantedTabId, title) {
    if (tabId === wantedTabId) {
        chrome.downloads.download({url: urls.get(tabId), filename: title});
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
