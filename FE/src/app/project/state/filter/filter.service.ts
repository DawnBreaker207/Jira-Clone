import { Injectable } from '@angular/core';
import { createInitialFilterState, FilterStore } from './filter.store';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private store: FilterStore) {}
  updateSearchTerm(searchTerm: string) {
    this.store.update({ searchTerm });
  }

  toggleUserId(userId: string) {
    this.store.update((state) => {
      const hasUser = state.userIds.includes(userId);
      const userIds = hasUser
        ? state.userIds.filter((x) => x !== userId)
        : [...state.userIds, userId];
      return {
        ...state,
        userIds
      };
    });
  }

  toggleOnlyMyIssue() {
    this.store.update((state) => {
      const onlyMyIssue = !state.onlyMyIssue;
      return {
        ...state,
        onlyMyIssue
      };
    });
  }

  toggleIgnoreResolve() {
    this.store.update((state) => {
      const ignoreResolver = !state.ignoreResolved;
      return {
        ...state,
        ignoreResolver
      };
    });
  }

  resetAll() {
    this.store.update((state) => ({
      ...state,
      ...createInitialFilterState()
    }));
  }
}
