Copyright {2016} {Daniel Zikmund}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

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