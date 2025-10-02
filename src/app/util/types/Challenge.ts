export interface DayActivity {
  date: string;
  gym: boolean;
  walk: boolean;
}

export interface WeekProgress {
  weekStart: string;
  activities: DayActivity[];
  gymCount: number;
  walkCount: number;
}
