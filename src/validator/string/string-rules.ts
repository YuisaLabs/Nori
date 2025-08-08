import { ValidationRule } from "../../core/validator";

export const required =
  (message?: string): ValidationRule<string> =>
  (value) =>
    (value && value.trim().length > 0) || message || "This field is required";

export const minLength =
  (length: number, message?: string): ValidationRule<string> =>
  (value) =>
    value.length >= length ||
    message ||
    `Minimum length is ${length} characters`;

export const maxLength =
  (length: number, message?: string): ValidationRule<string> =>
  (value) =>
    value.length <= length ||
    message ||
    `Maximum length is ${length} characters`;

export const email =
  (message?: string): ValidationRule<string> =>
  (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    message ||
    "Invalid email format";

export const pattern =
  (regex: RegExp, message?: string): ValidationRule<string> =>
  (value) =>
    regex.test(value) || message || "Invalid format";
