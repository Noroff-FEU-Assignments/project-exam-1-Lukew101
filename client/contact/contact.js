const submitMessage = document.querySelector(".submit-message");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const inputs = form.querySelectorAll("input, textarea");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    form.querySelectorAll(".error-message").forEach(function (errorDiv) {
      errorDiv.remove();
    });

    let allInputsValid = true;

    inputs.forEach(function (input) {
      let errorMessage = "";

      // name: should be more than 5 characters
      if (input.name === "name") {
        if (!checkWordLength(input.value, 5)) {
          errorMessage = "Name must be at least 5 characters";
          allInputsValid = false;
        }
      }

      // email: should be a valid email address
      if (input.name === "email") {
        if (!validateEmail(input.value)) {
          errorMessage = "Please enter a valid email address";
          allInputsValid = false;
        }
      }

      // subject: should be more than 15 characters
      if (input.name === "subject") {
        if (!checkWordLength(input.value, 15)) {
          errorMessage = "Subject must be at least 15 characters";
          allInputsValid = false;
        }
      }

      // message: should be more than 25 characters
      if (input.name === "message") {
        if (!checkWordLength(input.value, 25)) {
          errorMessage = "Message must be at least 25 characters";
          allInputsValid = false;
        }
      }

      // If there's an error message, create and insert it
      if (errorMessage) {
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("error-message");
        errorDiv.textContent = errorMessage;
        input.after(errorDiv);
      }
    });

    // Prevent form submission if there are invalid inputs
    if (!allInputsValid) {
      event.preventDefault();
      displayMessage("Invalid submission. Please correct and try again.");
      removeMessage();
    } else {
      form.reset();
      displayMessage("Form submitted successfully!");
      removeMessage();
    }
  });
});

function displayMessage(message) {
  submitMessage.style.display = "block";
  submitMessage.innerHTML = message;
}

function removeMessage() {
  setTimeout(function () {
    submitMessage.style.display = "none";
  }, 3000);
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const emailMatch = regEx.test(email);
  return emailMatch;
}

function checkWordLength(input, requiredLength) {
  if (input.trim().length > requiredLength) {
    return true;
  } else {
    return false;
  }
}
