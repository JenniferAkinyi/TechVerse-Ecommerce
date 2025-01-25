document.addEventListener("DOMContentLoaded", () => {
  const messageElement = document.getElementById("message");

  const displayMessage = (message, isError = false) => {
    messageElement.textContent = message;
    messageElement.style.display = "block";
    if (isError) {
      messageElement.classList.remove("success");
      messageElement.classList.add("error");
    } else {
      messageElement.classList.remove("error");
      messageElement.classList.add("success");
    }
  };

  const getUser = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      const admin = users.find(
        (u) => u.email === email && u.password === password && u.role === "admin"
      );
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (admin) {
        console.log("Login successful!", admin);
        localStorage.setItem('loggedInUser', JSON.stringify(admin));
        displayMessage("Login successful! Redirecting to admin page.");
        setTimeout(() => {
          window.location.href = "admin.html";
        }, 2000);
      } else if (user) {
        console.log("Login successful!", user);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        displayMessage("Login successful! Redirecting to user page.");
        setTimeout(() => {
          window.location.href = "user.html";
        }, 2000);
      } else {
        console.log("Invalid email or password");
        displayMessage("Invalid email or password", true);
      }
    } catch (error) {
      console.log(error);
      displayMessage("Failed to log in. Please try again.", true);
    }
  };

  function checkForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll("input");
    for (const input of inputs) {
      if (input.value.trim() === "") {
        displayMessage("Please fill in all fields", true);
        return false;
      }
    }
    return true;
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (checkForm("login-form")) {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        getUser({ email, password });
        loginForm.reset();
      }
    });
  }
});
