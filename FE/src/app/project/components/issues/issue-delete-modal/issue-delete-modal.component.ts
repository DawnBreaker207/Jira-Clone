import { DeleteIssueModel } from '@/interface/ui-model/delete-issue-mode';
import { ButtonComponent } from '@/jira-control/button/button.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'issue-delete-modal',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './issue-delete-modal.component.html',
  styleUrl: './issue-delete-modal.component.scss'
})
export class IssueDeleteModalComponent {
  issueId!: string;

  onDelete = new EventEmitter<DeleteIssueModel>();
  constructor(private modalRef: NzModalRef) {}

  deleteIssue() {
    this.onDelete.emit(new DeleteIssueModel(this.issueId, this.modalRef));
  }

  closeModal() {
    this.modalRef.close();
  }
}
