var mktoLiveMasterMunchkinId = "185-NGX-811",
mktoLive106MunchkinId = "026-COU-482",
mktoLive106dMunchkinId = "767-TVJ-204",
mktoLiveMasterRtpTagUrl = "https://sjrtp3-cdn.marketo.com/rtp-api/v1/rtp.js",
mktoLive106RtpTagUrl = "https://sjrtp1.marketo.com/rtp-api/v1/rtp.js",
mktoLive106dRtpTagUrl = "https://sjrtp5-cdn.marketo.com/rtp-api/v1/rtp.js",
mktoLiveMasterRtpAccount = "mktodemolivemaster",
mktoLive106RtpAccount = "marketodemoaccount106",
mktoLive106dRtpAccount = "mktodemoaccount106d";

function getCookie(cookieName) {
    console.log("Getting > Cookie: " + cookieName);
    
    var name = cookieName + '=',
    cookies = document.cookie.split(';'),
    currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    console.log("Getting > Cookie: " + cookieName + " not found");
    return null;
}

function overloadMunchkinInit() {
    if (typeof(origMunchkinInit) !== "function") {
        origMunchkinInit = Munchkin.init;
    }
    
    Munchkin.init = function (b, a, callback) {
        origMunchkinInit.apply(this, arguments);
        console.log("Loaded > Munchkin Tag");
        callback();
    };
}

function overloadMunchkinFunction() {
    if (typeof(origMunckinFunction) !== "function") {
        origMunckinFunction = Munchkin.munchkinFunction;
    }
    
    Munchkin.munchkinFunction = function (b, a, c, callback) {
        origMunckinFunction.apply(this, arguments);
        console.log("Completed > Munchkin Function");
        callback();
    };
}

function resetMunchkinCookie(munchkinId, callback) {
    var currCookie = getCookie("_mkto_trk");
    
    if (currCookie) {
        origCookie = currCookie;
    }
    document.cookie = "_mkto_trk=;domain=" + window.location.host.match(/(\.[^\.]+\.com$|localhost)/)[0] + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    console.log("Removed > Cookie: _mkto_trk");
    
    overloadMunchkinInit();
    Munchkin.init(munchkinId, {
        cookieLifeDays: 365,
        cookieAnon: true,
        disableClickDelay: false
    }, callback);
}

function resetMasterMunchkinCookie(callback) {
    var oneLoginUsername = getCookie("onelogin_username");
    
    if (oneLoginUsername) {
        var email = "mktodemosvcs+" + oneLoginUsername + "@gmail.com";
        
        document.cookie = "_mkto_trk=;domain=" + window.location.host.match(/(\.[^\.]+\.com$|localhost)/)[0] + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        console.log("Removed > Cookie: _mkto_trk");
        
        overloadMunchkinInit();
        Munchkin.init('185-NGX-811', {
            cookieLifeDays: 365,
            cookieAnon: false,
            disableClickDelay: false
        }, function () {
            console.log("Associating > Lead : " + email);
            
            overloadMunchkinFunction();
            Munchkin.munchkinFunction("associateLead", {
                Email: email
            }, sha1("123123123" + email), callback);
        });
    } else {
        if (origCookie) {
            document.cookie = "_mkto_trk=" + origCookie + ";domain=" + window.location.host.match(/(\.[^\.]+\.com$|localhost)/)[0] + ";path=/;expires=" + new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toUTCString();
            console.log("Restored > Cookie: _mkto_trk = " + origCookie);
            console.log("Restored > Cookie: _mkto_trk = " + getCookie("_mkto_trk"));
        }
        callback();
    }
}

function resetRtpCookie(rtpTagUrl, rtpAccount, callback) {
    (function (c, h, a, f, i, e) {
        document.cookie = "trwsa.sid=;domain=" + window.location.host.match(/(\.[^\.]+\.com$|localhost)/)[0] + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        console.log("Removed > Cookie: trwsa.sid");
        document.cookie = "trwv.uid=;domain=" + window.location.host.match(/(\.[^\.]+\.com$|localhost)/)[0] + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        console.log("Removed > Cookie: trwv.uid");
        
        c[a] = c[a] || function () {
            (c[a].q = c[a].q || []).push(arguments)
        };
        c[a].a = i;
        c[a].e = e;
        var g = h.createElement("script");
        g.async = true;
        g.type = "text/javascript";
        g.src = f + '?aid=' + i;
        var b = h.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(g, b);
        console.log("Web Personalization Tag Loaded");
    })(window, document, "rtp", rtpTagUrl, rtpAccount);
    
    rtp('send', 'view');
    rtp('get', 'campaign', true);
    rtp('set', 'rcmd', 'richmedia', 'template1', {
        "rcmd.title.text": "RECOMMENDED CONTENT",
        "rcmd.cta.text": "READ MORE",
        "rcmd.title.background.color": "#4285F4",
        "rcmd.title.font.color": "white",
        "rcmd.content.background.color": "#E2E2E2",
        "rcmd.cta.background.color": "#2BBBAD",
        "category": ["Demo"]
    });
    rtp('get', 'rcmd', 'richmedia');
    callback();
}

function getUrlParam(param) {
    console.log("Getting > URL Parameter: " + param);
    
    var paramString = window.location.href.split("?")[1];
    
    if (paramString) {
        var params = paramString.split("&"),
        paramPair,
        paramName,
        paramValue;
        
        for (var ii = 0; ii < params.length; ii++) {
            paramPair = params[ii].split("=");
            paramName = paramPair[0];
            paramValue = paramPair[1];
            
            if (paramName == param) {
                console.log("Retrieved > URL Parameter: " + paramName + " = " + paramValue);
                return paramValue;
            }
        }
    }
    return false;
}

function clickPredictiveLink() {
    if (getUrlParam("click") == "true") {
        var startTime = new Date(),
        itemClassName = "rtp_rcmd2_item",
        linkClassName = "rtp_rcmd2_link",
        barContentClassName = "insightera-bar-content",
        webRichMediaIsReady,
        webBarIsReady;
        
        if (Math.random() <= 0.80) {
            webRichMediaIsReady = window.setInterval(function () {
                    var currTime = new Date();
                    
                    if (document.getElementsByClassName(itemClassName).length == 3
                         && document.getElementsByClassName(itemClassName)[0].getElementsByClassName(linkClassName)[0]
                         && document.getElementsByClassName(itemClassName)[0].getElementsByClassName(linkClassName)[0].href
                         && document.getElementsByClassName(itemClassName)[1].getElementsByClassName(linkClassName)[0]
                         && document.getElementsByClassName(itemClassName)[1].getElementsByClassName(linkClassName)[0].href
                         && document.getElementsByClassName(itemClassName)[2].getElementsByClassName(linkClassName)[0]
                         && document.getElementsByClassName(itemClassName)[2].getElementsByClassName(linkClassName)[0].href) {
                        console.log("Click Predictive Links > Web Rich Media is Ready");
                        window.clearInterval(webRichMediaIsReady);
                        
                        var linkIndex = Math.floor(Math.random() * 3),
                        submitParam;
                        
                        if (Math.random() <= 0.95) {
                            submitParam = "submit=true";
                        } else {
                            submitParam = "submit=false";
                        }
                        
                        if (document.getElementsByClassName(itemClassName)[linkIndex].getElementsByClassName(linkClassName)[0].href.search(/\?/) != -1) {
                            document.getElementsByClassName(itemClassName)[linkIndex].getElementsByClassName(linkClassName)[0].href += '&' + submitParam;
                        } else {
                            document.getElementsByClassName(itemClassName)[linkIndex].getElementsByClassName(linkClassName)[0].href += '?' + submitParam;
                        }
                        
                        console.log("Click Predictive Links > Updated Rich Media Link (" + linkIndex + "): " + document.getElementsByClassName(itemClassName)[linkIndex].getElementsByClassName(linkClassName)[0].href);
                        document.getElementsByClassName(itemClassName)[linkIndex].getElementsByClassName(linkClassName)[0].click();
                    } else if (parseInt((currTime - startTime) / 1000) > 3) {
                        console.log("Click Predictive Links > Web Rich Media IS NOT Available");
                        window.clearInterval(webRichMediaIsReady);
                        window.close();
                    }
                }, 0);
        } else {
            webBarIsReady = window.setInterval(function () {
                    var currTime = new Date();
                    
                    if (document.getElementsByClassName(barContentClassName).length == 1
                         && document.getElementsByClassName(barContentClassName)[0].getElementsByTagName("a").length == 1
                         && document.getElementsByClassName(barContentClassName)[0].getElementsByTagName("a")[0].href) {
                        console.log("Click Predictive Links > Web Bar is Ready");
                        window.clearInterval(webBarIsReady);
                        
                        var submitParam;
                        
                        if (Math.random() <= 0.95) {
                            submitParam = "submit=true";
                        } else {
                            submitParam = "submit=false";
                        }
                        
                        if (document.getElementsByClassName(barContentClassName)[0].getElementsByTagName("a")[0].href.search(/\?/) != -1) {
                            document.getElementsByClassName(barContentClassName)[0].getElementsByTagName("a")[0].href += '&' + submitParam;
                        } else {
                            document.getElementsByClassName(barContentClassName)[0].getElementsByTagName("a")[0].href += '?' + submitParam;
                        }
                        
                        console.log("Click Predictive Links > Updated Web Bar Link: " + document.getElementsByClassName(barContentClassName)[0].getElementsByTagName("a")[0].href);
                        document.getElementsByClassName(barContentClassName)[0].getElementsByTagName("a")[0].target = "";
                        document.getElementsByClassName(barContentClassName)[0].getElementsByTagName("a")[0].click();
                    } else if (parseInt((currTime - startTime) / 1000) > 3) {
                        console.log("Click Predictive Links > Web Bar IS NOT Available");
                        window.clearInterval(webBarIsReady);
                        window.close();
                    }
                }, 0);
        }
    } else {
        console.log("Click Predictive Links > NOT Clicking > click parameter IS NOT true");
    }
}

function resetCookies() {
    var munchkinId,
    rtpTagUrl,
    rtpAccount,
    origMunchkinInit,
    origMunckinFunction;
    
    switch (window.location.pathname) {
    case "/predictive-content":
        munchkinId = mktoLiveMasterMunchkinId;
        rtpTagUrl = mktoLiveMasterRtpTagUrl;
        rtpAccount = mktoLiveMasterRtpAccount;
        console.log("Click Predictive Links > Loading Master Tags");
        break;
    case "/predictive-content-106":
        munchkinId = mktoLive106MunchkinId;
        rtpTagUrl = mktoLive106RtpTagUrl;
        rtpAccount = mktoLive106RtpAccount;
        console.log("Click Predictive Links > Loading 106 Tags");
        break;
    case "/predictive-content-106d":
        munchkinId = mktoLive106dMunchkinId;
        rtpTagUrl = mktoLive106dRtpTagUrl;
        rtpAccount = mktoLive106dRtpAccount;
        console.log("Click Predictive Links > Loading 106d Tags");
        break;
    default:
        munchkinId = mktoLiveMasterMunchkinId;
        rtpTagUrl = mktoLiveMasterRtpTagUrl;
        rtpAccount = mktoLiveMasterRtpAccount;
        console.log("Click Predictive Links > Loading Master Tags");
        break;
    }
    
    resetMunchkinCookie(munchkinId, function () {
        resetRtpCookie(rtpTagUrl, rtpAccount, function () {
            window.setTimeout(function () {
                clickPredictiveLink();
            }, 1500);
        });
    });
}

(function () {
    var didInit = false;
    function initMunchkin() {
        if (didInit === false) {
            didInit = true;
            resetCookies();
        }
    }
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://munchkin.marketo.net/munchkin.js';
    s.onreadystatechange = function () {
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
            initMunchkin();
        }
    };
    s.onload = initMunchkin;
    document.getElementsByTagName('head')[0].appendChild(s);
})();