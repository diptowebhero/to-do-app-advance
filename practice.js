// function getId(id) {
//   return document.getElementById(id);
// }

// //select id
// const form = getId("form");
// const date = getId("date");
// const tBody = getId("tbody");
// const today = new Date().toISOString().slice(0, 10);
// date.value = today;

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const inputs = [...this.elements];
//   let formData = {};
//   let isValid = true;
//   inputs.forEach((input) => {
//     if (input.type !== "submit") {
//       if (input.value == "") {
//         alert("Please enter a value in the input");
//         isValid = false;
//         return;
//       }
//       formData[input.name] = input.value;
//     }
//   });
//   if (isValid) {
//     formData.status = "incomplete";
//     formData.id = uuidv4();
//     const tasks = getDataLocalStorage();
//     showData(formData, tasks.length + 1);
//     tasks.push(formData);
//     setDataOnLocalStorage(tasks);
//   }
//   this.reset();
// });

// //=====data displaying in the ui===//
// function showData({ name, priority, status, date, id }, index) {
//   const tr = document.createElement("tr");
//   tr.innerHTML = `
//     <td>${index}</td>
//         <td id="name">${name}</td>
//         <td id="priority">${priority}</td>
//         <td id="status">${status}</td>
//         <td id="date">${date}</td>
//         <td id="action">
//         <button id="edit">
//             <i class="fa-solid fa-pen-to-square"></i>
//         </button>
//         <button id="check">
//              <i class="fa-solid fa-square-check"></i>
//         </button>
//         <button id="delete"><i class="fa-solid fa-trash"></i></button>
//     </td>
//     `;
//   tr.dataset.id = id;
//   tBody.appendChild(tr);
// }

// //update delete and confirm functionality
// tBody.addEventListener("click", (e) => {
//   if (e.target.id === "delete") {
//     const tr = e.target.parentElement.parentElement;
//     const id = tr.dataset.id;
//     tr.remove();
//     let tasks = getDataLocalStorage();
//     tasks = tasks.filter((task) => {
//       if (task.id != id) {
//         return task;
//       }
//     });
//     setDataOnLocalStorage(tasks);
//   } else if (e.target.id === "check") {
//     const tr = e.target.parentElement.parentElement;
//     const id = tr.dataset.id;
//     const tds = tr.children;
//     [...tds].forEach((td) => {
//       if (td.id === "status") {
//         let tasks = getDataLocalStorage();
//         tasks = tasks.filter((task) => {
//           if (task.id === id) {
//             if (task.status === "incomplete") {
//               task.status = "complete";
//               td.innerText = "complete";
//             } else {
//               task.status = "incomplete";
//               td.innerText = "incomplete";
//             }
//             return task;
//           } else {
//             return task;
//           }
//         });
//         setDataOnLocalStorage(tasks);
//       }
//     });
//   } else if (e.target.id === "edit") {
//     const tr = e.target.parentElement.parentElement;
//     const id = tr.dataset.id;
//     const tds = tr.children;

//     //name
//     let nameTd;
//     let nameInput;

//     //priority
//     let priorityTd;
//     let priorityInput;

//     //date
//     let dateTd;
//     let dateInput;

//     //action
//     let actionsTd;
//     let previousAction;
//     [...tds].forEach((td) => {
//       if (td.id === "name") {
//         nameTd = td;
//         const previousName = td.textContent;
//         td.innerHTML = "";
//         nameInput = document.createElement("input");
//         nameInput.className = "nameInput"
//         nameInput.type = "text";
//         nameInput.value = previousName;
//         td.appendChild(nameInput);
//       } else if (td.id == "priority") {
//         priorityTd = td;
//         const previousSelect = td.textContent;
//         td.innerHTML = "";
//         priorityInput = document.createElement("select");
//         priorityInput.className = "selectInput"
//         priorityInput.innerHTML = `
//         <option disabled>Select One</option>
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="Low">Low</option>
//         `;
//         priorityInput.value = previousSelect;
//         td.appendChild(priorityInput);
//       } else if (td.id === "date") {
//         dateTd = td;
//         const previousDate = td.textContent;
//         td.innerHTML = "";
//         dateInput = document.createElement("input");
//         dateInput.className ="dateInput"
//         dateInput.type = "date";
//         dateInput.value = previousDate;
//         td.appendChild(dateInput);
//       } else if (td.id === "action") {
//         actionsTd = td;
//         previousAction = td.innerHTML;
//         td.innerHTML = "";
//         const saveBtn = document.createElement("button");
//         saveBtn.className = "saveBtn"
//         saveBtn.textContent = "Save";
//         saveBtn.addEventListener("click", () => {
//           //name
//           const newName = nameInput.value;
//           nameTd.innerHTML = newName;
//           //priority
//           const newPriority = priorityInput.value;
//           priorityTd.innerHTML = newPriority;

//           //date
//           const newDate = dateInput.value;
//           dateTd.innerHTML = newDate;

//           //actions
//           actionsTd.innerHTML = previousAction;
//           //add data local storage
//           let tasks = getDataLocalStorage();
//           tasks = tasks.filter((task) => {
//             console.log(task);
//             if(task.id === id){
//               task.name = newName;
//               task.priority = newPriority;
//               task.date = newDate;
//               return task;
//             }
//             else{
//               return task;
//             }
//           })
//           setDataOnLocalStorage(tasks)
//         });
//         td.appendChild(saveBtn);
//       }
//     });
//   }
// });

// /////===localStorage====/////
// window.onload = function () {
//   const tasks = getDataLocalStorage();
//   tasks.forEach(function (task, index) {
//     showData(task, index + 1);
//   });
// };
// //======get data from local storage=======///

// function getDataLocalStorage() {
//   let tasks = [];
//   const data = localStorage.getItem("tasks");
//   if (data) {
//     tasks = JSON.parse(data);
//   }
//   return tasks;
// }

// // =====set data on local storage=====///
// function setDataOnLocalStorage(task) {
//   localStorage.setItem("tasks", JSON.stringify(task));
// }
