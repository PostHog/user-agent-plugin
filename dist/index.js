var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/detect-browser/index.js
var require_detect_browser = __commonJS({
  "node_modules/detect-browser/index.js"(exports2) {
    "use strict";
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getNodeVersion = exports2.detectOS = exports2.parseUserAgent = exports2.browserName = exports2.detect = exports2.ReactNativeInfo = exports2.BotInfo = exports2.SearchBotDeviceInfo = exports2.NodeInfo = exports2.BrowserInfo = void 0;
    var BrowserInfo = (
      /** @class */
      /* @__PURE__ */ function() {
        function BrowserInfo2(name, version, os) {
          this.name = name;
          this.version = version;
          this.os = os;
          this.type = "browser";
        }
        return BrowserInfo2;
      }()
    );
    exports2.BrowserInfo = BrowserInfo;
    var NodeInfo = (
      /** @class */
      /* @__PURE__ */ function() {
        function NodeInfo2(version) {
          this.version = version;
          this.type = "node";
          this.name = "node";
          this.os = process.platform;
        }
        return NodeInfo2;
      }()
    );
    exports2.NodeInfo = NodeInfo;
    var SearchBotDeviceInfo = (
      /** @class */
      /* @__PURE__ */ function() {
        function SearchBotDeviceInfo2(name, version, os, bot) {
          this.name = name;
          this.version = version;
          this.os = os;
          this.bot = bot;
          this.type = "bot-device";
        }
        return SearchBotDeviceInfo2;
      }()
    );
    exports2.SearchBotDeviceInfo = SearchBotDeviceInfo;
    var BotInfo = (
      /** @class */
      /* @__PURE__ */ function() {
        function BotInfo2() {
          this.type = "bot";
          this.bot = true;
          this.name = "bot";
          this.version = null;
          this.os = null;
        }
        return BotInfo2;
      }()
    );
    exports2.BotInfo = BotInfo;
    var ReactNativeInfo = (
      /** @class */
      /* @__PURE__ */ function() {
        function ReactNativeInfo2() {
          this.type = "react-native";
          this.name = "react-native";
          this.version = null;
          this.os = null;
        }
        return ReactNativeInfo2;
      }()
    );
    exports2.ReactNativeInfo = ReactNativeInfo;
    var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
    var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
    var REQUIRED_VERSION_PARTS = 3;
    var userAgentRules = [
      ["aol", /AOLShield\/([0-9\._]+)/],
      ["edge", /Edge\/([0-9\._]+)/],
      ["edge-ios", /EdgiOS\/([0-9\._]+)/],
      ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
      ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
      ["samsung", /SamsungBrowser\/([0-9\.]+)/],
      ["silk", /\bSilk\/([0-9._-]+)\b/],
      ["miui", /MiuiBrowser\/([0-9\.]+)$/],
      ["beaker", /BeakerBrowser\/([0-9\.]+)/],
      ["edge-chromium", /EdgA?\/([0-9\.]+)/],
      [
        "chromium-webview",
        /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
      ],
      ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
      ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
      ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
      ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
      ["fxios", /FxiOS\/([0-9\.]+)/],
      ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
      ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
      ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
      ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
      ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
      ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
      ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
      ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
      ["ie", /MSIE\s(7\.0)/],
      ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
      ["android", /Android\s([0-9\.]+)/],
      ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
      ["safari", /Version\/([0-9\._]+).*Safari/],
      ["facebook", /FB[AS]V\/([0-9\.]+)/],
      ["instagram", /Instagram\s([0-9\.]+)/],
      ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
      ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
      ["curl", /^curl\/([0-9\.]+)$/],
      ["searchbot", SEARCHBOX_UA_REGEX]
    ];
    var operatingSystemRules = [
      ["iOS", /iP(hone|od|ad)/],
      ["Android OS", /Android/],
      ["BlackBerry OS", /BlackBerry|BB10/],
      ["Windows Mobile", /IEMobile/],
      ["Amazon OS", /Kindle/],
      ["Windows 3.11", /Win16/],
      ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
      ["Windows 98", /(Windows 98)|(Win98)/],
      ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
      ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
      ["Windows Server 2003", /(Windows NT 5.2)/],
      ["Windows Vista", /(Windows NT 6.0)/],
      ["Windows 7", /(Windows NT 6.1)/],
      ["Windows 8", /(Windows NT 6.2)/],
      ["Windows 8.1", /(Windows NT 6.3)/],
      ["Windows 10", /(Windows NT 10.0)/],
      ["Windows ME", /Windows ME/],
      ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
      ["Open BSD", /OpenBSD/],
      ["Sun OS", /SunOS/],
      ["Chrome OS", /CrOS/],
      ["Linux", /(Linux)|(X11)/],
      ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
      ["QNX", /QNX/],
      ["BeOS", /BeOS/],
      ["OS/2", /OS\/2/]
    ];
    function detect2(userAgent) {
      if (!!userAgent) {
        return parseUserAgent(userAgent);
      }
      if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
        return new ReactNativeInfo();
      }
      if (typeof navigator !== "undefined") {
        return parseUserAgent(navigator.userAgent);
      }
      return getNodeVersion();
    }
    exports2.detect = detect2;
    function matchUserAgent(ua) {
      return ua !== "" && userAgentRules.reduce(function(matched, _a) {
        var browser = _a[0], regex = _a[1];
        if (matched) {
          return matched;
        }
        var uaMatch = regex.exec(ua);
        return !!uaMatch && [browser, uaMatch];
      }, false);
    }
    function browserName(ua) {
      var data = matchUserAgent(ua);
      return data ? data[0] : null;
    }
    exports2.browserName = browserName;
    function parseUserAgent(ua) {
      var matchedRule = matchUserAgent(ua);
      if (!matchedRule) {
        return null;
      }
      var name = matchedRule[0], match = matchedRule[1];
      if (name === "searchbot") {
        return new BotInfo();
      }
      var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
      if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS) {
          versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
        }
      } else {
        versionParts = [];
      }
      var version = versionParts.join(".");
      var os = detectOS2(ua);
      var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
      if (searchBotMatch && searchBotMatch[1]) {
        return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
      }
      return new BrowserInfo(name, version, os);
    }
    exports2.parseUserAgent = parseUserAgent;
    function detectOS2(ua) {
      for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
        var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
        var match = regex.exec(ua);
        if (match) {
          return os;
        }
      }
      return null;
    }
    exports2.detectOS = detectOS2;
    function getNodeVersion() {
      var isNode = typeof process !== "undefined" && process.version;
      return isNode ? new NodeInfo(process.version.slice(1)) : null;
    }
    exports2.getNodeVersion = getNodeVersion;
    function createVersionParts(count) {
      var output = [];
      for (var ii = 0; ii < count; ii++) {
        output.push("0");
      }
      return output;
    }
  }
});

// src/plugin.ts
var plugin_exports = {};
__export(plugin_exports, {
  processEvent: () => processEvent,
  setupPlugin: () => setupPlugin
});
module.exports = __toCommonJS(plugin_exports);

// src/v3/user-agent-utils.ts
function _includes(str, needle) {
  return str.indexOf(needle) !== -1;
}
function _isFunction(x) {
  return typeof x === "function";
}
function _isUndefined(x) {
  return typeof x === "undefined";
}
var FACEBOOK = "Facebook";
var MOBILE = "Mobile";
var IOS = "iOS";
var ANDROID = "Android";
var TABLET = "Tablet";
var ANDROID_TABLET = ANDROID + " " + TABLET;
var IPAD = "iPad";
var APPLE = "Apple";
var APPLE_WATCH = APPLE + " Watch";
var SAFARI = "Safari";
var BLACKBERRY = "BlackBerry";
var SAMSUNG = "Samsung";
var SAMSUNG_BROWSER = SAMSUNG + "Browser";
var SAMSUNG_INTERNET = SAMSUNG + " Internet";
var CHROME = "Chrome";
var CHROME_OS = CHROME + " OS";
var CHROME_IOS = CHROME + " " + IOS;
var INTERNET_EXPLORER = "Internet Explorer";
var INTERNET_EXPLORER_MOBILE = INTERNET_EXPLORER + " " + MOBILE;
var OPERA = "Opera";
var OPERA_MINI = OPERA + " Mini";
var EDGE = "Edge";
var MICROSOFT_EDGE = "Microsoft " + EDGE;
var FIREFOX = "Firefox";
var FIREFOX_IOS = FIREFOX + " " + IOS;
var NINTENDO = "Nintendo";
var PLAYSTATION = "PlayStation";
var XBOX = "Xbox";
var ANDROID_MOBILE = ANDROID + " " + MOBILE;
var MOBILE_SAFARI = MOBILE + " " + SAFARI;
var WINDOWS = "Windows";
var WINDOWS_PHONE = WINDOWS + " Phone";
var NOKIA = "Nokia";
var OUYA = "Ouya";
var GENERIC = "Generic";
var GENERIC_MOBILE = GENERIC + " " + MOBILE.toLowerCase();
var GENERIC_TABLET = GENERIC + " " + TABLET.toLowerCase();
var KONQUEROR = "Konqueror";
var BROWSER_VERSION_REGEX_SUFFIX = "(\\d+(\\.\\d+)?)";
var DEFAULT_BROWSER_VERSION_REGEX = new RegExp("Version/" + BROWSER_VERSION_REGEX_SUFFIX);
var XBOX_REGEX = new RegExp(XBOX, "i");
var PLAYSTATION_REGEX = new RegExp(PLAYSTATION + " \\w+", "i");
var NINTENDO_REGEX = new RegExp(NINTENDO + " \\w+", "i");
var BLACKBERRY_REGEX = new RegExp(BLACKBERRY + "|PlayBook|BB10", "i");
var windowsVersionMap = {
  "NT3.51": "NT 3.11",
  "NT4.0": "NT 4.0",
  "5.0": "2000",
  "5.1": "XP",
  "5.2": "XP",
  "6.0": "Vista",
  "6.1": "7",
  "6.2": "8",
  "6.3": "8.1",
  "6.4": "10",
  "10.0": "10"
};
function isSafari(userAgent) {
  return _includes(userAgent, SAFARI) && !_includes(userAgent, CHROME) && !_includes(userAgent, ANDROID);
}
var safariCheck = (ua, vendor) => vendor && _includes(vendor, APPLE) || isSafari(ua);
var detectBrowser = function(user_agent, vendor) {
  vendor = vendor || "";
  if (_includes(user_agent, " OPR/") && _includes(user_agent, "Mini")) {
    return OPERA_MINI;
  } else if (_includes(user_agent, " OPR/")) {
    return OPERA;
  } else if (BLACKBERRY_REGEX.test(user_agent)) {
    return BLACKBERRY;
  } else if (_includes(user_agent, "IE" + MOBILE) || _includes(user_agent, "WPDesktop")) {
    return INTERNET_EXPLORER_MOBILE;
  } else if (_includes(user_agent, SAMSUNG_BROWSER)) {
    return SAMSUNG_INTERNET;
  } else if (_includes(user_agent, EDGE) || _includes(user_agent, "Edg/")) {
    return MICROSOFT_EDGE;
  } else if (_includes(user_agent, "FBIOS")) {
    return FACEBOOK + " " + MOBILE;
  } else if (_includes(user_agent, CHROME)) {
    return CHROME;
  } else if (_includes(user_agent, "CriOS")) {
    return CHROME_IOS;
  } else if (_includes(user_agent, "UCWEB") || _includes(user_agent, "UCBrowser")) {
    return "UC Browser";
  } else if (_includes(user_agent, "FxiOS")) {
    return FIREFOX_IOS;
  } else if (_includes(user_agent, ANDROID)) {
    return ANDROID_MOBILE;
  } else if (_includes(user_agent.toLowerCase(), KONQUEROR.toLowerCase())) {
    return KONQUEROR;
  } else if (safariCheck(user_agent, vendor)) {
    return _includes(user_agent, MOBILE) ? MOBILE_SAFARI : SAFARI;
  } else if (_includes(user_agent, FIREFOX)) {
    return FIREFOX;
  } else if (_includes(user_agent, "MSIE") || _includes(user_agent, "Trident/")) {
    return INTERNET_EXPLORER;
  } else if (_includes(user_agent, "Gecko")) {
    return FIREFOX;
  }
  return "";
};
var versionRegexes = {
  [INTERNET_EXPLORER_MOBILE]: [new RegExp("rv:" + BROWSER_VERSION_REGEX_SUFFIX)],
  [MICROSOFT_EDGE]: [new RegExp(EDGE + "?\\/" + BROWSER_VERSION_REGEX_SUFFIX)],
  [CHROME]: [new RegExp(CHROME + "/" + BROWSER_VERSION_REGEX_SUFFIX)],
  [CHROME_IOS]: [new RegExp("CriOS\\/" + BROWSER_VERSION_REGEX_SUFFIX)],
  "UC Browser": [new RegExp("(UCBrowser|UCWEB)\\/" + BROWSER_VERSION_REGEX_SUFFIX)],
  [SAFARI]: [DEFAULT_BROWSER_VERSION_REGEX],
  [MOBILE_SAFARI]: [DEFAULT_BROWSER_VERSION_REGEX],
  [OPERA]: [new RegExp("(" + OPERA + "|OPR)\\/" + BROWSER_VERSION_REGEX_SUFFIX)],
  [FIREFOX]: [new RegExp(FIREFOX + "\\/" + BROWSER_VERSION_REGEX_SUFFIX)],
  [FIREFOX_IOS]: [new RegExp("FxiOS\\/" + BROWSER_VERSION_REGEX_SUFFIX)],
  [KONQUEROR]: [new RegExp("Konqueror[:/]?" + BROWSER_VERSION_REGEX_SUFFIX, "i")],
  // not every blackberry user agent has the version after the name
  [BLACKBERRY]: [new RegExp(BLACKBERRY + " " + BROWSER_VERSION_REGEX_SUFFIX), DEFAULT_BROWSER_VERSION_REGEX],
  [ANDROID_MOBILE]: [new RegExp("android\\s" + BROWSER_VERSION_REGEX_SUFFIX)],
  [SAMSUNG_INTERNET]: [new RegExp(SAMSUNG_BROWSER + "\\/" + BROWSER_VERSION_REGEX_SUFFIX)],
  [INTERNET_EXPLORER]: [new RegExp("(rv:|MSIE )" + BROWSER_VERSION_REGEX_SUFFIX)],
  Mozilla: [new RegExp("rv:" + BROWSER_VERSION_REGEX_SUFFIX)]
};
var detectBrowserVersion = function(userAgent, vendor) {
  const browser = detectBrowser(userAgent, vendor);
  const regexes = versionRegexes[browser];
  if (_isUndefined(regexes)) {
    return null;
  }
  for (let i = 0; i < regexes.length; i++) {
    const regex = regexes[i];
    const matches = userAgent.match(regex);
    if (matches) {
      return parseFloat(matches[matches.length - 2]);
    }
  }
  return null;
};
var osMatchers = [
  [
    new RegExp(XBOX + "; " + XBOX + " (.*?)[);]", "i"),
    (match) => {
      return [XBOX, match && match[1] || ""];
    }
  ],
  [new RegExp(NINTENDO, "i"), [NINTENDO, ""]],
  [new RegExp(PLAYSTATION, "i"), [PLAYSTATION, ""]],
  [BLACKBERRY_REGEX, [BLACKBERRY, ""]],
  [
    new RegExp(WINDOWS, "i"),
    (_, user_agent) => {
      if (/Phone/.test(user_agent) || /WPDesktop/.test(user_agent)) {
        return [WINDOWS_PHONE, ""];
      }
      if (new RegExp(MOBILE).test(user_agent) && !/IEMobile\b/.test(user_agent)) {
        return [WINDOWS + " " + MOBILE, ""];
      }
      const match = /Windows NT ([0-9.]+)/i.exec(user_agent);
      if (match && match[1]) {
        const version = match[1];
        let osVersion = windowsVersionMap[version] || "";
        if (/arm/i.test(user_agent)) {
          osVersion = "RT";
        }
        return [WINDOWS, osVersion];
      }
      return [WINDOWS, ""];
    }
  ],
  [
    /((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/,
    (match) => {
      if (match && match[3]) {
        const versionParts = [match[3], match[4], match[5] || "0"];
        return [IOS, versionParts.join(".")];
      }
      return [IOS, ""];
    }
  ],
  [
    /(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i,
    (match) => {
      let version = "";
      if (match && match.length >= 3) {
        version = _isUndefined(match[2]) ? match[3] : match[2];
      }
      return ["watchOS", version];
    }
  ],
  [
    new RegExp("(" + ANDROID + " (\\d+)\\.(\\d+)\\.?(\\d+)?|" + ANDROID + ")", "i"),
    (match) => {
      if (match && match[2]) {
        const versionParts = [match[2], match[3], match[4] || "0"];
        return [ANDROID, versionParts.join(".")];
      }
      return [ANDROID, ""];
    }
  ],
  [
    /Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i,
    (match) => {
      const result = ["Mac OS X", ""];
      if (match && match[1]) {
        const versionParts = [match[1], match[2], match[3] || "0"];
        result[1] = versionParts.join(".");
      }
      return result;
    }
  ],
  [
    /Mac/i,
    // mop up a few non-standard UAs that should match mac
    ["Mac OS X", ""]
  ],
  [/CrOS/, [CHROME_OS, ""]],
  [/Linux|debian/i, ["Linux", ""]]
];
var detectOS = function(user_agent) {
  for (let i = 0; i < osMatchers.length; i++) {
    const [rgex, resultOrFn] = osMatchers[i];
    const match = rgex.exec(user_agent);
    const result = match && (_isFunction(resultOrFn) ? resultOrFn(match, user_agent) : resultOrFn);
    if (result) {
      return result;
    }
  }
  return ["", ""];
};
var detectDevice = function(user_agent) {
  if (NINTENDO_REGEX.test(user_agent)) {
    return NINTENDO;
  } else if (PLAYSTATION_REGEX.test(user_agent)) {
    return PLAYSTATION;
  } else if (XBOX_REGEX.test(user_agent)) {
    return XBOX;
  } else if (new RegExp(OUYA, "i").test(user_agent)) {
    return OUYA;
  } else if (new RegExp("(" + WINDOWS_PHONE + "|WPDesktop)", "i").test(user_agent)) {
    return WINDOWS_PHONE;
  } else if (/iPad/.test(user_agent)) {
    return IPAD;
  } else if (/iPod/.test(user_agent)) {
    return "iPod Touch";
  } else if (/iPhone/.test(user_agent)) {
    return "iPhone";
  } else if (/(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(user_agent)) {
    return APPLE_WATCH;
  } else if (BLACKBERRY_REGEX.test(user_agent)) {
    return BLACKBERRY;
  } else if (/(kobo)\s(ereader|touch)/i.test(user_agent)) {
    return "Kobo";
  } else if (new RegExp(NOKIA, "i").test(user_agent)) {
    return NOKIA;
  } else if (
    // Kindle Fire without Silk / Echo Show
    /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(user_agent) || // Kindle Fire HD
    /(kf[a-z]+)( bui|\)).+silk\//i.test(user_agent)
  ) {
    return "Kindle Fire";
  } else if (/(Android|ZTE)/i.test(user_agent)) {
    if (!new RegExp(MOBILE).test(user_agent) || /(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(user_agent)) {
      if (/pixel[\daxl ]{1,6}/i.test(user_agent) && !/pixel c/i.test(user_agent) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(user_agent) || /lmy47v/i.test(user_agent) && !/QTAQZ3/i.test(user_agent)) {
        return ANDROID;
      }
      return ANDROID_TABLET;
    } else {
      return ANDROID;
    }
  } else if (new RegExp("(pda|" + MOBILE + ")", "i").test(user_agent)) {
    return GENERIC_MOBILE;
  } else if (new RegExp(TABLET, "i").test(user_agent) && !new RegExp(TABLET + " pc", "i").test(user_agent)) {
    return GENERIC_TABLET;
  } else {
    return "";
  }
};
var detectDeviceType = function(user_agent) {
  const device = detectDevice(user_agent);
  if (device === IPAD || device === ANDROID_TABLET || device === "Kobo" || device === "Kindle Fire" || device === GENERIC_TABLET) {
    return TABLET;
  } else if (device === NINTENDO || device === XBOX || device === PLAYSTATION || device === OUYA) {
    return "Console";
  } else if (device === APPLE_WATCH) {
    return "Wearable";
  } else if (device) {
    return MOBILE;
  } else {
    return "Desktop";
  }
};

// src/v3/index.ts
var userAgentV3 = (event, userAgent, global) => {
  if (event.properties["$user_agent_plugin_disable"]) {
    return event;
  }
  if (global.debugMode) {
    console.debug("UserAgentPlugin.userAgentV3(): Processing event");
  }
  const vendor = event.properties["$navigator_vendor"];
  event.properties["$device"] = detectDevice(userAgent);
  event.properties["$device_type"] = detectDeviceType(userAgent);
  event.properties["$browser"] = detectBrowser(userAgent, vendor);
  event.properties["$browser_version"] = detectBrowserVersion(userAgent, vendor);
  const [osName, osVersion] = detectOS(userAgent);
  event.properties["$os"] = osName;
  event.properties["$os_version"] = osVersion;
  event.properties["$processed_by_user_agent_plugin"] = true;
  return event;
};

// src/v2/index.ts
var import_detect_browser = __toESM(require_detect_browser());
var userAgentV2 = (event, userAgent, _global) => {
  const agentInfo = (0, import_detect_browser.detect)(userAgent);
  const device = detectDevice2(userAgent);
  const deviceType = detectDeviceType2(userAgent);
  event.properties["$device"] = device;
  event.properties["$device_type"] = deviceType;
  if (agentInfo) {
    event.properties["$browser"] = agentInfo.name;
    event.properties["$browser_version"] = agentInfo.version;
    event.properties["$os"] = agentInfo.os;
    event.properties["$browser_type"] = agentInfo.type;
  }
  return event;
};
function detectDevice2(userAgent) {
  if (/Windows Phone/i.test(userAgent) || /WPDesktop/.test(userAgent)) {
    return "Windows Phone";
  } else if (/iPad/.test(userAgent)) {
    return "iPad";
  } else if (/iPod/.test(userAgent)) {
    return "iPod Touch";
  } else if (/iPhone/.test(userAgent)) {
    return "iPhone";
  } else if (/(BlackBerry|PlayBook|BB10)/i.test(userAgent)) {
    return "BlackBerry";
  } else if (/Android/.test(userAgent) && !/Mobile/.test(userAgent)) {
    return "Android Tablet";
  } else if (/Android/.test(userAgent)) {
    return "Android";
  } else {
    return "";
  }
}
function detectDeviceType2(userAgent) {
  const device = detectDevice2(userAgent);
  if (device === "iPad" || device === "Android Tablet") {
    return "Tablet";
  } else if (device) {
    return "Mobile";
  } else {
    return "Desktop";
  }
}

// src/plugin.ts
function setupPlugin({ config, global }) {
  try {
    global.enableSegmentAnalyticsJs = config.enableSegmentAnalyticsJs === "true";
    global.overrideUserAgentDetails = config.overrideUserAgentDetails === "true";
    global.allowV3UserAgentProcessing = config.allowV3UserAgentProcessing === "true";
    global.debugMode = config.debugMode === "true";
  } catch (e) {
    throw new Error("Failed to read the configuration");
  }
}
async function processEvent(event, { global }) {
  const availableKeysOfEvent = Object.keys(event.properties);
  let userAgent = "";
  if (global.enableSegmentAnalyticsJs) {
    const hasSegmentUserAgentKey = availableKeysOfEvent.includes("segment_userAgent");
    if (!hasSegmentUserAgentKey) {
      if (global.debugMode) {
        console.warn(`UserAgentPlugin.processEvent(): Event is missing segment_userAgent`);
      }
      return event;
    }
    userAgent = `${event.properties.segment_userAgent}`;
  } else {
    const hasUserAgentKey = availableKeysOfEvent.includes("$user-agent") || availableKeysOfEvent.includes("$useragent") || availableKeysOfEvent.includes("$user_agent");
    if (!global.allowV3UserAgentProcessing && !hasUserAgentKey) {
      if (global.debugMode) {
        console.warn(`UserAgentPlugin.processEvent(): Event is missing $useragent or $user-agent`);
      }
      return event;
    }
    if (event.properties.$useragent) {
      userAgent = event.properties.$useragent;
    } else if (event.properties["$user-agent"]) {
      userAgent = event.properties["$user-agent"];
    } else if (event.properties.$user_agent) {
      userAgent = event.properties.$user_agent;
    }
    delete event.properties.$useragent;
    delete event.properties["$user-agent"];
    delete event.properties.$user_agent;
  }
  const hasRawUserAgentKey = availableKeysOfEvent.includes("$raw_user_agent") && event.properties["$raw_user_agent"].trim().length > 0;
  const hasUserAgent = userAgent.trim().length > 0;
  if (!hasRawUserAgentKey && !hasUserAgent) {
    if (global.debugMode) {
      console.warn(`UserAgentPlugin.processEvent(): $useragent is empty`);
    }
    return event;
  }
  if (!hasRawUserAgentKey && !hasUserAgent) {
    if (global.debugMode) {
      console.warn(`UserAgentPlugin.processEvent(): neither $raw_user_agent or $useragent was provided`);
    }
    return event;
  }
  const eventProperties = Object.keys(event.properties);
  const hasBrowserProperties = eventProperties.some(
    (value) => ["$browser", "$browser_version", "$os", "$device", "$device_type"].includes(value)
  );
  if (!global.overrideUserAgentDetails && hasBrowserProperties) {
    if (global.debugMode) {
      console.warn(
        `UserAgentPlugin.processEvent(): The event has $browser, $browser_version, $os, $device, or $device_type but the option 'overrideUserAgentDetails' is not enabled.`
      );
    }
    return event;
  }
  if (hasRawUserAgentKey && !hasUserAgent) {
    return userAgentV3(event, event.properties["$raw_user_agent"], global);
  }
  return userAgentV2(event, userAgent, global);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  processEvent,
  setupPlugin
});
