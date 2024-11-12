import { JUser } from '@/interface/user';
import { Component, Input } from '@angular/core';
import { AvatarComponent } from "../../jira-control/avatar/avatar.component";

@Component({
  selector: 'j-user',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @Input() user!: JUser;
}
