import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  private baseUrl = 'http://localhost:3000/api/forexs';

  constructor(private http: HttpClient) { }

  getAllForexs() {
    return this.http.get(`${this.baseUrl}`);
  }

  createForex(forex: any) {
    return this.http.post(`${this.baseUrl}`, forex);
  }
}
