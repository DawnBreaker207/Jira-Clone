import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoginPayload } from './auth/loginPayload';
import { ProjectService } from './state/project/project.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SvgDefinitionsComponent } from "../jira-control/svg-definitions/svg-definitions.component";
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SvgDefinitionsComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  expanded: boolean;
  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) {
    this.expanded = true;
  }

  ngOnInit(): void {
    this.authService.login(new LoginPayload());
    this.projectService.getProject();
    this.handleResize();
  }

  handleResize() {
    const match = window.matchMedia('(min-width: 1024px');
    match.addEventListener('change', (e) => {
      console.log(e);
      this.expanded = e.matches;
    });
  }

  manualToggle() {
    this.expanded = !this.expanded;
  }
}
