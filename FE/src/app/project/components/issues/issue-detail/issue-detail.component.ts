import { JIssue } from '@/interface/issue';
import { DeleteIssueModel } from '@/interface/ui-model/delete-issue-mode';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IssueTypeComponent } from '../issue-type/issue-type.component';
import { IssueTitleComponent } from '../issue-title/issue-title.component';
import { IssueCommentsComponent } from '../issue-comments/issue-comments.component';
import { IssueStatusComponent } from '../issue-status/issue-status.component';
import { IssueReporterComponent } from '../issue-reporter/issue-reporter.component';
import { IssueAssigneesComponent } from '../issue-assigness/issue-assignees.component';
import { IssuePriorityComponent } from '../issue-priority/issue-priority.component';
import { IssueLoaderComponent } from '../issue-loader/issue-loader.component';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { ButtonComponent } from '@/jira-control/button/button.component';
import { ProjectQuery } from '@/project/state/project/project.query';
import { IssueDescriptionComponent } from '../issue-description/issue-description.component';

@Component({
  selector: 'issue-detail',
  standalone: true,
  imports: [
    IssueTypeComponent,
    ButtonComponent,
    IssueTitleComponent,
    IssueDescriptionComponent,
    IssueCommentsComponent,
    IssueStatusComponent,
    IssueReporterComponent,
    IssueAssigneesComponent,
    IssuePriorityComponent,
    IssueLoaderComponent,
    DatePipe,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './issue-detail.component.html',
  styleUrl: './issue-detail.component.scss'
})
export class IssueDetailComponent {
  @Input() issue!: JIssue;
  @Input() isShowFullScreenButton!: boolean;
  @Input() isShowCloseButton!: boolean;
  @Output() onClosed = new EventEmitter();
  @Output() onOpenIssue = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<DeleteIssueModel>();

  constructor(
    public projectQuery: ProjectQuery,
    private modalService: NzModalService
  ) {}

  openDeleteIssueModal() {
    this.modalService.create({
      // nzContent: ,
      nzClosable: false,
      nzFooter: null,
      nzStyle: {
        top: '140px'
      },
      nzData: {
        issueId: this.issue.id,
        onDelete: this.onDelete
      }
    });
  }

  closeModal() {
    this.onClosed.emit();
  }
  openIssuePage() {
    this.onOpenIssue.emit(this.issue.id);
  }
}
