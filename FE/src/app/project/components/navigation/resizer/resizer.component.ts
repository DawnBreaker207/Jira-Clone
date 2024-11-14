import { Component, Input } from '@angular/core';
import { SvgIconComponent } from "../../../../jira-control/svg-icon/svg-icon.component";

@Component({
  selector: 'app-resizer',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './resizer.component.html',
  styleUrl: './resizer.component.scss'
})
export class ResizerComponent {
  @Input() expanded!: boolean;
  get icon() {
    return this.expanded ? 'chevron-left' : 'chevron-right';
  }
}
