import { Component } from '@angular/core';
import { BoardDndComponent } from '../../components/board/board-dnd/board-dnd.component';
import { ButtonComponent } from '../../jira-control/button/button.component';
import { BreadcrumbsComponent } from '../../jira-control/breadcrumbs/breadcrumbs.component';
import { BoardFilterComponent } from "../../components/board/board-filter/board-filter.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [BoardDndComponent, ButtonComponent, BreadcrumbsComponent, BoardFilterComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  breadcrumbs: string[] = ['Project', 'Angular Jira Clone', 'Kanban Board'];
  constructor() {}
  sendTwitterEventButton() {}
}
