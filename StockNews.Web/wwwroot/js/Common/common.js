$(document).ready(function () {
    bowerMsg();
})
function LoginOut() {
    var _params = { flag: true };
    var _time = (Math.random() * 1000) + 100;
    var _url = "/Login/LoginOut?time=" + _time;
    $.post(
        _url,
        _params,
        function (response) {
            if (response != "undefined" && response != null) {
                if (response.IsSuccess) {
                    location.href = "/";
                } else {
                    layer.msg(response.Massage);
                }
            } else {
                layer.msg(response);
            }
        });
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}   
function bowerMsg() {
    var json = BowerMatch();
    if (getBrowser(1).indexOf("ie") > -1 && parseInt(json.version.split('.')[0]) < 9) {
        $(".jrmsg").empty().html("不支持您当前使用的浏览器，建议使用IE9以上、360、谷歌、火狐等浏览器！").show().focus();
    }
}
//获取IE浏览器版本
function BowerMatch() {
    var userAgent = navigator.userAgent,
        rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
        rFirefox = /(firefox)\/([\w.]+)/,
        rOpera = /(opera).+version\/([\w.]+)/,
        rChrome = /(chrome)\/([\w.]+)/,
        rSafari = /version\/([\w.]+).*(safari)/;
    var browser;
    var version;
    var ua = userAgent.toLowerCase();
    var match = rMsie.exec(ua);
    if (match != null) {
        return { browser: "IE", version: match[2] || "0" };
    }
    var match = rFirefox.exec(ua);
    if (match != null) {
        return { browser: match[1] || "", version: match[2] || "0" };
    }
    var match = rOpera.exec(ua);
    if (match != null) {
        return { browser: match[1] || "", version: match[2] || "0" };
    }
    var match = rChrome.exec(ua);
    if (match != null) {
        return { browser: match[1] || "", version: match[2] || "0" };
    }
    var match = rSafari.exec(ua);
    if (match != null) {
        return { browser: match[2] || "", version: match[1] || "0" };
    }
    if (match != null) {
        return { browser: "", version: "0" };
    }
}
//获取浏览器名称
function getBrowser(Version) {
    var ua_str = navigator.userAgent.toLowerCase(),
        ie_Tridents, trident, match_str, ie_aer_rv, browser_chi_Type;
    if ("ActiveXObject" in self) {
        ie_aer_rv = (match_str = ua_str.match(/msie ([\d.]+)/)) ? match_str[1] :
            (match_str = ua_str.match(/rv:([\d.]+)/)) ? match_str[1] : 0;

        ie_Tridents = { "trident/7.0": 11, "trident/6.0": 10, "trident/5.0": 9, "trident/4.0": 8 };

        trident = (match_str = ua_str.match(/(trident\/[\d.]+|edge\/[\d.]+)/)) ? match_str[1] : undefined;
        browser_chi_Type = (ie_Tridents[trident] || ie_aer_rv) > 0 ? "ie" : undefined;
    } else {
        browser_chi_Type = (match_str = ua_str.match(/edge\/([\d.]+)/)) ? "ie" :

            (match_str = ua_str.match(/firefox\/([\d.]+)/)) ? "firefox" :

                (match_str = ua_str.match(/chrome\/([\d.]+)/)) ? "chrome" :

                    (match_str = ua_str.match(/opera.([\d.]+)/)) ? "opera" :

                        (match_str = ua_str.match(/version\/([\d.]+).*safari/)) ? "safari" : undefined;
    }
    var verNum, verStr;
    verNum = trident && ie_Tridents[trident] ? ie_Tridents[trident] : match_str[1];
    verStr = (Version != undefined) ? browser_chi_Type + "/" + verNum : browser_chi_Type;
    return verStr;
}