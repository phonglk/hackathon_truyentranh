(function () {
    "use strict";

    var appLayout = Windows.UI.ViewManagement.ApplicationView;
    var displayProps = Windows.Graphics.Display.DisplayProperties;
    var nav = WinJS.Navigation;
    var utils = WinJS.Utilities;

    WinJS.Namespace.define("TruyenManager", {
        PageControlNavigator: WinJS.Class.define(
            function (element, options) {
                this.element = element || document.createElement("div");
                // Need to create the pageHost element.
                this.element.appendChild(this._createPageElement());

                this.home = options.home;

                nav.onnavigated = this._navigated.bind(this);
                window.addEventListener("resize", this._viewstatechanged.bind(this));

                document.body.onkeyup = this._fwdbackHandler.bind(this);
                document.body.onkeyup = this._keyupHandler.bind(this);
                document.body.onkeypress = this._keypressHandler.bind(this);
                document.body.onmspointerup = this._mspointerupHandler.bind(this);

                nav.navigate(this.home);
            }, {

                _createPageElement: function () {
                    var element = document.createElement("div");
                    element.style.width = "100%";
                    element.style.height = "100%";
                    return element;
                },

                _fwdbackHandler: function (e) {
                    switch (e.keyCode) {
                        case e.altKey && utils.Key.leftArrow: nav.back(); break;
                        case e.altKey && utils.Key.rightArrow: nav.forward(); break;
                    }
                },

                // Navigates back whenever the backspace key is pressed and
                // not captured by an input field.
                _keypressHandler: function (args) {
                    if (args.key === "Backspace") {
                        nav.back();
                    }
                },

                // Navigates back or forward when alt + left or alt + right
                // key combinations are pressed.
                _keyupHandler: function (args) {
                    if ((args.key === "Left" && args.altKey) || (args.key === "BrowserBack")) {
                        nav.back();
                    } else if ((args.key === "Right" && args.altKey) || (args.key === "BrowserForward")) {
                        nav.forward();
                    }
                },

                // This function responds to clicks to enable navigation using
                // back and forward mouse buttons.
                _mspointerupHandler: function (args) {
                    if (args.button === 3) {
                        nav.back();
                    } else if (args.button === 4) {
                        nav.forward();
                    }
                },

                _viewstatechanged: function (e) {
                    this._updateLayout(this.pageElement, appLayout.value, displayProps.currentOrientation);
                },

                _navigated: function (e) {
                    var newElement = this._createPageElement();
                    var parentedComplete;
                    var parented = new WinJS.Promise(function (c) { parentedComplete = c; });

                    var that = this;
                    WinJS.UI.Pages.render(e.detail.location, newElement, e.detail.state, parented).
                        done(function (control) {
                            that.pageElement.winControl && that.pageElement.winControl.unload && that.pageElement.winControl.unload();
                            that.element.appendChild(newElement);
                            that.element.removeChild(that.pageElement);
                            parentedComplete();

                            that._updateLayout(newElement, appLayout.value, displayProps.currentOrientation);
                            that.navigated();
                        });
                },

                _updateLayout: {
                    get: function () { return (this.pageControl && this.pageControl.updateLayout) || function () { }; }
                },

                navigated: function () {
                    // Do application specific on-navigated work here
                    var backButton = this.pageElement.querySelector("#back-button-container .win-backbutton");
                    if (backButton) {
                        backButton.onclick = function () { nav.back(); };

                        if (nav.canGoBack) {
                            backButton.removeAttribute("disabled");
                        } else {
                            backButton.setAttribute("disabled", "disabled");
                        }
                    }
                },

                pageControl: {
                    get: function () { return this.pageElement && this.pageElement.winControl; }
                },

                pageElement: {
                    get: function () { return this.element.firstElementChild; }
                }
            }
        ),

        navigateHome: function () {
            var home = document.querySelector("#contentHost").winControl.home;
            var loc = nav.location;
            if (loc !== "" && loc !== home) {
                nav.navigate(home);
            }
        }
    });
})();

