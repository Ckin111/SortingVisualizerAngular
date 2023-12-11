import { TestBed } from '@angular/core/testing';

import { SortParentService } from './sort-parent.service';

describe('SortParentService', () => {
  let service: SortParentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortParentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
