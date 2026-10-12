// Task list dataset
const tasks = [
    { id: 1, title: "Learn HTML", category: "Basics" },
    { id: 2, title: "Practice CSS", category: "Styling" },
    { id: 3, title: "Learn JavaScript", category: "Logic" },
    { id: 4, title: "Build a project", category: "Practice" }
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
        li.className = "task-item";

        li.innerHTML = `
            <div class="task-left">
                <span class="task-dot"></span>
                <span class="task-name">${escapeHtml(task.title)}</span>
            </div>
            <span class="task-category">${escapeHtml(task.category || "Task")}</span>
        `;

        taskList.appendChild(li);
    });

    // Update total count
    if (taskCount) {
        taskCount.textContent = `Total: ${tasks.length} tasks`;
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

        // Add new task to the list
        tasks.push({
            id: Date.now(),
            title: title,
            category: "New"
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
