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
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToastModule } from 'primeng/toast';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './components/test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadParameterComponent } from './components/load-parameter/load-parameter.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [MainComponent, ImageEditorComponent, InputParametersComponent, TestComponent, LoadParameterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GrotRoutingModule,
    DropdownModule,
    InputNumberModule,
    ToolbarModule,
    ButtonModule,
    MultiSelectModule,
    FileUploadModule,
    InputTextModule,
    ColorPickerModule,
    ToastModule,
    AuthModule
  ]
})
export class GrotModule { }
