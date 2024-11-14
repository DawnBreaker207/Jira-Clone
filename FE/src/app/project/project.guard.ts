import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { catchError, combineLatest, filter, map, Observable, of, switchMap, take } from 'rxjs';
import { ProjectQuery } from './state/project/project.query';
import { ProjectService } from './state/project/project.service';
import { ProjectState } from './state/project/project.store';

export const projectGuard: CanActivateFn = (route, state) => {
  const projectQuery = inject(ProjectQuery);
  const projectService = inject(ProjectService);
  const getFromStoreOrApi = (): Observable<ProjectState> => {
    return combineLatest([projectQuery.all$, projectQuery.isLoading$]).pipe(
      map(([state, loading]) => {
        if (!loading) {
          projectService.getProject();
        }
        return state;
      }),
      filter((state) => !!state.id),
      take(1),
      catchError((error) => of(error))
    );
  };
  return getFromStoreOrApi().pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};
