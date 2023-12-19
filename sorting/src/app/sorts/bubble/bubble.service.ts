import { Injectable } from '@angular/core';
import { SortParentService } from '../sort-parent.service';

@Injectable({
  providedIn: 'root'
})
export class BubbleService extends SortParentService{

  constructor() { 
    super();
  }
  bubbleSort(array: number[]): number[] {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        // Compare adjacent elements and swap if they are in the wrong order
        if (array[j] < array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap elements
        }
      }
    }

    return array;
  }
}
