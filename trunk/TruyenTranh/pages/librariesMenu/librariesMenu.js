(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;

    function loadWebsiteList(element) {
        var listControl = element.querySelector(".list-website-control").winControl;
        var bindWebsites = new WinJS.Binding.List();

        for (var i = 0; i < WebSites.webs.length; i++) {
            var web = WebSites.webs[i];
            var a = new Array();
            a['idx'] = i;
            a['name'] = web.name;
            a['url'] = web.url;
            bindWebsites.push(a);
        }

        listControl.itemDataSource = bindWebsites.dataSource;


    }



    WinJS.UI.Pages.define("/pages/librariesMenu/librariesMenu.html", {
        ready: function (element, options) {
            var listView = element.querySelector(".list-website-control").winControl;
            loadWebsiteList.call(this, element);
            element.querySelector(".list-website-control").focus();
            element.querySelector(".right-wrapper").focus();
            
            listView.oniteminvoked = function (e) {
                WinJS.Navigation.navigate("/pages/groupedItems/groupedItems.html", { idx: e.detail.itemPromise._value.data["idx"] });
            }
            //setTimeout(function () {
            //    listView.itemDataSource.insertAfter(null, { name: "test", url: "test" },"2")
            //},1000);
        },
        _itemInvoked: function (args) {
            var item = this._items.getAt(args.detail.itemIndex);
            WinJS.Navigation.navigate("/pages/groupedItems/groupedItems.html", { item: item['idx'] });
        }
    });
})();
