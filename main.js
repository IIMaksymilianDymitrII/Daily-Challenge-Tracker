const addNewTask = document.getElementById("new-task");
const TaskContainer = document.getElementById("task-list");
const inputTask = document.getElementById("task-input");

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
 
  task.innerHTML = `
  <p class="task-name">${message}</p>
  <nav class="task-nav-buttons">
    <button class="edit"><p>✍️️</p></button>
    <button class="delete"><p>🗑️</p></button>
    <button class="complete"><p>✅</p></button>
  </nav>
  `;

  const taskElements = [task.querySelector(".task-name"),
     task.querySelector(".edit"), 
     task.querySelector(".delete"), 
     task.querySelector(".complete")];

  if (message === "") return;
  else {
    TaskContainer.appendChild(task);
    const inputMessage = document.getElementById("task-input");
    inputMessage.value = "";
  }

  //  Delete Task
  //-----------------------------------------------------
  taskElements[2].addEventListener("click", () => task.remove());

  //  Edit Task
  //-----------------------------------------------------

  taskElements[1].addEventListener("click", () => {
    taskElements.forEach(element => element.remove());
    
    task.innerHTML = `
    <input type="text" class="edit-input" >
    <nav class="task-nav-buttons">
    <button id="accept-changes"><p>✅</p></button>
    <button id="deny-changes"><p>❎</p></button>
    </nav>
    `;

    const editTaskElement = [task.querySelector(".edit-input"),
      task.querySelector("#accept-changes"),
      task.querySelector("#deny-changes")];

    function AcceptChanges() {
      editTaskElement.forEach(element => element.remove());
      
      taskElements.forEach(element => task.appendChild(element));
      taskElements[0].textContent = editTaskElement[0].value;
      message = editTaskElement[0].value;
    }

    function DenyChanges() {
      editTaskElement.forEach(element => editTaskElement[element].remove());
      taskElements.forEach(element => task.appendChild(taskElements[element]));
    }

    editTaskElement[0].addEventListener("keypress", (e) => {
      if (e.key === "Enter") AcceptChanges();
      else if (message === "") return;
    });

    editTaskElement[1].addEventListener("click", () => AcceptChanges());
    editTaskElement[2].addEventListener("click", () => DenyChanges());
  });

  //  Complete Task
  //-----------------------------------------------------
  const completedTasksList = document.querySelector("#completed-tasks-list");
  taskElements[3].addEventListener("click", () => {
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

addNewTask.addEventListener("click", () => {AddNewTask();})
inputTask.addEventListener("keypress", (e) => {if (e.key === "Enter") AddNewTask();})
