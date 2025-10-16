import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetTreinoResponse, GetTreinosResponse } from '../util/types/Treinos';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TreinosService {
  treinoAtivo: null = null;

  private http = inject(HttpClient);
  private urlApi = 'https://localhost:7005/api/treino';

  getUserTreinos() {
    return this.http
      .get<GetTreinosResponse[]>(this.urlApi + '?userId=1')
      .pipe(catchError(this.handleError));
  }

  getSelectedTreino(treinoId: number) {
    return this.http
      .get<GetTreinoResponse>(this.urlApi + `/${treinoId}?userId=1`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }

    console.error(errorMessage);

    return throwError(() => errorMessage);
  }
}
