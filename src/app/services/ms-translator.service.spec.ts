import { TestBed } from '@angular/core/testing';

import { MsTransaltorService } from './ms-translator.service';

describe('GoogleInputTextService', () => {
  let service: MsTransaltorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsTransaltorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
