
chrome.runtime.onMessage.addListener(replace);

function replace (message) {

    if('replace-chessboard' === message) {

        let file = 'images/150.png';
        let url = chrome.runtime.getURL(file);

        document
            .querySelectorAll ('[id^=board-styles-]')
            .forEach (function (elem) {
                // console.log(elem) ;
                elem.innerHTML =
                    elem.textContent.replace(/url\(\'https:\/\/images\.chesscomfiles\.com\/chess-themes\/boards\/[^\/]*\/150.png\'\)/, "url('" + url + "')") ;
            }) ;
    }
}
