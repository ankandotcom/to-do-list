const inputField = document.querySelector("#newTask input");
const addBtn = document.querySelector("#newTask button");
const tasksContainer = document.querySelector("#tasks");
const taskList = document.querySelector(".task-list");
const clearAllBtn = document.querySelector("#clearAllBtn");

// NEW: Function to manage the empty state message and Clear All button visibility
function checkEmptyState() {
    const totalTasks = taskList.querySelectorAll(".task").length;

    // 1. Handle "No tasks yet" placeholder message
    const emptyMessage = document.querySelector("#empty-state-msg");
    
    if (totalTasks === 0) {
        // If there are no tasks and the message doesn't exist yet, create it
        if (!emptyMessage) {
            const msg = document.createElement("p");
            msg.id = "empty-state-msg";
            msg.className = "text-center text-slate-400 text-sm mt-6 font-medium tracking-wide";
            msg.innerText = "No tasks yet. Add one!";
            taskList.appendChild(msg);
        }
    } else {
        // If tasks exist, remove the placeholder message if it's there
        if (emptyMessage) {
            emptyMessage.remove();
        }
    }

    // 2. Handle "Clear All" button visibility (from our previous step)
    if (totalTasks > 1) {
        clearAllBtn.classList.remove("hidden");
    } else {
        clearAllBtn.classList.add("hidden");
    }
}

// Function to add a new task
function addTask() {
    const taskValue = inputField.value.trim();

    if (taskValue.length == 0) {
        alert("Please Enter a Task");
        return;
    }

    // Add the task HTML
    taskList.innerHTML += `
        <div class="task flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer group mb-3">
            <span class="taskname text-slate-700 font-medium flex-1 py-1">
                ${taskValue}
            </span>
            <button class="delete bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-md flex items-center justify-center transition-all">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `;

    // Clear input
    inputField.value = "";

    // Run the check immediately after adding a task to clear the placeholder
    checkEmptyState();

    // Refresh Delete Listeners
    let current_tasks = document.querySelectorAll(".delete");
    for (let i = 0; i < current_tasks.length; i++) {
        current_tasks[i].onclick = function(e) {
            e.stopPropagation(); 
            this.parentNode.remove();
            checkEmptyState(); // Run check right after an individual task is removed
        };
    }

    // Refresh Toggle Listeners
    let tasks = document.querySelectorAll(".taskname");
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].onclick = function() {
            this.classList.toggle("line-through");
            this.classList.toggle("text-slate-400");
        };
    }
}

// Clear All execution handler
clearAllBtn.onclick = function() {
    taskList.innerHTML = "";
    checkEmptyState(); // Instantly clears everything and brings back the placeholder
};

// Trigger on Button Click
addBtn.onclick = addTask;

// Trigger on "Enter" Key
inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); 
        addTask();
    }
});

// INITIALIZATION: Run this when the page first loads so it displays "No tasks yet" from the start
checkEmptyState();