import { Injectable } from '@angular/core';
import { WeekProgress, DayActivity } from '../util/types/Challenge';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  weekProgressKey = 'weekProgress';
  currentData: WeekProgress | null = null;

  getWeekProgress() {
    const savedProgress = localStorage.getItem(this.weekProgressKey);

    if (savedProgress) {
      return JSON.parse(savedProgress) as WeekProgress;
    }

    return null;
  }

  initializeWeekProgress() {
    var storedData = this.getWeekProgress();

    const today = new Date();
    const todayInArray = today.getDay();
    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - todayInArray)
    );

    const weekProgress: WeekProgress = {
      gymCount: 0,
      walkCount: 0,
      weekStart: firstDayOfWeek.toISOString().split('T')[0],
      activities: [],
    };

    if (
      storedData !== null &&
      storedData.weekStart === firstDayOfWeek.toISOString().split('T')[0]
    ) {
      this.currentData = storedData;

      return;
    }

    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      const dayActivity: DayActivity = {
        date: date.toISOString().split('T')[0],
        gym: false,
        walk: false,
      };
      weekProgress.activities.push(dayActivity);
    }

    this.currentData = weekProgress;
  }

  toggleActivity(day: DayActivity, activity: 'gym' | 'walk') {
    if (!this.currentData) return;

    const newProgress = { ...this.currentData };
    const dayIndex = newProgress.activities.findIndex(
      (d: DayActivity) => d.date === day.date
    );

    if (dayIndex !== -1) {
      newProgress.activities[dayIndex] = {
        ...newProgress.activities[dayIndex],
        [activity]: !newProgress.activities[dayIndex][activity],
      };

      // Update counts
      newProgress.gymCount = newProgress.activities.filter(
        (d: DayActivity) => d.gym
      ).length;
      newProgress.walkCount = newProgress.activities.filter(
        (d: DayActivity) => d.walk
      ).length;

      this.currentData = newProgress;
      this.saveProgress();
    }
  }

  private saveProgress() {
    localStorage.setItem(
      this.weekProgressKey,
      JSON.stringify(this.currentData)
    );
  }
}
