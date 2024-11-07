import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  user$ = this.select();
  userId$ = this.select('id');

  constructor(protected override store: AuthStore) {
    super(store);
  }
}
