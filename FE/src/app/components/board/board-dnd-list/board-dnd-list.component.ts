import { IssueStatus, IssueStatusDisplay, JIssue } from '@/interface/issue';
import { FilterQuery } from '@/project/state/filter/filter.query';
import { FilterState } from '@/project/state/filter/filter.store';
import { ProjectService } from '@/project/state/project/project.service';
import { IssueUtil } from '@/project/utils/issue';
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import dateFns from 'date-fns';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: '[board-dnd-list]',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './board-dnd-list.component.html',
  styleUrl: './board-dnd-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BoardDndListComponent implements OnInit, OnDestroy {
  @Input() status!: IssueStatus;
  @Input() currentUserId!: string;
  @Input() issues$!: Observable<JIssue[]>;

  IssueStatusDisplay = IssueStatusDisplay;
  issues: JIssue[] = [];

  get issuesCount(): number {
    return this.issues.length;
  }
  constructor(
    private projectService: ProjectService,
    private filterQuery: FilterQuery
  ) {}

  private destroyed$ = new Subject<void>();
  ngOnInit(): void {
    combineLatest([this.issues$, this.filterQuery.all$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([issues, filter]) => {
        this.issues = this.filterIssues(issues, filter);
      });
  }

  drop(event: CdkDragDrop<JIssue[]>) {
    const newIssue: JIssue = { ...event.item.data };
    const newIssues = [...event.container.data];

    if (event.previousContainer === event.container) {
      moveItemInArray(newIssues, event.previousIndex, event.currentIndex);
      this.updateListPosition(newIssues);
    } else {
      event.previousContainer.data, newIssues, event.previousIndex, event.currentIndex;
    }
    this.updateListPosition(newIssues);
    newIssue.status = event.container.id as IssueStatus;
    this.projectService.updateIssue(newIssue);
  }

  filterIssues(issues: JIssue[], filter: FilterState): JIssue[] {
    const { onlyMyIssue, ignoreResolved, searchTerm, userIds } = filter;

    return issues.filter((issue) => {
      const isMatchTerm = searchTerm ? IssueUtil.searchString(issue.title, searchTerm) : true;

      const isIncludeUsers = userIds.length
        ? issue.userIds.some((userId) => userIds.includes(userId))
        : true;

      const isMyIssue = onlyMyIssue
        ? this.currentUserId && issue.userIds.includes(this.currentUserId)
        : true;

      const isIgnoreResolved = ignoreResolved ? issue.status !== IssueStatus.DONE : true;

      return isMatchTerm && isIncludeUsers && isMyIssue && isIgnoreResolved;
    });
  }

  isDateWithinThreeDaysFromNow(date: string) {
    const now = new Date();
    const inputDate = new Date(date);
    return dateFns.isAfter(inputDate, dateFns.subDays(now, 3));
  }

  private updateListPosition(newList: JIssue[]) {
    newList.forEach((issue, idx) => {
      const newIssueWithNewPosition = { ...issue, listPosition: idx + 1 };
      this.projectService.updateIssue(newIssueWithNewPosition);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
