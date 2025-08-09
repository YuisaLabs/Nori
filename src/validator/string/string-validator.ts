import { Validator } from "../../core/validator";
import * as rules from "./string-rules";

export class StringValidator extends Validator<string> {
  constructor(message?: string) {
    super("string");
    this.addRule(
      (value) => typeof value === "string" || message || "Value must be a string"
    );
  }

  public required(message?: string): this {
    return this.addRule(rules.required(message));
  }

  public min(length: number, message?: string): this {
    return this.addRule(rules.minLength(length, message));
  }

  public max(length: number, message?: string): this {
    return this.addRule(rules.maxLength(length, message));
  }

  public email(message?: string): this {
    return this.addRule(rules.email(message));
  }

  public pattern(regex: RegExp, message?: string): this {
    return this.addRule(rules.pattern(regex, message));
  }
}
