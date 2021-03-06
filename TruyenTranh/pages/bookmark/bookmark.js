﻿(function () {
    "use strict";

    var ui = WinJS.UI;


    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var listview;
    var optionsParameter;

    function initbookmark(listview) {
        Database.getBookMark(function (bookmark) {
            var bm = bookmark;
            var bid = new WinJS.Binding.List();
            for (var i = 0; i < bm.length; i++) {
                bid.push(bm[i]);
            }
            listview.itemDataSource = bid.dataSource;
        });
    }

    function EventBinding() {
        listview.oniteminvoked = function (e) {
            nav.navigate("/pages/viewChap/viewChap.html", { url: e.detail.itemPromise._value.data["url"], ChapIdx: e.detail.itemPromise._value.data["chapter"], ComicName: e.detail.itemPromise._value.data["name"], img: e.detail.itemPromise._value.data["img"] })
        }
    }


    ui.Pages.define("/pages/bookmark/bookmark.html", {
        ready: function (element, options) {
            $(".groupeditemslist").focus();
            listview = element.querySelector(".groupeditemslist").winControl;
            listview.groupHeaderTemplate = element.querySelector(".headertemplate");
            listview.itemTemplate = element.querySelector(".itemtemplate");

            initbookmark(listview);

            EventBinding();

            //$(".fakDB").bind("click", Database.createDatabase);
            $(".delDB").bind("click",
                function(){
                    Database.deleteDatabase();
                    nav.navigate("/pages/bookmark/bookmark.html");

                    nav.history.backStack.pop();
                }
            );
            //$(".showDB").bind("click", function () { initbookmark(listview) });
        },

        // This function updates the page layout in response to viewState changes.
        updateLayout: function (element, viewState, lastViewState) {
            var listView = element.querySelector(".groupeditemslist").winControl;
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