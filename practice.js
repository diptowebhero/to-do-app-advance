function getId(id) {
  return document.getElementById(id);
}

//select id
const form = getId("form");
const date = getId("date");
const tBody = getId("tbody");
const today = new Date().toISOString().slice(0, 10);
date.value = today;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputs = [...this.elements];
  let formData = {};
  let isValid = true;
  inputs.forEach((input) => {
    if (input.type !== "submit") {
      if (input.value == "") {
        alert("Please enter a value in the input");
        isValid = false;
        return;
      }
      formData[input.name] = input.value;
    }
  });
  if (isValid) {
    formData.status = "incomplete";
    formData.id = uuidv4();
    const tasks = getDataLocalStorage();
    showData(formData, tasks.length + 1);
    tasks.push(formData);
    setDataOnLocalStorage(tasks);
  }
  this.reset();
});

//=====data displaying in the ui===//
function showData({ name, priority, status, date,id }, index) {
  let tr = document.createElement("tr");
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

//update delete and confirm functionality
tBody.addEventListener("click", (e) => {
  if(e.target.id === "delete"){
    let tr = e.target.parentElement.parentElement;
    const id = tr.dataset.id;
    console.log(id);
  }
});

/////===localStorage====/////
window.onload = function () {
  const tasks = getDataLocalStorage();
  tasks.forEach(function (task, index) {
    showData(task, index + 1);
  });
};
//======get data from local storage=======///

function getDataLocalStorage() {
  let tasks = [];
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
  }
  return tasks;
}

// =====set data on local storage=====///
function setDataOnLocalStorage(task) {
  localStorage.setItem("tasks", JSON.stringify(task));
}
