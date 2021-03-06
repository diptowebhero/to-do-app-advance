//selector function
function elementById(id) {
  return document.querySelector(id);
}

const from = elementById("#form");
const date = elementById("#date");
const today = new Date().toISOString().slice(0, 10);
date.value = today;
const tBody = elementById("#tbody");
const searchInput = elementById("#search_name");
const filter = elementById("#filter");
const sort = elementById("#sort");
const by_date = elementById("#by_date");

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

    //name
    let nameTd;
    let nameInput;
    //priority
    let priorityTd;
    let newPriorityInput;
    //date
    let dateTd;
    let newDateInput;
    //action
    let actionTd;
    let preActionTd;

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
    const tr = e.target.parentElement.parentElement;
    const id = tr.dataset.id;
    const tds = tr.children;
    [...tds].forEach((td) => {
      if (td.id === "name") {
        nameTd = td;
        const preName = td.innerHTML;
        td.innerHTML = "";
        nameInput = document.createElement("input");
        nameInput.className = "nameInput";
        nameInput.type = "text";
        nameInput.value = preName;
        td.appendChild(nameInput);
      } else if (td.id === "priority") {
        priorityTd = td;
        const prePriority = td.innerHTML;
        td.innerHTML = "";
        newPriorityInput = document.createElement("select");
        newPriorityInput.className = "selectInput";
        newPriorityInput.innerHTML = `
            <option disabled>Select One</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="Low">Low</option>
        `;

        if (prePriority === "high") {
          newPriorityInput.selectedIndex = 1;
        } else if (prePriority === "medium") {
          newPriorityInput.selectedIndex = 2;
        } else if (prePriority === "Low") {
          newPriorityInput.selectedIndex = 3;
        }
        td.appendChild(newPriorityInput);
      } else if (td.id === "date") {
        dateTd = td;
        const preDate = td.innerHTML;
        td.innerHTML = "";
        newDateInput = document.createElement("input");
        newDateInput.className = "dateInput";
        newDateInput.type = "date";
        newDateInput.value = preDate;
        td.appendChild(newDateInput);
      } else if (td.id === "action") {
        actionTd = td;
        preActionTd = td.innerHTML;
        td.innerHTML = "";
        const saveBtn = document.createElement("button");
        saveBtn.className = "saveBtn";
        saveBtn.innerText = "Save";

        saveBtn.addEventListener("click", function () {
          const newName = nameInput.value;
          nameTd.innerHTML = newName;
          const newPriority = newPriorityInput.value;
          priorityTd.innerHTML = newPriority;
          const newDate = newDateInput.value;
          dateTd.innerHTML = newDate;

          actionTd.innerHTML = preActionTd;
          let tasks = getDataFormLocalStorage();
          tasks = tasks.filter((task) => {
            if (task.id === id) {
              task.name = newName;
              task.priority = newPriority;
              task.date = newDate;
              return task;
            } else {
              return task;
            }
          });
          setDataOnLocalStorage(tasks);
        });
        td.appendChild(saveBtn);
      }
    });
  }
});

//search functionality
searchInput.addEventListener("input", function () {
  filter.selectedIndex = 0;
  sort.selectedIndex = 0;
  tBody.innerHTML = "";
  const inputValue = this.value;
  const tasks = getDataFormLocalStorage();
  let no = 0;
  tasks.forEach((task) => {
    if (task.name.toLowerCase().includes(inputValue.toLowerCase())) {
      displayingData(task, ++no);
    }
  });
});

//filter functionality
filter.addEventListener("change", function (e) {
  searchInput.value = "";
  sort.selectedIndex = 0;
  tBody.innerHTML = "";
  const filterTerm = this.value;
  const tasks = getDataFormLocalStorage();
  switch (filterTerm) {
    case "all":
      let no = 0;
      tasks.forEach((task) => {
        displayingData(task, ++no);
      });
      break;
    case "complete":
      let no1 = 0;
      tasks.forEach((task) => {
        if (task.status === "complete") {
          displayingData(task, ++no1);
        }
      });
      break;
    case "incomplete":
      let no2 = 0;
      tasks.forEach((task) => {
        if (task.status === "incomplete") {
          displayingData(task, ++no2);
        }
      });
      break;
    case "today":
      let no3 = 0;
      tasks.forEach((task) => {
        if (task.date === today) {
          displayingData(task, ++no3);
        }
      });
      break;
    case "high":
      let no4 = 0;
      tasks.forEach((task) => {
        if (task.priority === "high") {
          displayingData(task, ++no4);
        }
      });
      break;
    case "medium":
      let no5 = 0;
      tasks.forEach((task) => {
        if (task.priority === "medium") {
          displayingData(task, ++no5);
        }
      });
      break;
    case "low":
      let no6 = 0;
      tasks.forEach((task) => {
        if (task.priority === "Low") {
          displayingData(task, ++no6);
        }
      });
      break;
  }
});

//Date sorting
sort.addEventListener("change", function () {
  searchInput.value = "";
  tBody.innerHTML = "";
  filter.selectedIndex = 0;
  const sortTerm = this.value;
  const tasks = getDataFormLocalStorage();
  if (sortTerm === "newest") {
    tasks.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      } else if (new Date(a.date) < new Date(b.date)) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    tasks.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return 1;
      } else if (new Date(a.date) < new Date(b.date)) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  tasks.forEach((task, i) => {
    displayingData(task, i + 1);
  });
});

//date filtering
by_date.addEventListener("change", function () {
  const selectedDate = this.value;
  searchInput.value = "";
  tBody.innerHTML = "";
  filter.selectedIndex = 0;
  const tasks = getDataFormLocalStorage();
  if (selectedDate) {
    tasks.forEach((task) => {
      let count = 0;
      if (task.date === selectedDate) {
        displayingData(task, ++count);
      }
    });
  } else {
    tasks.forEach((task, i) => {
      displayingData(task, ++i);
    });
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
