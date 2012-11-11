//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;

    function ready(element, options) {
        WinJS.UI.processAll(element)
            .done(function () {
                document.getElementById("librariesMenuItem").addEventListener("click", TruyenManager.navigateLibraries, false);
                document.getElementById("findsMenuItem").addEventListener("click", TruyenManager.navigateFinds, false);
                document.getElementById("favoritesMenuItem").addEventListener("click", TruyenManager.navigateFavorites, false);
                document.getElementById("bookmarksMenuItem").addEventListener("click", TruyenManager.navigateBookmarks, false);
                document.getElementById("creditsMenuItem").addEventListener("click", TruyenManager.navigateCredits, false);
            });
    }

    WinJS.UI.Pages.define("/html/mainMenu.html", {
        ready: ready
    });
})();
