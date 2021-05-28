import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComService } from '../../services/com.service';
import { ProcessService } from '../../services/process.service';

import { InputParametersComponent } from './input-parameters.component';

describe('InputParametersComponent', () => {
  let component: InputParametersComponent;
  let fixture: ComponentFixture<InputParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputParametersComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,        
        ReactiveFormsModule
      ],
      providers: [
        ComService,
        ProcessService,
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
