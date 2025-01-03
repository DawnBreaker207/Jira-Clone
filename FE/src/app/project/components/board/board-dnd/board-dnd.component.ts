import { IssueStatus } from '@/interface/issue';
import { ProjectQuery } from '@/project/state/project/project.query';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BoardDndListComponent } from '../board-dnd-list/board-dnd-list.component';
import { AuthQuery } from '@/project/auth/auth.query';
import { DragDropModule } from '@angular/cdk/drag-drop';
@Component({
  selector: 'board-dnd',
  standalone: true,
  imports: [AsyncPipe, BoardDndListComponent, CommonModule, DragDropModule],
  providers: [ProjectQuery, AuthQuery],
  templateUrl: './board-dnd.component.html',
  styleUrl: './board-dnd.component.scss'
})
export class BoardDndComponent implements OnDestroy {
  private destroyed$ = new Subject<void>();
  issueStatues: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE
  ];

  constructor(
    public projectQuery: ProjectQuery,
    public authQuery: AuthQuery
  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
