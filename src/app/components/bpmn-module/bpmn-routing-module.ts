import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BpmnMainComponent } from './bpmn-main/bpmn-main.component';

const routes: Routes = [
  {
    path: '',
    component: BpmnMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BpmnRoutingModule {}
