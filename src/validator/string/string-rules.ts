import { ValidationRule } from "../../core/validator";
import { MESSAGES } from "../../utlis/constant";
import {
  isEmail,
  isEmptyOrWhitespace,
  isPassword
} from "../../utlis/validation";

export const required =
  (message?: string): ValidationRule<string> =>
  (value) =>
    !isEmptyOrWhitespace(value) || message || MESSAGES.REQUIRED;

export const minLength =
  (length: number, message?: string): ValidationRule<string> =>
  (value) =>
    value.length >= length || message || MESSAGES.MIN_LENGTH;

export const maxLength =
  (length: number, message?: string): ValidationRule<string> =>
  (value) =>
    value.length <= length || message || MESSAGES.MAX_LENGTH;

export const email =
  (message?: string): ValidationRule<string> =>
  (value) =>
    isEmail(value) || message || MESSAGES.INVALID_EMAIL;

export const pattern =
  (regex: RegExp, message?: string): ValidationRule<string> =>
  (value) =>
    regex.test(value) || message || MESSAGES.INVALID_PATTERN;

export const password =
  (pattern?: RegExp, message?: string): ValidationRule<string> =>
  (value) =>
    isPassword(value, pattern) || message || MESSAGES.INVALID_PASSWORD;

export const length =
  (length: number, message?: string): ValidationRule<string> =>
  (value) =>
    value.length === length || message || MESSAGES.INVALID_LENGTH;

export const startsWith =
  (prefix: string, message?: string): ValidationRule<string> =>
  (value) =>
    value.startsWith(prefix) || message || MESSAGES.INVALID_STARTS_WITH;

export const endsWith =
  (suffix: string, message?: string): ValidationRule<string> =>
  (value) =>
    value.endsWith(suffix) || message || MESSAGES.INVALID_ENDS_WITH;

export const contains =
  (substring: string, message?: string): ValidationRule<string> =>
  (value) =>
    value.includes(substring) || message || MESSAGES.INVALID_CONTAINS;

export const uppercase =
  (message?: string): ValidationRule<string> =>
  (value) =>
    value.toUpperCase() === value || message || MESSAGES.INVALID_UPPERCASE;

export const lowercase =
  (message?: string): ValidationRule<string> =>
  (value) =>
    value.toLowerCase() === value || message || MESSAGES.INVALID_LOWERCASE;
