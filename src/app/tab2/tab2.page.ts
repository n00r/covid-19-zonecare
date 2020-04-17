import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiService } from '../ward-count.service';
import { Storage } from '@ionic/storage';

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
  pincode: any;
  isvalid: boolean = true;
  constructor(public platform : Platform,public apiService: ApiService,private storage: Storage) {}
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('pincode').then((val) => {
      this.pincode = val
    });
  }
  onInput(ev){
    this.myInputvalue = ev.detail.value;


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
    
    this.getdetails(this.selectWardVal);
    

    
  }
  onValid(e) {
    if (e.inputType == "insertFromPaste") {
    this.selectWardVal= e.target.value.substring(0, 2);
    }
  }

  getdetails(val){
      this.apiService.getWardDetails(val).subscribe(response => {
        if(response.length !== 0 ){
          this.noDatafound= false;
          // this.wardDetails = response[0];
          this.wardDetails = response.filter(res =>(res.pincode_ward.substr(6,7) == val))[0]
        }
        else{
          this.noDatafound= true;
        }
      })
  }

}
