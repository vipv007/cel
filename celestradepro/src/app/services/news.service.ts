import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl = 'http://localhost:3000/api/news';

  constructor(private http: HttpClient) { }

  getAllNews() {
    return this.http.get(`${this.baseUrl}`);
  }


}
