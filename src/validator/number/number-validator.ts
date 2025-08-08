import { Validator } from "../../core/validator";
import * as rules from "./number-rules";

type Numeric = number | string;

export class NumberValidator extends Validator<Numeric> {
  constructor() {
    super("number");
    this.addRule(
      (value) => !isNaN(parseFloat(String(value))) || "Value must be a number"
    );
  }

  public required(message?: string): this {
    return this.addRule(rules.required(message));
  }

  public min(value: number, message?: string): this {
    return this.addRule(rules.minValue(value, message));
  }

  public max(value: number, message?: string): this {
    return this.addRule(rules.maxValue(value, message));
  }

  public isInteger(message?: string): this {
    return this.addRule(rules.isInteger(message));
  }

  public isPositive(message?: string): this {
    return this.addRule(rules.isPositive(message));
  }
}
