import { forwardRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { InputNumberModule } from 'primeng/inputnumber';

import { LoadParameterComponent } from './load-parameter.component';

describe('LoadParameterComponent', () => {
  let component: LoadParameterComponent;
  let fixture: ComponentFixture<LoadParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadParameterComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        InputNumberModule
      ],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => LoadParameterComponent),
          multi: true
        },
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
