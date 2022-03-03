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

//show data in Ui
function showData({ name, priority, status, date, id }, index) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
        <td id="no">${index}</td>
        <td id="name">${name}</td>
        <td id="priority">${priority}</td>
        <td id="status">${status}</td>
        <td id="date">${date}</td>
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

//================================================================
//update,delete,confirm method
tBody.addEventListener("click", (e) => {
  if (e.target.id == "delete") {
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
  } else if (e.target.id === "check") {
    const tr = e.target.parentElement.parentElement;
    const id = tr.dataset.id;
    const tds = tr.children;
    [...tds].forEach((td) => {
      if (td.id == "status") {
        let tasks = getDataLocalStorage();
        tasks = tasks.filter((task) => {
          if (task.id === id) {
            if (task.status === "incomplete") {
              task.status = "complete";
              td.innerText = "complete";
            } else {
              task.status = "incomplete";
              td.innerText = "incomplete";
            }
            return task;
          } else {
            return task;
          }
        });
        setData(tasks);
      }
    });
  }
});

//================================================
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
