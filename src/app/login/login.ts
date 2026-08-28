import { Component, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  @Output() readonly loginSuccess = new EventEmitter<void>();

  protected readonly isDarkMode = signal(localStorage.getItem('theme') === 'dark');
  protected readonly identifier = signal('');
  protected readonly password = signal('');
  protected readonly errorMessage = signal('');
  protected readonly isLoading = signal(false);

  constructor() {}

  protected toggleTheme(): void {
    this.isDarkMode.update(val => {
      const newVal = !val;
      localStorage.setItem('theme', newVal ? 'dark' : 'light');
      return newVal;
    });
  }

  protected onLogin(event: Event): void {
    event.preventDefault();
    
    const id = this.identifier().trim();
    const pass = this.password().trim();

    if (!id || !pass) {
      this.errorMessage.set('Semua field wajib diisi!');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    // Simulasi otentikasi lokal (khusus UI)
    setTimeout(() => {
      this.isLoading.set(false);
      
      // Simulasi kredensial (sesuai notes.md)
      if ((id === 'test@example.com' || id === '081234567890') && pass === 'password') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', 'Rizky Chandra');
        localStorage.setItem('email', 'test@example.com');
        localStorage.setItem('phone', '081234567890');
        this.loginSuccess.emit();
      } else {
        this.errorMessage.set('Email/Nomor Telepon atau Password salah! (Uji coba: test@example.com & password)');
      }
    }, 800);
  }
}
