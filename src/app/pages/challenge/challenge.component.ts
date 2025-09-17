import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Dumbbell, LucideAngularModule, PersonStanding } from 'lucide-angular';
import { DayActivity, WeekProgress } from './types';
import { ChallengeService } from '../../services/challenge.service';

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

  constructor(datePipe: DatePipe, private challengeService: ChallengeService) {
    this.datePipe = datePipe;
  }

  ngOnInit() {
    this.challengeService.initializeWeekProgress();

    this.weekProgress.set(this.challengeService.currentData);
  }

  toggleGym(day: DayActivity, acitivy: 'gym' | 'walk') {
    this.challengeService.toggleActivity(day, acitivy);

    this.weekProgress.set(this.challengeService.currentData);
  }

  getDayName(date: string): string {
    console.log('Getting day name for date:', date);
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
}
