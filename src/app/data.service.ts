import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCrypto() {
    return this.http.get('https://api.coinstats.app/public/v1/coins?limit=50');
  }

  getCryptoCharts(period: string = "1m", coinId: string) {
    return this.http.get(`https://api.coinstats.app/public/v1/charts?period=${period}&coinId=${coinId}`);
  }
}
