/* ---------- helpers ---------- */

function getInput(name) {
  return document.getElementById(name);
}

function getErrorSpan(name) {
  return document.querySelector(`[data-field="${name}"] .field-error`);
}

/* ---------- UI ---------- */

function applyInputState(input, state) {
  input.classList.remove('fail', 'success');
  if (state) input.classList.add(state);
}

function applyErrorState(span, message) {
  span.textContent = message;
  if (message) span.classList.add('fail');
  else span.classList.remove('fail');
}

/* ---------- validation ---------- */

function validateField(field, value) {

  /* Display Name */
  if (field === 'displayName') {
    if (!value) return 'Display name is required.';
    if (value.length < 2) return 'Display name must be at least 2 characters.';
    if (!/^[a-zA-Z0-9\s\-']+$/.test(value)) {
      return 'Display name contains invalid characters.';
    }
    return '';
  }

  /* Email */
  if (field === 'username') {
    if (!value) return 'Username is required.';
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.test(value)) {
      return 'Username must be a valid email address.';
    }
    return '';
  }

  /* Password */
  if (field === 'password') {
    if (!value) return 'Password is required.';
    if (value.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(value)) return 'Password must contain uppercase letter.';
    if (!/[a-z]/.test(value)) return 'Password must contain lowercase letter.';
    if (!/[0-9]/.test(value)) return 'Password must contain number.';
    if (!/[!@#$%^&*]/.test(value)) return 'Password must contain special character.';
    return '';
  }

  /* Confirm Password */
  if (field === 'confirmPassword') {
    if (!value) return 'Confirm password is required.';
    if (value !== getInput('password').value.trim()) {
      return 'Passwords do not match.';
    }
    return '';
  }

  return '';
}