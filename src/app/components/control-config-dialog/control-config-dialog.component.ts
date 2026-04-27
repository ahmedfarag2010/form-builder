import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlType, ControlOption, FormControlConfig } from '../../models/form-control.model';

@Component({
  selector: 'app-control-config-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-config-dialog.component.html',
  styleUrls: ['./control-config-dialog.component.scss']
})
export class ControlConfigDialogComponent implements OnInit, OnChanges {
  @Input() controlType!: ControlType;
  @Input() existingControl?: FormControlConfig;
  @Output() confirm = new EventEmitter<Omit<FormControlConfig, 'id' | 'value' | 'formControlName'>>();
  @Output() cancel = new EventEmitter<void>();

  isVisible = false;
  name = '';
  label = '';
  placeholder = '';
  isRequired = false;
  readOnly = false;
  options: ControlOption[] = [];
  
  newOptionLabel = '';
  newOptionValue = '';

  readonly ControlType = ControlType;

  ngOnInit() {
    this.initializeForm();
    this.open();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['controlType'] && !changes['controlType'].firstChange) {
      this.resetForm();
      this.open();
    }
  }

  private initializeForm() {
    if (this.existingControl) {
      this.name = this.existingControl.name;
      this.label = this.existingControl.label;
      this.placeholder = this.existingControl.placeholder;
      this.isRequired = this.existingControl.isRequired;
      this.readOnly = this.existingControl.readOnly;
      this.options = this.existingControl.options ? [...this.existingControl.options] : [];
    }
  }

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
    this.resetForm();
  }

  get needsOptions(): boolean {
    return this.controlType === ControlType.DROPDOWN ||
           this.controlType === ControlType.RADIO ||
           this.controlType === ControlType.CHECKBOX;
  }

  get isFormValid(): boolean {
    const baseValid = this.name.trim() !== '' && 
                     this.label.trim() !== '' && 
                     this.placeholder.trim() !== '';
    
    if (this.needsOptions) {
      return baseValid && this.options.length > 0;
    }
    
    return baseValid;
  }

  addOption() {
    if (this.newOptionLabel.trim() && this.newOptionValue.trim()) {
      this.options.push({
        label: this.newOptionLabel.trim(),
        value: this.newOptionValue.trim()
      });
      this.newOptionLabel = '';
      this.newOptionValue = '';
    }
  }

  removeOption(index: number) {
    this.options.splice(index, 1);
  }

  onConfirm() {
    if (!this.isFormValid) {
      return;
    }

    const config: Omit<FormControlConfig, 'id' | 'value' | 'formControlName'> = {
      type: this.controlType,
      name: this.name.trim(),
      label: this.label.trim(),
      placeholder: this.placeholder.trim(),
      isRequired: this.isRequired,
      readOnly: this.readOnly
    };

    if (this.needsOptions) {
      config.options = this.options;
    }

    this.confirm.emit(config);
    this.close();
  }

  onCancel() {
    this.cancel.emit();
    this.close();
  }

  private resetForm() {
    if (!this.existingControl) {
      this.name = '';
      this.label = '';
      this.placeholder = '';
      this.isRequired = false;
      this.readOnly = false;
      this.options = [];
      this.newOptionLabel = '';
      this.newOptionValue = '';
    }
  }
}
