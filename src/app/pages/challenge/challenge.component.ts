import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Dumbbell, LucideAngularModule, PersonStanding } from 'lucide-angular';
import { DayActivity, WeekProgress } from './types';
import { ChallengeService } from '../../services/challenge.service';
import { GetChallengeResponse } from '../../util/types/GetChallengeResponse';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.css',
  providers: [DatePipe],
})
export class ChallengeComponent implements OnInit {
  private datePipe: DatePipe;
  weekProgress = signal<WeekProgress | null>(null);
  dumbell = Dumbbell;
  walking = PersonStanding;
  currentChallenge: GetChallengeResponse | null = null;
  errorMsg = '';

  constructor(datePipe: DatePipe, private challengeService: ChallengeService) {
    this.datePipe = datePipe;
  }

  ngOnInit() {
    this.getCurrentChallenge();
    // this.challengeService.initializeWeekProgress();

    // this.weekProgress.set(this.challengeService.currentData);
  }

  toggleGym(day: DayActivity, acitivy: 'gym' | 'walk') {
    this.challengeService.toggleActivity(
      day,
      acitivy,
      this.currentChallenge!.challengeId
    );

    // this.weekProgress.set(this.challengeService.currentData);
  }

  getDayName(date: string): string {
    const dayDate = new Date(date);
    return dayDate
      .toLocaleDateString('pt-BR', { weekday: 'long' })
      .replace('-feira', '');
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || date;
  }

  isToday(date: string): boolean {
    const today = new Date().toISOString().split('T')[0];
    return date === today;
  }

  getCurrentChallenge(): void {
    this.challengeService.getAll().subscribe({
      next: (response) => (this.currentChallenge = response),
      error: (error) => (this.errorMsg = error.message),
    });
  }
}
