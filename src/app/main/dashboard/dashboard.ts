import { Component, signal, ViewChild, ElementRef, AfterViewInit, input, effect, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

interface Account {
  id: string;
  name: string;
  type: 'BANK' | 'E_WALLET';
  role: 'SAVINGS_VAULT' | 'DAILY_OPERATIONAL' | 'BILL_SUBSCRIPTION';
  balance: number;
  description: string;
}

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
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class OverviewComponent implements AfterViewInit {
  // Inputs as signals
  readonly accounts = input.required<Account[]>();
  readonly transactions = input.required<Transaction[]>();
  readonly monthlyIncome = input.required<number>();
  readonly monthlyExpense = input.required<number>();
  readonly monthlyMutation = input.required<number>();
  readonly savingsTarget = input.required<number>();
  readonly isDarkMode = input.required<boolean>();

  @Output() readonly viewAllTransactions = new EventEmitter<void>();

  @ViewChild('cashflowChart') private cashflowChartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  // Local getters
  protected get totalWealth(): number {
    return this.accounts().reduce((sum, acc) => sum + acc.balance, 0);
  }

  protected get totalSavings(): number {
    return this.accounts()
      .filter(acc => acc.role === 'SAVINGS_VAULT')
      .reduce((sum, acc) => sum + acc.balance, 0);
  }

  protected get savingsPercentage(): number {
    return Math.min(Math.round((this.totalSavings / this.savingsTarget()) * 100), 100);
  }

  constructor() {
    // Recreate the chart automatically when theme changes
    effect(() => {
      const _ = this.isDarkMode();
      if (this.cashflowChartCanvas) {
        this.initChart();
      }
    });
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  private initChart(): void {
    if (!this.cashflowChartCanvas) return;
    const ctx = this.cashflowChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const isDark = this.isDarkMode();
    const labelColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mei', 'Jun', 'Jul', 'Agu'],
        datasets: [
          {
            label: 'Pemasukan (Income)',
            data: [4200000, 5800000, 4900000, 6200000],
            backgroundColor: 'rgba(16, 185, 129, 0.85)', // Emerald Green
            borderRadius: 6,
          },
          {
            label: 'Pengeluaran (Expense)',
            data: [2800000, 3100000, 2400000, 3500000],
            backgroundColor: 'rgba(244, 63, 94, 0.85)', // Crimson Rose
            borderRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: labelColor
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: labelColor
            }
          },
          y: {
            grid: {
              color: gridColor
            },
            ticks: {
              color: labelColor
            }
          }
        }
      }
    });
  }
}
