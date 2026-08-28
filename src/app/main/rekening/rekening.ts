import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Account {
  id: string;
  name: string;
  type: 'BANK' | 'E_WALLET';
  role: 'SAVINGS_VAULT' | 'DAILY_OPERATIONAL' | 'BILL_SUBSCRIPTION';
  balance: number;
  description: string;
}

@Component({
  selector: 'app-rekening',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rekening.html'
})
export class RekeningComponent {
  readonly accounts = input.required<Account[]>();
  readonly isDarkMode = input.required<boolean>();
}
