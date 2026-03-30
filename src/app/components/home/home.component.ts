import { Component, signal, computed, ChangeDetectionStrategy, Injector, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CounterService } from '../../services/counter.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
   private counterService = inject(CounterService);
   private authService = inject(AuthService);

   message = signal('Welcome !');
   
   currentUser$ = this.authService.currentUser$;
   isAuthenticated$ = this.authService.isAuthenticated$;
   
   userName = signal<string>('');
   currentUser = toSignal(this.currentUser$, { initialValue: null });
   greeting = computed(() => `Hello, ${this.userName() || this.currentUser()?.name || 'Guest'}!`);

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