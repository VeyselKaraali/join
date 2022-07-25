let isMenuOpen = false;

/**
 * This function is used to 
 * 
 */
function init(){
  setURL('https://gruppe-288.developerakademie.net/join/smallest_backend_ever');
  createNavigation();
}

function createNavigation() {
  createDesktopNavigation();
  createMobileNavigation();
}

/* DESKTOP NAVIGATION */
function createDesktopNavigation(){
  let desktopNav = `
  <a class="logo-wrapper" href="index.html">
    <img class="logo" src="src/icons/join_logo.png" alt="">
  </a>
  
  <div class="menu-wrapper">
    <a onclick="setActiveMenu(this)" class="menu-item" href="index.html">Board</a>
    <a class="menu-item" href="backlog.html">Backlog</a>
    <a class="menu-item" href="task.html">Add Task</a>
    <a class="menu-item" href="help.html">Help</a>
  </div>
  
  <div class="horizontal-line"></div>
  
  <div class="menu-wrapper">
    <a class="menu-item" href="imprint.html">Imprint</a>
    <a class="menu-item" href="privacy.html">Privacy</a>
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
<div id="nav-body" class="nav-body">
  <a href="index.html">Board</a>
  <a href="backlog.html">Backlog</a>
  <a href="task.html">Add Task</a>
  <a href="help.html">Help</a>
  <a href="imprint.html">Imprint</a>
  <a href="privacy.html">Privacy</a>
  <a href="login.html">Logout</a>
</div>
  `;
  document.getElementById('mobile-nav').innerHTML = mobileNav;
}

function setActiveMenu(clickedMenuItem){
  let menuContainer = document.getElementById("desktop-nav");
  let menus = menuContainer.getElementsByClassName("menu-item");
  for (let i = 0; i < menus.length; i++) {
    //menus[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    if (current.length > 0) { 
      current[0].className = current[0].className.replace(" active", "");
    }
    //this.className += " active";
    //});
  }
  clickedMenuItem.classList.add('active');
}


function toggleMenu() {
  //const menuBtn = document.querySelector('.menu-btn');
  const menuBtn = document.getElementById('menu-btn');
  if(menuBtn){
      isMenuOpen = !isMenuOpen;
      if(isMenuOpen){
        menuBtn.classList.add('open');
        document.getElementById('nav-body').style.height='100%';
      } else {
        menuBtn.classList.remove('open');
        document.getElementById('nav-body').style.height='0';
      }
  }
}

function checkMediaQuery() {
  // If the inner width of the window is lower then 700px
  if (window.innerWidth <= 700) {
    document.getElementById('mobile-nav').classList.remove('d-none');
    document.getElementById('desktop-nav').classList.add('d-none');
  }
  else {
    document.getElementById('mobile-nav').classList.add('d-none');
    document.getElementById('desktop-nav').classList.remove('d-none');
  }
}
window.addEventListener('load', checkMediaQuery);
window.addEventListener('resize', checkMediaQuery);





