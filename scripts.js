const taskList = document.querySelector(".taskList");
const taskTempalte = document.querySelector("#task-template").innerHTML;

for (let i = 2; localStorage.getItem("task" + i) != null; i++) {
  const task = localStorage.getItem("task" + i);
  submitTask(task);
}

function toggleModal(action) {
  const modal = document.querySelector(".modal-container");
  if (action == "show") {
    modal.classList.remove("hidden");
    const task = (document.querySelector(".taskName").value = "");
  } else if (action == "hide") {
    modal.classList.add("hidden");
  }
}

function submitTask(task = null) {
  task = task == null ? document.querySelector(".taskName").value : task;
  let newTask = taskTempalte;
  const taskNum = taskList.childElementCount+1
  newTask = newTask.replaceAll("%%id%%", "task" + taskNum );
  newTask = newTask.replaceAll("%%value%%", task);
  newTask = document.createRange().createContextualFragment(newTask);
  taskList.appendChild(newTask);
  localStorage.setItem("task" + taskNum     , task);
  toggleModal("hide");
}

function searchTask() {
  const searchTask = document.querySelector(".searchTask").value.toLowerCase();
  const pastTaskElements = document.querySelectorAll(".task input");
  for (const task of pastTaskElements) {
    if (task.value.toLowerCase().search(searchTask) < 0 && searchTask != 0) {
      task.classList.add("hidden");
    } else {
      task.classList.remove("hidden");
    }
  }
}   

function taskToggle(e) {
  if (!e.hasAttribute("readonly")) {
    return;
  }
  e.classList.toggle("bg-gradient-to-r");
  e.classList.toggle("text-white");
  e.classList.toggle("font-bold");
}

function taskEdit(e) {
  const taskId = e.getAttribute("data-target");
  const inputTask = document.querySelector("#" + taskId + " input");
  if (inputTask.classList.contains("bg-gradient-to-r")) {
    taskToggle(inputTask);
  }
  inputTask.removeAttribute("readonly");
  inputTask.classList.add("outline");
  document
    .querySelector("#" + taskId + " .acceptTask")
    .classList.remove("hidden");
}

function acceptTask(e) {
  const taskId = e.getAttribute("data-target");
  const taskInput = document.querySelector("#" + taskId + " input");
  localStorage.setItem(taskId, taskInput.value);
  taskInput.setAttribute("readonly", "true");
  taskInput.classList.remove("outline");
  document.querySelector("#" + taskId + " .acceptTask").classList.add("hidden");
}

function taskDel(e) {
  const taskId = e.getAttribute("data-target");
  document.getElementById(taskId).remove();
  localStorage.removeItem(taskId);
}

document.querySelector(".addTask").addEventListener("click", () => {
  toggleModal("show");
});

document.querySelector(".submitTask").addEventListener("click", submitTask);

document.querySelector(".taskName").addEventListener("keydown", (event) => {
  if (event.which == 13) {
    submitTask();
  }
});

function enterKey(event) {
    
  if (event.which == 13) {
    const taskid = event.target.getAttribute("data-target");
    const acceptBtn = document.querySelector("#" + taskid + " .acceptTask");
    acceptTask(acceptBtn);
  }
};
document.querySelector(".close").addEventListener("click", () => {
  toggleModal("hide");
});

document.querySelector(".searchTask").addEventListener("keyup", searchTask);
