import { JUser } from '@/interface/user';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserComponent } from '../../user/user.component';

@Component({
  selector: 'issue-assignees-select',
  standalone: true,
  imports: [NzSelectModule, UserComponent, ReactiveFormsModule],
  templateUrl: './issue-assignees-select.component.html',
  styleUrl: './issue-assignees-select.component.scss'
})
export class IssueAssigneesSelectComponent {
  @Input() control!: FormControl;
  @Input() users!: JUser[];

  constructor() {}
  getUser(userId: string) {
    return this.users.find((user) => user.id === userId);
  }
}
