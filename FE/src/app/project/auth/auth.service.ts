import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { environment } from 'src/environments/environment.development';
import { LoginPayload } from './loginPayload';
import { JUser } from '@/interface/user';
import { catchError, finalize, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;
  constructor(
    private http: HttpClient,
    private store: AuthStore
  ) {
    this.baseUrl = environment.apiUrl;
  }

  login({ email = '', password = '' }: LoginPayload) {
    this.store.setLoading(true);
    this.http
      // .get<JUser>(`${this.baseUrl}/auth.json`)
      .get<JUser>(`${this.baseUrl}/auth`)
      .pipe(
        map((user) =>
          this.store.update((state) => ({
            ...state,
            ...user
          }))
        ),
        finalize(() => {
          this.store.setLoading(false);
        }),
        catchError((err) => {
          this.store.setError(err);
          return of(err);
        })
      )
      .subscribe();
  }
}
