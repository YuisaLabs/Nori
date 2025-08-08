import { EventEmitter } from "../core/event-emitter";

export interface FieldState {
  isValid: boolean;
  error: string | null;
  isDirty: boolean;
  isTouched: boolean;
}

export interface FormState {
  isValid: boolean;
  hasErrors: boolean;
  isDirty: boolean;
  isTouched: boolean;
  fields: Record<string, FieldState>;
}

interface FormStateEvents {
  fieldStateChange: {
    fieldName: string;
    newState: FieldState;
    oldState: FieldState;
    formState: FormState;
  };
  formStateChange: { formState: FormState };
  reset: { oldFormState: FormState; newFormState: FormState };
}

export class FormStateManager extends EventEmitter<FormStateEvents> {
  private fieldStates: Record<string, FieldState> = {};

  constructor(fieldNames: string[]) {
    super();
    this._initializeFields(fieldNames);
  }

  private _initializeFields(fieldNames: string[]): void {
    fieldNames.forEach((fieldName) => {
      this.fieldStates[fieldName] = {
        isValid: false,
        error: null,
        isDirty: false,
        isTouched: false,
      };
    });
  }

  public updateField(fieldName: string, updates: Partial<FieldState>): void {
    const field = this.fieldStates[fieldName];
    if (!field) return;

    const oldState = { ...field };
    const newState = { ...field, ...updates };
    this.fieldStates[fieldName] = newState;

    const formState = this.getFormState();
    this.emit("fieldStateChange", { fieldName, newState, oldState, formState });
    this.emit("formStateChange", { formState });
  }

  public getFieldState(fieldName: string): FieldState | null {
    return this.fieldStates[fieldName] || null;
  }

  public getFormState(): FormState {
    const fields = this.fieldStates;
    const fieldValues = Object.values(fields);
    return {
      isValid: fieldValues.every((field) => field.isValid),
      hasErrors: fieldValues.some((field) => field.error !== null),
      isDirty: fieldValues.some((field) => field.isDirty),
      isTouched: fieldValues.some((field) => field.isTouched),
      fields: { ...fields },
    };
  }

  public reset(): void {
    const oldFormState = this.getFormState();
    this._initializeFields(Object.keys(this.fieldStates));
    const newFormState = this.getFormState();

    this.emit("reset", { oldFormState, newFormState });
    this.emit("formStateChange", { formState: newFormState });
  }
}
