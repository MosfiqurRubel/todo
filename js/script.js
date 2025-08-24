// select elements & assign them to variables
let form = document.querySelector("form");
let newTask = document.querySelector("#new-task");
let incompleteUL = document.querySelector("#items");
let completeUL = document.querySelector(".complete-list ul");

// functions
let createTask = (task) => {
  let li = document.createElement("li");
  let checkbox = document.createElement("input");
  let label = document.createElement("label");
  label.innerText = task;
  checkbox.type = "checkbox";

  li.classList.add(
    "item",
    "inline-flex",
    "items-center",
    "gap-x-2",
    "py-3",
    "px-4",
    "text-sm",
    "font-medium",
    "bg-white",
    "border",
    "border-gray-200",
    "text-gray-800",
    "-mt-px",
    "first:rounded-t-lg",
    "first:mt-0",
    "last:rounded-b-lg"
  );
  li.appendChild(checkbox);
  li.appendChild(label);
  return li;
};

let addTask = (event) => {
  event.preventDefault();
  let li = createTask(newTask.value);
  incompleteUL.appendChild(li);
  console.log(incompleteUL);
  newTask.value = "";
  // Bind the new list item to the incomplete list
  bindIncompleteItems(li, completeTask);
};

let completeTask = function () {
  let listItem = this.parentNode;
  listItem.classList.add("justify-between");
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete";
  deleteBtn.classList.add(
    "text-sm",
    "bg-red-500",
    "hover:bg-red-600",
    "text-white",
    "py-0.5",
    "px-2",
    "cursor-pointer",
    "rounded-sm"
  );
  listItem.appendChild(deleteBtn);

  let checkbox = listItem.querySelector('input[type="checkbox"]');
  checkbox.remove();

  completeUL.appendChild(listItem);
  bindCompleteItems(listItem, deleteTask);
};

let deleteTask = function () {
  let li = this.parentNode;
  let ul = li.parentNode;
  ul.removeChild(li);
};

let bindIncompleteItems = (taskItem, checkboxClick) => {
  let checkbox = taskItem.querySelector('input[type="checkbox"]');
  checkbox.onchange = checkboxClick;
};

let bindCompleteItems = (taskItem, deleteButtonClick) => {
  let deleteButton = taskItem.querySelector(".delete");
  deleteButton.onclick = deleteButtonClick;
};

for (let i = 0; i < incompleteUL.children.length; i++) {
  bindIncompleteItems(incompleteUL.children[i], completeTask);
}

for (let i = 0; i < completeUL.children.length; i++) {
  bindCompleteItems(completeUL.children[i], deleteTask);
}

form.addEventListener("submit", addTask);
