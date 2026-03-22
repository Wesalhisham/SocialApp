import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gustGuard } from './gust-guard';

describe('gustGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gustGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
