const loadInitialTemplate = () => {
  const template = `
    <h1>To Do List</h1>
    <form id="task-form">
    <div>
    <label>Task</label>
    <input name="task">
    </div>
    <div>
    <label>State</label>
    <select name="state">
    <option value="pendiente">Pendiente</option>
    <option value="proceso">Proceso</option>
    <option value="terminado">Terminado</option>
    </select>
    </div>
    <button type="submit">Enviar</button>
    </form>
    <ul id="task-state"> </ul>   

    `;
  const body = document.getElementsByTagName("body")[0];
  body.innerHTML = template;
};

const getTask = async () => {
  const response = await fetch("/tasks");
  const tasks = await response.json();

  const template = (task) => `
  <li>${task.task} ${task.state} <button id="${task._id}">Eliminar </button> </li>
  `;
  const formList = document.getElementById("task-state");
  formList.innerHTML = tasks.map((task) => template(task)).join(" ");
  tasks.forEach((task) => {
    const taskNode = document.querySelector(`[data-id="${task._id}"]`);
    taskNode.onclick = async (e) => {
      await fetch(`/tasks/${task._id}`, {
        method: "DELETE",
      });

      taskNode.parentNode.remove();
    };
    taskNode.addEventListener("click", (_) => {
      location.reload();
      alert("Eliminado");
    });
  });
};

const addEventListener = () => {
  const taskForm = document.getElementById("task-form");
  taskForm.onsubmit = async (e) => {
    const formTask = new FormData(taskForm);
    const data = Object.fromEntries(formTask.entries());
    await fetch("/tasks", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    taskForm.reset();
  };
};

window.onload = () => {
  loadInitialTemplate();
  addEventListener();
  getTask();
};
