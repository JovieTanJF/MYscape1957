
(function() {
    "use strict";
    
    /* ===== Function to set a cookie ===== */
    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
  
    /* ===== Function to get a cookie ===== */
    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
  
    /* ===== Function to check cookie and show banner ===== */
    function checkCookieConsent() {
      var consent = getCookie("user_consent");
      if (!consent) {
        document.getElementById("cookieConsentBanner").style.display = "block";
      }
    }
  
    /* ===== Event listener for the accept button ===== */
    document.getElementById("acceptCookies").onclick = function() {
      setCookie("user_consent", "accepted", 365); // Set cookie for 1 year
      document.getElementById("cookieConsentBanner").style.display = "none";
    };
  
    /* ===== Handle cookie management ===== */
    document.getElementById("manageCookies").onclick = function() {
      document.getElementById("cookieConsentBanner").style.display = "none";
      document.getElementById("cookieManagementModal").style.display = "block";
    };
  
    /* ===== Save cookie preferences ===== */
    document.getElementById("cookiePreferencesForm").onsubmit = function(event) {
      event.preventDefault();
    
      var analytics = document.getElementById("analyticsCookies").checked;
      var marketing = document.getElementById("marketingCookies").checked;
  
      if (analytics) {
        setCookie("analytics_cookies", "enabled", 365);
      } else {
        setCookie("analytics_cookies", "disabled", 365);
      }
  
      if (marketing) {
        setCookie("marketing_cookies", "enabled", 365);
      } else {
        setCookie("marketing_cookies", "disabled", 365);
      }
  
      setCookie("user_consent", "custom", 365); // Set user consent as custom
  
      document.getElementById("cookieManagementModal").style.display = "none";
      alert("Your preferences have been saved.");
    };
  
    /* ===== Cancel cookie preferences ===== */
    document.getElementById("cancelPreferences").onclick = function() {
      document.getElementById("cookieManagementModal").style.display = "none";
      document.getElementById("cookieConsentBanner").style.display = "block";
    };
  
    /* ===== Run the check on page load ===== */
    window.onload = function() {
      checkCookieConsent();
    };

})();