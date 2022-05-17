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
    tasks.push(formData);
    displayingData(formData, tasks.length);
    setDataOnLocalStorage(tasks);
  }
  this.reset();
});

//displaying data in the ui
function displayingData({ name, priority, date, id, status }, index) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
  <td>${index}</td>
            <td id="name">${name}</td>
            <td id="priority">${priority}</td>
            <td id="status">${status}</td>
            <td id="date">${date}</td>
            <td id="action">
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

//remove,update,delete,functionality
tBody.addEventListener("click", function (e) {
  if (e.target.id === "delete") {
    const tr = e.target.parentElement.parentElement;
    const id = tr.dataset.id;
    tr.remove();
    let tasks = getDataFormLocalStorage();
    tasks = tasks.filter((task) => {
      if (task.id !== id) {
        return task;
      }
    });

    setDataOnLocalStorage(tasks);
    load();
  } else if (e.target.id === "check") {
    const tr = e.target.parentElement.parentElement;
    const id = tr.dataset.id;
    const tds = tr.children;
    [...tds].forEach((td) => {
      if (td.id === "status") {
        let tasks = getDataFormLocalStorage();
        tasks = tasks.filter((task) => {
          if (task.id === id) {
            if (task.status === "incomplete") {
              task.status = "complete";
              td.innerHTML = "complete";
            } else {
              task.status = "incomplete";
              td.innerHTML = "incomplete";
            }
            return task;
          } else {
            return task;
          }
        });
        setDataOnLocalStorage(tasks);
      }
    });
  } else if (e.target.id === "edit") {
    console.log("edit");
  }
});

//onload function
window.onload = load;

function load() {
  tBody.innerHTML = "";
  const tasks = getDataFormLocalStorage();
  tasks.forEach((task, index) => {
    displayingData(task, index + 1);
  });
}

//local storage function
function getDataFormLocalStorage() {
  let task = [];
  const data = localStorage.getItem("tasks");
  if (data) {
    task = JSON.parse(data);
  }
  return task;
}

function setDataOnLocalStorage(task) {
  localStorage.setItem("tasks", JSON.stringify(task));
}
