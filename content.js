let url = window.location.href;
let matchPattern = new RegExp('.*&cmd=streamVideo.*');

if (matchPattern.test(url)) {
    if( document.readyState !== 'loading' ) {
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
    let videoDiv = document.getElementById('video_0');
    let videoUrl = videoDiv.firstElementChild.getAttribute('src');
    chrome.runtime.sendMessage({
        'name': 'recording',
        'videoUrl': videoUrl
    });
}
