const addNewTask = document.getElementById("new-task");
const TaskContainer = document.getElementById("task-list");

//  Add New Task
//-----------------------------------------------------
addNewTask.addEventListener("click", () => {
  const task = document.createElement("li");
  const message = document.getElementById("task-input").value;
  task.className = "task";

  task.innerHTML = `
    <p class="task-name">${message}</p>
    <button class="edit"><img src="" alt="Edit"></button>
    <button class="delete"><img src="" alt="Delete"></button>
    <button class="complete"><img src="" alt="Complete"></button>`;

  if (message === "") return;
  else{
    TaskContainer.appendChild(task);
    const inputMessage = document.getElementById("task-input");
    inputMessage.value = "";
  } 
    
  //  Delete Task
  //-----------------------------------------------------
  const deleteTask = task.querySelector(".delete");

  deleteTask.addEventListener("click", () => {
    task.remove();
  });

  //  Edit Task
  //-----------------------------------------------------
  const editTask = task.querySelector(".edit");
  const taskName = task.querySelector(".task-name");

  editTask.addEventListener("click", () => {
    taskName.remove();
    editTask.remove();
    deleteTask.remove()
    completeTask.remove();

    const editInput = document.createElement("input");
    editInput.value = message;
    editInput.type = "text";
    task.prepend(editInput);
    
    task.innerHTML = `
    <button id="accept-changes"><img src="" alt="Accept"></button>
    <button id="deny-changes"><img src="" alt="Deny"></button>`;

    const acceptChanges = document.querySelector("#accept-changes");
    const denyChanges = document.querySelector("#deny-changes");
    
    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        editInput.remove();
        const newMessage = document.createElement("p");
        newMessage.className = "task-name";

        newMessage.textContent = editInput.value;
        task.prepend(newMessage);
      } 

      else if (editInput.value === "") return;
    });
});

  //  Complete Task
  //-----------------------------------------------------
  const completeTask = task.querySelector(".complete");
  completeTask.addEventListener("click", () => {
    //put task to completed section
    task.remove();
  });
});
