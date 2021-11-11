import { TestBed } from '@angular/core/testing';

import { ActiveCryptoService } from './active-crypto.service';

describe('ActiveCryptoService', () => {
  let service: ActiveCryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveCryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
