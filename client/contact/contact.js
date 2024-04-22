document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const inputs = form.querySelectorAll("input, textarea");

  form.addEventListener("submit", function (event) {
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
          allValid = false;
        }
      }

      // email: should be a valid email address
      if (input.name === "email") {
        if (!validateEmail(input.value)) {
          errorMessage = "Please enter a valid email address";
          allValid = false;
        }
      }

      // subject: should be more than 15 characters
      if (input.name === "subject") {
        if (!checkWordLength(input.value, 15)) {
          errorMessage = "Subject must be at least 15 characters";
          allValid = false;
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
    }
  });
});

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

function clearFormData() {
  nameInput.value = "";
  emailInput.value = "";
  subjectInput.value = "";
  addressInput.value = "";
  // setTimeout(function(){
  //     succMessage.style.display = "none";
  // }, 5000)
}
