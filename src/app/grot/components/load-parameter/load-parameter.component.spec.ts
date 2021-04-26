import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadParameterComponent } from './load-parameter.component';

describe('LoadParameterComponent', () => {
  let component: LoadParameterComponent;
  let fixture: ComponentFixture<LoadParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadParameterComponent ]
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
