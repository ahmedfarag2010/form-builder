import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BpmnModelerComponent } from './bpmn-modeler/bpmn-modeler';
import { BpmnRoutingModule } from './bpmn-routing-module';
import { BpmnMainComponent } from './bpmn-main/bpmn-main.component';

@NgModule({
  declarations: [BpmnMainComponent, BpmnModelerComponent],
  imports: [
    CommonModule,
    BpmnRoutingModule,
    FormsModule
  ],
})
export class BpmnModule {}
