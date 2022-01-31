
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

'{"streams":[{"content":"presentation","sources":{"mp4":[{"src":"https:\\/\\/oc-delivery.bibliothek.kit.edu\\/staticfiles\\/mh_default_org\\/api\\/61c4e8db-1467-4662-9110-9461a5c8bb89\\/12c44b7f-22ba-4ec4-99c7-9e86fa90ace7\\/o_1el7v848l1rkb1khbc98erggl77.mp4?policy=eyJTdGF0ZW1lbnQiOnsiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6MTY0MzY3NDQyOTAwMH0sIlJlc291cmNlIjoiaHR0cHM6XC9cL29jLWRlbGl2ZXJ5LmJpYmxpb3RoZWsua2l0LmVkdVwvc3RhdGljZmlsZXNcL21oX2RlZmF1bHRfb3JnXC9hcGlcLzYxYzRlOGRiLTE0NjctNDY2Mi05MTEwLTk0NjFhNWM4YmI4OVwvMTJjNDRiN2YtMjJiYS00ZWM0LTk5YzctOWU4NmZhOTBhY2U3XC9vXzFlbDd2ODQ4bDFya2Ixa2hiYzk4ZXJnZ2w3Ny5tcDQifX0&keyId=default&signature=9bd42a4bc007bf05ae961b1a2afbdec7d2c73cab7316d7d94e4581c7a92715ec","mimetype":"video\\/mp4","res":{"w":1280,"h":720}}]}}],"metadata":{"title":"TM-2.1-2","duration":1124880,"preview":"https:\\/\\/oc-delivery.bibliothek.kit.edu\\/staticfiles\\/mh_default_org\\/api\\/61c4e8db-1467-4662-9110-9461a5c8bb89\\/4a351e1a-4d1a-49c9-a4ac-f20dd86f4eb7\\/o_1el7v848l1rkb1khbc98erggl77_0_000s_search.jpg?policy=eyJTdGF0ZW1lbnQiOnsiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6MTY0MzY3OTk0MjI1NX0sIlJlc291cmNlIjoiaHR0cHM6XC9cL29jLWRlbGl2ZXJ5LmJpYmxpb3RoZWsua2l0LmVkdVwvc3RhdGljZmlsZXNcL21oX2RlZmF1bHRfb3JnXC9hcGlcLzYxYzRlOGRiLTE0NjctNDY2Mi05MTEwLTk0NjFhNWM4YmI4OVwvNGEzNTFlMWEtNGQxYS00OWM5LWE0YWMtZjIwZGQ4NmY0ZWI3XC9vXzFlbDd2ODQ4bDFya2Ixa2hiYzk4ZXJnZ2w3N18wXzAwMHNfc2VhcmNoLmpwZyJ9fQ&keyId=default&signature=0a7a2e2ae28968bfb3dd35c3ff8415bd6440096352d50050e046457aac78bc87"},"frameList":[]},'
