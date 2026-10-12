// Task list dataset for basic layout
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

// Function to render tasks into the basic layout
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "task-item";

        li.innerHTML = `
            <div class="task-left">
                <span class="task-dot"></span>
                <span class="task-name">${task.title}</span>
            </div>
            <span class="task-category">${task.category}</span>
        `;

        taskList.appendChild(li);
    });

    // Update total count
    if (taskCount) {
        taskCount.textContent = `Total: ${tasks.length} tasks`;
    }
}

// Display formatted date
function setDate() {
    if (todayDate) {
        const options = { weekday: "long", month: "short", day: "numeric" };
        const today = new Date().toLocaleDateString("en-US", options);
        todayDate.textContent = `Tasks for ${today}`;
    }
}

// Initialize layout
setDate();
renderTasks();
