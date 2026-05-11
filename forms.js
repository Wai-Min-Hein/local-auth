function getRow(fieldName) {
  return document.querySelector('.form-row[data-field="' + fieldName + '"]');
}

function getInput(fieldName) {
  return document.getElementById(fieldName);
}

function getErrorSpan(fieldName) {
  var row = getRow(fieldName);
  return row ? row.querySelector('.field-error') : null;
}

function applyInputState(inputElement, state) {
  if (!inputElement) {
    return;
  }

  inputElement.classList.remove('fail', 'success');
  if (state) {
    inputElement.classList.add(state);
  }
}

function applyErrorState(errorElement, message) {
  if (!errorElement) {
    return;
  }

  errorElement.textContent = message || '';
  errorElement.classList.toggle('fail', Boolean(message));
}

function setFieldState(fieldName, message) {
  var inputElement = getInput(fieldName);
  var errorElement = getErrorSpan(fieldName);
  var state = message ? 'fail' : 'success';

  applyInputState(inputElement, state);
  applyErrorState(errorElement, message);
}

function clearFieldState(fieldName) {
  applyInputState(getInput(fieldName), null);
  applyErrorState(getErrorSpan(fieldName), '');
}

function readTrimmedValue(fieldName) {
  var inputElement = getInput(fieldName);
  return inputElement ? inputElement.value.trim() : '';
}

function collectValues(fieldNames) {
  return fieldNames.reduce(function(values, fieldName) {
    values[fieldName] = readTrimmedValue(fieldName);
    return values;
  }, {});
}

function validateField(fieldName, value, allValues) {
  if (fieldName === 'displayName') {
    if (!value) {
      return 'Display name is required.';
    }
    if (value.length < 3) {
      return 'Display name must be at least 3 characters.';
    }
    return '';
  }

  if (fieldName === 'username') {
    if (!value) {
      return 'Username is required.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Enter a valid email address.';
    }
    return '';
  }

  if (fieldName === 'password') {
    if (!value) {
      return 'Password is required.';
    }
    if (value.length < 8) {
      return 'Password must be at least 8 characters.';
    }
    return '';
  }

  if (fieldName === 'confirmPassword') {
    if (!value) {
      return 'Please confirm your password.';
    }
    if (value !== allValues.password) {
      return 'Passwords do not match.';
    }
    return '';
  }

  return '';
}

function validateFields(fieldNames, values) {
  var formIsValid = true;

  fieldNames.forEach(function(fieldName) {
    var message = validateField(fieldName, values[fieldName], values);
    if (message) {
      formIsValid = false;
    }
    setFieldState(fieldName, message);
  });

  return formIsValid;
}

function attachClearOnInput(fieldNames) {
  fieldNames.forEach(function(fieldName) {
    var inputElement = getInput(fieldName);
    if (!inputElement) {
      return;
    }

    inputElement.addEventListener('input', function() {
      clearFieldState(fieldName);
    });
  });
}
