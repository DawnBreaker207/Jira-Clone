import { IssueType, JIssue } from '@/interface/issue';
import { IssueTypeWithIcon } from '@/interface/issue-type-icon';
import { ButtonComponent } from '@/jira-control/button/button.component';
import { SvgIconComponent } from '@/jira-control/svg-icon/svg-icon.component';
import { ProjectConst } from '@/project/config/const';
import { ProjectService } from '@/project/state/project/project.service';
import { IssueUtil } from '@/project/utils/issue';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'issue-type',
  standalone: true,
  imports: [ButtonComponent, SvgIconComponent, NzDropDownModule, CommonModule],
  templateUrl: './issue-type.component.html',
  styleUrl: './issue-type.component.scss'
})
export class IssueTypeComponent implements OnInit, OnChanges {
  @Input() issue!: JIssue;

  get selectedIssueTypeIcon(): string {
    return IssueUtil.getIssueTypeIcon(this.issue.type);
  }

  issueTypes: IssueTypeWithIcon[];

  constructor(private projectService: ProjectService) {
    this.issueTypes = ProjectConst.IssueTypesWithIcon;
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}

  updateIssue(issueType: IssueType) {
    this.projectService.updateIssue({
      ...this.issue,
      type: issueType
    });
  }

  isTypeSelected(type: IssueType) {
    return this.issue.type === type;
  }
}
