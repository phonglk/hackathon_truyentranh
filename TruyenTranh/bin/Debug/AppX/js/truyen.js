var webTruyen;
(function () {
    "use strict";
    

    webTruyen = (function () {

        webTruyen.prototype.name = "";

        webTruyen.prototype.url = "";

        webTruyen.prototype.urlListComics = "";

        webTruyen.prototype.image = "";

        webTruyen.prototype.listComics = new Array();

        function webTruyen(name, url, image) {
            this.name = name;
            this.url = url;
            this.image = image != null ? image : "";
        }

        webTruyen.prototype.getListComics = function () { };

        webTruyen.prototype.getListChapter = function (comicName) { };

        webTruyen.prototype.getChapter = function (comicName, chapter) { };

        return webTruyen;

    })()

    WinJS.Namespace.define("webTruyen", {
        webTruyen: webTruyen,
    });
})();