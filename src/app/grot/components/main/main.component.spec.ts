import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { ComService } from '../../services/com.service';
import { SignalrService } from '../../services/signalr.service';

import { MainComponent } from './main.component';
import * as MockSignalRClient from '../../../../testing/mockSignalR.js';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        SignalrService,
        MessageService,
        ComService,
        AuthenticationService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
