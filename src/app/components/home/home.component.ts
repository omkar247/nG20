import { Component, signal, computed, ChangeDetectionStrategy, Injector, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
   message = signal('Welcome !');
   userName = signal('Guest');
  
   greeting = computed(() => `Hello, ${this.userName()}!`);
  
private counterService = inject(CounterService);

 currentCount = this.counterService.getCurrentCount();
 doubleCount = this.counterService.doubleCount;
 history = this.counterService.getHistory();


 
  updateUserName(name: string) {
    this.userName.set(name);
  }

  incrementCounter() {
    this.counterService.increment();
  }

  decrementCounter() {
    this.counterService.decrement();
  }

  resetCounter() {
    this.counterService.reset();
  }
}