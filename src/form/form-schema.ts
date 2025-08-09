import { Validator } from "../core/validator";
import { isEmpty } from "../utlis/validation";

type ValidatedData<T> = {
  [K in keyof T]: T[K] extends Validator<infer U> ? U : never;
};

export type SchemaDefinition = Record<string, Validator<any>>;

export class FormSchema<T extends SchemaDefinition> {
  constructor(public fields: T) {}

  public validate(data: Record<string, any>): {
    isValid: boolean;
    data: Partial<ValidatedData<T>>;
    errors: Partial<Record<keyof T, string>>;
  } {
    const errors: Partial<Record<keyof T, string>> = {};
    const validatedData: Partial<ValidatedData<T>> = {};

    for (const fieldName in this.fields) {
      if (Object.prototype.hasOwnProperty.call(this.fields, fieldName)) {
        const validator = this.fields[fieldName];
        const value = data[fieldName] ?? "";
        const result = validator.validate(value);

        if (result !== true) {
          errors[fieldName] = result;
        } else {
          validatedData[fieldName as keyof T] = this._convertValue(
            value,
            validator.typeName
          );
        }
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      data: validatedData,
      errors: errors,
    };
  }

  public validateField(
    fieldName: keyof T,
    value: any
  ): { isValid: boolean; error: string | null } {
    const validator = this.fields[fieldName];
    if (!validator) {
      return { isValid: true, error: null };
    }

    const result = validator.validate(value ?? "");
    return {
      isValid: result === true,
      error: result === true ? null : result,
    };
  }

  public getFieldNames(): (keyof T)[] {
    return Object.keys(this.fields);
  }

  private _convertValue(value: any, typeName: string): any {
    if (isEmpty(value)) return value;

    switch (typeName) {
      case "number":
        return parseFloat(String(value));
      default:
        return value;
    }
  }
}
