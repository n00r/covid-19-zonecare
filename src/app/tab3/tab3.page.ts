import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import {grocerylists,gaslists,doclists,takelists} from './list'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  lists = grocerylists;
  constructor(public platform : Platform) {
    
  }
  segmentChanged(ev: any) {
    if(ev.detail.value == 1){
      this.lists = grocerylists
    }
    if(ev.detail.value == 2){
      this.lists = gaslists
    }
    if(ev.detail.value == 3){
      this.lists = doclists
    }
    if(ev.detail.value == 4){
      this.lists = takelists
    }
  }

}
