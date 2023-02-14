const taskList = document.querySelector(".taskList");
const taskTempalte = document.querySelector("#task-template").innerHTML;
let tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks) {
  for (const taskId in tasks) {
    // console.log(tasks[taskId]);
    // const task = localStorage.getItem("task" + i);
    submitTask(tasks[taskId]);
  }
}
function toggleModal(action) {
  const modal = document.querySelector(".modal-container");
  if (action == "show") {
    modal.classList.remove("hidden");
    const taskInput = document.querySelector(".taskName");
    taskInput.value = "";
    taskInput.focus();
    document.querySelector('body').classList.add('overflow-hidden')
  } else if (action == "hide") {
    modal.classList.add("hidden");
    document.querySelector('body').classList.remove('overflow-hidden')
  }
}

function submitTask(task = null) {
  let newTask = taskTempalte;

  if (task == null) {
    const taskId = "task-" + taskList.childElementCount + 1;
    const taskInput = document.querySelector(".taskName").value;
    task = { id: taskId, title: taskInput };
  }
  newTask = newTask.replaceAll("%%id%%", task["id"]);
  newTask = newTask.replaceAll("%%value%%", task["title"]);
  newTask = document.createRange().createContextualFragment(newTask);
  taskList.appendChild(newTask);
  if (tasks) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  } else {
    tasks = {};
  }
  tasks[task["id"]] = task;
  localStorage.setItem("tasks", JSON.stringify(tasks));
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
  inputTask.focus();
}

function acceptTask(e) {
  const taskId = e.getAttribute("data-target");
  const taskInput = document.querySelector("#" + taskId + " input");
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[taskId] = { id: taskId, title: taskInput.value };
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.setAttribute("readonly", "true");
  taskInput.classList.remove("outline");
  document.querySelector("#" + taskId + " .acceptTask").classList.add("hidden");
}

function taskDel(e) {
  const taskId = e.getAttribute("data-target");
  document.getElementById(taskId).remove();
  tasks = JSON.parse(localStorage.getItem("tasks"));
  delete tasks[taskId];
  localStorage.setItem("tasks", JSON.stringify(tasks));
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
}
document.querySelector(".close").addEventListener("click", () => {
  toggleModal("hide");
});

document.querySelector(".searchTask").addEventListener("keyup", searchTask);

document.addEventListener("keyup", (event) => {
  
  if (event.ctrlKey && event.which == 13) {
    toggleModal("show");
  }else if(event.which == 27){
    toggleModal("hide");
  }
  
  
});
