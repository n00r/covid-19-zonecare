import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import {grocerylists,gaslists,doclists,takelists} from './list';
import { ApiService } from '../ward-count.service';
import { Storage } from '@ionic/storage';

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
  pincode: any;
  isvalid: boolean = true ;
  wardselected : boolean = false;

  constructor(public platform : Platform,public apiService: ApiService,private storage: Storage) {
    
  }
  segmentChanged(ev: any) {
    this.noDatafound= false;
    if(ev.detail.value == 1){
      this.lists = this.response.filter(data => data.category === 'basic_need');
      if(this.lists.length == 0){
        this.noDatafound= true;
      }
    }
    if(ev.detail.value == 2){
      this.lists = this.response.filter(data => data.category === 'gas_agency');
      if(this.lists.length == 0){
        this.noDatafound= true;
      }

    }
    if(ev.detail.value == 3){
      this.lists = this.response.filter(data => data.category === 'general_physician');
      if(this.lists.length == 0){
        this.noDatafound= true;
      }

    }
    if(ev.detail.value == 4){
      this.lists = this.response.filter(data => data.category === 'take_away');
      if(this.lists.length == 0){
        this.noDatafound= true;
      }

    }
  }
  ionViewWillEnter() {
    this.storage.get('pincode').then((val) => {
      this.pincode = val
    });
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
  onValid(e) {
    if (e.type == "ionInput") {
    this.selectWardVal= e.target.value
    }
  }
  getwardlist(){
    if (this.myInputvalue.length <6){
      this.isvalid =false;
      return;
      
    }
    this.isvalid =true;
    this.getlists(this.myInputvalue);
    this.storage.set('pincode', this.myInputvalue);

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
    this.getdetails(this.myInputvalue.substring(0, 6) + this.selectWardVal);
    this.wardselected = true;

    
  }
  getdetails(val){
      this.apiService.moreServiceLists(val).subscribe(response => {
        if(response.length !== 0 ){
          this.noDatafound= false;
          this.response = response;
          this.lists = response.filter(data => data.category === 'general_physician');
        }
        else{
          this.noDatafound= true;
        }
      })
  }

}
