import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  let service: RegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(RegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
