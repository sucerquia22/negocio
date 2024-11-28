const BASE_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("login-section");
  const userDashboard = document.getElementById("user-dashboard");
  const adminDashboard = document.getElementById("admin-dashboard");
  const progressBar = document.getElementById("progress-bar-filled");
  const pendingTasksList = document.getElementById("pending-tasks");
  const completedTasksList = document.getElementById("completed-tasks");

  document.getElementById("login-button").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Credenciales incorrectas");

      const { user, tasks } = await response.json();
      loginSection.classList.add("hidden");

      if (user.role === "Admin") {
        adminDashboard.classList.remove("hidden");
      } else if (user.role === "Personal") {
        userDashboard.classList.remove("hidden");
        renderUserDashboard(user, tasks);
      }
    } catch (error) {
      alert(error.message);
    }
  });

  function renderUserDashboard(user, tasks) {
    document.getElementById("user-name").textContent = user.name;
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    const completed = tasks.filter(task => task.completed);
    const pending = tasks.filter(task => !task.completed);

    completed.forEach(task => {
      const item = document.createElement("div");
      item.textContent = task.description;
      completedTasksList.appendChild(item);
    });

    pending.forEach(task => {
      const item = document.createElement("div");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", () => completeTask(task));

      item.textContent = task.description;
      item.prepend(checkbox);
      pendingTasksList.appendChild(item);
    });

    updateProgress(completed.length, tasks.length);
  }

  async function completeTask(task) {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${task.id}/complete`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error("No se pudo completar la tarea");

      task.completed = true;
      renderUserDashboard(task.user, [...pendingTasksList.children, ...completedTasksList.children]);
    } catch (error) {
      alert(error.message);
    }
  }

  function updateProgress(completed, total) {
    const percentage = (completed / total) * 100;
    progressBar.style.width = `${percentage}%`;
    document.getElementById("progress-percent").textContent = `${Math.round(percentage)}%`;
  }
});
