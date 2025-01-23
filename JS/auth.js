document.addEventListener("DOMContentLoaded", () => {

  const messageElement = document.getElementById("message");
  const displayMessage = (message, isError = false) => {
    messageElement.textContent = message;
    messageElement.style.display = "block";
    messageElement.style.color = isError ? "red" : "green";
  };

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
      displayMessage("Registration successful! You can now log in.");
    } catch (error) {
      console.log(error);
      displayMessage("Registration failed. Please try again.", true);
    }
  };
  const registrationForm = document.getElementById("register-form");
  if (registrationForm) {
    registrationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if(checkForm("register-form")){
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        createUser({ name, email, role: "user", password });
        registrationForm.reset();
      }
    });
  } else {
    console.error("Registration form not found");
  }
  

  const getUser = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      const admin = users.find(
        (u) =>
          u.email === email && u.password === password && u.role === "admin"
      );
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (admin) {
        console.log("Login successful!", admin);
        localStorage.setItem('loggedInUser', JSON.stringify(admin));
        displayMessage("Login successful!");
        setTimeout(()=> {
          window.location.href = "admin.html";
        }, 1000)
      } else if (user) {
        console.log("Login successful!", user);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        displayMessage("Login successful!");
        fetchUserCart(user.id);
        setTimeout(()=> {
          window.location.href = "user.html";
        }, 1000)
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
    const inputs = form.querySelectorAll("input[required]");
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
      if(!checkForm("login-form")){
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        getUser({ email, password });
        loginForm.reset();
      }
    });
  } else {
    console.error("Login form not found");
  }
  const fetchUserCart = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/cart?userId=${userId}`);
      const userCart = await response.json();
      console.log(userCart)
      if (userCart.length > 0) {
        cart = userCart[0].products;
        updateCart(); 
      }
    } catch (error) {
      console.log("Failed to fetch cart:", error);
    }
  }
});
module.exports = { loginForm, createUser, getUser, fetchUserCart, checkForm };
