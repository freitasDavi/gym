import { inject, Injectable } from '@angular/core';
import { WeekProgress, DayActivity } from '../util/types/Challenge';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GetChallengeResponse } from '../util/types/GetChallengeResponse';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  weekProgressKey = 'weekProgress';
  currentData: GetChallengeResponse | null = null;
  private http = inject(HttpClient);
  private urlApi = 'https://localhost:7005/api/Challenge';

  getWeekProgress() {
    const savedProgress = localStorage.getItem(this.weekProgressKey);

    if (savedProgress) {
      return JSON.parse(savedProgress) as WeekProgress;
    }

    return null;
  }

  initializeWeekProgress() {
    // var storedData = this.getWeekProgress();
    // const today = new Date();
    // const todayInArray = today.getDay();
    // const firstDayOfWeek = new Date(
    //   today.setDate(today.getDate() - todayInArray)
    // );
    // const weekProgress: WeekProgress = {
    //   gymCount: 0,
    //   walkCount: 0,
    //   weekStart: firstDayOfWeek.toISOString().split('T')[0],
    //   activities: [],
    // };
    // if (
    //   storedData !== null &&
    //   storedData.weekStart === firstDayOfWeek.toISOString().split('T')[0]
    // ) {
    //   this.currentData = storedData;
    //   return;
    // }
    // for (let i = 0; i < 7; i++) {
    //   const date = new Date(firstDayOfWeek);
    //   date.setDate(firstDayOfWeek.getDate() + i);
    //   const dayActivity: DayActivity = {
    //     date: date.toISOString().split('T')[0],
    //     gym: false,
    //     walk: false,
    //   };
    //   weekProgress.activities.push(dayActivity);
    // }
    // this.currentData = weekProgress;
  }

  toggleActivity(
    day: DayActivity,
    activity: 'gym' | 'walk',
    challengeId: number
  ) {
    var body = {
      userId: 1,
      challengeId: challengeId,
      day: day.date,
      activityType: activity === 'gym' ? 0 : 1,
    };

    console.log(body);

    return this.http.put(this.urlApi, body).subscribe({
      next: (response) =>
        console.log('Atividade atualizada com sucesso', response),
      error: (error) => console.error('Erro ao atualizar atividade', error),
    });
  }

  private saveProgress() {
    localStorage.setItem(
      this.weekProgressKey,
      JSON.stringify(this.currentData)
    );
  }

  getAll(): Observable<GetChallengeResponse> {
    return this.http
      .get<GetChallengeResponse>(this.urlApi + '?userId=1')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro! Verifique sua conexão`;
    } else {
      errorMessage = `Erro interno. Tente novamente mais tarde.`;
    }

    console.error(errorMessage);

    return throwError(() => errorMessage);
  }
}
