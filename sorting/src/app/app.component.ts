import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SortParentService } from './sorts/sort-parent.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  completionState: boolean = false
  sortingState: string = ''
  
  constructor(public sortParentService: SortParentService){}


}
// setup
// array component 
