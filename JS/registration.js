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
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } catch (error) {
        console.log(error);
        displayMessage("Registration failed. Please try again.", true);
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
});