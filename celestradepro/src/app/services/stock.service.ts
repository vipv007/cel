import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl = 'http://localhost:3000/api/stocks';


  constructor(private http: HttpClient) { }

  getAllStocks() {
    return this.http.get(`${this.baseUrl}`);
  }

  getStockBySymbol(symbol: string) {
    return this.http.get(`${this.baseUrl}/${symbol}`);
  }

  createStock(stock: any) {
    return this.http.post(`${this.baseUrl}`, stock);
  }
}
