import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiService } from '../ward-count.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  worldcountdata = new Set();
  Indiacountdata = new Set();
  constructor(public platform: Platform, public apiService: ApiService) { }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.worldcount();
    this.indiacount();
  }
  worldcount() {
    if (this.worldcountdata.size === 0) {
      this.apiService.worldcount().subscribe(response => {
        this.worldcountdata.add(response.data);
      })
    }
  }
  indiacount() {
    if (this.Indiacountdata.size === 0) {
      this.apiService.indiacount().subscribe(response => {
        this.Indiacountdata.add(response.cases_time_series[response.cases_time_series.length - 1]);
      })
    }
  }

}
