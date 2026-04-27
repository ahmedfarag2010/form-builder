import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FormControlConfig, ControlType } from '../../models/form-control.model';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
  selector: 'app-form-preview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss']
})
export class FormPreviewComponent implements OnInit, OnDestroy {
  controls: FormControlConfig[] = [];
  formData: Record<string, any> = {};
  private destroy$ = new Subject<void>();
  readonly ControlType = ControlType;

  constructor(private formBuilderService: FormBuilderService) {}

  ngOnInit() {
    this.formBuilderService.getControls()
      .pipe(takeUntil(this.destroy$))
      .subscribe(controls => {
        this.controls = controls;
        this.initializeFormData();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeFormData() {
    this.formData = {};
    this.controls.forEach(control => {
      if (control.type === ControlType.CHECKBOX && control.options) {
        this.formData[control.name] = [];
      } else {
        this.formData[control.name] = '';
      }
    });
  }

  onCheckboxChange(controlName: string, value: string, checked: boolean) {
    if (!Array.isArray(this.formData[controlName])) {
      this.formData[controlName] = [];
    }

    const values = this.formData[controlName] as string[];
    if (checked) {
      values.push(value);
    } else {
      const index = values.indexOf(value);
      if (index > -1) {
        values.splice(index, 1);
      }
    }
  }

  isCheckboxChecked(controlName: string, value: string): boolean {
    const values = this.formData[controlName];
    return Array.isArray(values) && values.includes(value);
  }

  onSubmit() {
    console.log('Form Data:', this.formData);
    alert('Form submitted! Check console for data.');
  }

  onReset() {
    this.initializeFormData();
  }
}
