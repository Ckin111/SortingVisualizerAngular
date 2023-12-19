import { Injectable } from '@angular/core';
import { SortParentService } from '../sort-parent.service';

@Injectable({
  providedIn: 'root'
})
export class QuickService  extends SortParentService{

  constructor() {
    super();
  }

  quickSort(arr: number[]): number[] {
    return this.doQuickSort(arr, 0, arr.length - 1);
  }

  // Private recursive method for quick sort
  private doQuickSort(array: number[], left: number, right: number): number[] {
    if (array.length > 1) {
      const index = this.partition(array, left, right);
      if (left < index - 1) {
        this.doQuickSort(array, left, index - 1);
      }
      if (index < right) {
        this.doQuickSort(array, index, right);
      }
    }
    return array;
  }

  // Private helper method to partition the array
  private partition(array: number[], left: number, right: number): number {
    const pivot = array[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
      while (array[i] > pivot) {
        i++;
      }
      while (array[j] < pivot) {
        j--;
      }
      if (i <= j) {
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        i++;
        j--;
      }
    }

    return i;
  }
}
