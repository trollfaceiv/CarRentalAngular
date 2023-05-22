import { TestBed } from '@angular/core/testing';

import { HeaderExtractorService } from './header-extractor.service';

describe('HeaderExtractorService', () => {
  let service: HeaderExtractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderExtractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
