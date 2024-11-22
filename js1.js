document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");

  const columns = {
    pending: document.querySelector("#pending .tasks"),
    inProgress: document.querySelector("#inProgress .tasks"),
    completed: document.querySelector("#completed .tasks"),
  };

  const updateTaskCount = () => {
    document.getElementById("pendingCount").textContent =
      columns.pending.childElementCount;
    document.getElementById("inProgressCount").textContent =
      columns.inProgress.childElementCount;
    document.getElementById("completedCount").textContent =
      columns.completed.childElementCount;
  };

  const createTask = (taskText) => {
    const task = document.createElement("div");
    task.className = "task";
    task.textContent = taskText;

    // Botón de basura
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "🗑️";
    deleteButton.onclick = () => {
      task.remove();
      updateTaskCount();
    };

    task.appendChild(deleteButton);

    // Hacer la tarea arrastrable
    task.draggable = true;
    task.ondragstart = (e) => {
      e.dataTransfer.setData("text/plain", task.outerHTML);
      task.remove();
      updateTaskCount();
    };

    return task;
  };

  Object.values(columns).forEach((column) => {
    column.ondragover = (e) => e.preventDefault();
    column.ondrop = (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("text/plain");
      column.innerHTML += data;
      updateTaskCount();
    };
  });

  addTaskButton.onclick = () => {
    if (taskInput.value.trim()) {
      columns.pending.appendChild(createTask(taskInput.value.trim()));
      taskInput.value = "";
      updateTaskCount();
    }
  };

  // Cambiar el color de fondo
  document.querySelectorAll(".theme").forEach((btn) =>
    btn.addEventListener("click", () => {
      const color = btn.getAttribute("data-color");
      document.body.style.backgroundColor = color;
    })
  );
});
