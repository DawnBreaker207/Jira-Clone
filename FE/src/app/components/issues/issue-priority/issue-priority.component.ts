import { ProjectConst } from '@/config/const';
import { IssuePriority, JIssue } from '@/interface/issue';
import { IssuePriorityIcon } from '@/interface/issue-priority-icon';
import { ProjectService } from '@/project/state/project/project.service';
import { IssueUtil } from '@/project/utils/issue';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ButtonComponent } from '../../../jira-control/button/button.component';
import { SvgIconComponent } from '../../../jira-control/svg-icon/svg-icon.component';

@Component({
  selector: 'issue-priority',
  standalone: true,
  imports: [SvgIconComponent, ButtonComponent, NzDropDownModule],
  templateUrl: './issue-priority.component.html',
  styleUrl: './issue-priority.component.scss'
})
export class IssuePriorityComponent implements OnInit, OnChanges {
  @Input() issue!: JIssue;

  selectedPriority!: IssuePriority;

  get selectedPriorityIcon() {
    return IssueUtil.getIssuePriorityIcon(this.selectedPriority);
  }

  priorities!: IssuePriorityIcon[];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.priorities = ProjectConst.PrioritiesWithIcon;
  }

  ngOnChanges(): void {
    this.selectedPriority = this.issue.priority;
  }
  isPrioritySelected(priority: IssuePriority) {
    return priority === this.selectedPriority;
  }

  updateIssue(priority: IssuePriority) {
    this.selectedPriority = priority;
    this.projectService.updateIssue({
      ...this.issue,
      priority: this.selectedPriority
    });
  }
}
