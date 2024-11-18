import { Routes } from '@angular/router';
import { ProjectConst } from './project/config/const';
import { BoardComponent } from './project/pages/board/board.component';
import { FullIssueDetailComponent } from './project/pages/full-issue-detail/full-issue-detail.component';
import { ProjectComponent } from './project/project.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/project',
    pathMatch: 'full'
  },
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      {
        path: 'board',
        component: BoardComponent
        //   loadComponent: () =>
        //     import('./project/pages/board/board.component').then((m) => m.BoardComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./project/pages/settings/settings.component').then((m) => m.SettingsComponent)
      },
      {
        path: `issue/:${ProjectConst.IssueId}`,
        component: FullIssueDetailComponent
        // loadComponent: () =>
        //   import('./project/pages/full-issue-detail/full-issue-detail.component').then(
        //     (m) => m.FullIssueDetailComponent
        //   )
      },
      {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full'
      }
    ]
  }
];
