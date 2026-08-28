import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analitik',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analitik.html'
})
export class AnalitikComponent {
  readonly isDarkMode = input.required<boolean>();
}
