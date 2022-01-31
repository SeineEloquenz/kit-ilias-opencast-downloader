
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

let url = window.location.href;
let matchPattern = new RegExp('.*&cmd=streamVideo.*');

if (matchPattern.test(url)) {
    if (document.readyState !== 'loading' ) {
        console.log('ready');
        setTimeout(run, 100);
    } else {
        console.log('loading');
        document.addEventListener('DOMContentLoaded', run);
    }
} else {
    chrome.runtime.sendMessage({
       'name': 'no-recording'
    });
}

function run() {
    let paellaContent = document.body.childNodes[9].text;
    let paella = paellaContent.substring(25, paellaContent.length - 3).split(",\n\t")[0];
    let paellaJson = JSON.parse(paella);
    let videoUrl = paellaJson.streams[0].sources.mp4[0].src;
    let title = paellaJson.metadata.title;
    let mimetype = paellaJson.streams[0].sources.mp4[0].mimetype;
    let fileExtension = mimetype.split("/")[1];
    if (!title.endsWith(fileExtension)) {
        title = title + "." + fileExtension;
    }
    chrome.runtime.sendMessage({
        'name': 'recording',
        'videoUrl': videoUrl,
        'title': title
    });
}
