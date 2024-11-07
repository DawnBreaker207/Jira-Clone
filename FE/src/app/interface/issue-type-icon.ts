import { IssueUtil } from '../project/utils/issue';
import { IssueType } from './issue';

export class IssueTypeIcon {
  value: string;
  icon: string;

  constructor(issueType: IssueType) {
    this.value = issueType;
    this.icon = IssueUtil.getIssueTypeIcon(issueType);
  }
}
