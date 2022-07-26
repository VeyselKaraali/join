let isMenuOpen = false;

/**
 * This function is used to 
 * 
 */
async function init(){
  setURL('https://gruppe-288.developerakademie.net/join/smallest_backend_ever');
  await downloadFromServer();
  createNavigation();
  setActiveMenu();
}

function createNavigation() {
  createDesktopNavigation();
  createMobileNavigation();
}

/* DESKTOP NAVIGATION */
function createDesktopNavigation(){
  let desktopNav = `
  <a href="index.html" class="logo-wrapper myLink" data-pathname="/index.html">
    <img class="logo" src="src/icons/join_logo.png" alt="">
  </a>
  
  <div class="menu-wrapper">
    <a href="index.html" class="menu-item myLink" data-pathname="/index.html">Board</a>
    <a href="backlog.html" class="menu-item myLink" data-pathname="/backlog.html">Backlog</a>
    <a href="task.html" class="menu-item myLink" data-pathname="/task.html">Add Task</a>
    <a href="help.html" class="menu-item myLink" data-pathname="/help.html">Help</a>
  </div>
  
  <div class="horizontal-line"></div>
  
  <div class="menu-wrapper">
    <a href="imprint.html" class="menu-item myLink" data-pathname="/imprint.html">Imprint</a>
    <a href="privacy.html" class="menu-item myLink" data-pathname="/privacy.html">Privacy</a>
  </div>
  
  <div class="horizontal-line"></div>
  
  <div class="menu-wrapper">
    <a class="menu-item" href="login.html">Logout</a>
  </div>
  
  <img class="profile-img" src="src/img/profile-1.jfif" alt="">
  `;
  document.getElementById('desktop-nav').innerHTML = desktopNav;
}

/* MOBILE NAVIGATION */
function createMobileNavigation(){
  let mobileNav = `
    <div class="nav-header">
      <img src="src/img/profile-1.jfif" class="profile-img" alt="">
      <a href="index.html"><img src="src/icons/logo.png" class="logo" alt=""></a>
      <div id="menu-btn" class="menu-btn" onclick="toggleMenu()">
        <div class="menu-line"></div>
      </div>
    </div>
    <!-- <div id="nav-body-wrapper" class="nav-body-wrapper"> -->
      <div id="nav-body" class="nav-body">
        <a href="index.html">Board</a>
        <a href="backlog.html">Backlog</a>
        <a href="task.html">Add Task</a>
        <a href="help.html">Help</a>
        <a href="imprint.html">Imprint</a>
        <a href="privacy.html">Privacy</a>
        <a href="login.html">Logout</a>
      </div>
      <!-- </div> -->

  `;
  document.getElementById('mobile-nav').innerHTML = mobileNav;
}

function setActiveMenu(){
  let links = document.getElementsByClassName("myLink");
  let URL = window.location.pathname;
  URL = URL.substring(URL.lastIndexOf('/'));
  for (let i = 0; i < links.length; i++) {
    if (links[i].dataset.pathname == URL) {
      links[i].classList.add("active");
    }
  }
}

function toggleMenu() {
  const menuBtn = document.getElementById('menu-btn');
  navBody = document.getElementById("nav-body");
  if(menuBtn){
      isMenuOpen = !isMenuOpen;
      if(isMenuOpen){
        menuBtn.classList.add('open');
        navBody.style.height = '280px';
      } else {
        menuBtn.classList.remove('open');
        navBody.style.height = '0';
      }
  }
}

/*
function toggleMenu() {
  const menuBtn = document.getElementById('menu-btn');
  if(menuBtn){
      isMenuOpen = !isMenuOpen;
      if(isMenuOpen){
        menuBtn.classList.add('open');
        document.getElementById("nav-body").classList.add("nav-body-incremented");
      } else {
        menuBtn.classList.remove('open');
        document.getElementById("nav-body").classList.remove("nav-body-incremented");
      }
  }
}
*/

function checkMediaQuery() {
  let mobileNav = document.getElementById('mobile-nav');
  let desktopNav = document.getElementById('desktop-nav');
  // If the inner width of the window is lower then 700px
  if (window.innerWidth <= 700 && mobileNav && desktopNav) {
    mobileNav.classList.remove('d-none');
    desktopNav.classList.add('d-none');
  }
  if(window.innerWidth > 700 && mobileNav && desktopNav) {
    mobileNav.classList.add('d-none');
    desktopNav.classList.remove('d-none');
  }
}
window.addEventListener('load', checkMediaQuery);
window.addEventListener('resize', checkMediaQuery);







