function getRow(fieldName) {
  return document.querySelector('.form-row[data-field="' + fieldName + '"]');
}

function getInput(fieldName) {
  return document.getElementById(fieldName);
}

function getErrorSpan(fieldName) {
  var row = getRow(fieldName);
  return row ? row.querySelector(".field-error") : null;
}

function applyInputState(inputElement, state) {
  if(!inputElement) {
    return;
  }

  inputElement.classList.remove("fail", "success");
  if(state) {
    inputElement.classList.add(state);
  }
}

function applyErrorState(errorElement, message) {
  if(!errorElement) {
    return;
  }

  errorElement.textContent = message || "";
  if(message) {
    errorElement.classList.add("fail");
  } else {
    errorElement.classList.remove("fail");
  }
}

function setFieldState(fieldName, message) {
  var inputElement = getInput(fieldName);
  var errorElement = getErrorSpan(fieldName);

  applyInputState(inputElement, message ? "fail" : "success");
  applyErrorState(errorElement, message);
}

function readTrimmedValue(fieldName) {
  var inputElement = getInput(fieldName);
  return inputElement ? inputElement.value.trim() : "";
}

function collectValues(fieldNames) {
  return fieldNames.reduce(function(values, fieldName) {
    values[fieldName] = readTrimmedValue(fieldName);
    return values;
  }, {});
}

function validateField(fieldName, value) {
  if(fieldName === "displayName") {
    if(value.length === 0) {
      return "Display name is required.";
    } else if(value.length < 3) {
      return "Display name must be at least 3 characters.";
    } else if(!/^[A-Za-z0-9 '-]+$/.test(value)) {
      return "Display name contains invalid characters.";
    }
  } else if(fieldName === "username") {
    if(value.length === 0) {
      return "Username is required.";
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Username must be a valid email address.";
    }
  } else if(fieldName === "password") {
    if(value.length === 0) {
      return "Password is required.";
    } else if(value.length < 8) {
      return "Password must be at least 8 characters.";
    } else if(!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter.";
    } else if(!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter.";
    } else if(!/[0-9]/.test(value)) {
      return "Password must contain at least one number.";
    } else if(!/[!@#$%^&*]/.test(value)) {
      return "Password must contain at least one special character.";
    }
  }

  return "";
}

function validateAndApplyField(fieldName) {
  var message = validateField(fieldName, readTrimmedValue(fieldName));
  setFieldState(fieldName, message);
  return !message;
}

function validateFields(fieldNames) {
  var formIsValid = true;

  fieldNames.forEach(function(fieldName) {
    if(!validateAndApplyField(fieldName)) {
      formIsValid = false;
    }
  });

  return formIsValid;
}

function attachBlurValidation(fieldNames) {
  fieldNames.forEach(function(fieldName) {
    var inputElement = getInput(fieldName);

    if(!inputElement || inputElement.blurValidationAttached) {
      return;
    }

    inputElement.addEventListener("blur", function() {
      validateAndApplyField(fieldName);
    });
    inputElement.blurValidationAttached = true;
  });
}
