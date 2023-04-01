export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PHONE_REGEX = /^\+?\d{1,3}[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/;
// valid phone '+1 123-456-7890' +91 +110

export const mongoUrl = process.env.MONGO_URI;
