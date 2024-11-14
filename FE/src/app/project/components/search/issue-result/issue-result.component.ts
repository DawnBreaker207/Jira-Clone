import { JIssue } from '@/interface/issue';
import { IssueUtil } from '@/project/utils/issue';
import { Component, Input } from '@angular/core';
import { SvgIconComponent } from "../../../../jira-control/svg-icon/svg-icon.component";

@Component({
  selector: 'issue-result',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './issue-result.component.html',
  styleUrl: './issue-result.component.scss'
})
export class IssueResultComponent {
  @Input() issue!: JIssue;

  get issueTypeIcon() {
    return IssueUtil.getIssueTypeIcon(this.issue?.type);
  }

  constructor() {}
}
