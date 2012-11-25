(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var listView;
    var optionsParameter;


    function loadComic(listView) {
        //webTruyen

        var dataBiding = new WinJS.Binding.List();

        for (var i = 0; i < this.listComics.comicList.length; i++) {
            var comic = this.listComics.comicList[i];
            var tmp = new Array();
            tmp['name'] = comic.name;
            tmp['url'] = comic.url;
            tmp['idx'] = i;
            dataBiding.push(tmp)
        }
        listView.itemDataSource = dataBiding.dataSource;
        EventBinding();
        this.listComics.restoreCover(listView);
        loadComicCovers(this.listComics);
    }

    function EventBinding() {
        listView.oniteminvoked = function (e) {
            nav.navigate("/pages/itemDetail/itemDetail.html", { WebsiteIdx:optionsParameter.idx, ComicIdx: e.detail.itemPromise._value.data["idx"] })
        }
    }

    function loadComicCovers(listComics) {
        listComics._loadCoverAllow = true;
        listComics.startLoadCover(listView);
    }

    var initializeLayout= function (listView, viewState) {
        /// <param name="listView" value="WinJS.UI.ListView.prototype" />

        if (viewState === appViewState.snapped) {
            listView.layout = new ui.ListLayout();
        } else {
            listView.layout = new ui.GridLayout();
        }
    }

    ui.Pages.define("/pages/groupedItems/groupedItems.html", {
        ready: function (element, options) {
            //document.getElementById("addfavorite").addEventListener("click", doClickAddFavorite, false);
            document.getElementById("myfavorite").addEventListener("click", TruyenManager.doClickMyFavorite, false);
            document.getElementById("home").addEventListener("click", TruyenManager.doClickHome, false);
            document.getElementById("listcomic").addEventListener("click", TruyenManager.doClickListComic, false);
            document.getElementById("find").addEventListener("click", TruyenManager.doClickSearch, false);

            $(".groupeditemslist").focus();
            listView = element.querySelector(".groupeditemslist").winControl;
            listView.groupHeaderTemplate = element.querySelector(".headertemplate");
            listView.itemTemplate = element.querySelector(".itemtemplate");
            //listView.oniteminvoked = this._itemInvoked.bind(this);
            optionsParameter = options;
            var websiteId = options.idx;
            var website = WebSites.webs[websiteId]

            website.getListComics(function () {
                loadComic.call(this, listView);
            })





            // Set up a keyboard shortcut (ctrl + alt + g) to navigate to the
            // current group when not in snapped mode.
            //listView.addEventListener("keydown", function (e) {
            //    if (appView.value !== appViewState.snapped && e.ctrlKey && e.keyCode === WinJS.Utilities.Key.g && e.altKey) {
            //        var data = listView.itemDataSource.list.getAt(listView.currentItem.index);
            //        this.navigateToGroup(data.group.key);
            //        e.preventDefault();
            //        e.stopImmediatePropagation();
            //    }
            //}.bind(this), true);

            //this._initializeLayout(listView, appView.value);
            //listView.element.focus();
        },

        // This function updates the page layout in response to viewState changes.
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            var listView = element.querySelector(".groupeditemslist").winControl;
            if (lastViewState !== viewState) {
                //if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
                    var handler = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    initializeLayout(listView, viewState);
                //}
            }
        },

        unload: function () {
            AppBarUtils.removeAppBars();

            // This function updates the ListView with new layouts


            //_itemInvoked: function (args) {
            //    if (appView.value === appViewState.snapped) {
            //        // If the page is snapped, the user invoked a group.
            //        var group = Data.groups.getAt(args.detail.itemIndex);
            //        this.navigateToGroup(group.key);
            //    } else {
            //        // If the page is not snapped, the user invoked an item.
            //        var item = Data.items.getAt(args.detail.itemIndex);
            //        nav.navigate("/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item) });
            //    }
            //}
        }
    });
})();
