document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "http://localhost:3000/api";

  const loginSection = document.getElementById("login-section");
  const adminDashboard = document.getElementById("admin-dashboard");
  const taskManagement = document.getElementById("task-management");
  const userManagement = document.getElementById("user-management");
  const userDashboard = document.getElementById("user-dashboard");

  const tasksContainer = document.getElementById("tasks-container");
  const usersContainer = document.getElementById("users-container");

  // Login
  document.getElementById("login-button").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre_usuario: username, contrasena: password }),
      });

      if (!response.ok) throw new Error("Credenciales incorrectas");

      const { usuario } = await response.json();
      loginSection.classList.add("hidden");

      if (usuario.rol.toLowerCase() === "admin") {
        adminDashboard.classList.remove("hidden");
      } else if (usuario.rol.toLowerCase() === "personal") {
        userDashboard.classList.remove("hidden");
        loadUserTasks(usuario.id);
        document.getElementById("user-name").textContent = usuario.nombreCompleto;
      } else {
        alert("Rol desconocido.");
      }
    } catch (error) {
      alert(error.message);
    }
  });

  // Funciones de administración de tareas
  window.goToTasks = (businessId) => {
    adminDashboard.classList.add("hidden");
    taskManagement.classList.remove("hidden");
    tasksContainer.innerHTML = "";

    document.getElementById("add-task-button").onclick = () => addTask(businessId);
  };

  function addTask(businessId) {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Escribe la tarea";
    taskItem.appendChild(input);

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "✔️";
    confirmButton.onclick = () => saveTask(input.value, businessId);
    taskItem.appendChild(confirmButton);

    tasksContainer.appendChild(taskItem);
  }

  async function saveTask(description, businessId) {
    try {
      const response = await fetch(`${BASE_URL}/tareas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion: description, negocioId: businessId }),
      });

      if (!response.ok) throw new Error("No se pudo guardar la tarea.");
      alert("Tarea guardada con éxito.");
    } catch (error) {
      alert(error.message);
    }
  }

  // Funciones de administración de usuarios
  window.goToUsers = () => {
    adminDashboard.classList.add("hidden");
    userManagement.classList.remove("hidden");
    usersContainer.innerHTML = "";

    document.getElementById("add-user-button").onclick = addUser;
  };

  function addUser() {
    const userItem = document.createElement("div");
    userItem.className = "user-item";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Nombre Completo";
    userItem.appendChild(nameInput);

    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.placeholder = "Nombre de Usuario";
    userItem.appendChild(usernameInput);

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Contraseña";
    userItem.appendChild(passwordInput);

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "✔️";
    confirmButton.onclick = async () => saveUser(nameInput.value, usernameInput.value, passwordInput.value);
    userItem.appendChild(confirmButton);

    usersContainer.appendChild(userItem);
  }

  async function saveUser(fullName, username, password) {
    try {
      const negocioId = document.getElementById("business-select").value;
      const response = await fetch(`${BASE_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreCompleto: fullName, nombreUsuario: username, contrasena: password, negocioId }),
      });

      if (!response.ok) throw new Error("No se pudo guardar el usuario.");
      alert("Usuario guardado exitosamente.");
    } catch (error) {
      alert(error.message);
    }
  }

  // Navegación
  window.goBack = () => {
    taskManagement.classList.add("hidden");
    userManagement.classList.add("hidden");
    adminDashboard.classList.remove("hidden");
  };

  // Carga de tareas del usuario
  async function loadUserTasks(userId) {
    try {
      const response = await fetch(`${BASE_URL}/tareas/${userId}`);
      if (!response.ok) throw new Error("No se pudieron cargar las tareas.");

      const tasks = await response.json();
      renderTasks(tasks);
    } catch (error) {
      alert(error.message);
    }
  }

  function renderTasks(tasks) {
    const pendingTasks = document.getElementById("pending-tasks");
    const completedTasks = document.getElementById("completed-tasks");

    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    tasks.forEach(task => {
      const taskItem = document.createElement("div");
      taskItem.className = "task-item";
      taskItem.textContent = task.descripcion;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completada;
      checkbox.disabled = task.completada;
      taskItem.prepend(checkbox);

      if (task.completada) {
        completedTasks.appendChild(taskItem);
      } else {
        pendingTasks.appendChild(taskItem);
      }
    });
  }

  // Logout
  window.logout = () => {
    location.reload();
  };
});
