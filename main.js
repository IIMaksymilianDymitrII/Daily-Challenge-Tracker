const addNewTask = document.getElementById("new-task");
const TaskContainer = document.getElementById("task-list");
let inputTask = document.getElementById("task-input");

//  Add New Task
//-----------------------------------------------------
function AddNewTask() {
  const task = document.createElement("li");
  task.classList.add("task");
  let message = document.getElementById("task-input").value;

  // Local Storage
  // dosen't work don't know why

  /*
  const getTasks = () => JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
  const saveTasks = (tasks) => localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  */

  let taskElementInnerHTML = {
    task:`
    <p class="task-name">${message}</p>
    <nav class="task-nav-buttons">
      <button class="edit"><p>✍️️</p></button>
      <button class="delete"><p>🗑️</p></button>
      <button class="complete"><p>✅</p></button>
    </nav>
    `,
    edit:`
    <input type="text" class="task-input">
    <nav class="task-nav-buttons">
      <button id="accept-changes"><p>✅</p></button>
      <button id="deny-changes"><p>❎</p></button>
    </nav>
  `};

  task.innerHTML = taskElementInnerHTML.task;

  const taskElements = {
    name: task.querySelector(".task-name"),
    edit: task.querySelector(".edit"),
    del:task.querySelector(".delete"),
    complete:task.querySelector(".complete"),
    navBtns:task.querySelector(".task-nav-buttons"),
  };

  if (message === "") return;
  else {
    TaskContainer.appendChild(task);
    const inputMessage = document.getElementById("task-input");
    inputMessage.value = "";
  }

  //  Edit Task
  //-----------------------------------------------------
  const editTaskElement = {
    input:task.querySelector(".task-input"),
    navBtns:task.querySelector(".task-nav-buttons"),
    accept:task.querySelector("#accept-changes"),
    deny:task.querySelector("#deny-changes"),
  };
  
  function AcceptChanges() {
    if (editTaskElement.input.value === "") return;
    editTaskElement.forEach((element) => element.remove());
    message = editTaskElement.input.value;
    task.innerHTML = taskElementInnerHTML.task;
      
  };

  function DenyChanges() {
    editTaskElement.forEach((element) => editTaskElement[element].remove());
    taskElements.forEach((element) => task.appendChild(taskElements[element]));
  };

  taskElements.edit.addEventListener("click", () => {
    taskElements.forEach(element => {});
    task.innerHTML = taskElementInnerHTML.edit;
    editTaskElement.accept.addEventListener("keypress", (e) => {
      if (e.key === "Enter") AcceptChanges();
      else if (message === "") return;
    });

    editTaskElement.accept.addEventListener("click", () => AcceptChanges());
    editTaskElement.deny.addEventListener("click", () => DenyChanges());
  });

  //  Delete Task
  //-----------------------------------------------------
  taskElements.del.addEventListener("click", () => task.remove());

  //  Complete Task
  //-----------------------------------------------------
  const completedTasksList = document.querySelector("#completed-tasks-list");
  taskElements.complete.addEventListener("click", () => {
    task.remove();
    const completedTask = document.createElement("li");
    completedTask.classList.add("task-completed");

    completedTask.innerHTML = `
    <p class="task-name">${message}</p>
    <nav class="completed-nav-buttons">
      <button class="delete-completed-task"><p>🗑️</p></button>
      <button class="bring-back"><p>🔙</p></button>
    </nav>
    `;

    completedTasksList.appendChild(completedTask);

    const deleteCompleted = completedTask.querySelector(".delete-completed-task");
    const bringBack = completedTask.querySelector(".bring-back");

    bringBack.addEventListener("click", () => {
      completedTask.remove();
      TaskContainer.appendChild(task);
    });

    deleteCompleted.addEventListener("click", () => completedTask.remove());
  });
}

addNewTask.addEventListener("click", () => {AddNewTask();});
inputTask.addEventListener("keypress", (e) => {if (e.key === "Enter") AddNewTask();});
