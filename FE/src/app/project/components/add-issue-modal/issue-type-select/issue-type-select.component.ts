import { IssueType } from '@/interface/issue';
import { IssueTypeWithIcon } from '@/interface/issue-type-icon';
import { SvgIconComponent } from '@/jira-control/svg-icon/svg-icon.component';
import { ProjectConst } from '@/project/config/const';
import { IssueUtil } from '@/project/utils/issue';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
@Component({
  selector: 'issue-type-select',
  standalone: true,
  imports: [NzSelectModule, ReactiveFormsModule, SvgIconComponent],
  templateUrl: './issue-type-select.component.html',
  styleUrl: './issue-type-select.component.scss'
})
export class IssueTypeSelectComponent {
  @Input() control!: FormControl;

  issueTypes!: IssueTypeWithIcon[];

  constructor() {
    this.issueTypes = ProjectConst.IssueTypesWithIcon;
  }

  getIssueTypeIcon(issueType: IssueType) {
    return IssueUtil.getIssueTypeIcon(issueType);
  }
}
