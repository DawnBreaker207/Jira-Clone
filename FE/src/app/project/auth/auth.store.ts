import { JUser } from '@/interface/user';
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState extends JUser {
  token: string;
}
export function createInitialAuthState(): AuthState {
  return { token: `${new Date().getTime()}` } as AuthState;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'auth'
})
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialAuthState());
  }
}
