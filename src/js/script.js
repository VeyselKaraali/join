let currentTask = [];
let isMenuOpen = false;
let isUserDataShown = false;
let currentDraggedElement;
let allTasks = [];
let editors = [];

/**
 * This function is used to 
 * 
 */
async function init(){
  setURL('https://gruppe-288.developerakademie.net/join/smallest_backend_ever');
  await downloadFromServer();
  renderNavigation();
  setMenuActive();
}

async function initBoard(){
  init();
  await loadDataFromServer();
  showTasks();
}

async function initBacklog(){
  init();
  await loadTasks(); 
  //await loadDataFromServer();
}

async function initTask(){
  init();
  resetForm();
}

function renderNavigation() {
  renderDesktopNavigation();
  renderMobileNavigation();
}

/* START DESKTOP NAVIGATION */
function renderDesktopNavigation(){
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
  
  <!-- 
  <div class="horizontal-line"></div>
  
  <div class="menu-wrapper">
    <a href="imprint.html" class="menu-item myLink" data-pathname="/imprint.html">Imprint</a>
    <a href="privacy.html" class="menu-item myLink" data-pathname="/privacy.html">Privacy</a>
  </div>
  
  <div class="horizontal-line"></div>
  
  <div class="menu-wrapper">
    <a class="menu-item" href="login.html">Logout</a>
  </div>
  -->
  
  <img class="profile-img" src="src/img/user-1.jpg" alt="">
  `;
  document.getElementById('desktop-nav').innerHTML = desktopNav;
}
/* END DESKTOP NAVIGATION */

/* START MOBILE NAVIGATION */
function renderMobileNavigation(){
  let mobileNav = `
    <div class="nav-header">
      <img src="src/img/user-1.jpg" class="profile-img" alt="">
      <a href="index.html"><img src="src/icons/logo.png" class="logo" alt=""></a>
      <div id="menu-btn" class="menu-btn" onclick="toggleMobileNavigation()">
        <div class="menu-line"></div>
      </div>
    </div>
    <!-- <div id="nav-body-wrapper" class="nav-body-wrapper"> -->
      <div id="nav-body" class="nav-body">
        <a href="index.html">Board</a>
        <a href="backlog.html">Backlog</a>
        <a href="task.html">Add Task</a>
        <a href="help.html">Help</a>
        <!--
        <a href="imprint.html">Imprint</a>
        <a href="privacy.html">Privacy</a>
        <a href="login.html">Logout</a>
        -->
      </div>
      <!-- </div> -->

  `;
  document.getElementById('mobile-nav').innerHTML = mobileNav;
}
/* END MOBILE NAVIGATION */

function setMenuActive(){
  let links = document.getElementsByClassName("myLink");
  let URL = window.location.pathname;
  URL = URL.substring(URL.lastIndexOf('/'));
  for (let i = 0; i < links.length; i++) {
    if (links[i].dataset.pathname == URL) {
      links[i].classList.add("active");
    }
  }
}

function toggleMobileNavigation() {
  const menuBtn = document.getElementById('menu-btn');
  navBody = document.getElementById("nav-body");
  if(menuBtn){
      isMenuOpen = !isMenuOpen;
      if(isMenuOpen){
        menuBtn.classList.add('open');
        //navBody.style.height = '280px';
        navBody.style.height = '160px';
      } else {
        menuBtn.classList.remove('open');
        navBody.style.height = '0';
      }
  }
}

function checkNavigation() {
  let mobileNav = document.getElementById('mobile-nav');
  let desktopNav = document.getElementById('desktop-nav');

  if (window.innerWidth <= 800 && mobileNav && desktopNav) {
    mobileNav.classList.remove('d-none');
    desktopNav.classList.add('d-none');
  }
  if(window.innerWidth > 800 && mobileNav && desktopNav) {
    mobileNav.classList.add('d-none');
    desktopNav.classList.remove('d-none');
  }
}
window.addEventListener('load', checkNavigation);
window.addEventListener('resize', checkNavigation);

async function loadTasks() {
  let id ='';
  let title ='';
  let dueDate ='';
  let category ='';
  let categoryColor ='';
  let urgency ='';
  let description ='';
  let editors = [];

  await loadDataFromServer();

  for (let i = 0; i < allTasks.length; i++) {
    id = allTasks[i].id;
    title = allTasks[i].title;
    dueDate = allTasks[i].dueDate;
    category = allTasks[i].category;
    categoryColor = allTasks[i].categoryColor;
    urgency = allTasks[i].urgency;
    description = allTasks[i].description;
    editors = allTasks[i].editors;
    
    if(allTasks[i].backlog == 'true') {
      renderBacklogTasks(id, title, dueDate, category, categoryColor, urgency, description, editors);
    }
    else {
      // showTasks();
    }
  }
}

function renderBacklogTasks(id, title, dueDate, category, categoryColor, urgency, description, editors) {
  let backlogTask = 
  `
  <div class="category-color" style="background-color: ${categoryColor}">
  <div class="task-wrapper">
    <div class="assigned-wrapper">
      <div>ASSIGNED TO</div>
      <div id="backlog-image-wrapper-${id}" class="image-wrapper">
      </div>
    </div>
    <div class="title-wrapper">
      <div>TITLE</div>
      <div id="backlog-title-${id}">${title}</div>
    </div>
    <div class="category-wrapper">
      <div>CATEGORY</div>
      <div id="backlog-category-${id}">${category}</div>
    </div>
    <div class="date-wrapper">
      <div>DUE DATE</div>
      <div id="backlog-date-${id}">${dueDate}</div>
    </div>
    <div class="urgency-wrapper">
      <div>URGENCY</div>
      <div id="backlog-urgency-${id}">${urgency}</div>
    </div>
    <div class="description-wrapper">
      <div>DESCRIPTION</div>
      <div id="backlog-description-${id}" class="description">${description}</div>
    </div>
    <div class="button-wrapper">
      <div class="tooltip">
        <img onclick="moveTaskToBoard(this.id)" id="move-board-${id}" src="src/icons/move.svg" alt="">
        <span class="tooltiptext">Move To Board</span>
      </div>
      <div class="tooltip">
        <img id="edit-${id}" src="src/icons/edit.svg" alt="">
        <span class="tooltiptext">Edit</span>
      </div>
      <div class="tooltip">
        <img onclick="deleteTask(this.id)" id="delete-${id}" src="src/icons/delete.svg" alt="">
        <span class="tooltiptext">Delete</span>
      </div>
    </div>
  </div>
  </div>
  `;

  document.getElementById('task-container').innerHTML += backlogTask;
  renderBacklogEditors(id, editors);
}

function renderBacklogEditors(id, editors) {
  let imageWrapper = document.getElementById(`backlog-image-wrapper-${id}`);
  for (let i = 0; i < editors.length; i++) {
    imageWrapper.innerHTML += `<img id="${editors[i]}-${id}" src="src/img/${editors[i]}.jpg" alt="">`
  }
}

async function loadDataFromServer() {
  await downloadFromServer();
  let allTasksAsString = await backend.getItem(`allTasks`) || [];
  
  if(allTasksAsString.length != 0){
    allTasks = JSON.parse(allTasksAsString);
  }
}

async function pushDataToServer(currentTask){
  allTasks.push(currentTask);
  await backend.setItem('allTasks', JSON.stringify(allTasks));
}

async function addTask() {
  let title = document.getElementById('title')  
  let date = document.getElementById('datePicker')
  let category = document.getElementById('category')
  let urgency  = document.getElementById('urgency')
  let description = document.getElementById('description')
  let categoryColor = setCategoryColor(category.value);

  await loadDataFromServer();

  let currentTask = {
        "id": `${new Date().getTime()}`,
        "title": title.value,
        "dueDate": date.value,
        "category": category.value,
        "categoryColor": categoryColor,
        "urgency": urgency.value,
        "description": description.value,
        "editors": editors,
        "backlog": 'true',
        "status": "todo"
  };

  await pushDataToServer(currentTask);
  resetForm();
  showSuccessMessage();
}

async function moveTaskToBoard(taskId) {
  for (let i = 0; i < allTasks.length; i++) {
    let index = allTasks[i].id.indexOf(taskId.substring(11));
    if (index !== -1) {
      allTasks[i].backlog = 'false';
      break;
    }
  }
  await backend.setItem('allTasks', JSON.stringify(allTasks));
  console.log(allTasks);
  location.reload();
}

async function deleteTask(taskId) {
  for (let i = 0; i < allTasks.length; i++) {
    let index = allTasks[i].id.indexOf(taskId.substring(7));
    if (index !== -1) {
      allTasks.splice(i, 1);
      break;
    }
  }
  await backend.setItem('allTasks', JSON.stringify(allTasks));
  location.reload();
}

function showSuccessMessage() {
  let msgSuccess = document.getElementById('msg-success');
  
  if(msgSuccess.classList.contains('d-none')){
    msgSuccess.classList.remove('d-none');
  }
  msgSuccess.style.zIndex = '';
  msgSuccess.style.animation = 'none';
  msgSuccess.offsetHeight;
  msgSuccess.style.animation = null;
}

function resetForm() {
  document.getElementById('title').value = '';  
  document.getElementById('datePicker').value = ''; 
  document.getElementById("category").selectedIndex = -1;
  document.getElementById("urgency").selectedIndex = -1;
  document.getElementById('description').value = ''; 
  resetEditors();
}

function resetEditors() {
  editors = [];
  let element = document.getElementById('task-image-wrapper');
        let children = element.children;
        for(let i=0; i<children.length; i++){
            let child = children[i];
            if(child.classList.contains('editor-selected')){
              child.classList.remove('editor-selected');
            }
        }
}

function setCategoryColor(category) {
  if(category == 'Management'){
    return '#7190FC';
  }
  if(category == 'Software-Development'){
    return '#ffb071';
  }
  if(category == 'Design'){
    return '#e271ff';
  }
  if(category == 'Human-Resources'){
    return '#55ae66';
  }
  else {
    return '#000';
  }
}

function selectTaskEditors(id){
  let editor = document.getElementById(id);
  let index = editors.indexOf(id);

  if (index !== -1) {
    editors.splice(index, 1);
  }
  editor.classList.toggle('editor-selected');
  if(editor.classList.contains('editor-selected')){
    editors.push(id);
  }
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
  let getTasks = allTasks.filter(function (currentTask) {
    return currentTask.status == `${selectedStatus}`;
  });
  for (let i = 0; i < getTasks.length; i++) {
    if (getTasks[i].backlog === 'false') {
      content.innerHTML += /*html*/ `
        <div class="board-task" id="${getTasks[i]['id']}" draggable="true" ondragstart="setCurrentDraggedElement(${getTasks[i]['id']})">
          <span>Title: ${getTasks[i].title}</span>
          <span>Due Date: ${getTasks[i].dueDate}</span>
          <span>Urgency: ${getTasks[i].urgency}</span>
        </div>`
    }    
  };  
}

function setCurrentDraggedElement(id) {
  currentDraggedElement = id;
}

function moveTo(status) {
  selectDraggedElement(status);
  hoverHighlight(status, false);
  save();
  showTasks();
}

function selectDraggedElement(status) {
  allTasks.forEach(element => {
    if (element.id == currentDraggedElement) {
      element.status = status;
    }
  });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function hoverHighlight(status, toSet) {
  if (toSet) {
    document.getElementById(`${status}`).classList.add('highlight');
  } else {
    document.getElementById(`${status}`).classList.remove('highlight');
  }
}

function save() {
  backend.setItem('allTasks', JSON.stringify(allTasks));
}
