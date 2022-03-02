//selecting elements
let form = document.getElementById("form");
let tbody = document.getElementById("tbody");
let date = document.getElementById("date");
let today = new Date().toISOString().slice(0, 10);
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
    }
  });
  formData.status = "incomplete";
  console.log(formData);
  showData(formData);
  this.reset();
});

//show data in Ui

function showData({ name, priority, status, date }) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <tr>
        <td>0</td>
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
    </tr>
    `;
  tbody.appendChild(tr);
}
