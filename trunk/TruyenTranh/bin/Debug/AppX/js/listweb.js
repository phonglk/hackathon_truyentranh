(function () {
    "use strict";

    var listweb = new Array();

    var blogtruyen = new webTruyen("BlogTruyen", "blogtruyen.com", "");
    var truyentranhtuan = new webTruyen("TruyenTranhTuan", "truyentranhtuan.com", "");
    
    listweb.push(blogtruyen);
    listweb.push(truyentranhtuan);

    blogtruyen.getListComics = function () {
        var listComic = [];
        var abc = ['khac','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var urlTmp = "http://phong:8080/blogtruyen.com/danhsach.@thutu.htm";
        for (var i = 0; i < abc.length; i++) {
            var replaceUrl = urlTmp.replace("@thutu", abc[i]);
            WinJS.xhr({
                url : replaceUrl
            }).done(
                function complete(xhr) {
                    var response = xhr.responseText;
                    var atag = $(".row a", response);
                    for (var i = 0; i < atag.length; i++) {
                        var item = new Array();
                        item['name'] = atag.text;
                        item['url'] = atag.attr("href");
                        listComic.push(item);
                    }

                }
            )
        }
    }
    truyentranhtuan.getListComics = function(){

    }

})();