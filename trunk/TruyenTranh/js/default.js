// For an introduction to the Grid template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=232446
(function () {
    "use strict";
    WinJS.Binding.optimizeBindingReferences = true;

    //var mainUrl = "/pages/mainMenu/mainMenu.html";
    //var libUrl  = "/pages/librariesMenu/librariesMenu.html";
    //var findUrl = "/pages/findPage/findPage.html";
    //var creditsUrl = "/pages/credits/credits.html";
    //var bookmarkUrl = "/pages/bookmark/bookmark.html";
    //var favoriteUrl = "/pages/favorite/favorite.html";

    //function navigateMain() {
    //    var loc = WinJS.Navigation.location;
    //    if (loc !== "" && loc !== mainUrl) {
    //        // Navigate
    //        WinJS.Navigation.navigate(mainUrl);

    //        // Hide the app bar
    //        document.getElementById("appbar").winControl.hide();
    //    }
    //}

    //function navigateFind() {
    //    var loc = WinJS.Navigation.location;
    //    if (loc !== "" && loc !== findUrl) {
    //        // Navigate
    //        WinJS.Navigation.navigate(findUrl);

    //        // Hide the app bar
    //        document.getElementById("appbar").winControl.hide();
    //    }
    //}

    //function navigateLibraries() {
    //    var loc = WinJS.Navigation.location;
    //    if (loc !== "" && loc !== libUrl) {
    //        WinJS.Navigation.navigate(libUrl);

    //        // Hide the app bar
    //        document.getElementById("appbar").winControl.hide();
    //    }
    //}

    //function navigateBookmarks() {
    //    var loc = WinJS.Navigation.location;
    //    if (loc !== "" && loc !== bookmarkUrl) {
    //        WinJS.Navigation.navigate(bookmarkUrl);

    //        // Hide the app bar
    //        document.getElementById("appbar").winControl.hide();
    //    }
    //}

    //function navigateFavorites() {
    //    var loc = WinJS.Navigation.location;
    //    if (loc !== "" && loc !== favoriteUrl) {
    //        WinJS.Navigation.navigate(favoriteUrl);

    //        // Hide the app bar
    //        document.getElementById("appbar").winControl.hide();
    //    }
    //}

    //function navigateCredits() {
    //    var loc = WinJS.Navigation.location;
    //    if (loc !== "" && loc !== creditsUrl) {
    //        WinJS.Navigation.navigate(creditsUrl);

    //    }
    //}

    WinJS.Application.onactivated = function (e) {

        e.setPromise(WinJS.UI.processAll().done(function () {
            // Set up initial AppBar button click handlers and styles
            //var button;

            //button = document.getElementById("main").winControl;
            //button.addEventListener("click", TruyenManager.navigateMain, false);

            //button = document.getElementById("library");
            //button.winControl.addEventListener("click", TruyenManager.navigateLibraries, false);
            //WinJS.Utilities.addClass(button, "snapped-hidden");

            //button = document.getElementById("find");
            //button.winControl.addEventListener("click", TruyenManager.navigateFind, false);
            //WinJS.Utilities.addClass(button, "snapped-hidden");

            //button = document.getElementById("bookmark");
            //button.winControl.addEventListener("click", TruyenManager.navigateBookmarks, false);
            //WinJS.Utilities.addClass(button, "snapped-hidden");

            //button = document.getElementById("favorite");
            //button.winControl.addEventListener("click", TruyenManager.navigateFavorites, false);
            //WinJS.Utilities.addClass(button, "snapped-hidden");

            //button = document.getElementById("credits");
            //button.winControl.addEventListener("click", TruyenManager.navigateCredits, false);
            //WinJS.Utilities.addClass(button, "snapped-hidden");
            //WinJS.Utilities.addClass(button, "portrait-hidden");

            //button = document.getElementById("addfavorite");
            //button.winControl.addEventListener("click", TruyenManager.navigateCredits, false);
            //WinJS.Utilities.addClass(button, "snapped-hidden");
            //WinJS.Utilities.addClass(button, "add-button");

            //button = document.getElementById("addbookmark");
            //button.winControl.addEventListener("click", TruyenManager.navigateCredits, false);
            //WinJS.Utilities.addClass(button, "snapped-hidden");
            //WinJS.Utilities.addClass(button, "add-button");
        }));
    };
    WinJS.Application.start();

    WinJS.Namespace.define("TruyenManager", {
        //navigateMain: navigateMain,
        //navigateLibraries: navigateLibraries,
        //navigateFind: navigateFind,
        //navigateCredits: navigateCredits,
        //navigateBookmarks: navigateBookmarks,
        //navigateFavorites: navigateFavorites
    });

})();
