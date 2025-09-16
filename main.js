const addNewTask = document.getElementById("new-task");
const TaskContainer = document.getElementById("task-list");
const inputTask = document.getElementById("task-input");

//  Add New Task
//-----------------------------------------------------
function AddNewTask() {
  const task = document.createElement("li");
  let message = document.getElementById("task-input").value;
  task.classList.add("task");

  task.innerHTML = `
  <p class="task-name">${message}</p>
  <button class="edit"><img src="" alt="Edit"></button>
  <button class="delete"><img src="" alt="Delete"></button>
  <button class="complete"><img src="" alt="Complete"></button>`;
  const completeTaskBtn = task.querySelector(".complete");
  const editTaskBtn = task.querySelector(".edit");
  const deleteTaskBtn = task.querySelector(".delete");
  const taskName = task.querySelector(".task-name");

  if (message === "") return;
  else {
    TaskContainer.appendChild(task);
    const inputMessage = document.getElementById("task-input");
    inputMessage.value = "";
  }

  //  Delete Task
  //-----------------------------------------------------

  deleteTaskBtn.addEventListener("click", () => {
    task.remove();
  });

  //  Edit Task
  //-----------------------------------------------------

  editTaskBtn.addEventListener("click", () => {
    taskName.remove();
    editTaskBtn.remove();
    deleteTaskBtn.remove();
    completeTaskBtn.remove();

    task.innerHTML = `
    <input type="text" class="edit-input">
    <button id="accept-changes"><img src="" alt="Accept"></button>
    <button id="deny-changes"><img src="" alt="Deny"></button>`;

    const editInput = document.querySelector(".edit-input");
    const acceptChangesBtn = document.querySelector("#accept-changes");
    const denyChangesBtn = document.querySelector("#deny-changes");

    function AcceptChanges() {
      editInput.remove();
      acceptChangesBtn.remove();
      denyChangesBtn.remove();
      const newMessage = document.createElement("p");
      newMessage.classList.add("task-name");
      newMessage.textContent = editInput.value;
      task.prepend(newMessage);
      task.appendChild(editTaskBtn);
      task.appendChild(deleteTaskBtn);
      task.appendChild(completeTaskBtn);
      message = editInput.value;
    }

    function DenyChanges() {
      editInput.remove();
      acceptChangesBtn.remove();
      denyChangesBtn.remove();
      task.prepend(message);
      task.appendChild(editTaskBtn);
      task.appendChild(deleteTaskBtn);
      task.appendChild(completeTaskBtn);
    }

    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") AcceptChanges();
      else if (editInput.value === "") return;
    });

    acceptChangesBtn.addEventListener("click", () => {
      AcceptChanges();
    });
    denyChangesBtn.addEventListener("click", () => {
      DenyChanges();
    });
  });
  //  Complete Task
  //-----------------------------------------------------
  const completedTasksList = document.querySelector(".completed-tasks-list");
  completeTaskBtn.addEventListener("click", () => {
    task.remove();
    const completedTask = document.createElement("li");
    completedTask.classList.add("task-completed");
    completedTask.innerHTML = `
    <p class="task-name">${message}</p>
    <button class="delete-completed-task"><img src="" alt="Delete"></button>
    <button class="bring-back"><img src="" alt="Bring Back"></button>`;
    completedTasksList.appendChild(completedTask);  
    
    const deleteCompleted = completedTask.querySelector(".delete-completed-task");
    const bringBack = completedTask.querySelector(".bring-back");

    bringBack.addEventListener("click", () => {
      completedTask.remove();
      TaskContainer.appendChild(task);
      task.appendChild(task.innerHTML)      
    });

    deleteCompleted.addEventListener("click", () => {
      completedTask.remove();
    });
  });
} 

addNewTask.addEventListener("click", () => {AddNewTask();})
inputTask.addEventListener("keypress", (e) => {if (e.key === "Enter") AddNewTask();})
