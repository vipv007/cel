import { Component, OnInit, OnDestroy } from '@angular/core';
import { ForexService } from '../services/forex.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  forex: any[];
  selectTabs = 'recent';
  currentIndex = 0;
  dataSubscription: Subscription;

  constructor(private forexService: ForexService) {}

  ngOnInit() {
    this.forexService.getAllForexs().subscribe((response: any) => {
      this.forex = response;
      console.log(this.forex);
      this.startDataUpdate();
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  startDataUpdate() {
    this.dataSubscription = interval(1000).subscribe(() => {
      this.forexService.getAllForexs().subscribe((response: any) => {
        this.forex = response;
      });
    });
  }

  getChangeColor(change: number): string {
    return change > 0 ? 'green' : change < 0 ? 'red' : 'black';
  }

  getPercentChangeColor(percentChange: number): string {
    return percentChange > 0 ? 'green' : percentChange < 0 ? 'red' : 'black';
  }

  getBuyColor(bid: number, ask: number): string {
    return bid > ask ? 'green' : bid < ask ? 'red' : '';
  }

  getSellColor(bid: number, ask: number): string {
    return bid < ask ? 'green' : bid > ask ? 'red' : '';
  }
}
