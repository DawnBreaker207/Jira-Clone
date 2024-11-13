import { JIssue } from '@/interface/issue';
import { JUser } from '@/interface/user';
import { ProjectService } from '@/project/state/project/project.service';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UserComponent } from '../../user/user.component';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { ButtonComponent } from '@/jira-control/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'issue-reporter',
  standalone: true,
  imports: [ButtonComponent, NzDropDownModule, UserComponent, NzNoAnimationModule, CommonModule],
  templateUrl: './issue-reporter.component.html',
  styleUrl: './issue-reporter.component.scss'
})
export class IssueReporterComponent implements OnDestroy, OnChanges {
  @Input() issue!: JIssue;
  @Input() users!: JUser[];
  reporter!: JUser;
  private destroyed$ = new Subject<void>();

  constructor(private projectService: ProjectService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const issueChange = changes['issue'];
    if (this.users && issueChange.currentValue !== issueChange.previousValue) {
      this.reporter = this.users.find((x) => x.id === this.issue.reporterId) as JUser;
    }
  }

  isUserSelected(user: JUser) {
    return user.id === this.issue.reporterId;
  }

  updateIssue(user: JUser) {
    this.projectService.updateIssue({ ...this.issue, reporterId: user.id });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
