(function () {
    "use strict";

    var newCreate = false;
    var truyenTranhDB = null;
    var bookmark = [];

    function createTruyenTranhDatabase() {
        var db = window.indexedDB.open("truyentranh", 1);
        //handle error
        db.onerror = function () { Windows.UI.Popups.MessageDialog("Error create database :(").showAsync() };

        //handle success
        db.onsuccess = function (evt) { successCreateDB(evt); };

        //handle upgrade 
        db.onupgradeneeded = function (evt) { initTruyenTranhDB(evt); };

        //handle block
        db.onblocked = function(){ Windows.UI.Popups.MessageDialog("Database create blocked :(") };

        newCreate = false;
    }

    function initTruyenTranhDB(evt) {

        if (truyenTranhDB) {
            truyenTranhDB.close();
        }
        truyenTranhDB = evt.target.result;

        // Get the version update transaction handle, since we want to create the schema as part of the same transaction.
        var txn = evt.target.transaction;

        // Create bookmark object store
        var bookMark = truyenTranhDB.createObjectStore("bookmark", { keyPath: "id", autoIncrement: true });

        // Create the like object store
        var like = truyenTranhDB.createObjectStore("like", { keyPath: "id" });

        txn.oncomplete = function () { Windows.UI.Popups.MessageDialog("Database Created") };
        newCreate = true;
    }

    function successCreateDB(evt) {
        if (!newCreate) {
            //close this request
            var db = evt.target.result;
            db.close();
            Windows.UI.Popups.MessageDialog("This database already exists. :(").showAsync();
            return;
        }
    }

    function getBookMark(callback) {
        var db = window.indexedDB.open("truyentranh", 1);

        db.onsuccess = function (evt) {
            if (truyenTranhDB) {
                truyenTranhDB.close();
            }
            truyenTranhDB = evt.target.result;
            if (truyenTranhDB.objectStoreNames.length === 0) {
                truyenTranhDB.close();
                truyenTranhDB = null;
                window.indexedDB.deleteDatabase("truyentranh", 1);
            } else {
                var txn = truyenTranhDB.transaction(["bookmark"], "readonly");
                txn.onerror = function () { Windows.UI.Popups.MessageDialog("Error reading data").showAsync() };
                txn.onabort = function () { Windows.UI.Popups.MessageDialog("Reading data abouted").showAsync() };
                txn.oncomplete = function () {
                    var len = bookmark.length;
                    if (len === 0) {
                        return;
                    } else {
                        callback(bookmark);
                    }

                }

                if (bookmark.length > 0) {
                    bookmark = [];
                }

                var bookmarkCursorRequest = txn.objectStore("bookmark").openCursor();

                bookmarkCursorRequest.onsuccess = function (e) {
                    var cursor = e.target.result;
                    if (cursor) {
                        bookmark.push(cursor.value);
                        cursor.continue();
                    }
                };

            }
        };
    }

    function writeBookMark( name, url ,img ,chapter ,page) {
        if (truyenTranhDB) {
            truyenTranhDB.close();
        }
        var db = window.indexedDB.open("truyentranh", 1);
        db.onupgradeneeded = function (evt) { initTruyenTranhDB(evt); };
        db.onsuccess = function (evt) {
            truyenTranhDB = evt.target.result;

            var txn = truyenTranhDB.transaction(["bookmark"], "readwrite");

            txn.onerror = function (evt) { Windows.UI.Popups.MessageDialog("Error Writing").showAsync() };
            txn.onabort = function (evt) { Windows.UI.Popups.MessageDialog("About Writing").showAsync() };



            txn.oncomplete = function () {
                Windows.UI.Popups.MessageDialog("Đã thêm bookmark.", "Truyen Tranh").showAsync();
            };

            //add bookmark
            var addResult = txn.objectStore("bookmark").add({ name: name, url: url, img: img, chapter: chapter ,page:page});

            addResult.onerror = function (evt) {
                Windows.UI.Popups.MessageDialog("Add data error").showAsync()
            }
        };
    }

    function deleteDB() {
        if (truyenTranhDB) {
            truyenTranhDB.close();
        }
        truyenTranhDB = null;

        var db = window.indexedDB.deleteDatabase("truyentranh");
        db.onerror = function () { Windows.UI.Popups.MessageDialog("Error delete  database").showAsync(); };
        db.onsuccess = function () { Windows.UI.Popups.MessageDialog("Databse deleted").showAsync(); };
        db.onblocked = function () { Windows.UI.Popups.MessageDialog("Delete blocked").showAsync(); };
    }

    function deleteBookMark(key) {
        if (truyenTranhDB) {
            truyenTranhDB.close();
        }
        var db = window.indexedDB.open("truyentranh", 1);
        db.onupgradeneeded = function (evt) { initTruyenTranhDB(evt); };
        db.onsuccess = function (evt) {
            truyenTranhDB = evt.target.result;

            var txn = truyenTranhDB.transaction(["bookmark"], "readwrite");

            txn.onerror = function (evt) { Windows.UI.Popups.MessageDialog("Error Delete").showAsync() };

            txn.onabort = function (evt) { Windows.UI.Popups.MessageDialog("About Delete").showAsync() };

            txn.oncomplete = function () {
                Windows.UI.Popups.MessageDialog("Đã xóa bookmark.", "Truyen Tranh").showAsync();
            };

            //delete bookmark
            var deleteResult = txn.objectStore("bookmark").openCursor();

            deleteResult.onerror = function (evt) {
                Windows.UI.Popups.MessageDialog("Delete data error").showAsync()
            }

            deleteResult.onsuccess = function (evt) {
                var cursor = evt.target.result;
                if (cursor) {
                    if (cursor.value["chapter"] == key.chapter && cursor.value["page"] == key.page) {
                        cursor.delete();
                    }
                    cursor.continue();
                }
            }
        };
    }


    WinJS.Namespace.define("Database", {
        bookmark: bookmark,
        createDatabase: createTruyenTranhDatabase,
        getBookMark: getBookMark,
        deleteDatabase: deleteDB,
        writeBookMark: writeBookMark,
        deleteBookMark: deleteBookMark,

    });
})();