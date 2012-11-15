(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var listView;
    var optionsParameter;
    var mainUrl = "/pages/mainMenu/mainMenu.html";
    var libUrl  = "/pages/groupedItems/groupedItems.html";
    var findUrl = "/pages/findPage/findPage.html";
    var favoriteUrl = "/pages/favorite/favorite.html";

    function LoadComicInfo(comic) {
        $(".item-image").attr("src", comic.image);
        $(".item-des").text(comic.description);
        $(".item-type").text(comic.type);
        $(".header-title h1").text(comic.name);

        var bindData = new WinJS.Binding.List();
        for (var i = 0; i < comic.chapters.chapList.length; i++) {
            var chapter = comic.chapters.chapList[i];
            var tmp = new Array();
            tmp['name'] = chapter.name;
            tmp['idx'] = i;
            bindData.push(tmp);
        }
        comic.isLoaded = true;
        listView.itemDataSource = bindData.dataSource;
    }

    function EventBinding() {
        listView.oniteminvoked = function (e) {
            nav.navigate("/pages/viewChap/viewChap.html", { WebsiteIdx: optionsParameter.WebsiteIdx, ComicIdx: optionsParameter.ComicIdx, ChapIdx: e.detail.itemPromise._value.data["idx"] })
        }
    }

    //function unload() {
    //    WinJS.Utilities.addClass(document.getElementById("addfavorite"), "add-button");
    //    WinJS.Utilities.addClass(document.getElementById("addbookmark"), "add-button");
    //}
    function  initializeLayout(listView, viewState) {
        /// <param name="listView" value="WinJS.UI.ListView.prototype" />

        if (viewState === appViewState.snapped || viewState === appViewState.fullScreenPortrait) {
            listView.layout = new ui.ListLayout();
        } else {
            listView.layout = new ui.GridLayout({ groupHeaderPosition: "left" });
        }
    }


    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            document.getElementById("addfavorite").addEventListener("click", doClickAddFavorite, false);
            document.getElementById("myfavorite").addEventListener("click", doClickMyFavorite, false);
            document.getElementById("home").addEventListener("click", doClickHome, false);
            document.getElementById("listcomic").addEventListener("click", doClickListComic, false);
            document.getElementById("find").addEventListener("click", doClickSearch, false);

            $(".content").focus()
            optionsParameter = options;
            listView = $(".chapterslist")[0].winControl;
            var comic = WebSites.webs[options.WebsiteIdx].listComics.getById(options.ComicIdx);
            var website = WebSites.webs[options.WebsiteIdx];

            website.getListChapter(comic.name, LoadComicInfo);

            listView.layout = new WinJS.UI.ListLayout();

            EventBinding();
            //var item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
            //element.querySelector(".titlearea .pagetitle").textContent = item.group.title;
            //element.querySelector("article .item-title").textContent = item.title;
            //element.querySelector("article .item-subtitle").textContent = item.subtitle;
            //element.querySelector("article .item-image").src = item.backgroundImage;
            //element.querySelector("article .item-image").alt = item.subtitle;
            //element.querySelector("article .item-content").innerHTML = item.content;
            //element.querySelector(".content").focus();
        },
        // This function updates the page layout in response to viewState changes.
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            var listView = element.querySelector(".chapterslist").winControl;
            if (lastViewState !== viewState) {
                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped ||
                    lastViewState === appViewState.fullScreenPortrait || viewState == appViewState.fullScreenPortrait) {
                    var handler = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    var firstVisible = listView.indexOfFirstVisible;
                    initializeLayout(listView, viewState);
                    listView.indexOfFirstVisible = firstVisible;
                }
            }
        },

        unload: function () {
            AppBarUtils.removeAppBars();
        }
    });

    function doClickAddFavorite() {

            //document.getElementById("localizedAppBar").winControl.hide();
    }

    function doClickMyFavorite() {
        var loc = WinJS.Navigation.location;
        if (loc !== "" && loc !== favoriteUrl) {
            WinJS.Navigation.navigate(favoriteUrl);
            //document.getElementById("localizedAppBar").winControl.hide();
        }
    }

    function doClickHome() {
        var loc = WinJS.Navigation.location;
        if (loc !== "" && loc !== mainUrl) {
            WinJS.Navigation.navigate(mainUrl);
            //document.getElementById("localizedAppBar").winControl.hide();
        }
    }

    function doClickListComic() {
        var loc = WinJS.Navigation.location;
        if (loc !== "" && loc !== libUrl) {
            WinJS.Navigation.navigate(libUrl);
            //document.getElementById("localizedAppBar").winControl.hide();
        }
    }

    function doClickSearch() {
        var loc = WinJS.Navigation.location;
        if (loc !== "" && loc !== findUrl) {
            WinJS.Navigation.navigate(findUrl);
            //document.getElementById("localizedAppBar").winControl.hide();
        }
    }
    //WinJS.Namespace.define("itemDetail", {
    //    enableAppBarAppButtons: enableAppBarAppButtons,
    //    disableAppBarAppButtons: disableAppBarAppButtons
    //});
})();
