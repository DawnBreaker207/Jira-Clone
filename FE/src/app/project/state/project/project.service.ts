import { JComment } from '@/interface/comment';
import { JIssue } from '@/interface/issue';
import { JProject } from '@/interface/project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { arrayRemove, arrayUpsert, setLoading } from '@datorama/akita';
import { catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateUtil } from '../../utils/date';
import { ProjectStore } from './project.store';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    private store: ProjectStore
  ) {
    this.baseUrl = environment.apiUrl;
  }

  setLoading(isLoading: boolean) {
    this.store.setLoading(isLoading);
  }

  getProject() {
    this.http
      // .get<JProject>(`${this.baseUrl}/project.json`)
      .get<JProject>(`${this.baseUrl}/project`)
      .pipe(
        setLoading(this.store),
        tap((project) => {
          this.store.update((state) => ({
            ...state,
            ...project
          }));
        }),
        catchError((error) => {
          this.store.setError(error);
          return of(error);
        })
      )
      .subscribe();
  }

  updateProject(project: Partial<JProject>) {
    this.store.update((state) => ({
      ...state,
      ...project
    }));
  }

  updateIssue(issue: JIssue) {
    issue.updatedAt = DateUtil.getNow();
    this.store.update((state) => {
      const issues = arrayUpsert(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
  }

  deleteIssue(issueId: string) {
    this.store.update((state) => {
      const issues = arrayRemove(state.issues, issueId);

      return {
        ...state,
        issues
      };
    });
  }

  updateIssueComment(issueId: string, comment: JComment) {
    const allIssues = this.store.getValue().issues;
    const issue = allIssues.find((x) => x.id === issueId);
    if (!issue) {
      return;
    }

    const comments = arrayUpsert(issue.comments ?? [], comment.id, comment);
    this.updateIssue({
      ...issue,
      comments
    });
  }
}
