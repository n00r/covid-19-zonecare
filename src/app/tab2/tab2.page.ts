import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import {doclists} from '../tab3/list'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  lists = doclists;

  constructor(public platform : Platform) {}

}
