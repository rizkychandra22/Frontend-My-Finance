import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';

@Component({
  imports: [CommonModule, LoginComponent, DashboardComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly currentPage = signal<'login' | 'dashboard'>('login');

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.currentPage.set('dashboard');
    } else {
      this.currentPage.set('login');
    }
  }

  protected handleLoginSuccess(): void {
    this.currentPage.set('dashboard');
  }

  protected handleLogoutSuccess(): void {
    this.currentPage.set('login');
  }
}
