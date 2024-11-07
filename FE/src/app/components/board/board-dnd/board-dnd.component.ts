import { AuthQuery } from '@/auth/auth.query';
import { IssueStatus } from '@/interface/issue';
import { ProjectQuery } from '@/project/state/project/project.query';
import { Component } from '@angular/core';

@Component({
  selector: 'board-dnd',
  standalone: true,
  imports: [],
  templateUrl: './board-dnd.component.html',
  styleUrl: './board-dnd.component.scss'
})
export class BoardDndComponent {
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
}
