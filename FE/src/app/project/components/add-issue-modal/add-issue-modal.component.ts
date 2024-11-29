import { AutofocusDirective } from '@/core/directives/autofocus.directive';
import { NoWhitespaceValidator } from '@/core/validators/no-whitespace.validator';
import { IssuePriority, IssueStatus, IssueType, JIssue } from '@/interface/issue';
import { JUser } from '@/interface/user';
import { ButtonComponent } from '@/jira-control/button/button.component';
import { quillConfiguration } from '@/project/config/editor';
import { ProjectQuery } from '@/project/state/project/project.query';
import { ProjectService } from '@/project/state/project/project.service';
import { DateUtil } from '@/project/utils/date';
import { IssueUtil } from '@/project/utils/issue';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { QuillModule } from 'ngx-quill';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { IssueAssigneesSelectComponent } from './issue-assignees-select/issue-assignees-select.component';
import { IssuePrioritySelectComponent } from './issue-priority-select/issue-priority-select.component';
import { IssueReporterSelectComponent } from './issue-reporter-select/issue-reporter-select.component';
import { IssueTypeSelectComponent } from './issue-type-select/issue-type-select.component';

@Component({
  selector: 'app-add-issue-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzModalModule,
    ButtonComponent,
    IssueAssigneesSelectComponent,
    IssueReporterSelectComponent,
    IssuePrioritySelectComponent,
    IssueTypeSelectComponent,
    QuillModule,
    AsyncPipe,
    AutofocusDirective,
    CommonModule
  ],
  providers: [ProjectQuery, ProjectService],
  templateUrl: './add-issue-modal.component.html',
  styleUrl: './add-issue-modal.component.scss'
})
export class AddIssueModalComponent implements OnInit, OnDestroy {
  reporterUsers$!: Observable<JUser[]>;
  assignees$!: Observable<JUser[]>;
  issueForm!: FormGroup;
  editorOptions = quillConfiguration;
  destroyed$ = new Subject<void>();

  get f() {
    return this.issueForm.controls as any;
  }

  constructor(
    private fb: FormBuilder,
    private modelRef: NzModalRef,
    private projectService: ProjectService,
    private projectQuery: ProjectQuery
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.reporterUsers$ = this.projectQuery.users$.pipe(
      takeUntil(this.destroyed$),
      tap((users) => {
        const [user] = users;
        if (user) {
          this.f.reporterId.patchValue(user.id);
        }
      })
    );
    this.assignees$ = this.projectQuery.users$;
  }

  initForm() {
    this.issueForm = this.fb.group({
      type: [IssueType.TASK],
      priority: [IssuePriority.MEDIUM],
      title: ['', NoWhitespaceValidator()],
      description: [''],
      reporterId: [''],
      userIds: [[]]
    });
  }

  submitForm() {
    if (this.issueForm.invalid) {
      return;
    }
    const now = DateUtil.getNow();
    const issue: JIssue = {
      ...this.issueForm.getRawValue(),
      id: IssueUtil.getRandomId(),
      status: IssueStatus.BACKLOG,
      createdAt: now,
      updatedAt: now
    };

    this.projectService.updateIssue(issue);
    this.closeModal();
  }

  cancel() {
    this.closeModal();
  }

  closeModal() {
    this.modelRef.close();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
