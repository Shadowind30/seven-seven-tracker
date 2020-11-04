import { Component } from '@angular/core';
import { HistoryInterface } from '../shared/coords';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
  storage = localStorage;
  locationHistory: HistoryInterface[] = JSON.parse(this.storage.getItem('history')) || [];
  
  refreshHistory() {
    this.locationHistory = JSON.parse(this.storage.getItem('history')) || [];
  }

  ngOnInit() {
    setInterval(() => {
      this.refreshHistory()
    }, 60000)
  }

}
