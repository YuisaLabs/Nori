export const VALIDATOR_OPTIONS = {
  VALIDATE_ON: "submit" as const,
  DEBOUNCE_DELAY: 300,
  ERROR_CLASS: "is-invalid",
  ERROR_ATTRIBUTE: "data-error-for",
  SHOW_ERRORS_IMMEDIATELY: false
}

export const MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_TYPE: "Invalid type provided",
  MIN_LENGTH: "Minimum length is {length} characters",
  MAX_LENGTH: "Maximum length is {length} characters",
  MIN_VALUE: "Minimum value is {value}",
  MAX_VALUE: "Maximum value is {value}",
  IS_INTEGER: "Value must be an integer",
  IS_POSITIVE: "Value must be positive",
  IS_NEGATIVE: "Value must be negative",
}