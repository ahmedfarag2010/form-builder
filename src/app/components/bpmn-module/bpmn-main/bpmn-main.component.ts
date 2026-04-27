import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-bpmn-main',
  standalone: false,
  templateUrl: './bpmn-main.component.html',
  styleUrls: ['./bpmn-main.component.scss'],
})
export class BpmnMainComponent {
  protected readonly title = signal('thiqati-bpm-app');

  currentEngine: 'C7' | 'C8' = 'C8';
  private previousEngine: 'C7' | 'C8' = 'C8';

  onEngineChange(newEngine: 'C7' | 'C8') {
    this.currentEngine = newEngine;
    this.previousEngine = newEngine === 'C8' ? 'C7' : 'C8';
  }

  revertEngineChange() {
    // This forces the dropdown to revert to the old value
    this.currentEngine = this.previousEngine;
  }
}
