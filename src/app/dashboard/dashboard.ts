import { Component, signal, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements AfterViewInit {
  @Output() readonly logoutSuccess = new EventEmitter<void>();

  @ViewChild('cashflowChart') private cashflowChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('settingsDialog') private settingsDialog!: ElementRef<HTMLDialogElement>;
  private chart?: Chart;

  protected readonly username = signal(localStorage.getItem('username') || 'Rizky Chandra');
  protected readonly email = signal(localStorage.getItem('email') || 'test@example.com');
  protected readonly phone = signal(localStorage.getItem('phone') || '081234567890');

  protected readonly isDarkMode = signal(localStorage.getItem('theme') === 'dark');
  protected readonly activeTab = signal(localStorage.getItem('activeTab') || 'dashboard'); // 'dashboard' | 'rekening' | 'transaksi' | 'analitik' | 'profile'
  protected readonly isSidebarCollapsed = signal(false);

  protected editName = '';
  protected editEmail = '';
  protected editPhone = '';

  protected toggleTheme(): void {
    this.isDarkMode.update(val => {
      const newVal = !val;
      localStorage.setItem('theme', newVal ? 'dark' : 'light');
      return newVal;
    });
  }

  protected toggleSidebar(): void {
    this.isSidebarCollapsed.update(val => !val);
  }

  protected setActiveTab(tab: string): void {
    this.activeTab.set(tab);
    localStorage.setItem('activeTab', tab);
  }

  protected openSettingsModal(): void {
    this.editName = this.username();
    this.editEmail = this.email();
    this.editPhone = this.phone();
    this.settingsDialog.nativeElement.showModal();
  }

  protected closeSettingsModal(): void {
    this.settingsDialog.nativeElement.close();
  }

  protected saveSettings(event: Event): void {
    event.preventDefault();
    localStorage.setItem('username', this.editName.trim());
    localStorage.setItem('email', this.editEmail.trim());
    localStorage.setItem('phone', this.editPhone.trim());
    this.username.set(this.editName.trim());
    this.email.set(this.editEmail.trim());
    this.phone.set(this.editPhone.trim());
    this.closeSettingsModal();
  }
  
  // Mock Data Rekening (3-Bucket Strategy)
  protected readonly accounts = signal<Account[]>([
    {
      id: '1',
      name: 'Seabank',
      type: 'BANK',
      role: 'SAVINGS_VAULT',
      balance: 18500000,
      description: 'Dedicated Rekening Khusus Tabungan & Uang Dingin'
    },
    {
      id: '2',
      name: 'BCA',
      type: 'BANK',
      role: 'DAILY_OPERATIONAL',
      balance: 5420000,
      description: 'Rekening Operasional Harian, QRIS, & Tarik Tunai'
    },
    {
      id: '3',
      name: 'Bank Jago',
      type: 'BANK',
      role: 'BILL_SUBSCRIPTION',
      balance: 1280000,
      description: 'Rekening khusus pembayaran otomatis tagihan rutin'
    },
    {
      id: '4',
      name: 'Gopay',
      type: 'E_WALLET',
      role: 'DAILY_OPERATIONAL',
      balance: 650000,
      description: 'Dompet digital untuk operasional/jajan harian'
    }
  ]);

  // Target Tabungan
  protected readonly savingsTarget = 30000000;
  
  // Bulanan Aggregates
  protected readonly monthlyIncome = 6200000;
  protected readonly monthlyExpense = 3500000;
  protected readonly monthlyMutation = 1000000;
  
  // Getters
  protected get totalWealth(): number {
    return this.accounts().reduce((sum, acc) => sum + acc.balance, 0);
  }

  protected get totalSavings(): number {
    return this.accounts()
      .filter(acc => acc.role === 'SAVINGS_VAULT')
      .reduce((sum, acc) => sum + acc.balance, 0);
  }

  protected get savingsPercentage(): number {
    return Math.min(Math.round((this.totalSavings / this.savingsTarget) * 100), 100);
  }

  // Mock Data Transaksi Terakhir
  protected readonly transactions = signal<Transaction[]>([
    {
      id: 'tx-01',
      type: 'INCOME',
      source: 'Work Salary (Freelance)',
      dest: 'BCA',
      amount: 1500000,
      category: 'FREELANCE',
      description: 'Pelunasan Project Web Dev Company Profile',
      date: 'Hari ini, 10:00'
    },
    {
      id: 'tx-02',
      type: 'EXPENSE',
      source: 'Bank Jago',
      amount: 300000,
      category: 'SUBSCRIPTION',
      description: 'Auto-Debit Tagihan Gemini AI Pro & Internet',
      date: 'Kemarin, 08:30'
    },
    {
      id: 'tx-03',
      type: 'MUTASI',
      source: 'BCA',
      dest: 'Seabank',
      amount: 1000000,
      category: 'MUTASI',
      description: 'Alokasi bulanan tabungan uang dingin',
      date: '26 Agu 2026'
    },
    {
      id: 'tx-04',
      type: 'EXPENSE',
      source: 'Gopay',
      amount: 75000,
      category: 'ENTERTAINMENT',
      description: 'Jajan sore & kopi nongkrong',
      date: '25 Agu 2026'
    },
    {
      id: 'tx-05',
      type: 'INCOME',
      source: 'Organization Fee',
      dest: 'BCA',
      amount: 450000,
      category: 'ORGANIZATION_FEE',
      description: 'Urunan lisensi cloud komunitas LISES',
      date: '24 Agu 2026'
    }
  ]);

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initChart();
  }

  private initChart(): void {
    if (!this.cashflowChartCanvas) return;
    const ctx = this.cashflowChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

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
              color: '#94a3b8' // Slate-400
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#64748b' // Slate-500
            }
          },
          y: {
            grid: {
              color: '#334155' // Slate-700
            },
            ticks: {
              color: '#64748b'
            }
          }
        }
      }
    });
  }

  protected onLogout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('activeTab');
    this.logoutSuccess.emit();
  }
}
