import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SortParentService } from './sorts/sort-parent.service';
import { MergeService } from './sorts/merge/merge.service';
import { QuickService } from './sorts/quick/quick.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  completionState: boolean = false
  sortingState: string = ''
  constructor(public sortParentService: SortParentService, public mergeService: MergeService, public quickService: QuickService){}
}
