export interface Activity {
  id: number;
  date: string;
  gym: boolean;
  walk: boolean;
  weekId: number;
}

export interface GetChallengeResponse {
  id: number;
  gymCount: number;
  gymMeta: number;
  walkMeta: number;
  walkCount: number;
  challengeId: number;
  activities: Activity[];
  activityName: string;
}
