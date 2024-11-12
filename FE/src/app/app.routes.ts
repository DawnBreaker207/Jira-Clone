import { Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProjectConst } from './config/const';
import { FullIssueDetailComponent } from './pages/full-issue-detail/full-issue-detail.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'board', component: BoardComponent },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: `issues/${ProjectConst.IssueId}`,
        component: FullIssueDetailComponent
      },
      {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full'
      }
    ]
  }
];
