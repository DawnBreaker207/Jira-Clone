import { IssuePriority } from '@/interface/issue';
import { IssuePriorityIcon } from '@/interface/issue-priority-icon';
import { SvgIconComponent } from '@/jira-control/svg-icon/svg-icon.component';
import { ProjectConst } from '@/project/config/const';
import { IssueUtil } from '@/project/utils/issue';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'issue-priority-select',
  standalone: true,
  imports: [ReactiveFormsModule, SvgIconComponent, NzSelectModule],
  templateUrl: './issue-priority-select.component.html',
  styleUrl: './issue-priority-select.component.scss'
})
export class IssuePrioritySelectComponent {
  @Input() control!: FormControl;
  priorities: IssuePriorityIcon[];
  constructor() {
    this.priorities = ProjectConst.PrioritiesWithIcon;
  }

  getPriorityIcon(priority: IssuePriority) {
    return IssueUtil.getIssuePriorityIcon(priority);
  }
}
