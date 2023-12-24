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
  currentArray: number[] = []

  constructor(public sortParentService: SortParentService, public mergeService: MergeService, public quickService: QuickService, public heapService: HeapService, public bubbleService: BubbleService){
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

  quickSort(arr: number[]) {
    return this.doQuickSort(arr, 0, arr.length - 1);
  }

  // Private recursive method for quick sort
  private async doQuickSort(array: number[], left: number, right: number): Promise<number[]> {
    if (array.length > 1) {
      const index = this.partition(array, left, right);
      if (left < await index - 1) {
        await this.delay(1); // 2000 milliseconds = 2 seconds

        this.doQuickSort(array, left, await index - 1);
      }
      if (await index < right) {
        await this.delay(1); // 2000 milliseconds = 2 seconds

        this.doQuickSort(array, await index, right);
      }
    }
    return array;
  }

  // Private helper method to partition the array
  private async partition(array: number[], left: number, right: number): Promise<number> {
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
        await this.delay(100); // 2000 milliseconds = 2 seconds
        
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        i++;
        j--;
      }
    }

    return i;
  }
  sortmerge() {
    this.mergeSort(this.currentArray, 0, this.currentArray.length - 1);
  }

  async mergeSort(arr: number[], low: number, high: number): Promise<void> {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);

      await this.delay(50);
      await this.mergeSort(arr, low, mid);
      await this.mergeSort(arr, mid + 1, high);
      await this.delay(50);

      await this.merge(arr, low, mid, high);
    }
  }

  merge(arr: number[], low: number, mid: number, high: number): void {
    const leftSize = mid - low + 1;
    const rightSize = high - mid;

    const leftArray: number[] = new Array(leftSize);
    const rightArray: number[] = new Array(rightSize);

    for (let i = 0; i < leftSize; i++) {
      leftArray[i] = arr[low + i];
    }

    for (let j = 0; j < rightSize; j++) {
      rightArray[j] = arr[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = low;

    while (i < leftSize && j < rightSize) {
      // needs to be await
      if (leftArray[i] >= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;
    }

    while (i < leftSize) {
      // needs to be await
      arr[k] = leftArray[i];
      i++;
      k++;
    }

    while (j < rightSize) {
      // needs to be await
      arr[k] = rightArray[j];
      j++;
      k++;
    }
  }

  async heapSort(array: number[]): Promise<number[]> {
    const n = array.length;

    // Build the max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.delay(50);
      
      this.heapify(array, n, i);
    }

    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
      await this.delay(50);
      // Swap the root (maximum element) with the last element
      [array[0], array[i]] = [array[i], array[0]];
      // Call max heapify on the reduced heap
      this.heapify(array, i, 0);
    }

    return array;
  }

  // Private method to heapify a subtree rooted with node i which is an index in the array
  private async heapify(array: number[], heapSize: number, i: number): Promise<void> {
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
