import { JIssue } from '@/interface/issue';
import { DeleteIssueModel } from '@/interface/ui-model/delete-issue-mode';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectQuery } from '../../../project/state/project/project.query';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-issue-detail',
  standalone: true,
  imports: [],
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
