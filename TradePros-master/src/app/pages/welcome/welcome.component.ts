import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { StockService } from 'src/app/Services/stock.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, AfterViewInit {
  @ViewChild('tradingview') tradingview?: ElementRef;

  stocks: any[] = [];

  constructor(
    private http: HttpClient,
    private stockService: StockService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.stockService.getAllStocks().subscribe((response: any) => {
      this.stocks = response;
      console.log(this.stocks);
    });
  }

  ngAfterViewInit() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.text = `
    {
      "symbols": [
        [
          "Apple",
          "AAPL|1D"
        ],
        [
          "Google",
          "GOOGL|1D"
        ],
        [
          "Microsoft",
          "MSFT|1D"
        ]
      ],
      "chartOnly": false,
      "width": 1000,
      "height": 500,
      "locale": "in",
      "colorTheme": "light",
      "autosize": false,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "line"
    }`;

    this.renderer.appendChild(this.tradingview?.nativeElement, script);
  }
}
