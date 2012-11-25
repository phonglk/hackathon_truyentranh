var truyentranhtuan;
(function () {
    "use strict";

    var listweb = new Array();

    //var blogtruyen = new webTruyen("Blog Truyện", "blogtruyen.com", "");
    truyentranhtuan = new webTruyen("Truyện Tranh Tuần", "truyentranhtuan.com", "");
    //var vnsharing =  new webTruyen("VnSharing", "vnsharing.com", "");
    //var webtruyen = new webTruyen("Web Truyện", "webtruyen.com", "");
    //var mangafox = new webTruyen("MangaFox", "mangafox.me", "");
    //var mangahere = new webTruyen("MangaHere", "mangahere.net", "");

    //listweb.push(blogtruyen);
    listweb.push(truyentranhtuan);
    //listweb.push(vnsharing);
    //listweb.push(webtruyen);
    //listweb.push(mangafox);
    //listweb.push(mangahere);


    var urls = {
        test: {
            BlogTruyen: {
                listComic: "http://phong:8080/blogtruyen.com/danhsach.@thutu.htm",
                listChapter: "http://phong:8080/blogtruyen.com/@name/@name.htm"
            },
            TruyenTranhTuan: {
                listComic: "http://phong:8080/truyentranhtuan.com/danhsach.htm",
                listChapter: "http://phong:8080/truyentranhtuan.com/@name/@name.htm",
                chapterLink: "http://phong:8080/truyentranhtuan.com/@name/@chap/@chap.htm",
                pageLink: "http://phong:8080/truyentranhtuan.com/@name/@chap/"
            }
        },
        real: {
            BlogTruyen: {
                listComic: "http://phong:8080/blogtruyen.com/danhsach.@thutu.htm",
                listChapter: "http://phong:8080/blogtruyen.com/@name/@name.htm"
            },
            TruyenTranhTuan: {
                listComic: "http://truyentranhtuan.com/danh-sach-truyen/",
                listUpdateComic: "http://truyentranhtuan.com/moi-cap-nhat/1",
                listChapter: "http://truyentranhtuan.com/@name/",
                chapterLink: "http://truyentranhtuan.com/@name/@chap/",
                root:"http://truyentranhtuan.com"
            }
        }
    }
    var mode = "real";
    var urls_using = urls[mode];

    //blogtruyen.getListComics = function (callback) {
    //    var listComic = [];
    //    var lastPage = 0;
    //    blogtruyen.listComics.comicList = new Array();
    //    WinJS.xhr({
    //        url: "http://blogtruyen.com/danhsach/tatca",
    //    }).done(
    //        function completed(xhr) {
    //            var response = xhr.responseText;

    //            //lastPage = parseInt($(response).find(".page:last a")[0].attr("href").match(/\((.*)\)/)[1]);

    //            lastPage = 113;

    //            for (var i = 0; i < lastPage; i++) {

    //                var data = new FormData();
    //                data.append('listOrCate', 'list');
    //                data.append('key', 'tatca');
    //                data.append('page', i);
    //                data.append('orderBy', 'title');

    //                WinJS.xhr({
    //                    url: "http://blogtruyen.com/partialDanhSach/listtruyen/",
    //                    type: 'POST',
    //                    data: data,
    //                }).done(
    //                    function comp(xhrr) {
    //                        var resp = xhrr.responseText;
    //                        var row = $(resp).find(".row div a");
    //                        for (var i = 0; i < row.length; i++) {
    //                            var comic = {
    //                                name: row[i].text.trim(),
    //                                url: "http://blogtruyen.com" + $(row[i]).attr("href"),
    //                            }
    //                            blogtruyen.listComics.add("", comic)
    //                        }
    //                        callback.call(blogtruyen);
    //                    },
    //                    function error(e) {
    //                        //Windows.UI.Popups.MessageDialog(e.toString()).showAsync();
    //                    },
    //                    function process() {
    //                    }
    //                )
    //            }
    //        }
    //    );
    //}
    

    //blogtruyen.getListChapter = function (name) {
    //    if (name != null && blogtruyen.listComics != null) {
    //        var comic = blogtruyen.listComics.get(name);
    //        (function(comic){
    //            WinJS.xhr({
    //                url: "http://phong:8080/blogtruyen.com/anima/anima.htm"
    //            }).done(
    //                function completed(xhr) {
    //                    var response = xhr.responseText;
    //                    var atag = $(".row-chapter a");
    //                    for (var i = 0; i < atag.length; i++) {
    //                        var item = {
    //                            "name": atag.eq(j).text().trim(),
    //                            "url": atag.eq(j).attr("href")
    //                        }
    //                        comic.chapters.add(item);
    //                    }
    //                },
    //                function error() {
    //                }
    //            )
    //        })(comic)
    //    }
    //}
    //blogtruyen.getChapter = function (comicName,chapter) {

    //}

    //Truyen Tranh Tuan 
    truyentranhtuan.getListComics = function(callback){
        var url = urls_using.TruyenTranhTuan.listComic;
        truyentranhtuan.listComics.comicList = new Array();

        function onSuccess(xhr) {
            var html = xhr.responseText;
            var $site = $(html);
            var that = this;
            $site.find(".ch-subject").each(function(){
                var $this = $(this);
                var comic = {
                    name: $this.text(),
                    url:$this.attr("href")
                }
                if (mode == "test") {
                    var name = comic.url.match(/com\/(.*)\//)[1];
                    comic.url = urls_using.TruyenTranhTuan.listChapter.replace(/@name/g, name);
                }
                truyentranhtuan.listComics.add("",comic)
            })
            callback.call(truyentranhtuan);
        }

        function onError() {

        }

        WinJS.xhr({
            url: url
        }).done(onSuccess, onError);
    }
    truyentranhtuan.getListChapter = function (comicName,callback) {
        var comic = truyentranhtuan.listComics.get(comicName);
        
        function onSuccess(xhr) {
            var html = xhr.responseText;
            var $html = $(html);
            
            comic.image = $html.find(".title-logo1 img").attr("src");
            comic.name = $html.find(".series-info:eq(0)").text();
            comic.type = $html.find(".series-info:eq(1)").text();
            comic.description = $html.find(".content-topbanner").prev().text().trim()

            if (mode == "test") {
                comic.image = comic.image.replace(/\.\/.*\//, "http://truyentranhtuan.com/media/");
            } 

            //comic.chapList = new ListChapter();

            $($html.find("#content-main tr").find(".tbl_body:eq(0),.tbl_body2:eq(0)").find("a").get().reverse()).each(function () {
                var $a = $(this);
                var chapter = {
                    name: $a.text(),
                    url: $a.attr("href")
                }

                if (mode == "test") {
                    var _tmp = chapter.url.match(/\.com\/([^/]+)\/(\d+)/);
                    chapter.url = urls_using.TruyenTranhTuan.chapterLink.replace(/@name/g, _tmp[1]).replace(/@chap/g, _tmp[2]);
                } else {
                    var _tmp = chapter.url.match(/\/([^/]+)\/(\d+)/);
                    chapter.url = urls_using.TruyenTranhTuan.chapterLink.replace(/@name/g, _tmp[1]).replace(/@chap/g, _tmp[2]);
                }

                comic.chapters.add(chapter);
            })

            
            comic.isLoaded = true;
            callback.call(this, comic)
        }
        function onError() {

        }

        if (comic.isLoaded == true) {
            callback.call(this, comic)
        } else {
            comic.chapters.chapList = new Array();
            WinJS.xhr({
                url: comic.url
            }).done(onSuccess, onError)
        }
    }
    truyentranhtuan.getUpdateListComics = function (callback) {
        var url = urls_using.TruyenTranhTuan.listUpdateComic;
        truyentranhtuan.listComics.comicList = new Array();
        function onSuccess(xhr) {
            var html = xhr.responseText;
            var $site = $(html);
            var that = this;
            $site.find(".ch-table tr[class]").each(function () {
                var $this = $(this);
                var name = $this.find("a").text();
                var chapter = parseInt(name.match(/\d+$/));
                //name = name.match(/(.*)\d+$/)[1];
                var url = urls_using.TruyenTranhTuan.root + $this.find("a").attr("href");
                var comic = {
                    name: name,
                    url: url,
                    image: $this.find("img").attr("src"),
                    chapter:chapter
                }

                if (mode == "test") {
                    var name = comic.url.match(/com\/(.*)\//)[1];
                    comic.url = urls_using.TruyenTranhTuan.listChapter.replace(/@name/g, name);
                }

                var _rtn = truyentranhtuan.listComics.add("", comic)
                _rtn.chapter = chapter;
            })
            callback.call(truyentranhtuan);
        }

        function onError() {

        }

        WinJS.xhr({
            url: url
        }).done(onSuccess, onError);
    }
    truyentranhtuan.getChapter = function (chapter, callback) {
        function onSuccess(xhr) {
            var html = xhr.responseText;
            var selectedText = xhr.responseText.match(/slides2=\[[^\]]*\]/)[0];
            var _pages = selectedText.match(/"[^"]+"/g);
            for (var i = 0; i < _pages.length; i++) {
                var page = _pages[i].replace(/"/g, "");

                if (mode == "test") {
                    page = "http://phong:8080/truyentranhtuan.com/07-ghost/" + page.replace("/manga/07-ghost-nhom-wix/", "");
                } else {
                    page = "http://truyentranhtuan.com" + page;
                }

                chapter.pages.add({
                    url:page
                })
            }
            chapter.isLoaded = true;
            callback.call(this, chapter);
        }
        function onError() {
            chapter.isLoaded = true;
        }

        WinJS.xhr({
            url: chapter.url
        }).done(onSuccess, onError);
    }
    truyentranhtuan.getChapterByURL = function (url, callback) {
        function onSuccess(xhr) {
            var html = xhr.responseText;
            var selectedText = xhr.responseText.match(/slides2=\[[^\]]*\]/)[0];
            var _pages = selectedText.match(/"[^"]+"/g);
            var chapter = {}
            chapter.pages = new ListPage();
            
            for (var i = 0; i < _pages.length; i++) {
                var page = _pages[i].replace(/"/g, "");
                page = "http://truyentranhtuan.com" + page;
                chapter.pages.add({
                    url: page
                })
            }
            chapter.isLoaded = true;
            callback.call(this, chapter);
        }
        
        function onError() {
            chapter.isLoaded = true;
        }

        WinJS.xhr({
            url: url
        }).done(onSuccess, onError);
    }

    truyentranhtuan.Comic_loadImage = function (listView) {
        var url = this.url;
        var name = this.name;
        var idx = this._parent.comicList.indexOf(this);
        var parent = this._parent;
        var that = this;
        try{
            if (listView.itemDataSource.itemFromKey((idx + 1).toString())._value.data.backgroundImage.length > 0) {
                listView.itemDataSource.change((idx + 1).toString(), {
                    "url": url,
                    "name": name,
                    "idx": idx,
                    "backgroundImage": image
                })
                return;
            }
        } catch (e) { }

        function onComplete(xhr){
            var html = xhr.responseText;
            var $html = $(html);

            var image = $html.find(".title-logo1 img").attr("src");
            if (mode == "test") {
                image = image.replace(/\.\/.*\//, "http://truyentranhtuan.com/media/");
            }
            
            try{
                listView.itemDataSource.change((idx+1).toString(), {
                    "url": url,
                    "name": name,
                    "idx": idx,
                    "backgroundImage": image
                })
                that.backgroundImage = image;
            } catch (e) {
                that._parent._loadCoverAllow = false;
            }
            if (parent._loadCoverAllow == true) {
                parent._coverLoadedList.push(idx);
                parent.startLoadCover(listView);
            }
        }
        function onEror(){
            parent.startLoadCover(listView);
        }
        WinJS.xhr({
            url: url
        }).done(onComplete, onEror);
    }

    //vnsharing.getListComics = webtruyen.getListComics = mangafox.getListComics = mangahere.getListComics = function () {
    //    Windows.UI.Popups.MessageDialog("This function has not implemented yet.").showAsync();
    //}

    WinJS.Namespace.define("WebSites", {
        webs: listweb,
    })
})();