import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subject, takeUntil } from 'rxjs';
import { FormControlConfig, ControlType } from '../../models/form-control.model';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
  selector: 'app-form-canvas',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './form-canvas.component.html',
  styleUrls: ['./form-canvas.component.scss']
})
export class FormCanvasComponent implements OnInit, OnDestroy {
  controls: FormControlConfig[] = [];
  private destroy$ = new Subject<void>();
  readonly ControlType = ControlType;

  constructor(private formBuilderService: FormBuilderService) {}

  ngOnInit() {
    this.formBuilderService.getControls()
      .pipe(takeUntil(this.destroy$))
      .subscribe(controls => {
        this.controls = controls;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  drop(event: CdkDragDrop<FormControlConfig[]>) {
    const controlsCopy = [...this.controls];
    moveItemInArray(controlsCopy, event.previousIndex, event.currentIndex);
    this.formBuilderService.reorderControls(controlsCopy);
  }

  deleteControl(id: number) {
    if (confirm('Are you sure you want to delete this control?')) {
      this.formBuilderService.deleteControl(id);
    }
  }

  getControlTypeLabel(type: ControlType): string {
    const typeMap: Record<ControlType, string> = {
      [ControlType.TEXT]: 'Text Input',
      [ControlType.DATE]: 'Date Picker',
      [ControlType.DATE_RANGE]: 'Date Range',
      [ControlType.TEXTAREA]: 'Text Area',
      [ControlType.DROPDOWN]: 'Dropdown',
      [ControlType.RADIO]: 'Radio Button',
      [ControlType.CHECKBOX]: 'Checkbox',
      [ControlType.FILE]: 'File Upload'
    };
    return typeMap[type];
  }

  getControlIcon(type: ControlType): string {
    const iconMap: Record<ControlType, string> = {
      [ControlType.TEXT]: '📝',
      [ControlType.DATE]: '📅',
      [ControlType.DATE_RANGE]: '📆',
      [ControlType.TEXTAREA]: '📄',
      [ControlType.DROPDOWN]: '📋',
      [ControlType.RADIO]: '🔘',
      [ControlType.CHECKBOX]: '☑️',
      [ControlType.FILE]: '📎'
    };
    return iconMap[type];
  }
}
