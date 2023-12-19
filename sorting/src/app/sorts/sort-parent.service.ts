import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortParentService {
  currentArray: number[] = []
  
  constructor(){
    this.resetClick()
  }

  setArray(args: number[]){
    this.currentArray = args
  }
  resetClick(){
    this.currentArray = []
    for (let i = 0;i<200;i++){
      this.currentArray.push(this.randomIntFromInterval(5,400))
    }
  }
  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max-min+1) + min )
  }
}
