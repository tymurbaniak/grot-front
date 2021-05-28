import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

import { ImageEditorComponent } from './image-editor.component';

describe('ImageEditorComponent', () => {
  let component: ImageEditorComponent;
  let fixture: ComponentFixture<ImageEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageEditorComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,        
      ],
      providers: [
        MessageService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
