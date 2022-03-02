// //selecting elements
function getId(id) {
  return document.getElementById(id);
}

const form = getId("form");
const date = getId("date");
const tBody = getId("tbody");

const today = new Date().toISOString().slice(0, 10);
date.value = today;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let inputs = [...this.elements];
  let formData = {};
  let isValid = true;
  inputs.forEach((input) => {
    if (input.type != "submit") {
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

    setData(tasks);
  }
  this.reset();
});

//update,delete,confirm method
tBody.addEventListener("click", (e) => {
  const tr = e.target.parentElement.parentElement;
  const id = tr.dataset.id;
  tr.remove();
  let tasks = getDataLocalStorage();
  tasks = tasks.filter((task) => {
    if (task.id !== id) {
      return task;
    }
  });
  setData(tasks);
});

//show data in Ui

function showData({ name, priority, status, date, id }, index) {
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

//local storage
window.onload = function () {
  const tasks = getDataLocalStorage();
  tasks.forEach((task, index) => {
    showData(task, index + 1);
  });
};

//get data
function getDataLocalStorage() {
  let tasks = [];
  const data = localStorage.getItem("tasks");

  if (data) {
    tasks = JSON.parse(data);
  }
  return tasks;
}

//set data
function setData(task) {
  localStorage.setItem("tasks", JSON.stringify(task));
}
