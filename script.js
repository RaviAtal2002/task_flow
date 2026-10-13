const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// ==============================
// LOAD TASKS
// ==============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ==============================
// CREATE THEME BUTTON
// ==============================

// We create the button using JavaScript,
// so you don't need to change HTML.

const themeButton = document.createElement("button");

themeButton.className = "theme-button";

themeButton.textContent = "🌙 Dark Mode";

// Put button at the top of the todo container

const container = document.querySelector(".todo-container");

container.insertBefore(themeButton, container.firstChild);

// ==============================
// LOAD SAVED THEME
// ==============================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");

    themeButton.textContent = "☀️ Light Mode";
}

// ==============================
// CHANGE THEME
// ==============================

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "☀️ Light Mode";

        localStorage.setItem("theme", "dark");
    } else {
        themeButton.textContent = "🌙 Dark Mode";

        localStorage.setItem("theme", "light");
    }
});

// ==============================
// ADD TASK
// ==============================

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");

        return;
    }

    const task = {
        id: Date.now(),

        text: text,

        completed: false,

        liked: false,
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";

    taskInput.focus();
}

// ==============================
// DISPLAY TASKS
// ==============================

function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    tasks.forEach(function (task) {
        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleComplete(${task.id})"
            >

            <span class="task-text">
                ${task.text}
            </span>

            <button
                class="like-btn ${task.liked ? "liked" : ""}"
                onclick="toggleLike(${task.id})"
            >
                ${task.liked ? "♥" : "♡"}
            </button>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})"
            >
                Delete
            </button>

        `;

        taskList.appendChild(li);
    });

    updateStats();
}

// ==============================
// COMPLETE TASK
// ==============================

function toggleComplete(id) {
    tasks = tasks.map(function (task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();

    renderTasks();
}

// ==============================
// LIKE TASK
// ==============================

function toggleLike(id) {
    tasks = tasks.map(function (task) {
        if (task.id === id) {
            task.liked = !task.liked;
        }

        return task;
    });

    saveTasks();

    renderTasks();
}

// ==============================
// DELETE TASK
// ==============================

function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();

    renderTasks();
}

// ==============================
// UPDATE STATS
// ==============================

function updateStats() {
    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;
}

// ==============================
// SAVE TASKS
// ==============================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==============================
// BUTTON EVENTS
// ==============================

addBtn.addEventListener("click", addTask);

// ENTER KEY

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// ==============================
// START APP
// ==============================

renderTasks();
