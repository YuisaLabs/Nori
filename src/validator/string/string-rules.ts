import { ValidationRule } from "../../core/validator";
import { MESSAGES } from "../../utlis/constant";
import { isEmptyOrWhitespace } from "../../utlis/validation";

export const required =
  (message?: string): ValidationRule<string> =>
  (value) =>
    !isEmptyOrWhitespace(value) || message || MESSAGES.REQUIRED;

export const minLength =
  (length: number, message?: string): ValidationRule<string> =>
  (value) =>
    value.length >= length ||
    message ||
    MESSAGES.MIN_LENGTH;

export const maxLength =
  (length: number, message?: string): ValidationRule<string> =>
  (value) =>
    value.length <= length ||
    message ||
    MESSAGES.MAX_LENGTH;

export const email =
  (message?: string): ValidationRule<string> =>
  (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    message ||
    MESSAGES.INVALID_EMAIL;

export const pattern =
  (regex: RegExp, message?: string): ValidationRule<string> =>
  (value) =>
    regex.test(value) || message || MESSAGES.INVALID_PATTERN;
