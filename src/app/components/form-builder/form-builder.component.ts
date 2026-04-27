import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ControlPaletteComponent } from '../control-palette/control-palette.component';
import { FormCanvasComponent } from '../form-canvas/form-canvas.component';
import { FormPreviewComponent } from '../form-preview/form-preview.component';
import { SaveFormDialogComponent } from '../save-form-dialog/save-form-dialog.component';
import { FormBuilderService } from '../../services/form-builder.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [
    CommonModule,
    ControlPaletteComponent,
    FormCanvasComponent,
    FormPreviewComponent,
    SaveFormDialogComponent
  ],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnDestroy {
  @ViewChild(SaveFormDialogComponent) saveFormDialog!: SaveFormDialogComponent;

  private destroy$ = new Subject<void>();
  controlCount = 0;
  userEmail = '';

  constructor(
    private formBuilderService: FormBuilderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formBuilderService.getControls()
      .pipe(takeUntil(this.destroy$))
      .subscribe(controls => {
        this.controlCount = controls.length;
      });
    
    this.userEmail = this.authService.getUserEmail() || '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSaveForm() {
    this.saveFormDialog.open();
  }

  onExportForm() {
    const json = this.formBuilderService.exportForm();
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'form-config.json';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  onImportForm(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        this.formBuilderService.importForm(content);
      };
      reader.readAsText(file);
    }
  }

  onClearAll() {
    if (confirm('Are you sure you want to clear all controls?')) {
      this.formBuilderService.clearAllControls();
    }
  }

  onLogout() {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
    }
  }
}
