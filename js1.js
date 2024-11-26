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
      e.dataTransfer.setData("text/plain", ""); // Necesario para permitir el arrastre
      e.dataTransfer.setData("taskId", task.dataset.id);
      e.dataTransfer.effectAllowed = "move";
      e.target.classList.add("dragging");
    };

    task.ondragend = (e) => {
      e.target.classList.remove("dragging");
    };

    return task;
  };

  Object.values(columns).forEach((column) => {
    column.ondragover = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    };

    column.ondrop = (e) => {
      e.preventDefault();
      const draggingTask = document.querySelector(".dragging");
      if (draggingTask) {
        column.insertBefore(draggingTask, column.firstChild);
        updateTaskCount();
      }
    };
  });

  addTaskButton.onclick = () => {
    if (taskInput.value.trim()) {
      const newTask = createTask(taskInput.value.trim());
      columns.pending.insertBefore(newTask, columns.pending.firstChild);
      taskInput.value = "";
      updateTaskCount();
    }
  };

  document.querySelectorAll(".theme").forEach((btn) =>
    btn.addEventListener("click", () => {
      const color = btn.getAttribute("data-color");
      document.body.style.backgroundColor = color;
    })
  );
});
