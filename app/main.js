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
  const response = await fetch("/tasks", {
    headers: {
      Authorization: localStorage.getItem("jwt"),
    },
  });
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
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      });

      taskNode.parentNode.remove();
    };
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
        Authorization: localStorage.getItem("jwt"),
      },
    });
    taskForm.reset();
    getTask();
  };
};

const checkLogin = () => {
  return localStorage.getItem("jwt");
};

const taskPage = () => {
  loadInitialTemplate();
  addEventListener();
  getTask();
};

const loadRegisterTemplate = () => {
  const template = `
<h1>Register</h1>
  <form id="register-form">
  <div>
  <label>Email</label>
  <input name="email">
  </div>
  <div>
  <label>Password</label>
  <input name="password">
  </div>
  <button type="submit">Enviar</button>
  </form>
  <a href="#" id="login">Iniciar sesion</a>
  <p id="error"> </p>
  
`;
  const body = document.getElementsByTagName("body")[0];
  body.innerHTML = template;
};
const addRegisterListener = () => {
  const registerForm = document.getElementById("register-form");
  registerForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch("/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.text();
    if (response.status >= 300) {
      const errorNode = document.getElementById("error");
      errorNode.innerHTML = responseData;
    } else {
      localStorage.setItem("jwt", `Bearer ${responseData}`);
      console.log(responseData);
      taskPage();
    }
  };
};
const gotoLoginListener = () => {
  const gotoLogin = document.getElementById("login");
  gotoLogin.onclick = (e) => {
    e.preventDefault();
    loginPage();
  };
};

const registerPage = () => {
  loadRegisterTemplate();
  addRegisterListener();
  gotoLoginListener();
};
const loginPage = () => {
  loadLoginTemplate();
  addLoginListener();
  gotoRegisterListener();
};
const loadLoginTemplate = () => {
  const template = `
  <h1>Login</h1>
    <form id="login-form">
    <div>
    <label>Email</label>
    <input name="email">
    </div>
    <div>
    <label>Password</label>
    <input name="password">
    </div>
    <button type="submit">Enviar</button>
    </form>
    <a href="#" id="register">Register</a>
    <p id="error"> </p>
    
  `;
  const body = document.getElementsByTagName("body")[0];
  body.innerHTML = template;
};
const gotoRegisterListener = () => {
  const gotoRegister = document.getElementById("register");
  gotoRegister.onclick = (e) => {
    e.preventDefault();
    registerPage();
  };
};
const addLoginListener = () => {
  const loginForm = document.getElementById("login-form");
  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.text();
    if (response.status >= 300) {
      const errorNode = document.getElementById("error");
      errorNode.innerHTML = responseData;
    } else {
      localStorage.setItem("jwt", `Bearer ${responseData}`);
      taskPage();
    }
  };
};

window.onload = () => {
  const isLoggedIn = checkLogin();
  if (isLoggedIn) {
    taskPage();
  } else {
    loginPage();
  }
};
