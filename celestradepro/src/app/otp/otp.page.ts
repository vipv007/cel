import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-otp',
  templateUrl: 'otp.page.html',
  styleUrls: ['otp.page.scss']
})
export class OtpPage implements OnInit {
  stocks: any[] = [];
  filteredStocks: any[] = [];
  filterTerm = '';
  selectTabs = 'recent';
  currentIndex = 0;
  searchTerm = '';

  highestPrices: { [symbol: string]: number } = {};
  lowestPrices: { [symbol: string]: number } = {};

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.getStocks();
  }

  getStocks() {
    this.stockService.getAllStocks().subscribe((response: any) => {
      this.stocks = response;
      this.filteredStocks = this.stocks;
      this.calculateOHLC();
    });
  }

  calculateOHLC() {
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    this.stocks.forEach((stockData: any) => {
      const stockInRange = stockData.stock.filter((data: any) => {
        const stockDate = new Date(data.Date);
        return stockDate >= oneYearAgo && stockDate <= today;
      });

      if (stockInRange.length > 0) {
        const symbol = stockData.symbol;
        const highPrices = stockInRange.map((data: any) => data.High);
        const lowPrices = stockInRange.map((data: any) => data.Low);

        this.highestPrices[symbol] = Math.max(...highPrices);
        this.lowestPrices[symbol] = Math.min(...lowPrices);
      } else {
        this.highestPrices[stockData.symbol] = 0;
        this.lowestPrices[stockData.symbol] = 0;
      }
    });
  }

  filterData() {
    if (this.filterTerm) {
      this.filteredStocks = this.stocks.filter((stockData: any) =>
        stockData.symbol.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    } else {
      this.filteredStocks = this.stocks;
    }
  }
}
