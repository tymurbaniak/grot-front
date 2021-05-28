import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProcessService } from './process.service';

describe('ProcessService', () => {
  let service: ProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        ProcessService        
      ]
    });
    service = TestBed.inject(ProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
