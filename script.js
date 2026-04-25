let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function addTask() {
  let text = document.getElementById("taskInput").value;
  let date = document.getElementById("dueDate").value;

  if (text === "") return;

  tasks.push({
    text: text,
    date: date,
    completed: false
  });

  saveTasks();
  showTasks();
}

function showTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  filtered.forEach((task, index) => {
    list.innerHTML += `
      <li class="${task.completed ? 'completed' : ''}">
        <span onclick="toggleTask(${index})">
          ${task.text} (${task.date || 'No date'})
        </span>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </li>
    `;
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  showTasks();
}

function editTask(index) {
  let newTask = prompt("Edit task:", tasks[index].text);
  if (newTask) {
    tasks[index].text = newTask;
    saveTasks();
    showTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  showTasks();
}

function filterTasks(type) {
  currentFilter = type;
  showTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

showTasks();