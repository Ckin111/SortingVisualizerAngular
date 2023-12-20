import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SortParentService } from './sorts/sort-parent.service';
import { MergeService } from './sorts/merge/merge.service';
import { QuickService } from './sorts/quick/quick.service';
import { HeapService } from './sorts/heap/heap.service';
import { BubbleService } from './sorts/bubble/bubble.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  completionState: boolean = false
  sortingState: string = ''
  constructor(public sortParentService: SortParentService, public mergeService: MergeService, public quickService: QuickService, public heapService: HeapService, public bubbleService: BubbleService){
    this.resetClick()
  }

  currentArray: number[] = []

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

  async bubbleSort(array: number[]): Promise<number[]> {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      
      for (let j = 0; j < n - 1 - i; j++) {
        // Compare adjacent elements and swap if they are in the wrong order
          if (array[j] < array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap elements
            await this.delay(1); // 2000 milliseconds = 2 seconds
          }
      }
    }

    return array;
  }
  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
