import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  cards = [
    {
      title: 'Form Builder',
      description: 'Create and configure forms with drag and drop controls.',
      icon: '🧩',
      link: '/form-builder'
    },
    {
      title: 'Init Workflow BPMN',
      description: 'Design BPMN workflows and export workflow definitions.',
      icon: '🔀',
      link: '/workflow'
    }
  ];
}
