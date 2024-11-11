import { JIssue } from '@/interface/issue';
import { IssuePriorityIcon } from '@/interface/issue-priority-icon';
import { JUser } from '@/interface/user';
import { ProjectQuery } from '@/project/state/project/project.query';
import { IssueUtil } from '@/project/utils/issue';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { IssueModalComponent } from '../issue-modal/issue-modal.component';
import { SvgIconComponent } from '@/jira-control/svg-icon/svg-icon.component';
import { AvatarComponent } from '@/jira-control/avatar/avatar.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
@Component({
  selector: 'issue-card',
  standalone: true,
  imports: [SvgIconComponent, AvatarComponent, NzToolTipModule],
  templateUrl: './issue-card.component.html',
  styleUrl: './issue-card.component.scss'
})
export class IssueCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() issue!: JIssue;
  assignees!: JUser[];
  issueTypeIcon!: string;
  priorityIcon!: IssuePriorityIcon;
  private destroyed$ = new Subject<void>();
  constructor(
    private projectQuery: ProjectQuery,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.projectQuery.users$.pipe(takeUntil(this.destroyed$)).subscribe((users) => {
      this.assignees = this.issue.userIds.map(
        (userId) => users.find((x) => x.id === userId) ?? ({} as JUser)
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const issueChange = changes['issue'];
    if (issueChange?.currentValue !== issueChange.previousValue) {
      this.issueTypeIcon = IssueUtil.getIssueTypeIcon(this.issue.type);
      this.priorityIcon = IssueUtil.getIssuePriorityIcon(this.issue.priority);
    }
  }

  openIssueModal(issueId: string) {
    this.modalService.create({
      nzContent: IssueModalComponent,
      nzWidth: 1040,
      nzClosable: false,
      nzFooter: null,
      nzData: {
        issue$: this.projectQuery.issueById$(issueId)
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
