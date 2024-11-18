import { JIssue } from '@/interface/issue';
import { DeleteIssueModel } from '@/interface/ui-model/delete-issue-mode';
import { ButtonComponent } from '@/jira-control/button/button.component';
import { ProjectQuery } from '@/project/state/project/project.query';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IssueAssigneesComponent } from '../issue-assigness/issue-assignees.component';
import { IssueCommentsComponent } from '../issue-comments/issue-comments.component';
import { IssueDescriptionComponent } from '../issue-description/issue-description.component';
import { IssueLoaderComponent } from '../issue-loader/issue-loader.component';
import { IssuePriorityComponent } from '../issue-priority/issue-priority.component';
import { IssueReporterComponent } from '../issue-reporter/issue-reporter.component';
import { IssueStatusComponent } from '../issue-status/issue-status.component';
import { IssueTitleComponent } from '../issue-title/issue-title.component';
import { IssueTypeComponent } from '../issue-type/issue-type.component';
import { ProjectService } from '@/project/state/project/project.service';
import { IssueDeleteModalComponent } from '../issue-delete-modal/issue-delete-modal.component';

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
  providers: [ProjectService, ProjectQuery],
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
      nzContent: IssueDeleteModalComponent,
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
