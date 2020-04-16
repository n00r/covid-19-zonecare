import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiService } from '../ward-count.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  countdata: any;
  myInputvalue:any;
  isWardAvail : boolean;
  selectWardVal: any;
  wardDetails: any;
  noDatafound: boolean = false;
  constructor(public platform : Platform,public apiService: ApiService) {}
  ngOnInit() {
  }

  ionViewWillEnter() {
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
      this.apiService.getWardDetails(val).subscribe(response => {
        if(response.length !== 0 ){
          this.noDatafound= false;
          this.wardDetails = response[0];
        }
        else{
          this.noDatafound= true;
        }
      })
  }

}
