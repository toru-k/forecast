import { TestBed } from '@angular/core/testing';

import { ForecastErrorHandler } from './error-handler';

describe('ErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForecastErrorHandler = TestBed.get(ForecastErrorHandler);
    expect(service).toBeTruthy();
  });
});
