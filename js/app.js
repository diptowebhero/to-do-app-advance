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

//============================Action====================================
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
  } else if (e.target.id === "edit") {
    const tr = e.target.parentElement.parentElement;
    const id = tr.dataset.id;
    const tds = tr.children;

    //name
    let nameTd;
    let nameInput;

    //priority
    let priorityTd;
    let priorityInput;

    //date
    let dateId;
    let dateInput;

    //actions
    let actionsTd;
    let previousAction;

    [...tds].forEach((td) => {
      if (td.id === "name") {
        nameTd = td;
        let previousName = td.textContent;
        td.innerHTML = "";
        nameInput = document.createElement("input");
        nameInput.className = "nameInput"
        nameInput.type = "text";
        nameInput.value = previousName;
        td.appendChild(nameInput);
      } else if (td.id === "priority") {
        priorityTd = td;
        const previousPriority = td.textContent;
        td.innerHTML = "";
        priorityInput = document.createElement("select");
        priorityInput.className = "selectInput"
        priorityInput.innerHTML = `<option disabled>Select One</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="Low">Low</option>`;

        if (previousPriority === "high") {
          priorityInput.selectedIndex = 1;
        } else if (previousPriority === "medium") {
          priorityInput.selectedIndex = 2;
        } else if (previousPriority === "Low") {
          priorityInput.selectedIndex = 3;
        }
        td.appendChild(priorityInput);
      } else if (td.id === "date") {
        dateId = td;
        const previousDate = td.textContent;
        td.innerHTML = "";
        dateInput = document.createElement("input");
        dateInput.className ="dateInput"
        dateInput.type = "date";
        dateInput.value = previousDate;
        td.appendChild(dateInput);
      } else if (td.id === "action") {
        actionsTd = td;
        previousAction = td.innerHTML;
        td.innerHTML = "";
        const saveBtn = document.createElement("button");
        saveBtn.className = "saveBtn"
        saveBtn.innerText = "Save";
        saveBtn.addEventListener("click", function () {
          //name
          const newInputName = nameInput.value;
          nameTd.innerHTML = newInputName;

          //priority
          const newPriority = priorityInput.value;
          priorityTd.innerHTML = newPriority;

          //date
          const newDate = dateInput.value;
          dateId.innerHTML = newDate;

          //action
          actionsTd.innerHTML = previousAction;

          let tasks = getDataLocalStorage();
          tasks.filter((task) => {
            if (task.id === id) {
              task.name = newInputName;
              task.priority = newPriority;
              task.date = newDate;
              return task;
            } else {
              return task;
            }
          });
          
          setData(tasks)
        });
        td.appendChild(saveBtn);
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