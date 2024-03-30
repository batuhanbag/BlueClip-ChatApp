const VALIDATION_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateEmail = email => {
  if (!email) {
    return 'Email is required';
  }
  if (!VALIDATION_REGEX.test(email)) {
    return 'Email is invalid';
  }
  return '';
};
