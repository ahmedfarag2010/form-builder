import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlType, ControlTypeInfo, FormControlConfig } from '../../models/form-control.model';
import { FormBuilderService } from '../../services/form-builder.service';
import { ControlConfigDialogComponent } from '../control-config-dialog/control-config-dialog.component';

@Component({
  selector: 'app-control-palette',
  standalone: true,
  imports: [CommonModule, ControlConfigDialogComponent],
  templateUrl: './control-palette.component.html',
  styleUrls: ['./control-palette.component.scss']
})
export class ControlPaletteComponent {
  @Output() controlAdded = new EventEmitter<void>();

  controlTypes: ControlTypeInfo[];
  selectedControlType?: ControlType;

  constructor(private formBuilderService: FormBuilderService) {
    this.controlTypes = this.formBuilderService.availableControlTypes;
  }

  onControlTypeClick(controlType: ControlType) {
    this.selectedControlType = controlType;
  }

  onConfigConfirm(config: Omit<FormControlConfig, 'id' | 'value' | 'formControlName'>) {
    this.formBuilderService.addControl(config);
    this.controlAdded.emit();
    this.selectedControlType = undefined;
  }

  onConfigCancel() {
    this.selectedControlType = undefined;
  }
}
