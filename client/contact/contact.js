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

      switch (input.name) {
        case "name":
          if (!checkWordLength(input.value, 5)) {
            errorMessage = "Must be at least 6 characters";
            allInputsValid = false;
          }
          break;

        case "email":
          if (!validateEmail(input.value)) {
            errorMessage = "Please enter a valid email address";
            allInputsValid = false;
          }
          break;

        case "subject":
          if (!checkWordLength(input.value, 15)) {
            errorMessage = "Must be at least 16 characters";
            allInputsValid = false;
          }
          break;

        case "message":
          if (!checkWordLength(input.value, 25)) {
            errorMessage = "Must be at least 26 characters";
            allInputsValid = false;
          }
          break;
      }

      if (errorMessage) {
        const errorDiv = document.createElement("p");
        errorDiv.classList.add("error-message");
        errorDiv.textContent = errorMessage;
        input.after(errorDiv);
      }
    });

    if (!allInputsValid) {
      event.preventDefault();
      displayMessage("Invalid. Please correct and try again.", false);
      removeMessage();
    } else {
      form.reset();
      displayMessage("Form submitted successfully!", true);
      removeMessage();
    }
  });
});

function displayMessage(message, success) {
  submitMessage.classList.remove("remove-submit-message");
  submitMessage.innerHTML = message;
  submitMessage.classList.add("submit-message");
  success
    ? (submitMessage.style.color = "green")
    : (submitMessage.style.color = "red");
}

function removeMessage() {
  setTimeout(function () {
    submitMessage.classList.add("remove-submit-message");
  }, 5000);
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
