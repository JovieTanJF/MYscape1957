
(function() {
  "use strict";

  /* ===== Get the Login and Register modals ===== */
  var loginModal = document.getElementById("loginModal");
  var registerModal = document.getElementById("registerModal");

  /* ===== Get the Login and Register buttons to open the modals ===== */
  var loginBtn = document.getElementById("loginBtn");
  var showRegisterBtn = document.getElementById("showRegister");
  var showLoginBtn = document.getElementById("showLogin");

  /* ===== Get the <span> elements that close the modals ===== */
  var loginClose = loginModal.getElementsByClassName("close")[0];
  var registerClose = registerModal.getElementsByClassName("close")[0];

  /* ===== Get the forms and input fields ===== */
  var loginForm = document.querySelector("#loginModal form");
  var registerForm = document.querySelector("#registerModal form");

  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("password");

  var usernameRegInput = document.getElementById("username");
  var emailRegInput = document.getElementById("regEmail");
  var passwordRegInput = document.getElementById("regPassword");
  var confirmPasswordRegInput = document.getElementById("confirmPassword");

  /* ===== Open the login modal when the user clicks the Login button ===== */
  loginBtn.onclick = function() {
    loginModal.style.display = "block";
  }

  /* ===== Show Registration modal and hide Login modal when the user clicks on the Register link ===== */
  showRegisterBtn.onclick = function() {
    loginModal.style.display = "none";
    registerModal.style.display = "block";
  }

  /* ===== Show Login modal and hide Registration modal when the user clicks on the Login link ===== */
  showLoginBtn.onclick = function() {
    registerModal.style.display = "none";
    loginModal.style.display = "block";
  }

  /* ===== Close modals when the user clicks on <span> (x) ===== */
  loginClose.onclick = function() {
    loginModal.style.display = "none";
  }

  registerClose.onclick = function() {
    registerModal.style.display = "none";
  }

  /* ===== Function to set the login event handler ===== */
  function setLoginEventHandler() {
    var loginBtn = document.getElementById("loginBtn");

    loginBtn.onclick = function () {
      loginModal.style.display = "block";
    };
  }

  /* ===== Function to handle logout ===== */
  function handleLogout() {
    var logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.innerHTML = "Login";
    logoutBtn.setAttribute("id", "loginBtn");

    /* ===== Reassign the login event handler ===== */
    setLoginEventHandler();

    /* ===== Show the logout success modal ===== */
    var logoutSuccessModal = document.getElementById("logoutSuccessModal");
    logoutSuccessModal.style.display = "block";

    /* ===== Close the logout success modal after 2 seconds ===== */
    setTimeout(function () {
      logoutSuccessModal.style.display = "none";
    }, 2000);
  }

  /* ===== Function to handle login ===== */
  function handleLogin(event) {
    event.preventDefault(); 

    /* ===== Get the input values ===== */
    var email = emailInput.value.trim();
    var password = passwordInput.value.trim();

    /* ===== Check if email and password are not empty ===== */
    if (email === "" || password === "") {
      alert("Please enter both email and password.");
      return; 
    }

    /* ===== Close the modal after successful login ===== */
    loginModal.style.display = "none";

    /* ===== Change the Login button to Logout ===== */
    var loginBtn = document.getElementById("loginBtn");
    loginBtn.innerHTML = "Logout";
    loginBtn.setAttribute("id", "logoutBtn");

    /* ===== Assign the logout event handler ===== */
    var logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.onclick = handleLogout;

    /* ===== Show the success modal ===== */
    var successModal = document.getElementById("successModal");
    successModal.style.display = "block";

    /* ===== Close the success modal after 2 seconds ===== */
    setTimeout(function () {
      successModal.style.display = "none";
    }, 2000);
  }

  /* ===== Initial event handler assignment ===== */
  setLoginEventHandler();

  /* ===== Add event listener to the login form ===== */
  loginForm.addEventListener("submit", handleLogin);

  /* ===== Close the success modal when the user clicks on <span> (x) ===== */
  document.querySelector('#successModal .close').onclick = function() {
    document.getElementById('successModal').style.display = 'none';
  }

  /* ===== Close the success modal if the user clicks outside of it ===== */
  window.onclick = function(event) {
    var successModal = document.getElementById('successModal');
    if (event.target == successModal) {
      successModal.style.display = "none";
    }
  }

  /* ===== Close modals when the user clicks on <span> (x) ===== */
  document.querySelectorAll('.modal .close').forEach(function(closeBtn) {
    closeBtn.onclick = function() {
      this.closest('.modal').style.display = 'none';
    };
  });

  /* ===== Handle registration form submission ===== */
  registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    /* ===== Get the input values ===== */
    var username = usernameRegInput.value.trim();
    var email = emailRegInput.value.trim();
    var password = passwordRegInput.value.trim();
    var confirmPassword = confirmPasswordRegInput.value.trim();

    /* ===== Simple validation to check if all fields are filled and passwords match ===== */
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    /* ===== Display the registration details in the console ===== */
    console.log("Username: " + username);
    console.log("Email: " + email);
    console.log("Password: " + password);
    console.log("Confirm Password: " + confirmPassword);

    /* ===== Close the registration modal ===== */
    registerModal.style.display = "none";

    /* ===== Show successful register ===== */
    var loginModalContent = document.querySelector("#loginModal .modal-content");
    var successMessage = document.createElement("p");
    successMessage.textContent = "Registration Successful! Please log in.";
    successMessage.style.color = "green";
    loginModalContent.insertBefore(successMessage, loginModalContent.firstChild);

    /* ===== Switch to the login modal ===== */
    loginModal.style.display = "block";
  });

  /* ===== Function to toggle password visibility ===== */
  function togglePasswordVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = document.getElementById(iconId);

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.classList.remove('bi-eye-slash');
      toggleIcon.classList.add('bi-eye');
    } else {
      passwordInput.type = "password";
      toggleIcon.classList.remove('bi-eye');
      toggleIcon.classList.add('bi-eye-slash');
    }
  }

  /* ===== Add event listener to toggle password visibility for login form ===== */
  document.getElementById('togglePassword').addEventListener('click', function () {
    togglePasswordVisibility('password', 'togglePassword');
  });

  /* ===== Add event listener to toggle password visibility for registration form ===== */
  document.getElementById('toggleRegPassword').addEventListener('click', function () {
    togglePasswordVisibility('regPassword', 'toggleRegPassword');
  });

  document.getElementById('toggleConfirmPassword').addEventListener('click', function () {
    togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');
  });

  /* ===== Apply .scrolled class to the body as the page is scrolled down ===== */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /* ===== Mobile nav toggle ===== */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /* ===== Hide mobile nav on same-page/hash links ===== */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /* ===== Toggle mobile nav dropdowns ===== */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /* ===== Preloader ===== */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 1000);
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    });
  }

  /* ===== Scroll top button ===== */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /* ===== Animation on scroll function and init ===== */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /* ===== Initiate glightbox ===== */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /* ===== Initiate swiper sliders ===== */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();