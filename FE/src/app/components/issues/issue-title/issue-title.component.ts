import { JIssue } from '@/interface/issue';
import { ProjectService } from '@/project/state/project/project.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'issue-title',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './issue-title.component.html',
  styleUrl: './issue-title.component.scss'
})
export class IssueTitleComponent implements OnChanges {
  @Input() issue!: JIssue;
  titleControl!: FormControl;

  constructor(private projectService: ProjectService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const issueChange = changes['issue'];
    if (issueChange.currentValue !== issueChange.previousValue) {
      this.titleControl = new FormControl(this.issue.title);
    }
  }

  onBlur() {
    this.projectService.updateIssue({
      ...this.issue,
      title: this.titleControl.value
    });
  }
}
