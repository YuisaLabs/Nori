import { ValidationRule } from "../../core/validator";
import { MESSAGES } from "../../utlis/constant";

type Numeric = number | string;

export const required =
  (message?: string): ValidationRule<Numeric> =>
  (value) =>
    (value !== null && value !== undefined && value !== "") ||
    message ||
    MESSAGES.REQUIRED;

export const minValue =
  (value: number, message?: string): ValidationRule<Numeric> =>
  (val) =>
    parseFloat(String(val)) >= value || message || MESSAGES.MIN_VALUE;

export const maxValue =
  (value: number, message?: string): ValidationRule<Numeric> =>
  (val) =>
    parseFloat(String(val)) <= value || message || MESSAGES.MAX_VALUE;

export const isInteger =
  (message?: string): ValidationRule<Numeric> =>
  (value) =>
    Number.isInteger(parseFloat(String(value))) ||
    message ||
    MESSAGES.IS_INTEGER;

export const isPositive =
  (message?: string): ValidationRule<Numeric> =>
  (value) =>
    parseFloat(String(value)) > 0 || message || MESSAGES.IS_POSITIVE;

export const isNegative =
  (message?: string): ValidationRule<Numeric> =>
  (value) =>
    parseFloat(String(value)) < 0 || message || MESSAGES.IS_NEGATIVE;
