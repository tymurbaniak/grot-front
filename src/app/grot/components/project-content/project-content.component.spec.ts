import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectsService } from '../../services/projects.service';

import { ProjectContentComponent } from './project-content.component';
import * as MockSignalRClient from '../../../../testing/mockSignalR.js';

describe('ProjectContentComponent', () => {
  let component: ProjectContentComponent;
  let fixture: ComponentFixture<ProjectContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectContentComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        ProjectsService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
