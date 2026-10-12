// Task list dataset with completion status
const tasks = [
    { id: 1, title: "Learn HTML", completed: false },
    { id: 2, title: "Practice CSS", completed: false },
    { id: 3, title: "Learn JavaScript", completed: false },
    { id: 4, title: "Build a project", completed: false }
];

// DOM elements
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const todayDate = document.getElementById("todayDate");
const addTaskForm = document.getElementById("addTaskForm");
const taskInput = document.getElementById("taskInput");

// Function to render tasks into the list
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;

        const statusLabel = task.completed ? "Completed" : "Pending";
        const statusClass = task.completed ? "status-completed" : "status-pending";

        li.innerHTML = `
            <div class="task-left" data-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-check" 
                    ${task.completed ? "checked" : ""} 
                    data-id="${task.id}"
                    aria-label="Toggle ${escapeHtml(task.title)}"
                >
                <span class="task-name">${escapeHtml(task.title)}</span>
            </div>
            <span class="status-badge ${statusClass}" data-id="${task.id}" title="Click to toggle status">
                ${statusLabel}
            </span>
        `;

        // Event listener: Toggle completion when clicking the checkbox
        const checkbox = li.querySelector(".task-check");
        checkbox.addEventListener("change", function (e) {
            e.stopPropagation();
            toggleTaskStatus(task.id);
        });

        // Event listener: Toggle completion when clicking the status badge
        const badge = li.querySelector(".status-badge");
        badge.addEventListener("click", function (e) {
            e.stopPropagation();
            toggleTaskStatus(task.id);
        });

        // Event listener: Clicking the task left area also toggles completion
        const taskLeft = li.querySelector(".task-left");
        taskLeft.addEventListener("click", function (e) {
            // Avoid double-firing if directly clicking checkbox
            if (e.target !== checkbox) {
                toggleTaskStatus(task.id);
            }
        });

        taskList.appendChild(li);
    });

    // Update total & completed counts
    updateTaskCount();
}

// Function to toggle a task between completed and pending
function toggleTaskStatus(id) {
    const task = tasks.find(function (t) {
        return t.id === id;
    });

    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// Function to update the task counter
function updateTaskCount() {
    if (taskCount) {
        const completedCount = tasks.filter(function (t) {
            return t.completed;
        }).length;
        taskCount.textContent = `${completedCount} of ${tasks.length} completed`;
    }
}

// Helper to escape HTML characters
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Display formatted date
function setDate() {
    if (todayDate) {
        const options = { weekday: "long", month: "short", day: "numeric" };
        const today = new Date().toLocaleDateString("en-US", options);
        todayDate.textContent = `Tasks for ${today}`;
    }
}

// Handle Add Task submission (validates non-empty title)
if (addTaskForm) {
    addTaskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = taskInput.value.trim();

        // Prevent empty or whitespace-only task titles
        if (!title) {
            taskInput.focus();
            return;
        }

        // Add new task with initial status as pending (completed: false)
        tasks.push({
            id: Date.now(),
            title: title,
            completed: false
        });

        // Re-render and clear input
        renderTasks();
        taskInput.value = "";
        taskInput.focus();
    });
}

// Initialize layout
setDate();
renderTasks();
