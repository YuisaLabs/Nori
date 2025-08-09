import { NumberValidator } from "./number-validator";

export const number = (message?: string): NumberValidator =>
  new NumberValidator(message);
