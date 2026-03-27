import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private count = signal(0);
  private history = signal<number[]>([]);

   doubleCount = computed(() => this.count() * 2);

  getCurrentCount() {
    return this.count.asReadonly();
  }

  getHistory() {
    return this.history.asReadonly();
  }

  updateCount(delta: number) {
  const newCount = this.count() + delta;
  this.count.set(newCount);
  this.history.update(h => {
  h.push(newCount);
  return h;
});}

increment() {
  this.updateCount(1);
}

decrement() {
  this.updateCount(-1);
}

  reset() {
    this.count.set(0);
    this.history.set([]);
  }
}