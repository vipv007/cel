
import { AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Component } from '@angular/core';


declare const TradingView: any;
@Component({
  selector: 'app-ribon',
  templateUrl: './ribon.page.html',
  styleUrls: ['./ribon.page.scss'],
})
  export class RibonPage implements AfterViewInit {
    @ViewChild('tradingview') tradingview?: ElementRef;


   constructor(private _renderer2: Renderer2) { }

  ngAfterViewInit(): void {
    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.text = `
    {
      "symbol": "CEXIO:MHCUSD",
      "width": 350,
      "colorTheme": "light",
      "isTransparent": true,
      "locale": "en"
    }
    {
      "symbol": "CEXIO:MHCUSD",
      "width": 350,
      "colorTheme": "light",
      "isTransparent": true,
      "locale": "en"
    }`;


    this.tradingview?.nativeElement.appendChild(script);
  }
}
