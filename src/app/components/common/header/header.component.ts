import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class HeaderComponent {
   appName = 'Demo';
   currentYear = new Date().getFullYear();

   private authService = inject(AuthService);
   private router = inject(Router);
   private cdr = inject(ChangeDetectorRef);

   currentUser$ = this.authService.currentUser$;
   isAuthenticated$ = this.authService.isAuthenticated$;
 
   logout(): void {
     this.authService.logout().subscribe({
       next: () => {
         console.log('Logout successful');
         this.cdr.markForCheck();
       },
       error: (error) => {
         console.error('Logout error:', error);
         this.cdr.markForCheck();
       }
     });
   }
   
   login(): void {
     this.router.navigate(['/login']);
   }
   
   signup(): void {
     this.router.navigate(['/signup']);
   }
}