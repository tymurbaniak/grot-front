import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignalrService } from './signalr.service';

describe('SignalrService', () => {
  let service: SignalrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        SignalrService
      ]
    });
    service = TestBed.inject(SignalrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
