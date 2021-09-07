import { TestBed } from '@angular/core/testing';

import { CsvcallsService } from './csvcalls.service';

describe('CsvcallsService', () => {
  let service: CsvcallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvcallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
