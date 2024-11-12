import { IssueStatus, IssueStatusDisplay, JIssue } from '@/interface/issue';
import { ProjectQuery } from '@/project/state/project/project.query';
import { ProjectService } from '@/project/state/project/project.service';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../jira-control/button/button.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';

@Component({
  selector: 'issue-status',
  standalone: true,
  imports: [ButtonComponent, NzDropDownModule, NzNoAnimationModule],
  templateUrl: './issue-status.component.html',
  styleUrl: './issue-status.component.scss'
})
export class IssueStatusComponent implements OnInit {
  @Input() issue!: JIssue;
  IssueStatusDisplay = IssueStatusDisplay;

  variants = {
    [IssueStatus.BACKLOG]: 'btn-secondary',
    [IssueStatus.SELECTED]: 'btn-secondary',
    [IssueStatus.IN_PROGRESS]: 'btn-primary',
    [IssueStatus.DONE]: 'btn-success'
  };

  issueStatues!: IssueStatusValueTitle[];
  constructor(
    private projectService: ProjectService,
    private projectQuery: ProjectQuery
  ) {}

  ngOnInit(): void {
    this.issueStatues = [
      new IssueStatusValueTitle(IssueStatus.BACKLOG),
      new IssueStatusValueTitle(IssueStatus.SELECTED),
      new IssueStatusValueTitle(IssueStatus.IN_PROGRESS),
      new IssueStatusValueTitle(IssueStatus.DONE)
    ];
  }

  updateIssue(status: IssueStatus) {
    const newPosition = this.projectQuery.lastIssuePosition(status);
    this.projectService.updateIssue({
      ...this.issue,
      status,
      listPosition: newPosition + 1
    });
  }

  isStatusSelected(status: IssueStatus) {
    return this.issue.status === status;
  }
}

class IssueStatusValueTitle {
  value!: IssueStatus;
  label!: string;
  constructor(issueStatus: IssueStatus) {
    this.value = issueStatus;
    this.label = IssueStatusDisplay[issueStatus];
  }
}
