import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import {grocerylists,gaslists,doclists,takelists} from './list';
import { ApiService } from '../ward-count.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  lists :any;
  servicelists = new Set();
  myInputvalue: any;
  isWardAvail: boolean;
  countdata: any;
  selectWardVal: any;
  noDatafound: boolean;
  wardDetails: any;
  response: any;

  constructor(public platform : Platform,public apiService: ApiService) {
    
  }
  segmentChanged(ev: any) {
    this.noDatafound= false;
    if(ev.detail.value == 1){
      this.lists = this.response.filter(data => data.category === 'Grocery');
      if(this.lists.length == 0){
        this.noDatafound= true;
      }
    }
    if(ev.detail.value == 2){
      this.lists = this.response.filter(data => data.category === 'GasAgency');
      if(this.lists.length == 0){
        this.noDatafound= true;
      }

    }
    if(ev.detail.value == 3){
      this.lists = this.response.filter(data => data.category === 'Medical');
      if(this.lists.length == 0){
        this.noDatafound= true;
      }

    }
    if(ev.detail.value == 4){
      this.lists = this.response.filter(data => data.category === 'TakeAway');
      if(this.lists.length == 0){
        this.noDatafound= true;
      }

    }
  }
  ionViewWillEnter() {
  }
  worldcount(val) {
    if (this.servicelists.size === 0) {
      this.apiService.moreServiceLists(val).subscribe(response => {
        this.servicelists.add(response);
      })
    }
  }
  onInput(ev){
    this.myInputvalue = ev.detail.value

  }
  getwardlist(){
    this.getlists(this.myInputvalue);
  }
  getlists(val) {
    this.apiService.getWardList(val).subscribe(response => {
      if(response.length !== 0 ){
        this.isWardAvail=true;
      }
      this.countdata = response;
    })
  }
  selectWard(e){
    this.selectWardVal=e.detail.value;
    this.getdetails(this.selectWardVal)

    
  }
  getdetails(val){
      this.apiService.moreServiceLists(val).subscribe(response => {
        if(response.length !== 0 ){
          this.noDatafound= false;
          this.response = response;
          this.lists = response.filter(data => data.category === 'Grocery');
        }
        else{
          this.noDatafound= true;
        }
      })
  }

}
