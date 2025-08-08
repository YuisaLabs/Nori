import { ValidationRule } from "../../core/validator";

type Numeric = number | string;

export const required =
  (message?: string): ValidationRule<Numeric> =>
  (value) =>
    (value !== null && value !== undefined && value !== "") ||
    message ||
    "This field is required";

export const minValue =
  (value: number, message?: string): ValidationRule<Numeric> =>
  (val) =>
    parseFloat(String(val)) >= value || message || `Minimum value is ${value}`;

export const maxValue =
  (value: number, message?: string): ValidationRule<Numeric> =>
  (val) =>
    parseFloat(String(val)) <= value || message || `Maximum value is ${value}`;

export const isInteger =
  (message?: string): ValidationRule<Numeric> =>
  (value) =>
    Number.isInteger(parseFloat(String(value))) ||
    message ||
    "Value must be an integer";

export const isPositive =
  (message?: string): ValidationRule<Numeric> =>
  (value) =>
    parseFloat(String(value)) > 0 || message || "Value must be positive";
