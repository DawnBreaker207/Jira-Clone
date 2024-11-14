import { JProject } from '@/interface/project';
import { SideBarLink } from '@/interface/ui-model/nav-link';
import { AvatarComponent } from '@/jira-control/avatar/avatar.component';
import { SvgIconComponent } from '@/jira-control/svg-icon/svg-icon.component';
import { SideBarLinks } from '@/project/config/sidebar';
import { ProjectQuery } from '@/project/state/project/project.query';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, AvatarComponent, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  @Input() expanded!: boolean;
  get sideBarWidth(): number {
    return this.expanded ? 240 : 15;
  }

  project!: JProject;
  sideBarLinks!: SideBarLink[];
  constructor(private projectQuery: ProjectQuery) {
    this.projectQuery.all$.pipe(takeUntil(this.destroyed$)).subscribe((project) => {
      this.project = project;
    });
  }
  ngOnInit(): void {
    this.sideBarLinks = SideBarLinks;
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
