// For an introduction to the Grid template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=232446
(function () {
    "use strict";
    WinJS.Binding.optimizeBindingReferences = true;

    var mainUrl = "/pages/mainMenu/mainMenu.html";
    var libUrl = "/pages/librariesMenu/librariesMenu.html";
    var findUrl = "/pages/findPage/findPage.html";
    var favoriteUrl = "/pages/favorite/favorite.html";
    //var bookmarkUrl = "/pages/bookmark/bookmark.html";
    //var favoriteUrl = "/pages/favorite/favorite.html";


    WinJS.Application.onactivated = function (e) {

        e.setPromise(WinJS.UI.processAll().done(function () {
            
        }));
    };
    WinJS.Application.start();

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

    WinJS.Namespace.define("TruyenManager", {
        doClickSearch: doClickSearch,
        doClickListComic: doClickListComic,
        doClickHome: doClickHome,
        doClickMyFavorite: doClickMyFavorite
    });

})();
