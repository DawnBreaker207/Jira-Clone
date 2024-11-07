import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'j-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  @Input() avatarUrl!: string;
  @Input() size: number = 12;
  @Input() name: string = '';
  @Input() rounded: boolean = true;
  @Input() className: string = '';

  get style() {
    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
      'background-image': `url(${this.avatarUrl})`,
      'border-radius': this.rounded ? '100%' : '3px'
    };
  }
}
