import { JIssue } from '@/interface/issue';
import { JProject } from '@/interface/project';
import { DeleteIssueModel } from '@/interface/ui-model/delete-issue-mode';
import { BreadcrumbsComponent } from '@/jira-control/breadcrumbs/breadcrumbs.component';
import { ProjectConst } from '@/project/config/const';
import { ProjectQuery } from '@/project/state/project/project.query';
import { ProjectService } from '@/project/state/project/project.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IssueDetailComponent } from '../../components/issues/issue-detail/issue-detail.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'full-issue-detail',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, IssueDetailComponent, RouterModule, NzModalModule],
  providers: [ProjectQuery, ProjectService, NzModalService],
  templateUrl: './full-issue-detail.component.html',
  styleUrl: './full-issue-detail.component.scss'
})
export class FullIssueDetailComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  project!: JProject;
  issueById$!: Observable<JIssue | undefined>;
  issueId!: string;
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name as string, this.issueId];
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectQuery: ProjectQuery,
    private projectService: ProjectService
  ) {}
  ngOnInit(): void {
    this.getIssue();
    this.projectQuery.all$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((project) => (this.project = project));
  }

  deleteIssue({ issueId, deleteModalRef }: DeleteIssueModel) {
    this.projectService.deleteIssue(issueId);
    deleteModalRef.close();
    this.backHome();
  }

  private getIssue() {
    this.issueId = this.route.snapshot.paramMap.get(ProjectConst.IssueId) as string;
    if (!this.issueId) {
      this.backHome();
      return;
    }
    this.issueById$ = this.projectQuery.issueById$(this.issueId);
  }

  private backHome() {
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
