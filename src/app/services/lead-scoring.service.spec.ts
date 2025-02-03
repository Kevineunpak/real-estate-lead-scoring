import { TestBed } from '@angular/core/testing';

import { LeadScoringService } from './lead-scoring.service';

describe('LeadScoringService', () => {
  let service: LeadScoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadScoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
