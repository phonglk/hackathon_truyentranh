(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var listView;
    var optionsParameter;
    var currentChapter = null;
    var lastDir = "next"
    var comic,chapter,pages;

    function LoadChapter(chapter) {
        currentChapter = chapter;
        $(".header-title h1").text(chapter.name);
        var tmp = '<div class="left-side"><div class="bookmarkTag"></div><img class="story-image" src="@src" /></div>'
        var container = $(".chapter-container");
        pages = chapter.pages
        pages.sort()
        for (var i = 0; i < chapter.pages.pageList.length; i++) {
            var page = chapter.pages.pageList[i];
            var $page = $(tmp.replace("@src", page.url));
            (function(i){
                $page.find(".bookmarkTag").bind("click", function () { GetPage(i) });
            })(i)
            container.append($page);
        }
        $(".story-image").bind("load",function(evt){
            var a = evt;
        })
        container.scrollTop(chapter.scrollTopOffset);
        addBookMarkInPage();
        EventBinding();
    }

    function GetPage(idx) {
        var thisBookMark = $(".bookmarkTag:eq(" + idx + ")");
        if (!thisBookMark.hasClass("bookmarkedTag")) {
            Database.writeBookMark(comic.name, comic.url, comic.image, chapter.name, idx);
            thisBookMark.addClass("bookmarkedTag");
        } else {
            Database.deleteBookMark({ chapter: chapter.name, page: idx });
            thisBookMark.removeClass("bookmarkedTag");
        }
    }

    function LoadPreviousPage() {
        var leftSide = $(".left-side img");
        var rightSide = $(".right-side img");
        if (lastDir == "next") currentChapter.currentPage -= 2;
        lastDir = "prev"
        if (currentChapter.currentPage < 1) return;
        rightSide.attr("src", currentChapter.pages.pageList[currentChapter.currentPage].url);
        console.log(currentChapter.currentPage)
        leftSide.attr("src", currentChapter.pages.pageList[currentChapter.currentPage - 1].url)
        currentChapter.currentPage -= 2;
        console.log(currentChapter.currentPage)
    }
    function LoadNextPage() {
        var leftSide = $(".left-side img");
        var rightSide = $(".right-side img");
        if (lastDir == "prev") currentChapter.currentPage += 2;
        lastDir = "next"
        if (currentChapter.currentPage >= currentChapter.pages.pageList.length) return;
        leftSide.attr("src", currentChapter.pages.pageList[currentChapter.currentPage+1].url);
        console.log(currentChapter.currentPage)
        rightSide.attr("src", currentChapter.pages.pageList[currentChapter.currentPage + 2].url)
        currentChapter.currentPage += 2;
        console.log(currentChapter.currentPage)
    }
    function EventBinding() {
        $(".chapter-container").scroll(function(){
            currentChapter.scrollTopOffset = $(".chapter-container").scrollTop();
        })
    }

    function nextChapter() {
        if (optionsParameter.ChapIdx + 1 > comic.chapters.chapList.length) {
            return optionsParameter.ChapIdx;
        } else {
            return optionsParameter.ChapIdx + 1;
        }
    };
    
    function exceededMaxChapter() {
        // Create the message dialog and set its content
        var msg = new Windows.UI.Popups.MessageDialog("Xin lỗi, truyện bạn đang xem chưa có chương mới.");

        // Add commands and set their command handlers
        msg.commands.append(new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

        // Set the command to be invoked when escape is pressed
        msg.cancelCommandIndex = 1;

        // Show the message dialog
        msg.showAsync();
    }
    function exceededMinChapter() {
        // Create the message dialog and set its content
        var msg = new Windows.UI.Popups.MessageDialog("Đùa à?!");

        // Add commands and set their command handlers
        msg.commands.append(new Windows.UI.Popups.UICommand("Close", commandInvokedHandler));

        // Set the command to be invoked when escape is pressed
        msg.cancelCommandIndex = 1;

        // Show the message dialog
        msg.showAsync();
    }

    function addBookMarkInPage() {
        var pagesTmp = pages.pageList;
        Database.getBookMark(function (bookmark) {
            for (var i = 0; i < bookmark.length; i++) {
                for(var j = 0;j<pagesTmp.length;j++){
                    if (bookmark[i]["chapter"] == chapter.name && bookmark[i]["page"] == j) {
                        var thisBookMarkTmp = $(".bookmarkTag:eq(" + j + ")");
                        thisBookMarkTmp.addClass("bookmarkedTag");
                    }
                }
            }
        });
    }

    WinJS.UI.Pages.define("/pages/viewChap/viewChap.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
                optionsParameter = options;
            try{
                document.getElementById("myfavorite").addEventListener("click", TruyenManager.doClickMyFavorite, false);
                document.getElementById("home").addEventListener("click", TruyenManager.doClickHome, false);
                document.getElementById("listcomic").addEventListener("click", TruyenManager.doClickListComic, false);
                document.getElementById("find").addEventListener("click", TruyenManager.doClickSearch, false);

                var ComicName = options.ComicName;
                var website = WebSites.webs[options.WebsiteIdx];
                comic = website.listComics.getById(options.ComicIdx);
                chapter = comic.chapters.getById(options.ChapIdx);
                pages = chapter.pages
                if (chapter.isLoaded == false) {
                    website.getChapter(chapter, LoadChapter)
                } else {
                    LoadChapter(chapter);
                }
            } catch (e) {
                if (options.url) {
                    var url = options.url
                    var website = null;
                    if (url.indexOf("truyentranhtuan.com") > 0) {
                        website = truyentranhtuan;
                    }
                    website.getChapterByURL(url, LoadChapter)
                }
            }

            //$(".back-list").bind("click", function () {
            //    nav.navigate("/pages/itemDetail/itemDetail.html",
            //        {
            //            WebsiteIdx: optionsParameter.WebsiteIdx,
            //            ComicIdx: optionsParameter.ComicIdx
            //        });
            //});

            //Move to next chapter
            $(".next-chapter").bind("click", function () {
                nav.navigate("/pages/viewChap/viewChap.html",
                    {
                        WebsiteIdx: optionsParameter.WebsiteIdx,
                        ComicIdx: optionsParameter.ComicIdx,
                        ChapIdx: (optionsParameter.ChapIdx + 1 <= comic.chapters.chapList.length)? optionsParameter.ChapIdx + 1 : optionsParameter.ChapIdx
                    });
            });

            //Move to previous chapter
            $(".back-chapter").bind("click", function () {
                nav.navigate("/pages/viewChap/viewChap.html",
                        {
                            WebsiteIdx: optionsParameter.WebsiteIdx,
                            ComicIdx: optionsParameter.ComicIdx,
                            ChapIdx: (optionsParameter.ChapIdx - 1 >= 0) ? optionsParameter.ChapIdx - 1 : optionsParameter.ChapIdx
                        });
            });

            //Zoom full screen
            $(".full-screen-btn").bind("click", function () {
                var windowSize = $(window).width();
                if ($('.story-image').width() < windowSize) {
                    $('.story-image').css('width', windowSize);
                    $('.full-screen-btn').css('-ms-transform', 'rotate(180deg)');

                } else if ($('.story-image').width() == windowSize) {
                    $('.story-image').css('width', '50%');
                    $('.full-screen-btn').css('-ms-transform', 'rotate(0deg)');
                }

            });

            //Close advertisement bar
            $(".view-chap-adv-close-btn").bind("click", function () {
                $(".view-chap-adv").hide();
            });


            //element.querySelector("")

            //$(".content").focus()
            //optionsParameter = options;
            //listView = $(".chapterslist")[0].winControl;
            //var comic = WebSites.webs[options.WebsiteIdx].listComics.getById(options.ComicIdx);
            //var website = WebSites.webs[options.WebsiteIdx];
            //website.getListChapter(comic.name,LoadComicInfo);
            
            //listView.layout = new WinJS.UI.ListLayout();

            //EventBinding();
        },
        unload: function () {
            AppBarUtils.removeAppBars();
        }
    });

        //document.getElementById("localizedAppBar").winControl.hide();
    }

)();
