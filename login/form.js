// ---------------- STATE ----------------
let blurEnabled = false;

// ---------------- HELPERS ----------------
function getInput(field) {
  return document.getElementById(field);
}

function getError(field) {
  return document.querySelector(
    `.form-row[data-field="${field}"] .field-error`
  );
}

function setState(input, state) {
  input.classList.remove("fail", "success");
  if (state) input.classList.add(state);
}

function setError(el, msg) {
  el.textContent = msg;
  if (msg) el.classList.add("fail");
  else el.classList.remove("fail");
}

// ---------------- VALIDATION ----------------
function validateField(field, value) {

  // EMAIL / USERNAME
  if (field === "username") {
    if (!value) return "Username is required.";

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(value)) {
      return "Username must be a valid email address.";
    }
  }

  // PASSWORD
  if (field === "password") {
    if (!value) return "Password is required.";

    if (value.length < 8)
      return "Password must be at least 8 characters.";

    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter.";

    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter.";

    if (!/[0-9]/.test(value))
      return "Password must contain at least one number.";

    if (!/[!@#$%^&*]/.test(value))
      return "Password must contain at least one special character.";
  }

  // DISPLAY NAME (signup only)
  if (field === "displayName") {
    if (!value) return "Display name is required.";
    if (value.length < 2)
      return "Display name must be at least 2 characters.";
    if (!/^[a-zA-Z0-9\s\-']+$/.test(value))
      return "Display name contains invalid characters.";
  }

  // CONFIRM PASSWORD (signup only)
  if (field === "confirmPassword") {
    if (!value) return "Confirm password is required.";
    if (value !== getInput("password").value)
      return "Passwords do not match.";
  }

  return "";
}

// ---------------- RENDER ----------------
function validateAndRender(field) {
  const input = getInput(field);
  const errorEl = getError(field);
  const value = input.value.trim();

  const error = validateField(field, value);

  if (error) {
    setState(input, "fail");
    setError(errorEl, error);
    return false;
  } else {
    setState(input, "success");
    setError(errorEl, "");
    return true;
  }
}

// ---------------- BLUR ----------------
function attachBlur(fields) {
  fields.forEach(field => {
    const input = getInput(field);

    if (input.dataset.blur === "true") return;
    input.dataset.blur = "true";

    input.addEventListener("blur", () => {
      if (!blurEnabled) return;
      validateAndRender(field);
    });
  });
}