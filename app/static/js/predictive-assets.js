var devExtensionId = "dokkjhbgengdlccldgjnbilajdbjlnhm",
prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
extensionId = prodExtensionId,

mktoLiveMasterMunchkinId = "185-NGX-811",
mktoLive106MunchkinId = "026-COU-482",
mktoLive106dMunchkinId = "767-TVJ-204",
mktoLiveMasterRtpTagUrl = "https://sjrtp3-cdn.marketo.com/rtp-api/v1/rtp.js",
mktoLive106RtpTagUrl = "https://sjrtp1.marketo.com/rtp-api/v1/rtp.js",
mktoLive106dRtpTagUrl = "https://sjrtp5-cdn.marketo.com/rtp-api/v1/rtp.js",
mktoLiveMasterRtpAccount = "mktodemolivemaster",
mktoLive106RtpAccount = "marketodemoaccount106",
mktoLive106dRtpAccount = "mktodemoaccount106d",

hostSplit = window.location.host.split("."),

munchkinId,
rtpTagUrl,
rtpAccount,
origMunchkinInit,
origMunckinFunction,
origCookie;

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
  return "";
}

function overloadMunchkinInit() {
  if (typeof(origMunchkinInit) !== "function") {
    origMunchkinInit = Munchkin.init;
  }
  
  Munchkin.init = function (b, a, callback) {
    origMunchkinInit.apply(this, arguments);
    console.log("Loaded > Munchkin Tag");
    
    if (typeof(callback) === "function") {
      callback();
    }
  };
}

function overloadMunchkinFunction() {
  if (typeof(origMunckinFunction) !== "function") {
    origMunckinFunction = Munchkin.munchkinFunction;
  }
  
  Munchkin.munchkinFunction = function (b, a, c, callback) {
    origMunckinFunction.apply(this, arguments);
    console.log("Completed > Munchkin Function");
    
    if (typeof(callback) === "function") {
      callback();
    }
  };
}

function setMunchkinCookie(munchkinId, cookieAnon, callback) {
  overloadMunchkinInit();
  Munchkin.init(munchkinId, {
    cookieLifeDays: 365,
    cookieAnon: cookieAnon,
    disableClickDelay: true
  }, callback);
}

function resetMunchkinCookie(munchkinId, cookieAnon, callback) {
  var currCookie = getCookie("_mkto_trk");
  
  if (currCookie
     && !origCookie) {
    origCookie = currCookie;
  }
  document.cookie = "_mkto_trk=;domain=" + hostSplit[hostSplit.length - 2] + "." + hostSplit[hostSplit.length - 1] + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
  console.log("Removed > Cookie: _mkto_trk");
  
  setMunchkinCookie(munchkinId, cookieAnon, callback);
}

function resetMasterMunchkinCookie(callback) {
  var oneLoginUsername = getCookie("onelogin_username");
  
  if (oneLoginUsername) {
    var email = "mktodemosvcs+" + oneLoginUsername + "@gmail.com";
    
    document.cookie = "_mkto_trk=;domain=" + hostSplit[hostSplit.length - 2] + "." + hostSplit[hostSplit.length - 1] + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
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
      document.cookie = "_mkto_trk=" + origCookie + ";domain=" + hostSplit[hostSplit.length - 2] + "." + hostSplit[hostSplit.length - 1] + ";path=/;expires=" + new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toUTCString();
      console.log("Restored > Cookie: _mkto_trk = " + origCookie);
      console.log("Restored > Cookie: _mkto_trk = " + getCookie("_mkto_trk"));
    }
    
    if (typeof(callback) === "function") {
      callback();
    }
  }
}

function setRtpCookie(rtpTagUrl, rtpAccount, callback) {
  (function (c, h, a, f, i, e) {
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
  
  if (typeof(callback) === "function") {
    callback();
  }
}

function resetRtpCookie(rtpTagUrl, rtpAccount, callback) {
  (function (c, h, a, f, i, e) {
    document.cookie = "trwsa.sid=;domain=" + hostSplit[hostSplit.length - 2] + "." + hostSplit[hostSplit.length - 1] + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    console.log("Removed > Cookie: trwsa.sid");
    document.cookie = "trwv.uid=;domain=" + hostSplit[hostSplit.length - 2] + "." + hostSplit[hostSplit.length - 1] + ";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
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
  
  if (typeof(callback) === "function") {
    callback();
  }
}

function submitLeadData() {
  var isPredictiveAsset = window.setInterval(function () {
      if (typeof(MktoForms2) !== "undefined") {
        console.log("Predictive Asset > Getting: Form");
        
        window.clearInterval(isPredictiveAsset);
        
        MktoForms2.whenReady(function (form) {
          var demoMailBox = "mktodemosvcs+",
          usernameCookieName = "onelogin_username",
          firstNameCookieName = "onelogin_first_name",
          lastNameCookieName = "onelogin_last_name",
          submit = getUrlParam("submit");
          
          if (submit == "true"
             || submit == "discovered"
             || submit == "test") {
            
            form.onSuccess(function (values, followUpUrl) {
              if (submit == "true") {
                window.setTimeout(function () {
                  window.location.href = window.location.pathname + "?submit=discovered";
                }, 1000);
                return false;
              } else if (submit == "discovered") {
                window.setTimeout(function () {
                  chrome.runtime.sendMessage(extensionId, {
                    action: "demoDataPage",
                    tabAction: "remove",
                    currUrl: window.location.href
                  });
                }, 1000);
                return false;
              } else {
                window.location.href = "http://www.marketolive.com";
                return false;
              }
            });
            
            if (typeof(form.getValues().Email) != "undefined") {
              var userId = getCookie(usernameCookieName),
              email;
              
              if (userId) {
                email = demoMailBox + userId + "@gmail.com";
              } else {
                email = "predictive.convert";
              }
              
              form.vals({
                Email: email
              });
            }
            
            if (typeof(form.getValues().FirstName) != "undefined") {
              var firstName = getCookie(firstNameCookieName);
              
              if (!firstName) {
                firstName = "Predictive";
              }
              
              form.vals({
                FirstName: firstName
              });
            }
            
            if (typeof(form.getValues().LastName) != "undefined") {
              var lastName = getCookie(lastNameCookieName);
              
              if (!lastName) {
                lastName = "Convert";
              }
              
              form.vals({
                LastName: lastName
              });
            }
            
            //console.log(JSON.stringify(form.vals(), null, 2));
            
            if (submit == "true"
               || submit == "discovered") {
              form.submit();
            }
            
          } else if (submit == "false") {
            resetMasterMunchkinCookie(function () {
              window.setTimeout(function () {
                console.log("Posting > Real Lead > Visit Web Page: " + window.location.pathname);
                
                overloadMunchkinFunction();
                Munchkin.munchkinFunction("visitWebPage", {
                  url: window.location.pathname
                }, null, function () {
                  window.setTimeout(function () {
                    chrome.runtime.sendMessage(extensionId, {
                      action: "demoDataPage",
                      tabAction: "remove",
                      currUrl: window.location.href
                    });
                  }, 1000);
                });
              }, 1000);
            });
          }
        });
      }
    }, 0);
}

function setCookies() {
  var cookieAnon = getUrlParam("submit"),
  pathName = window.location.pathname.split("/")[1];
  
  if (cookieAnon == "true"
     || cookieAnon == "discovered"
     || cookieAnon == "test") {
    cookieAnon = true;
  } else if (cookieAnon == "false") {
    cookieAnon = false;
  } else {
    cookieAnon = true;
  }
  
  switch (pathName) {
  case "predictive-assets":
    munchkinId = mktoLiveMasterMunchkinId;
    rtpTagUrl = mktoLiveMasterRtpTagUrl;
    rtpAccount = mktoLiveMasterRtpAccount;
    console.log("Predictive Asset > Loading Master Tags");
    break;
    
  case "predictive-assets-106":
    munchkinId = mktoLive106MunchkinId;
    rtpTagUrl = mktoLive106RtpTagUrl;
    rtpAccount = mktoLive106RtpAccount;
    console.log("Predictive Asset > Loading 106 Tags");
    break;
    
  case "predictive-assets-106d":
    munchkinId = mktoLive106dMunchkinId;
    rtpTagUrl = mktoLive106dRtpTagUrl;
    rtpAccount = mktoLive106dRtpAccount;
    console.log("Predictive Asset > Loading 106d Tags");
    break;
    
  default:
    munchkinId = mktoLiveMasterMunchkinId;
    rtpTagUrl = mktoLiveMasterRtpTagUrl;
    rtpAccount = mktoLiveMasterRtpAccount;
    console.log("Predictive Asset > Loading Master Tags");
    break;
  }
  
  setMunchkinCookie(munchkinId, cookieAnon, function () {
    setRtpCookie(rtpTagUrl, rtpAccount, function () {
      window.setTimeout(function () {
        submitLeadData();
      }, 1500);
    });
  });
}

(function () {
  var didInit = false;
  function initMunchkin() {
    if (didInit === false) {
      didInit = true;
      setCookies();
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