import { EventEmitter } from "../core/event-emitter";
import { VALIDATOR_OPTIONS } from "../utlis/constant";
import { FormSchema, SchemaDefinition } from "./form-schema";
import { FieldState, FormState, FormStateManager } from "./form-state-manager";

type FormValidateOn = "input" | "blur" | "change" | "submit";

export interface FormValidatorOptions {
  validateOn?: FormValidateOn[];
  errorClass?: string;
  errorAttribute?: string;
  debounceDelay?: number;
}

const defaultOptions: Required<FormValidatorOptions> = {
  validateOn: [VALIDATOR_OPTIONS.VALIDATE_ON],
  errorClass: VALIDATOR_OPTIONS.ERROR_CLASS,
  errorAttribute: VALIDATOR_OPTIONS.ERROR_ATTRIBUTE,
  debounceDelay: VALIDATOR_OPTIONS.DEBOUNCE_DELAY,
};

interface FormValidatorEvents {
  formSubmit: { isValid: boolean; data: any; errors: any };
  validSubmit: { data: any };
  fieldStateChange: {
    fieldName: string;
    newState: FieldState;
    formState: FormState;
  };
  formStateChange: { formState: FormState };
}

export class FormValidator<
  T extends SchemaDefinition
> extends EventEmitter<FormValidatorEvents> {
  public readonly formElement: HTMLFormElement;
  public readonly schema: FormSchema<T>;
  public readonly options: Required<FormValidatorOptions>;
  public readonly stateManager: FormStateManager;
  private debounceTimers: Record<string, number> = {};

  constructor(
    formElementOrSelector: HTMLFormElement | string,
    schema: FormSchema<T>,
    options: FormValidatorOptions = {}
  ) {
    super();
    this.formElement = this._getFormElement(formElementOrSelector);
    this.schema = schema;
    this.options = { ...defaultOptions, ...options };
    this.stateManager = new FormStateManager(
      schema.getFieldNames() as string[]
    );
    this._initialize();
  }

  private _getFormElement(selector: HTMLFormElement | string): HTMLFormElement {
    const element =
      typeof selector === "string"
        ? document.querySelector<HTMLFormElement>(selector)
        : selector;
    if (!element) {
      throw new Error("Form element not found");
    }

    return element;
  }

  private _initialize(): void {
    this.formElement.setAttribute("novalidate", "true");
    this._setupFormSubmittion();
    this._setupFieldListeners();
    this._forwardStateEvents();
  }

  private _setupFormSubmittion(): void {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }

  private _setupFieldListeners(): void {
    this.schema.getFieldNames().forEach((fieldName) => {
      const inputElement = this.formElement.querySelector<HTMLInputElement>(
        `[name="${String(fieldName)}"]`
      );
      if (inputElement) {
        const handler = (event: Event) =>
          this._handleFieldInteraction(event.type, fieldName as string);
        this.options.validateOn.forEach((eventType) => {
          if (eventType !== "submit") {
            inputElement.addEventListener(eventType, handler);
          }
        });
      }
    });
  }

  private _handleFieldInteraction(eventType: string, fieldName: string): void {
    const shouldDebounce =
      eventType === "input" && this.options.debounceDelay > 0;

    if (shouldDebounce) {
      clearTimeout(this.debounceTimers[fieldName]);
      this.debounceTimers[fieldName] = window.setTimeout(() => {
        this.validateField(fieldName, true);
      }, this.options.debounceDelay);
    } else {
      this.validateField(fieldName, true);
    }

    if (eventType === "blur") {
      this.stateManager.updateField(fieldName, { isTouched: true });
    }
  }

  public validateField(
    fieldName: string,
    showError: boolean
  ): { isValid: boolean; error: string | null } {
    const inputElement = this.formElement.querySelector<HTMLInputElement>(
      `[name="${fieldName}"]`
    );
    if (!inputElement) return { isValid: true, error: null };

    const value = inputElement.value;
    const result = this.schema.validateField(fieldName, value);

    this.stateManager.updateField(fieldName, {
      isValid: result.isValid,
      error: result.error,
      isDirty: true,
    });

    if (showError) {
      if (result.isValid) {
        this._clearFieldError(fieldName);
      } else {
        this._showFieldError(fieldName, result.error!);
      }
    }
    return result;
  }

  private _showFieldError(fieldName: string, errorMessage: string): void {
    const inputElement = this.formElement.querySelector(
      `[name="${fieldName}"]`
    );
    const errorElement = this.formElement.querySelector(
      `[${this.options.errorAttribute}="${fieldName}"]`
    );
    inputElement?.classList.add(this.options.errorClass);
    if (errorElement) errorElement.textContent = errorMessage;
  }

  private _clearFieldError(fieldName: string): void {
    const inputElement = this.formElement.querySelector(
      `[name="${fieldName}"]`
    );
    const errorElement = this.formElement.querySelector(
      `[${this.options.errorAttribute}="${fieldName}"]`
    );
    inputElement?.classList.remove(this.options.errorClass);
    if (errorElement) errorElement.textContent = "";
  }

  public handleSubmit(): void {
    const formData = new FormData(this.formElement);
    const formValues = Object.fromEntries(formData.entries());
    const result = this.schema.validate(formValues);

    this.schema
      .getFieldNames()
      .forEach((fieldName) => this._clearFieldError(fieldName as string));

    if (result.isValid) {
      this.emit("validSubmit", { data: result.data });
    } else {
      Object.entries(result.errors).forEach(([fieldName, errorMessage]) => {
        if (errorMessage) {
          this._showFieldError(fieldName, errorMessage);
        }
      });
    }

    this.emit("formSubmit", { ...result });
  }

  private _forwardStateEvents(): void {
    this.stateManager.on("fieldStateChange", (data) =>
      this.emit("fieldStateChange", data)
    );
    this.stateManager.on("formStateChange", (data) =>
      this.emit("formStateChange", data)
    );
  }

  public reset(): void {
    this.formElement.reset();
    this.stateManager.reset();
    this.schema
      .getFieldNames()
      .forEach((fieldName) => this._clearFieldError(fieldName as string));
  }

  public destroy(): void {
    this.removeAllListeners();
    this.stateManager.removeAllListeners();
  }
}
