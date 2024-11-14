import { NoWhitespaceValidator } from '@/core/validators/no-whitespace.validator';
import { JProject, ProjectCategory } from '@/interface/project';
import { BreadcrumbsComponent } from '@/jira-control/breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from '@/jira-control/button/button.component';
import { ProjectConst } from '@/project/config/const';
import { ProjectQuery } from '@/project/state/project/project.query';
import { ProjectService } from '@/project/state/project/project.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, takeUntil } from 'rxjs';
@Component({
  standalone: true,
  imports: [
    NzNotificationModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonComponent,
    BreadcrumbsComponent,
    NzInputModule,
    CommonModule
  ],
  providers: [NzNotificationService, ProjectQuery, ProjectService],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy {
  project!: JProject;
  projectForm!: FormGroup;
  categories: ProjectCategory[];
  destroyed$ = new Subject<void>();
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name as string, 'Settings'];
  }
  constructor(
    private projectQuery: ProjectQuery,
    private projectService: ProjectService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.categories = [
      ProjectCategory.BUSINESS,
      ProjectCategory.MARKETING,
      ProjectCategory.SOFTWARE
    ];
  }
  ngOnInit(): void {
    this.initForm();
    this.projectQuery.all$.pipe(takeUntil(this.destroyed$)).subscribe((project) => {
      this.project = project;
      this.updateForm(project);
    });
  }

  initForm() {
    this.projectForm = this.fb.group({
      name: ['', NoWhitespaceValidator()],
      url: [''],
      description: [''],
      category: [ProjectCategory.SOFTWARE]
    });
  }

  updateForm(project: JProject) {
    this.projectForm.patchValue({
      name: project.name,
      url: project.url,
      description: project.description,
      category: project.category
    });
  }

  submitForm() {
    const formValue: Partial<JProject> = this.projectForm.getRawValue();
    this.projectService.updateProject(formValue);
    this.notification.create('success', 'Changes have been saved successfully', '');
  }

  cancel() {
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
