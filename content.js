

(function () {
    let file = 'images/150.png' ;
    let url = chrome .runtime .getURL (file) ;

    let mutationObserver = new MutationObserver (watcher) ;

    mutationObserver .observe (document .head, {childList: true, subtree: true})

    chrome .runtime .onMessage .addListener (replace) ;

    document
        .querySelectorAll ('[id^=board-styles-]')
        .forEach (alterBoardStyle) ;


    function replace (message) {

        if('replace-chessboard' === message) {

            document
                .querySelectorAll ('[id^=board-styles-]')
                .forEach (alterBoardStyle) ;

        }
    }

    function watcher (mutationList, observer) {

        mutationList
            .filter ((mutationRecord) => mutationRecord .target instanceof Element)
            .forEach (function (mr) {
                if (mr .target .nodeName === 'HEAD') {
                    Array .from (mr .addedNodes)
                        .filter ((node) => node instanceof Element && /^board-styles-.*/ .test (node .id))
                        .forEach (alterBoardStyle) ;
                }
                else {
                    let node = mr .target
                    if (node .nodeName === 'STYLE' && node instanceof Element && /^board-styles-.*/ .test (node .id)) {
                        alterBoardStyle (node);
                    }
                }

            });


    }

    function alterBoardStyle (styleElement) {

        let exp = /url\(\'https:\/\/images\.chesscomfiles\.com\/chess-themes\/boards\/[^\/]*\/150.png\'\)/ ;

        if (exp .test (styleElement .textContent)) {
            styleElement .innerHTML =
                styleElement .textContent .replace (exp , "url('" + url + "')") ;
        }
    }

}) () ;
