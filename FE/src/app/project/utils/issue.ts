import { IssuePriorityIcon } from '@/interface/issue-priority-icon';
import { IssuePriority, IssueType } from '../../interface/issue';

export class IssueUtil {
  static getIssueTypeIcon(issueType: IssueType): string {
    return issueType?.toLowerCase();
  }

  static getIssuePriorityIcon(issuePriority: IssuePriority): IssuePriorityIcon {
    return new IssuePriorityIcon(issuePriority);
  }

  static getRandomId(): string {
    return `${Math.ceil(Math.random() * 8000)}`;
  }

  static searchString(str: string, searchString: string): boolean {
    str = str ?? '';
    searchString = searchString ?? '';
    return str.trim().toLowerCase().includes(searchString.trim().toLowerCase());
  }
}
