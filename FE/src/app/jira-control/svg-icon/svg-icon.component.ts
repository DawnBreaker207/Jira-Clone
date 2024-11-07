import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss'
})
export class SvgIconComponent {
  @Input() name!: string;
  @Input() size: number = 16;
  @Input() fill: string = 'currentColor';
  window: any = window;
  constructor() {}

  get iconUrl() {
    return `${this.window.location.href}#${this.name}`;
  }
}
