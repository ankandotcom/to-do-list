const inputField = document.querySelector("#newTask input");
const addBtn = document.querySelector("#newTask button");
const tasksContainer = document.querySelector("#tasks");

// Function to add a new task
function addTask() {
    const taskValue = inputField.value.trim();

    if (taskValue.length == 0) {
        alert("Please Enter a Task");
        return;
    }

    // Add the task HTML
    tasksContainer.innerHTML += `
        <div class="task flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer group">
            <span class="taskname text-slate-700 font-medium">
                ${taskValue}
            </span>
            <button class="delete bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-md flex items-center justify-center transition-all">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `;

    // Clear input
    inputField.value = "";

    // Refresh Delete Listeners
    let current_tasks = document.querySelectorAll(".delete");
    for (let i = 0; i < current_tasks.length; i++) {
        current_tasks[i].onclick = function() {
            this.parentNode.remove();
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

// Trigger on Button Click
addBtn.onclick = addTask;

// Trigger on "Enter" Key
inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevents page reload if inside a form
        addTask();
    }
});