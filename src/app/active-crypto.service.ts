import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveCryptoService {
  private cryptoSource = new BehaviorSubject('bitcoin');
  currentCrypto = this.cryptoSource.asObservable();

  constructor() {}

  changeCrypto(crypto: string) {
    this.cryptoSource.next(crypto);
  }
}
