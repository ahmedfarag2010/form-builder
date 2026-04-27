import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ControlType, ControlTypeInfo, FormControlConfig } from '../models/form-control.model';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  private controls$ = new BehaviorSubject<FormControlConfig[]>([]);
  private nextId = 1;

  readonly availableControlTypes: ControlTypeInfo[] = [
    {
      type: ControlType.TEXT,
      label: 'Text Input',
      icon: '📝',
      description: 'Single line text input'
    },
    {
      type: ControlType.DATE,
      label: 'Date Picker',
      icon: '📅',
      description: 'Select a single date'
    },
    {
      type: ControlType.DATE_RANGE,
      label: 'Date Range',
      icon: '📆',
      description: 'Select date range'
    },
    {
      type: ControlType.TEXTAREA,
      label: 'Text Area',
      icon: '📄',
      description: 'Multi-line text input'
    },
    {
      type: ControlType.DROPDOWN,
      label: 'Dropdown List',
      icon: '📋',
      description: 'Select from dropdown'
    },
    {
      type: ControlType.RADIO,
      label: 'Radio Button',
      icon: '🔘',
      description: 'Single selection'
    },
    {
      type: ControlType.CHECKBOX,
      label: 'Checkbox',
      icon: '☑️',
      description: 'Multiple selection'
    },
    {
      type: ControlType.FILE,
      label: 'File Upload',
      icon: '📎',
      description: 'Upload files'
    }
  ];

  getControls(): Observable<FormControlConfig[]> {
    return this.controls$.asObservable();
  }

  getControlsValue(): FormControlConfig[] {
    // Ensure all controls have the value, formControlName, and readOnly fields
    return this.controls$.value.map(control => ({
      ...control,
      value: control.value || [],
      formControlName: control.formControlName || control.name,
      readOnly: control.readOnly ?? false
    }));
  }

  addControl(control: Omit<FormControlConfig, 'id' | 'value' | 'formControlName'>): void {
    const newControl: FormControlConfig = {
      ...control,
      id: this.nextId++,
      value: [],
      formControlName: control.name,
      readOnly: control.readOnly ?? false
    };
    this.controls$.next([...this.controls$.value, newControl]);
  }

  updateControl(id: number, control: Partial<FormControlConfig>): void {
    const controls = this.controls$.value.map(c =>
      c.id === id ? { ...c, ...control } : c
    );
    this.controls$.next(controls);
  }

  deleteControl(id: number): void {
    const controls = this.controls$.value.filter(c => c.id !== id);
    // Reassign IDs after deletion
    const reindexedControls = this.reassignIds(controls);
    this.controls$.next(reindexedControls);
  }

  reorderControls(controls: FormControlConfig[]): void {
    // Reassign IDs based on new order
    const reindexedControls = this.reassignIds(controls);
    this.controls$.next(reindexedControls);
  }

  private reassignIds(controls: FormControlConfig[]): FormControlConfig[] {
    return controls.map((control, index) => ({
      ...control,
      id: index + 1
    }));
  }

  clearAllControls(): void {
    this.controls$.next([]);
    this.nextId = 1;
  }

  exportForm(): string {
    return JSON.stringify(this.controls$.value, null, 2);
  }

  importForm(jsonString: string): void {
    try {
      const controls = JSON.parse(jsonString) as FormControlConfig[];
      // Ensure all imported controls have required fields
      const controlsWithValue = controls.map((control, index) => ({
        ...control,
        id: index + 1,
        value: control.value || [],
        formControlName: control.formControlName || control.name,
        readOnly: control.readOnly ?? false
      }));
      this.controls$.next(controlsWithValue);
      this.nextId = controlsWithValue.length + 1;
    } catch (error) {
      console.error('Invalid JSON format', error);
    }
  }
}
