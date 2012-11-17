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

    var initializeLayout = function (listView, viewState) {
        /// <param name="listView" value="WinJS.UI.ListView.prototype" />

        if (viewState === appViewState.snapped) {
            listView.itemDataSource = Data.groups.dataSource;
            listView.groupDataSource = null;
            listView.layout = new ui.ListLayout();
        }
    }

    WinJS.UI.Pages.define("/pages/librariesMenu/librariesMenu.html", {
        ready: function (element, options) {
            var listView = element.querySelector(".list-website-control").winControl;
            loadWebsiteList.call(this, element);
            element.querySelector(".list-website-control").focus();
            element.querySelector(".right-wrapper").focus();
            
            listView.oniteminvoked = function (e) {
                WinJS.Navigation.navigate("/pages/updateList/updateList.html", { idx: e.detail.itemPromise._value.data["idx"] });
            }
            //setTimeout(function () {
            //    listView.itemDataSource.insertAfter(null, { name: "test", url: "test" },"2")
            //},1000);
        },
        _itemInvoked: function (args) {
            var item = this._items.getAt(args.detail.itemIndex);
            WinJS.Navigation.navigate("/pages/groupedItems/groupedItems.html", { item: item['idx'] });
        },

        // This function updates the page layout in response to viewState changes.
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            var listView = element.querySelector(".list-website-control").winControl;
            if (lastViewState !== viewState) {
                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
                    var handler = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    initializeLayout(listView, viewState);
                }
            }
        }
        

    });
})();
