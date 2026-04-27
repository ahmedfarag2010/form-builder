export enum ControlType {
  TEXT = 'text',
  DATE = 'date',
  DATE_RANGE = 'dateRange',
  TEXTAREA = 'textarea',
  DROPDOWN = 'dropdown',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  FILE = 'file'
}

export interface ControlOption {
  label: string;
  value: string;
}

export interface FormControlConfig {
  id: number;
  type: ControlType;
  name: string;
  label: string;
  placeholder: string;
  options?: ControlOption[];
  isRequired: boolean;
  value: any[];
  formControlName: string;
  readOnly: boolean;
}

export interface ControlTypeInfo {
  type: ControlType;
  label: string;
  icon: string;
  description: string;
}
