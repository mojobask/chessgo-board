
chrome.action.onClicked.addListener(buttonClicked);
function buttonClicked(tab)
{
    let msg = 'replace-chessboard' ;
    chrome.tabs.sendMessage(tab.id,msg) ;
}
