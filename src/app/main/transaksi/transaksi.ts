import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Transaction {
  id: string;
  type: 'INCOME' | 'EXPENSE' | 'MUTASI';
  source: string;
  dest?: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-transaksi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaksi.html'
})
export class TransaksiComponent {
  readonly transactions = input.required<Transaction[]>();
  readonly isDarkMode = input.required<boolean>();
}
