export type ValidationRule<T> = (value: T) => true | string;

export abstract class Validator<T> {
  protected _rules: ValidationRule<T>[] = [];

  constructor(public readonly typeName: string) {}

  public validate(value: T): true | string {
    for (const rule of this._rules) {
      const result = rule(value);
      if (result !== true) return result;
    }
    return true;
  }

  public addRule(rule: ValidationRule<T>): this {
    this._rules.push(rule);
    return this;
  }
}