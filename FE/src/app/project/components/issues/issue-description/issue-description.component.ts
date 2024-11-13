import { JIssue } from '@/interface/issue';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuillEditorComponent } from 'ngx-quill';
import { ButtonComponent } from '@/jira-control/button/button.component';
import { quillConfiguration } from '@/project/config/editor';
import { ProjectService } from '@/project/state/project/project.service';

@Component({
  selector: 'issue-description',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, QuillEditorComponent],
  providers: [ProjectService],
  templateUrl: './issue-description.component.html',
  styleUrl: './issue-description.component.scss'
})
export class IssueDescriptionComponent implements OnChanges {
  @Input() issue!: JIssue;
  descriptionControl!: FormControl;
  editorOptions = quillConfiguration;
  isEditing!: boolean;
  isWorking!: boolean;

  constructor(private projectService: ProjectService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const issueChange = changes['issue'];
    if (issueChange.currentValue !== issueChange.previousValue) {
      this.descriptionControl = new FormControl(this.issue.description);
    }
  }

  setEditMode(mode: boolean) {
    this.isEditing = mode;
  }

  editorCreated(editor: any) {
    if (editor && editor.focus) {
      editor.focus();
    }
  }

  save() {
    this.projectService.updateIssue({
      ...this.issue,
      description: this.descriptionControl.value
    });
    this.setEditMode(false);
  }

  cancel() {
    this.descriptionControl.patchValue(this.issue.description);
    this.setEditMode(false);
  }
}
