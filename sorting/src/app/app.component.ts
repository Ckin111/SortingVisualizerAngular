import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sorting';
  currentArray: number[] = []
  completionState: boolean = false
  sortingState: string = ''
  
  ngOnInit(): void {
    this.resetClick()
  }

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max-min+1) + min )
  }

  resetClick(){
    this.currentArray = []
    for (let i = 0;i<200;i++){
      this.currentArray.push(this.randomIntFromInterval(5,400))
    }
  }


}
// setup
// array component 
