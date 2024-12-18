import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PollingService } from '../services/polling.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-polling-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './polling-component.component.html',
  styleUrls: ['./polling-component.component.css']
})
export class PollingComponent implements OnInit, OnDestroy {
  numbers: number[] = [];
  primeSum: number = 0;
  private pollingSubscription!: Subscription;

  constructor(private pollingService: PollingService) { }

  ngOnInit(): void {
    this.startPolling();
  }

  startPolling(): void {
    this.pollingSubscription = interval(3000)
      .pipe(
        switchMap(() => this.pollingService.getRandomNumbers())
      )
      .subscribe({
        next: (response) => {
          const newNumbers = response.map((item) => item.random);
          this.numbers.push(...newNumbers);
        },
        error: (error) => {
          console.error('Error fetching numbers:', error);
        }
      });
  }

  stopPolling(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();

      this.primeSum = this.calculatePrimeSum(this.numbers);
    }
  }

  calculatePrimeSum(numbers: number[]): number {
    return numbers
      .filter(this.isPrime)
      .reduce((sum, num) => sum + num, 0);
  }

  isPrime(num: number): boolean {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }
}
