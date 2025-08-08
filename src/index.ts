export { string } from "./validator/string";
export { number } from "./validator/number";

export { Validator } from "./core/validator";
export { EventEmitter } from "./core/event-emitter";
export { FormSchema } from "./form/form-schema";
export { FormValidator } from "./form/form-validator";
export { FormStateManager } from "./form/form-state-manager";
export type { FormValidatorOptions } from "./form/form-validator";
export type { FieldState, FormState } from "./form/form-state-manager";

import { FormSchema } from "./form/form-schema";
import { FormValidator } from "./form/form-validator";
import type { Validator } from "./core/validator";
import type { FormValidatorOptions } from "./form/form-validator";

type SchemaDefinition = Record<string, Validator<any>>;

export const object = <T extends SchemaDefinition>(
  fields: T
): FormSchema<T> => {
  return new FormSchema(fields);
};

export const createValidator = (
  formElementOrSelector: HTMLFormElement | string,
  schema: FormSchema<any>,
  options: FormValidatorOptions = {}
): FormValidator => {
  return new FormValidator(formElementOrSelector, schema, options);
};
