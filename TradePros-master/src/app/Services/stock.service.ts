import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl = 'http://localhost:3000/api/stocks';

  constructor(private http: HttpClient) { }

  getAllStocks() {
    return this.http.get(`${this.baseUrl}`);
  }

  createStock(stock: any) {
    return this.http.post(`${this.baseUrl}`, stock);
  }
}
