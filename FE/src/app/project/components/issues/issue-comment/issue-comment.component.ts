import { JComment } from '@/interface/comment';
import { JUser } from '@/interface/user';
import { ProjectService } from '@/project/state/project/project.service';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonComponent } from '@/jira-control/button/button.component';
import { AvatarComponent } from '@/jira-control/avatar/avatar.component';
import { AuthQuery } from '@/project/auth/auth.query';
import { TextFieldModule } from '@angular/cdk/text-field';
@Component({
  selector: 'issue-comment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AvatarComponent,
    ButtonComponent,
    DatePipe,
    CommonModule,
    TextFieldModule
  ],
  templateUrl: './issue-comment.component.html',
  styleUrl: './issue-comment.component.scss'
})
export class IssueCommentComponent implements OnInit, OnDestroy {
  @Input() issueId!: string;
  @Input() comment!: JComment;
  @Input() createMode!: boolean;
  // TODO: Learn this
  @ViewChild('commentBoxRef') commentBoxRef!: ElementRef;
  commentControl!: FormControl;
  user!: JUser;
  isEditing!: boolean;
  private destroyed$ = new Subject<void>();

  constructor(
    private authQuery: AuthQuery,
    private projectService: ProjectService
  ) {}
  // TODO: Learn this
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!this.createMode || this.isEditing) {
      return;
    }
    if (event.key === 'M') {
      this.commentBoxRef.nativeElement.focus();
      this.isEditing = true;
    }
  }
  ngOnInit(): void {
    this.commentControl = new FormControl('');
    this.authQuery.user$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      this.user = user;
      if (this.createMode) {
        this.comment = new JComment(this.issueId, this.user);
      }
    });
  }

  setCommentEdit(mode: boolean) {
    this.isEditing = mode;
  }

  addComment() {
    const now = new Date();
    this.projectService.updateIssueComment(this.issueId, {
      ...this.comment,
      id: `${now.getTime()}`,
      createAt: now.toISOString(),
      updatedAt: now.toISOString(),
      body: this.commentControl.value
    });
    this.cancelAddComment();
  }

  cancelAddComment() {
    this.commentControl.patchValue('');
    this.setCommentEdit(false);
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
