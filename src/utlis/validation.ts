const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const isEmail = (value: string): boolean => {
  return EMAIL_REGEX.test(value);
};

export const isPassword = (value: string): boolean => {
  return PASSWORD_REGEX.test(value);
};

export const isEmpty = (value: any): boolean => {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (typeof value === "string" && value.trim() === "")
  );
};

export const isEmptyOrWhitespace = (value: string): boolean => {
  return !value || value.trim().length === 0;
}
