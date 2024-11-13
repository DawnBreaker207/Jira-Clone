import { JIssue } from '@/interface/issue';
import { Component, Input } from '@angular/core';
import { IssueCommentComponent } from '../issue-comment/issue-comment.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'issue-comments',
  standalone: true,
  imports: [IssueCommentComponent, CommonModule],
  templateUrl: './issue-comments.component.html',
  styleUrl: './issue-comments.component.scss'
})
export class IssueCommentsComponent {
  @Input() issue!: JIssue;
}
