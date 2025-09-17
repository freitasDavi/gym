export interface DayActivity {
  date: string;
  gym: boolean;
  walk: boolean;
}

export interface WeekProgress {
  weekStart: string; // Starting date of the week
  activities: DayActivity[];
  gymCount: number;
  walkCount: number;
}
