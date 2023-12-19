import { Injectable } from '@angular/core';
import { SortParentService } from '../sort-parent.service';

@Injectable({
  providedIn: 'root'
})
export class MergeService extends SortParentService{

  constructor() {
    super();
  }

  doMergeSort(array: number[]): number[] {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    // this.currentArray = array
    return this.merge(this.doMergeSort(left), this.doMergeSort(right));
  }

  // Private helper method to merge two sorted arrays
  private merge(left: number[], right: number[]): number[] {
    let result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] > right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  }
}
