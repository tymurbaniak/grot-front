import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrotRoutingModule } from './grot-routing.module';
import { MainComponent } from './components/main/main.component';
import { ImageEditorComponent } from './components/image-editor/image-editor.component';
import { InputParametersComponent } from './components/input-parameters/input-parameters.component';

import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainComponent, ImageEditorComponent, InputParametersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GrotRoutingModule,
    DropdownModule,
    InputNumberModule,
    ToolbarModule,
    ButtonModule,
    MultiSelectModule,
    FileUploadModule
  ]
})
export class GrotModule { }
