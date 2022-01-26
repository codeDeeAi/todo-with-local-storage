function toggleModal() {
    var modal = document.getElementById("newTaskModal");
    if (modal.classList.contains("hidden"))
        return modal.classList.remove("hidden");
    return modal.classList.add("hidden");
}

function getTasks() {
    return localStorage.hasOwnProperty("tasks") ?
        JSON.parse(localStorage.getItem("tasks")) :
        [];
}

function loadTasks() {
    var tasks = getTasks();
    // load tasks on page
    let data_table = document.getElementById("table_body");

    let html = "";

    for (let index = 0; index < tasks.length; index++) {
        let element = tasks[index];
        let each_row = ` <tr>
        <td class="px-6 py-4 whitespace-nowrap"> ${element.task}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
          >
            ${element.date}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
        <button
        type="button"
        onclick="deleteTask(${index})"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Delete
      </button>
        </td>
      </tr> `;

        html += each_row;
    }
    return (data_table.innerHTML = html);
}

function addTask() {
    var tasks = getTasks();

    var date_field = document.getElementById("date_field").value;
    var task_field = document.getElementById("task_field").value;
    if (date_field.trim() == "" || task_field.trim() == "")
        return window.alert("Date or task field cannot be empty !");
    let new_task = {
        date: date_field,
        task: task_field,
    };

    tasks.push(new_task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    toggleModal();

    loadTasks();
}

function deleteTask(task_index) {
    if (!confirm("Are you sure you want to delete this task ?")) return;
    var tasks = getTasks();
    tasks.splice(task_index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

window.onload = loadTasks();