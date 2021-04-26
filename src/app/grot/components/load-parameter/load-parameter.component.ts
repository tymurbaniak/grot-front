import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-load-parameter',
  templateUrl: './load-parameter.component.html',
  styleUrls: ['./load-parameter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoadParameterComponent),
      multi: true
    }
  ]
})
export class LoadParameterComponent implements ControlValueAccessor, OnInit {

  value: string[] = [];

  public formModel = this.fb.group({
    loadX: this.fb.control(0),
    loadY: this.fb.control(0),
    color: this.fb.control("f0f")
  });

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.formModel.valueChanges.subscribe(() => {
      this.propagateChange([
        this.formModel.get('loadX')?.value,
        this.formModel.get('loadY')?.value,
        this.formModel.get('color')?.value
      ]);
    })
  }

  writeValue(val: any): void {
    if (val === undefined) {
      return;
    }

    let values = [];

    if ((typeof val) === 'string') {
      values = (val as string).split(" ");
    } else {
      values = val;
    }

    this.value = values;
    this.formModel.get('loadX')?.setValue(values[0]);
    this.formModel.get('loadY')?.setValue(values[1]);
    this.formModel.get('color')?.setValue(values[2]);
  }

  propagateChange : any = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(_fn: any): void {
  }

}
