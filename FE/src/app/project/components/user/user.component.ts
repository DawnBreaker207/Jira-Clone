import { JUser } from '@/interface/user';
import { AvatarComponent } from '@/jira-control/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'j-user',
  standalone: true,
  imports: [AvatarComponent, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @Input() user!: JUser;
}
