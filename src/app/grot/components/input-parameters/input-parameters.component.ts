import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputParameterDefinition } from '../../models/parameter';
import { ParameterValue } from '../../models/parameter-value';
import { ComService } from '../../services/com.service';
import { ProcessService } from '../../services/process.service';

@Component({
  selector: 'app-input-parameters',
  templateUrl: './input-parameters.component.html',
  styleUrls: ['./input-parameters.component.scss']
})
export class InputParametersComponent implements OnInit {

  public parameters: InputParameterDefinition[] = [];
  public formModel: FormArray;

  constructor(
    private comService: ComService,
    private processService: ProcessService,
    private fb: FormBuilder
  ) {
    this.formModel = this.fb.array([]);
  }

  ngOnInit(): void {
    this.processService.getParameters().subscribe((result: InputParameterDefinition[]) => {
      this.parameters = result;

      this.parameters.forEach(parameter => {
        const formControl = this.fb.control(parameter.default, parameter.required ? Validators.required : null);
        this.formModel.push(formControl);
      });
    });

    this.formModel.valueChanges.subscribe(change => {
      const parameterValues: ParameterValue[] = [];

      if (this.formModel.controls.length == this.parameters.length) {
        this.parameters.forEach((parameter, index) => {
          const parameterValue = new ParameterValue();
          parameterValue.name = parameter.name;
          parameterValue.values = [];
          const formValue = this.formModel.controls[index].value;

          switch(parameter.type){
            case 'select': {
              if (formValue) {
                parameterValue.values.push(formValue.value);
              }
            }
            break;
            case 'multiSelect': {
              if (formValue) {
                parameterValue.values = formValue.map((v: any) => v.value);
              }
            }
            break;
            case 'number': {
              if (formValue) {
                parameterValue.values.push((formValue as number).toString());
              }
            }
            break;            
            case 'text': {
              if(formValue){
                parameterValue.values.push(formValue);
              }
            }
            break;
            case 'load': {
              if(formValue){
                if(typeof(formValue) === 'string'){
                  const values = formValue.split(' ');
                  parameterValue.values.push(`x ${values[0]} y ${values[1]} magenta`)
                }else{
                  parameterValue.values.push(`x ${formValue[0]} y ${formValue[1]} magenta`)
                }                
              }
            }
          }

          parameterValues.push(parameterValue);
        });

        this.comService.setParameters(parameterValues);
        this.comService.setAreParametersValid(!this.formModel.invalid);
      }
    });
  }

  public getControl(index: number): FormControl {
    return this.formModel.controls[index] as FormControl;
  }

}
