let currentTask = [];
let isMenuOpen = false;
let currentDraggedElement;

/**
 * This function is used to 
 * 
 */
async function init(){
  setURL('https://gruppe-288.developerakademie.net/join/smallest_backend_ever');
  await downloadFromServer();
  createNavigation();
  setActiveMenu();
  

  showTasks();
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

 
  // This function is for testing the board
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

function checkMediaQuery() {
  let mobileNav = document.getElementById('mobile-nav');
  let desktopNav = document.getElementById('desktop-nav');
  let body = document.getElementById('body');
  // If the inner width of the window is lower then 700px
  if (window.innerWidth <= 900 && mobileNav && desktopNav) {
    mobileNav.classList.remove('d-none');
    desktopNav.classList.add('d-none');
    body.style.flexDirection = 'column';
  }
  if(window.innerWidth > 900 && mobileNav && desktopNav) {
    mobileNav.classList.add('d-none');
    desktopNav.classList.remove('d-none');
    //body.style.flexDirection = 'row';
  }
}
window.addEventListener('load', checkMediaQuery);
window.addEventListener('resize', checkMediaQuery);


//Start Board Test-Functions
let tasks = [
  {
    "id": 0,
    "title": "Neuen Mitarbeiter einarbeiten",
    "catergory": "Test Catergory",
    "description": "Bitte alle Basics vermitteln",
    "created": "27.07.2022",
    "duedate": "05.09.2022",
    "urgency": "high",
    "status": "todo"
  },
  { 
    "id": 1,
    "title": "Büromaterial bestellen",
    "catergory": "Test Catergory",
    "description": "Kopierpapier, Druckerpatrone, Kugelschreiber usw.",
    "created": "27.07.2022",
    "duedate": "01.09.2022",
    "urgency": "low",
    "status": "todo"
  },
  {
    "id": 2,
    "title": "Software fertigstellen",
    "catergory": "Test Catergory",
    "description": "Komplett programmieren und auf Funktion testen",
    "created": "27.07.2022",
    "duedate": "10.09.2022",
    "urgency": "intermediate",
    "status": "todo"
  }
];


function addToTask() {

  let title = document.getElementById('title')  
  let date = document.getElementById('date')
  let catergory = document.getElementById('catergory')
  let urgency  = document.getElementById('urgency')
  let description = document.getElementById('description')

  let allTasks= {
    "id": 0,
    "title": title.value,
    "catergory": catergory.value,
    "description": description.value,
    "created": "27.07.2022",
    "duedate": date.value,
    "urgency": urgency.value,
    "status": "todo"
  };

  currentTask.push(allTasks)
  console.log(currentTask)

  title.value = '';
  date.value = '';
  catergory.value = '';
  urgency.value = '';
  description.value = '';

}


function showTasks() {
  renderTasks('todo');
  renderTasks('inprogress');
  renderTasks('testing');
  renderTasks('done');
}

function renderTasks(selectedStatus) {
  let content = document.getElementById(`${selectedStatus}`);
  content.innerHTML = '';
  let getTasks = tasks.filter(function (currentTask) {
    return currentTask.status == `${selectedStatus}`;
  });
  for (let i = 0; i < getTasks.length; i++) {
    content.innerHTML += /*html*/ `
      <div class="board-task" id="task-${i}" draggable="true" ondragstart="setCurrentDraggedElement(${getTasks[i]['id']})">
        <span>${getTasks[i].title}</span>
        <span>${getTasks[i].duedate}</span>
      </div>`
  };  
}

function setCurrentDraggedElement(id) {
  currentDraggedElement = id;
}


function moveTo(status) {
  let currentDroppedElement = status;
  tasks[currentDraggedElement].status = currentDroppedElement;
  showTasks();
}


function allowDrop(ev) {
  ev.preventDefault();
}
//End Board Test-Functions







