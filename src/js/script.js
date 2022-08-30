let currentTask = [];
let isMenuOpen = false;
let isUserDataShown = false;
let currentDraggedElement;
let allTasks = [];
let editors = [];
let oldEditors = [];
let currentEditTask;
let currentId;
let loginuser = [];
let users = [

  {
      username:  "christian@developerakademie.com",
      password:  "christian"
  },

  {
    username:  "faysal@developerakademie.com",
    password:  "faysal"
  },

  {
    username:  "andreas@developerakademie.com",
    password:  "andreas"
  }

]

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
  let desktopNav = renderDesktopNavigationHtml();
  document.getElementById('desktop-nav').innerHTML = desktopNav;
}
/* END DESKTOP NAVIGATION */

/* START MOBILE NAVIGATION */
function renderMobileNavigation(){
  let mobileNav = renderMobileNavigationHtml();
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
  }
}

function renderBacklogTasks(id, title, dueDate, category, categoryColor, urgency, description, editors) {
  let backlogTask = renderBacklogTasksHtml(id, title, dueDate, category, categoryColor, urgency, description, editors);
  
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
  /*window.location="backlog.html"*/
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
  // console.log(allTasks);
  location.reload();
}

function cancelEdits(){
  resetForm();
  document.getElementById('edit-task-wrapper').classList.add('d-none');
  //document.getElementById('task-container').style.filter = "blur(0px)";
}

function editTask(editId) {
  window.scrollTo({top: 0});
  oldEditors = editors;
  //document.getElementById('task-container').style.filter = "blur(3px)";
  
  currentEditTask = editId;
  document.getElementById('edit-task-wrapper').classList.remove('d-none');
  document.getElementById('edit-task-wrapper').style.backgroundColor = '#fff';
  loadForm('form-edit-task');
  for (let i = 0; i < allTasks.length; i++) {
    let index = allTasks[i].id.indexOf(editId.substring(5));
    if (index !== -1) {
      let id = allTasks[i].id;
      document.getElementById('title').value = document.getElementById(`backlog-title-${id}`).innerHTML;
      document.getElementById('datePicker').value = document.getElementById(`backlog-date-${id}`).innerHTML;
      document.getElementById('category').value = document.getElementById(`backlog-category-${id}`).innerHTML;
      document.getElementById('urgency').value = document.getElementById(`backlog-urgency-${id}`).innerHTML;
      document.getElementById('description').value = document.getElementById(`backlog-description-${id}`).innerHTML;
      
      
      editors = allTasks[i].editors;
      for(let i=0; i<editors.length; i++) {
        document.getElementById(`${editors[i]}`).classList.add('editor-selected');
      }
      break;
    }
  }
}

async function updateTask() {
  currentEditTask = currentEditTask.substring(5);

  for (let i = 0; i < allTasks.length; i++) {
    let index = allTasks[i].id.indexOf(currentEditTask.substring(5));
    if (index !== -1) {
      allTasks[i].title = document.getElementById('title').value;
      allTasks[i].dueDate = document.getElementById('datePicker').value;
      allTasks[i].category = document.getElementById('category').value;
      allTasks[i].categoryColor = setCategoryColor(category.value);
      allTasks[i].urgency = document.getElementById('urgency').value;
      allTasks[i].description = document.getElementById('description').value;
      allTasks[i].editors = editors;
    }
  }
  await save();
  location.reload();
  //document.getElementById('task-container').style.filter = "blur(0px)";
}

function loadForm(formId) {
  document.getElementById(`${formId}`).innerHTML = renderLoadFormHtml();

  renderFormButtons();
}

function renderFormButtons(){
  let buttons;
  let path = window.location.pathname.split("/").pop();
  if(path == 'task.html') {
    buttons = `
    <button type="button" onclick="resetForm()">CANCEL</button>
    <button type="submit">CREATE TASK</button>
    `
  }
  if(path == 'backlog.html') {
    buttons = `
    <button type="button" onclick="cancelEdits()">CANCEL</button>
    <button type="submit">UPDATE TASK</button>
    `
  }

  document.getElementById('button-wrapper').innerHTML = buttons;
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
      let urgencyColor = setUrgencyColor(getTasks[i]);
      content.innerHTML += generateTasksHtml(getTasks, i, urgencyColor);
    }    
  };  
}


function generateTasksHtml(getTasks, i, urgencyColor) {
  return /*html*/ `
        <div id="${getTasks[i]['id']}" class="board-task" style="background-color: ${getTasks[i]['categoryColor']}" draggable="true" ondragstart="setCurrentDraggedElement(${getTasks[i]['id']})">
          <div class="board-task-inner">
            <div class="board-task-title">${getTasks[i].title}</div>
            <div class="board-task-description">${getTasks[i].description}</div>
            <div class="board-toolbar">
              <div class="board-urgency" style="color: ${urgencyColor}">${getTasks[i].urgency}</div>
              <div class="board-due-date">${getTasks[i].dueDate}</div>
              <img src="src/icons/delete.svg" onclick="deleteBoardTask(${getTasks[i]['id']})">
          </div>
        <div>`;
}


function setCurrentDraggedElement(id) {
  currentDraggedElement = id;
}

async function moveTo(status) {
  selectDraggedElement(status);
  hoverHighlight(status, false);
  await save();
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

function setUrgencyColor(currentTask) {
  let urgency = currentTask['urgency'];
  if (urgency == "High") {
    return 'red';
  } else if (urgency == "Medium") {
    return 'blue';
  } else {
    return 'DarkSeaGreen';
  }
}

async function save() {
  await backend.setItem('allTasks', JSON.stringify(allTasks));
}

async function deleteBoardTask(id) {
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].id == id) {
      allTasks.splice(i, 1);
    }
  }
  await save();
  showTasks();
}

function loginUser() {
  let loginUsername = document.getElementById('username').value
  let loginPassword = document.getElementById('password').value
  for (let i = 0; i < users.length; i++) {
    if (loginUsername == users[i].username && loginPassword == users[i].password) 
    {
      window.location="join.html"
      break;
    } else {
      alert('Failed')
      break;
    } 
    
  }
  
}

function openSignUpPage() {

  let signUpPage = document.getElementById('signUpPage')
  let signInPage = document.getElementById('signInPage')
  signUpPage.classList.remove('d-none');
  signInPage.classList.add('d-none');
}

function openSignInPage() {

  let signUpPage = document.getElementById('signUpPage')
  let signInPage = document.getElementById('signInPage')
  signUpPage.classList.add('d-none');
  signInPage.classList.remove('d-none');
}


function createUser() {
  let createUsername = document.getElementById('create-username').value;
  let createPassword = document.getElementById('create-password').value;

  let createdUsers = {
    'username': createUsername, 
    'password': createPassword,
  }; 

  users.push(createdUsers);
  let allUsersAsString = JSON.stringify(users);
  localStorage.setItem('users',allUsersAsString)
  // console.log(users);
  window.location="join.html"
}

function loadAllUsers() {
  let allUsersAsSting = localStorage.getItem('users');
  users= JSON.parse(allUsersAsSting);
  // console.log('loaded all Users'.users);
}