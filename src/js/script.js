/**
 * This function is used to 
 * 
 */
function init(){
  setURL('http://developerakademie.com/smallest_backend_ever');
  createNavigation();
}

/* DESKTOP NAVIGATION */
function createNavigation(){
  let desktopNav = `
  <a class="logo-wrapper" href="board.html">
    <img class="logo" src="src/icons/join_logo.png" alt="">
  </a>
  
  <div class="menu-wrapper">
    <a onclick="setActiveMenu(this)" class="menu-item" href="board.html">Board</a>
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
  console.log('Test');
}



/*
function setMenuItemActive(){
  let menuContainer = document.getElementById("desktop-nav");
  let menus = menuContainer.getElementsByClassName("menu-item");
  for (let i = 0; i < menus.length; i++) {
    menus[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    if (current.length > 0) { 
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
    });
  }
}
*/


