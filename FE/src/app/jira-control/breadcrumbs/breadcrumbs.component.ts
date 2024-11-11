import { Component, Input } from '@angular/core';

@Component({
  selector: 'breadcrumbs',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  @Input() items: string[] = [];
  constructor() {}
}
