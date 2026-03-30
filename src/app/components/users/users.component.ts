// src/app/components/users/users.component.ts
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  selectedUser: User | null = null;
  showPopup = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe({
      next: (users) => {
        // Handle 304 Not Modified - users might be null/undefined
        this.users = users || [];
        this.isLoading = false;
        this.cdr.markForCheck(); // Trigger change detection
        console.log('Users loaded:', this.users);
      },
      error: (error) => {
        console.error('Failed to load users:', error);
        this.isLoading = false;
        this.cdr.markForCheck(); // Trigger change detection
      }
    });
  }

  showUserDetails(user: User): void {
    this.selectedUser = user;
    this.showPopup = true;
    this.cdr.markForCheck(); // Trigger change detection
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedUser = null;
    this.cdr.markForCheck(); // Trigger change detection
  }

  logout(): void {
    this.authService.logout();
  }
}