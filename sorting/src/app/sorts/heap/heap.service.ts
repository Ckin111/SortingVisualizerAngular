import { Injectable } from '@angular/core';
import { SortParentService } from '../sort-parent.service';

@Injectable({
  providedIn: 'root'
})
export class HeapService extends SortParentService{

  constructor() { 
    super()
  }

  public heapSort(array: number[]): number[] {
    const n = array.length;

    // Build the max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(array, n, i);
    }

    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Swap the root (maximum element) with the last element
      [array[0], array[i]] = [array[i], array[0]];

      // Call max heapify on the reduced heap
      this.heapify(array, i, 0);
    }

    return array;
  }

  // Private method to heapify a subtree rooted with node i which is an index in the array
  private heapify(array: number[], heapSize: number, i: number): void {
    var largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Compare with left child
    if (left < heapSize && array[left] < array[largest]) {
      largest = left;
    }

    // Compare with right child
    if (right < heapSize && array[right] < array[largest]) {
      largest = right;
    }

    // If the largest is not the root
    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];

      // Recursively heapify the affected sub-tree
      this.heapify(array, heapSize, largest);
    }
  }
}
