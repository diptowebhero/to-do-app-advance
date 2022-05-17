//selector function
function elementById(id) {
  return document.querySelector(id);
}

const from = elementById("#form");
const date = elementById("#date");
const today = new Date().toISOString().slice(0, 10);
date.value = today;
const tBody = elementById("#tbody");

//handle form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let formData = {};
  let isValid = true;
  [...this.elements].forEach((element) => {
    if (element.type !== "submit") {
      if (element.value === "") {
        isValid = false;
        alert(`${element.name} is empty`);
      }
      formData[element.name] = element.value;
    }
  });
  if (isValid) {
    formData.id = uuidv4();
    formData.status = "incomplete";
    const tasks = getDataFormLocalStorage();
    tasks.push(formData)
    displayingData(formData,tasks.length);
    setDataOnLocalStorage(tasks)
  }
  this.reset();
});

//displaying data in the ui
function displayingData({ name, priority, date, id, status },index) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
  <td>${index}</td>
            <td>${name}</td>
            <td>${priority}</td>
            <td>${status}</td>
            <td>${date}</td>
            <td>
              <button id="edit">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button id="check">
                <i class="fa-solid fa-square-check"></i>
              </button>
              <button id="delete"><i class="fa-solid fa-trash"></i></button>
            </td>
  `;
  tr.dataset.id = id;
  tBody.appendChild(tr);
}


//onload function
window.onload = load;

function load(){
  const tasks = getDataFormLocalStorage();
  tasks.forEach((task,index)=>{
    displayingData(task,index + 1)
  })
}

//local storage function
function getDataFormLocalStorage(){
  let task = [];
  const data = localStorage.getItem('tasks');
  if(data){
    task = JSON.parse(data)
  }
  return task;
}

function setDataOnLocalStorage(task){
  localStorage.setItem('tasks',JSON.stringify(task))
}