import { Component, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, ZeebePropertiesProviderModule, CamundaPlatformPropertiesProviderModule } from 'bpmn-js-properties-panel';
import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';
import camundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';
import ZeebeBehaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-cloud';
import CamundaPlatformBehaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-platform';
import ColorPickerModule from 'bpmn-js-color-picker';

@Component({
  selector: 'app-bpmn-modeler',
  standalone: false,
  template: `
    <div id="canvas" #canvas class="canvas"></div>
    <div id="properties" #properties class="properties-panel"></div>
  `,
  styles: [`
    :host { display: flex; height: 74vh; min-height: 620px; }
    .canvas { flex-grow: 1; border: 1px solid #d5e9ff; border-radius: 12px 0 0 12px; background: #f7fbff; }
    .properties-panel { width: 300px; border: 1px solid #d5e9ff; border-left: none; border-radius: 0 12px 12px 0; background: #ffffff; }
  `]
})
export class BpmnModelerComponent implements OnChanges, OnDestroy, AfterViewInit{
  @Input() engineType: 'C7' | 'C8' = 'C8';
  // Add an output to let the parent know if we need to revert the selection
  @Output() engineChangeRejected = new EventEmitter<void>();

  @ViewChild('canvas') private canvasRef!: ElementRef;
  @ViewChild('properties') private propertiesRef!: ElementRef;
  private modeler: any;
  private viewInitialized = false; // Flag to track readiness

  // Add a property to your class
public newProcessId: string = 'Process_1'; // Default value

  // 1. Angular calls this ONLY after the HTML is ready
  ngAfterViewInit() {
    this.viewInitialized = true;
    this.reinitializeModeler(); // Trigger initial load
  }

  // 2. Logic for when input changes (after initial load)
  async ngOnChanges(changes: SimpleChanges) {
    if (this.viewInitialized && changes['engineType']) {
        const confirmed = confirm(`Are you sure you want to switch to ${this.engineType}? This will reset your model.`);
        
        if (confirmed) {
            await this.reinitializeModeler();
        } else {
            this.engineChangeRejected.emit();
        }
    }
  }

  // New: Download Method
  public async downloadBpmn() {
    // 1. ACCESS: Get the modeler's root object
    const definitions = this.modeler.getDefinitions();
    const process = definitions.rootElements.find(
      (el: any) => el.$type === 'bpmn:Process'
    );
  
    // 2. MODIFY: Update the ID in-memory (This happens before XML generation)
    if (process) {
      process.id = this.newProcessId;
      process.name = this.newProcessId; 
    }
  
    // 3. SERIALIZE: Now convert the modified model to XML
    const { xml } = await this.modeler.saveXML({ format: true });
    
    // 4. DOWNLOAD: Trigger the browser download
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.newProcessId}.bpmn`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private async reinitializeModeler() {
    // Safety check: ensure elements exist
    if (!this.canvasRef || !this.propertiesRef) return;

    if (this.modeler) {
      this.modeler.destroy();
      this.modeler = null;
    }

    this.canvasRef.nativeElement.innerHTML = '';
    this.propertiesRef.nativeElement.innerHTML = '';

    const isC8 = this.engineType === 'C8';
    
    this.modeler = new BpmnModeler({
      container: this.canvasRef.nativeElement,
      propertiesPanel: { parent: this.propertiesRef.nativeElement },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        ColorPickerModule,
        isC8 ? ZeebePropertiesProviderModule : CamundaPlatformPropertiesProviderModule,
        isC8 ? ZeebeBehaviorsModule : CamundaPlatformBehaviorsModule
      ],
      moddleExtensions: { 
        [isC8 ? 'zeebe' : 'camunda']: isC8 ? zeebeModdle : camundaModdle 
      }
    });

    await this.modeler.createDiagram();
  }

  // Add this method to your BpmnModelerComponent class
public onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async (e: any) => {
    const xml = e.target.result;
    try {
      // Import the file into the modeler
      await this.modeler.importXML(xml);
      
      // Optional: Zoom to fit after import
      this.modeler.get('canvas').zoom('fit-viewport');
    } catch (err) {
      console.error('Failed to import BPMN file:', err);
      alert('Error: The file is not a valid BPMN diagram.');
    }
  };

  reader.readAsText(file);
  
  // Reset the input so the user can import the same file again if needed
  event.target.value = '';
}

  ngOnDestroy() { this.modeler?.destroy(); }

  public async getXml() { return (await this.modeler.saveXML({ format: true })).xml; }
}