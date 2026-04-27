import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { FormBuilderService } from '../../services/form-builder.service';
import { AuthService } from '../../services/auth.service';
import { FormControlConfig } from '../../models/form-control.model';
import { API_URLS } from '../../config/api.config';

/** Control shape as sent to POST /api/services (value is a string, not an array) */
type ServiceFormControl = Omit<FormControlConfig, 'value'> & { value: string };

@Component({
  selector: 'app-save-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './save-form-dialog.component.html',
  styleUrls: ['./save-form-dialog.component.scss']
})
export class SaveFormDialogComponent {
  @Output() close = new EventEmitter<void>();

  isVisible = false;
  formName = '';
  formCode = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private formBuilderService: FormBuilderService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  open() {
    this.isVisible = true;
    this.resetForm();
  }

  closeDialog() {
    this.isVisible = false;
    this.close.emit();
  }

  get isFormValid(): boolean {
    return this.formName.trim() !== '' && this.formCode.trim() !== '';
  }

  onSubmit() {
    if (!this.isFormValid) {
      this.errorMessage = 'Please fill in both Name and Code fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const controlsArray = this.mapControlsForApi(this.formBuilderService.getControlsValue());
    const payload: { name: string; code: string; controls: string } = {
      name: this.formName.trim(),
      code: this.formCode.trim(),
      controls: JSON.stringify(controlsArray)
    };

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });

    this.http
      .post(API_URLS.services, payload, { headers })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.formBuilderService.clearAllControls();
          this.closeDialog();
          alert(
            `Your form was saved successfully.\n\nName: ${payload.name}\nCode: ${payload.code}\nThe workspace has been cleared.`
          );
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = this.getErrorMessage(err);
        }
      });
  }

  onCancel() {
    this.closeDialog();
  }

  /**
   * API expects `value` as a string. Internal builder uses an array; serialize with JSON.stringify.
   */
  private mapControlsForApi(controls: FormControlConfig[]): ServiceFormControl[] {
    return controls.map((c) => ({
      ...c,
      value: this.valueArrayToString(c.value)
    }));
  }

  private valueArrayToString(value: unknown): string {
    if (value == null) {
      return '[]';
    }
    if (Array.isArray(value)) {
      return JSON.stringify(value);
    }
    if (typeof value === 'string') {
      return value;
    }
    return JSON.stringify(value);
  }

  private resetForm() {
    this.formName = '';
    this.formCode = '';
    this.errorMessage = '';
  }

  private getErrorMessage(err: HttpErrorResponse): string {
    if (err.error && typeof err.error === 'object' && 'message' in err.error) {
      return String((err.error as { message: unknown }).message);
    }
    if (typeof err.error === 'string' && err.error) {
      return err.error;
    }
    if (err.status === 0) {
      return 'Network error. Check your connection and CORS settings.';
    }
    return err.message || `Request failed (${err.status})`;
  }
}
