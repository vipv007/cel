import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommodityService {

  private baseUrl = 'http://localhost:3000/api/commodity';
  

  constructor(private http: HttpClient) { }

  getCommodities() {
    return this.http.get(`${this.baseUrl}`);
  }


}
