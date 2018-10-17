'use strict';

function __$styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var removeElementByIds = function (ids) {
    ids.forEach(function (id) {
        var element = document.getElementById(id);
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
};
var MessengerCustomerChat = /** @class */ (function (_super) {
    __extends(MessengerCustomerChat, _super);
    function MessengerCustomerChat(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            fbLoaded: false,
            shouldShowDialog: false,
        };
        return _this;
    }
    MessengerCustomerChat.prototype.componentDidMount = function () {
        this.setFbAsyncInit();
        this.reloadSDKAsynchronously();
    };
    MessengerCustomerChat.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.pageId !== this.props.pageId ||
            prevProps.appId !== this.props.appId ||
            prevProps.shouldShowDialog !== this.props.shouldShowDialog ||
            prevProps.htmlRef !== this.props.htmlRef ||
            prevProps.minimized !== this.props.minimized ||
            prevProps.themeColor !== this.props.themeColor ||
            prevProps.loggedInGreeting !== this.props.loggedInGreeting ||
            prevProps.loggedOutGreeting !== this.props.loggedOutGreeting ||
            prevProps.greetingDialogDisplay !== this.props.greetingDialogDisplay ||
            prevProps.greetingDialogDelay !== this.props.greetingDialogDelay ||
            prevProps.autoLogAppEvents !== this.props.autoLogAppEvents ||
            prevProps.xfbml !== this.props.xfbml ||
            prevProps.version !== this.props.version ||
            prevProps.language !== this.props.language) {
            this.setFbAsyncInit();
            this.reloadSDKAsynchronously();
        }
    };
    MessengerCustomerChat.prototype.setFbAsyncInit = function () {
        var _this = this;
        var _a = this.props, appId = _a.appId, autoLogAppEvents = _a.autoLogAppEvents, xfbml = _a.xfbml, version = _a.version;
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: appId,
                autoLogAppEvents: autoLogAppEvents,
                xfbml: xfbml,
                version: "v" + version,
            });
            _this.setState({ fbLoaded: true });
        };
    };
    MessengerCustomerChat.prototype.loadSDKAsynchronously = function () {
        var language = this.props.language;
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.setAttribute("src", "https://connect.facebook.net/" + language + "/sdk/xfbml.customerchat.js");
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    };
    MessengerCustomerChat.prototype.removeFacebookSDK = function () {
        removeElementByIds(["facebook-jssdk", "fb-root"]);
        delete window.FB;
    };
    MessengerCustomerChat.prototype.reloadSDKAsynchronously = function () {
        this.removeFacebookSDK();
        this.loadSDKAsynchronously();
    };
    MessengerCustomerChat.prototype.controlPlugin = function () {
        var shouldShowDialog = this.props.shouldShowDialog;
        if (shouldShowDialog) {
            window.FB.CustomerChat.showDialog();
        }
        else {
            window.FB.CustomerChat.hideDialog();
        }
    };
    MessengerCustomerChat.prototype.subscribeEvents = function () {
        var _a = this.props, onCustomerChatDialogShow = _a.onCustomerChatDialogShow, onCustomerChatDialogHide = _a.onCustomerChatDialogHide;
        if (onCustomerChatDialogShow) {
            window.FB.Event.subscribe("customerchat.dialogShow", onCustomerChatDialogShow);
        }
        if (onCustomerChatDialogHide) {
            window.FB.Event.subscribe("customerchat.dialogHide", onCustomerChatDialogHide);
        }
    };
    MessengerCustomerChat.prototype.createMarkup = function () {
        var _a = this.props, pageId = _a.pageId, htmlRef = _a.htmlRef, minimized = _a.minimized, themeColor = _a.themeColor, loggedInGreeting = _a.loggedInGreeting, loggedOutGreeting = _a.loggedOutGreeting, greetingDialogDisplay = _a.greetingDialogDisplay, greetingDialogDelay = _a.greetingDialogDelay;
        var refAttribute = htmlRef !== undefined ? "ref=\"" + htmlRef + "\"" : "";
        var minimizedAttribute = minimized !== undefined ? "minimized=\"" + minimized + "\"" : "";
        var themeColorAttribute = themeColor !== undefined ? "theme_color=\"" + themeColor + "\"" : "";
        var loggedInGreetingAttribute = loggedInGreeting !== undefined
            ? "logged_in_greeting=\"" + loggedInGreeting + "\""
            : "";
        var loggedOutGreetingAttribute = loggedOutGreeting !== undefined
            ? "logged_out_greeting=\"" + loggedOutGreeting + "\""
            : "";
        var greetingDialogDisplayAttribute = greetingDialogDisplay !== undefined
            ? "greeting_dialog_display=\"" + greetingDialogDisplay + "\""
            : "";
        var greetingDialogDelayAttribute = greetingDialogDelay !== undefined
            ? "greeting_dialog_delay=\"" + greetingDialogDelay + "\""
            : "";
        return {
            __html: "<div\n        class=\"fb-customerchat\"\n        page_id=\"" + pageId + "\"\n        " + refAttribute + "\n        " + minimizedAttribute + "\n        " + themeColorAttribute + "\n        " + loggedInGreetingAttribute + "\n        " + loggedOutGreetingAttribute + "\n        " + greetingDialogDisplayAttribute + "\n        " + greetingDialogDelayAttribute + "\n      ></div>",
        };
    };
    MessengerCustomerChat.prototype.render = function () {
        var _this = this;
        var _a = this.state, fbLoaded = _a.fbLoaded, shouldShowDialog = _a.shouldShowDialog;
        if (fbLoaded && shouldShowDialog !== this.props.shouldShowDialog) {
            document.addEventListener("DOMNodeInserted", function (event) {
                var element = event.target;
                if (element.className && element.className.includes("fb_dialog")) {
                    _this.controlPlugin();
                }
            }, false);
            this.subscribeEvents();
        }
        return React.createElement("div", { key: Date(), dangerouslySetInnerHTML: this.createMarkup() });
    };
    MessengerCustomerChat.defaultProps = {
        shouldShowDialog: false,
        autoLogAppEvents: true,
        xfbml: true,
        version: "2.11",
        language: "en_US"
    };
    return MessengerCustomerChat;
}(React.Component));

exports.MessengerCustomerChat = MessengerCustomerChat;
//# sourceMappingURL=index.js.map
