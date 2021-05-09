import { TestBed } from '@angular/core/testing';

import { MockSignalrService } from './mock-signalr.service';

describe('MockSignalrService', () => {
  let service: MockSignalrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockSignalrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
