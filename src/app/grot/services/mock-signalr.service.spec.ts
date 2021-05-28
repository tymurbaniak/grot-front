import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockSignalrService } from './mock-signalr.service';

describe('MockSignalrService', () => {
  let service: MockSignalrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        MockSignalrService        
      ]
    });
    service = TestBed.inject(MockSignalrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
