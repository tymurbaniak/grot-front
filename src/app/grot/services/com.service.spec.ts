import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ComService } from './com.service';

describe('ComService', () => {
  let service: ComService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        ComService
      ]
    });
    service = TestBed.inject(ComService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
