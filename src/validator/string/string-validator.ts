import { Validator } from "../../core/validator";
import * as rules from "./string-rules";

export class StringValidator extends Validator<string> {
  constructor(message?: string) {
    super("string");
    this.addRule(
      (value) =>
        typeof value === "string" || message || "Value must be a string"
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

  public password(pattern?: RegExp, message?: string): this {
    return this.addRule(rules.password(pattern, message));
  }

  public length(length: number, message?: string): this {
    return this.addRule(rules.length(length, message));
  }

  public startsWith(prefix: string, message?: string): this {
    return this.addRule(rules.startsWith(prefix, message));
  }

  public endsWith(suffix: string, message?: string): this {
    return this.addRule(rules.endsWith(suffix, message));
  }

  public contains(substring: string, message?: string): this {
    return this.addRule(rules.contains(substring, message));
  }

  public uppercase(message?: string): this {
    return this.addRule(rules.uppercase(message));
  }

  public lowercase(message?: string): this {
    return this.addRule(rules.lowercase(message));
  }
}
