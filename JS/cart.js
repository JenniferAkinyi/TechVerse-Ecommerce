document.addEventListener("DOMContentLoaded", () => {
    const createUser = async (user) => {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const newUser = await response.json();
        console.log("The user has been created", newUser);
      } catch (error) {
        console.log(error);
      }
    };
  
    const registrationForm = document.getElementById("register-form");
    if (registrationForm) {
      registrationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        createUser({ name, email, role: "user", password });
        registrationForm.reset();
      });
    } else {
      console.error("Registration form not found");
    }
  
    const getUser = async ({ email, password }) => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();
  
        const user = users.find((u) => u.email === email && u.password === password);
  
        if (user) {
          console.log("Login successful!", user);
          window.location.href = "user.html";
        } else {
          console.log("Invalid email or password");
          alert("Invalid email or password");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        getUser({ email, password });
        loginForm.reset();
      });
    } else {
      console.error("Login form not found");
    }
  });
  