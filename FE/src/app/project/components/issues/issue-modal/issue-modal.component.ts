import { JIssue } from '@/interface/issue';
import { DeleteIssueModel } from '@/interface/ui-model/delete-issue-mode';
import { ProjectService } from '@/project/state/project/project.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { IssueDetailComponent } from '../issue-detail/issue-detail.component';

@Component({
  selector: 'issue-modal',
  standalone: true,
  imports: [CommonModule, IssueDetailComponent],
  providers: [ProjectService],
  templateUrl: './issue-modal.component.html',
  styleUrl: './issue-modal.component.scss'
})
export class IssueModalComponent implements OnInit {
  readonly issue$: Observable<JIssue> = inject(NZ_MODAL_DATA).issue$;
  // @Input() issue$!: Observable<JIssue>;

  ngOnInit(): void {}
  constructor(
    private modal: NzModalRef,
    private router: Router,
    private projectService: ProjectService
  ) {}

  closeModal() {
    this.modal.close();
  }

  openIssuePage(issueId: string) {
    this.closeModal();
    this.router.navigate(['project', 'issue', issueId]);
  }

  deleteIssue({ issueId, deleteModalRef }: DeleteIssueModel) {
    this.projectService.deleteIssue(issueId);
    deleteModalRef.close();
    this.closeModal();
  }
}
