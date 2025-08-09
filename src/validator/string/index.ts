import { StringValidator } from "./string-validator";

export const string = (message?: string): StringValidator => new StringValidator(message);
