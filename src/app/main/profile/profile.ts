import { Component, input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html'
})
export class ProfileComponent {
  readonly username = input.required<string>();
  readonly email = input.required<string>();
  readonly phone = input.required<string>();
  readonly isDarkMode = input.required<boolean>();

  @Output() readonly logout = new EventEmitter<void>();
  @Output() readonly openSettings = new EventEmitter<void>();
}
