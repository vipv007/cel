/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.scss'],
})
export class RibbonComponent implements  AfterViewInit  {

  @ViewChild('tradingview') tradingview?: ElementRef;

  constructor(private _renderer2: Renderer2) { }


  ngAfterViewInit(){
    const script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script.text = `
      {
        symbols: [
          {
            proName: 'FOREXCOM:SPXUSD',
            title: 'S&P 500'
          },
          {
            proName: 'FOREXCOM:NSXUSD',
            title: 'US 100'
          },
          {
            proName: 'FX_IDC:EURUSD',
            title: 'EUR/USD'
          },
          {
            proName: 'BITSTAMP:BTCUSD',
            title: 'Bitcoin'
          },
          {
            proName: 'BITSTAMP:ETHUSD',
            title: 'Ethereum'
          }
        ],
        colorTheme: 'light',
        isTransparent: false,
        showSymbolLogo: true,
        locale: 'in'
      }
    }`;

    this.tradingview?.nativeElement.appendChild(script);
  }
}

