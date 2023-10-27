import { TestBed } from '@angular/core/testing';

import { FormErrorService } from './form-error-service';

describe('FormErrorServiceService', () => {
  let service: FormErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
