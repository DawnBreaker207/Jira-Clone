import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { FilterState, FilterStore } from './filter.store';

@Injectable({
  providedIn: 'root'
})
export class FilterQuery extends Query<FilterState> {
  any$ = this.select(({ searchTerm, userIds, onlyMyIssue, ignoreResolved }) => {
    !!searchTerm || !!userIds?.length || onlyMyIssue || ignoreResolved;
  });
  all$ = this.select();
  userId$ = this.select('userIds');
  onlyMyIssue$ = this.select('onlyMyIssue');
  ignoreResolved$ = this.select('ignoreResolved');
  constructor(protected override store: FilterStore) {
    super(store);
  }
}
