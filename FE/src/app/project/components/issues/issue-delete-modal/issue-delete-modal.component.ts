import { DeleteIssueModel } from '@/interface/ui-model/delete-issue-mode';
import { ButtonComponent } from '@/jira-control/button/button.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'issue-delete-modal',
  standalone: true,
  imports: [ButtonComponent, CommonModule, NzModalModule],
  templateUrl: './issue-delete-modal.component.html',
  styleUrl: './issue-delete-modal.component.scss'
})
export class IssueDeleteModalComponent implements OnInit {
  issueId!: string;
  onDelete = new EventEmitter<DeleteIssueModel>();

  constructor(private modalRef: NzModalRef) {}

  ngOnInit(): void {
    const data = this.modalRef.getConfig().nzData;
    this.issueId = data.issueId;
    this.onDelete = data.onDelete;
  }
  deleteIssue() {
    this.onDelete.emit(new DeleteIssueModel(this.issueId, this.modalRef));
  }

  closeModal() {
    this.modalRef.close();
  }
}
