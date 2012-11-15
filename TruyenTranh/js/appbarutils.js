(function () {
    "use strict";

    WinJS.Namespace.define("AppBarUtils", {
        removeAppBars: function () {
            // Remove AppBar from previous scenario
            var otherAppBars = document.querySelectorAll('div[data-win-control="WinJS.UI.AppBar"]');
            var len = otherAppBars.length;
            for (var i = 0; i < len; i++) {
                var otherScenarioAppBar = otherAppBars[i];
                otherScenarioAppBar.parentNode.removeChild(otherScenarioAppBar);
            }
        }
    });

})();