import { JIssue } from '@/interface/issue';
import { JUser } from '@/interface/user';
import { ProjectService } from '@/project/state/project/project.service';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UserComponent } from '../../user/user.component';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Subject } from 'rxjs';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { SvgIconComponent } from '@/jira-control/svg-icon/svg-icon.component';
import { ButtonComponent } from '@/jira-control/button/button.component';
@Component({
  selector: 'issue-assignees',
  standalone: true,
  imports: [
    ButtonComponent,
    SvgIconComponent,
    UserComponent,
    CommonModule,
    NzDropDownModule,
    NzNoAnimationModule
  ],
  templateUrl: './issue-assignees.component.html',
  styleUrl: './issue-assignees.component.scss'
})
export class IssueAssigneesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() issue!: JIssue;
  @Input() users!: JUser[];
  private destroyed$ = new Subject<void>();
  assignees!: JUser[];
  constructor(private projectService: ProjectService) {}
  ngOnInit(): void {
    this.assignees = this.issue.userIds.map(
      (userId) => this.users.find((x) => x.id === userId) as JUser
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const issueChange = changes['issue'];
    if (this.users && issueChange.currentValue !== issueChange.previousValue) {
      this.assignees = this.issue.userIds.map(
        (userId) => this.users.find((x) => x.id === userId) as JUser
      );
    }
  }

  removeUser(userId: string) {
    const newUserIds = this.issue.userIds.filter((x) => x !== userId);
    this.projectService.updateIssue({
      ...this.issue,
      userIds: newUserIds
    });
  }

  addUserToIssue(user: JUser) {
    this.projectService.updateIssue({
      ...this.issue,
      userIds: [...this.issue.userIds, user.id]
    });
  }

  isUserSelected(user: JUser): boolean {
    return this.issue.userIds.includes(user.id);
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
