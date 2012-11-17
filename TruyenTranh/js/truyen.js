var webTruyen,ListPage, __hasProp, __extends, listComic;
(function () {
    "use strict";
    __hasProp = {}.hasOwnProperty,
    __extends = function (child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    webTruyen = (function () {

        webTruyen.prototype.name = "";

        webTruyen.prototype.url = "";

        webTruyen.prototype.urlListComics = "";

        webTruyen.prototype.image = "";

        function webTruyen(name, url, image) {
            this.name = name;
            this.url = url;
            this.image = image != null ? image : "";

            this.listComics = new listComic(this);
        }

        webTruyen.prototype.getListComics = function () { };

        webTruyen.prototype.getUpdateListComics = function () { };

        webTruyen.prototype.getListChapter = function (comicName) { };

        webTruyen.prototype.getChapter = function (comicName, chapter) { };

        return webTruyen;

    })()


    function listComic(_parent) {
        this.rawList = new Array();
        this.comicList = new Array();
        this._parent = _parent;

        this.add = function (cat, comic) {
            comic._parent = this;
            comic = new Comic(comic)
            if (typeof this.rawList[cat] != "undefined") {

            } else {
                this.rawList[cat] = new Array();
            }
            this.rawList[cat][comic.name] = comic
            this.comicList.push(comic);
            return comic;
        }
        this.get = function (comicName) {
            for (var i = 0; i < this.comicList.length; i++) {
                var item = this.comicList[i];
                if (item.name == comicName) {
                    return item;
                }
            }
            return false;
        }
        this.getById = function (comicId) {
            if (typeof this.comicList[comicId] != "undefined") {
                return this.comicList[comicId]
            } else {
                return false;
            }
        }
        this._loadCoverIdx = 0;
        this._loadCoverAllow = false;
        this._coverLoadedList = new Array();
        this.startLoadCover=function(listView){
            if (this._loadCoverIdx < this.comicList.length && this._loadCoverAllow == true) {
                this.comicList[this._loadCoverIdx].loadImage(listView);
                this._loadCoverIdx++;
            }
        }
        this.restoreCover = function (listView) {
            for (var i = 0; i < this._coverLoadedList.length; i++) {
                var item = this.comicList[this._coverLoadedList[i]];
                item.loadImage(listView)
            }
        }
    }
    

    function Comic(opt) {
        this.name = opt.name;
        this.url = opt.url;
        this._parent = opt._parent;
        this.isLoaded = false;
        if (opt.description) this.description = opt.description
        if (opt.type) this.type = opt.type
        if (opt.image) this.image = opt.image
        
        this.chapters = new ListChapter(this);
        this.loadImage = this._parent._parent.Comic_loadImage;
    }

    function ListChapter(_parent) {
        this.rawList = new Array();
        this.chapList = new Array();
        this.isLoaded = false;
        this._parent = _parent;
        this.add = function (chaptOpt) {
            var chapt = new Chapter(chaptOpt);
            this.chapList.push(chapt);
        }
        this.getById = function (id) {
            if (typeof this.chapList[id] != "undefined") {
                return this.chapList[id]
            } else {
                return false;
            }
        }
    }

    function Chapter(opt) {
        this.name = opt.name;
        this.url = opt.url;
        this.currentPage = -1;
        this.scrollTopOffset = 0;
        this.isLoaded = false;
        this.pages = new ListPage();
    }

    ListPage =(function(){
        function ListPage() {
            this.rawList = new Array();
            this.pageList = new Array();

            this.add = function (pageOpt) {
                var page = new Page(pageOpt);
                this.pageList.push(page);
            }
            this.sort = function () {
                for (var i = 0; i < this.pageList.length - 1; i++) {
                    for (var j = i + 1; j < this.pageList.length; j++) {
                        if (this.pageList[j] < this.pageList[i]) {
                            var tmp = this.pageList[j];
                            this.pageList[j] = this.pageList[i];
                            this.pageList[i] = tmp;
                        }
                    }
                }
            }
        }
        return ListPage;
    })()

    function Page(opt) {
        this.url = opt.url;
    }

    

    WinJS.Namespace.define("webTruyen", {
        webTruyen: webTruyen,
        
    });
})();