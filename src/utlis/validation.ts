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
