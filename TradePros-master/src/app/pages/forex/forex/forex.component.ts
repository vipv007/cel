import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CurrencyData {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
}

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})
export class ForexComponent implements OnInit {
  currencyData: CurrencyData[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCurrencyData();
  }

  fetchCurrencyData() {
    this.http
      .get('https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo')
      .subscribe((response: any) => {
        const seriesData = response['Time Series FX (Daily)'];

        let count = 0; // Counter to fetch only 3 dates

        for (const key in seriesData) {
          if (seriesData.hasOwnProperty(key)) {
            const data = seriesData[key];
            this.currencyData.push({
              date: key,
              open: data['1. open'],
              high: data['2. high'],
              low: data['3. low'],
              close: data['4. close']
            });

            count++;
            if (count === 6) {
              break; // Stop fetching after 3 dates
            }
          }
        }
      });
  }
}
