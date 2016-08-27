chrome.runtime.onInstalled.addListener(function(details){
  if (details.reason == "install") {
    chrome.bookmarks.create({'title': "TabsGather"}, function (result) {
      chrome.storage.sync.set({ "tgparentid": result.id }, function(){
      });
    });
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
    
    chrome.tabs.query({}, function (tabs) {
        var date = new Date();
        var dateFormatted = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();

        chrome.storage.sync.get(["tgparentid"], function(items){
          chrome.bookmarks.create({'parentId': items["tgparentid"], 'title': dateFormatted }, function (result) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.bookmarks.create({ 'parentId': result.id, 'url': tabs[i].url , 'title': tabs[i].title}, null);
            }
          });
        });
    });
});