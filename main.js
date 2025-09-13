const addNewTask = document.getElementById("new-task");
const TaskContainer = document.getElementById("task-list");

addNewTask.addEventListener("click", () => {
  const task = document.createElement("li");
  const message = document.getElementById("task-input").value;
  task.className = "task";

  task.innerHTML = `
    <p>${message}</p>
    <button class="edit"><img src="" alt="Edit"></button>
    <button class="delete"><img src="" alt="Delete"></button>
    <button class="complete"><img src="" alt="Complete"></button>`;

  if (message === "") {
    return;
  } else {
    TaskContainer.appendChild(task);
  }

  const deleteTask = task.querySelector(".delete");

  deleteTask.addEventListener("click", () => {
    task.remove();
  });

  const editTask = task.querySelector(".edit");

  editTask.addEventListener("click", () => { 
    
  });

  const completeTask = task.querySelector(".complete");
    completeTask.addEventListener("click", () => {
        //put task to completed section
        task.remove();
    });
});
