import { JUser } from '@/interface/user';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserComponent } from '../../user/user.component';

@Component({
  selector: 'issue-reporter-select',
  standalone: true,
  imports: [ReactiveFormsModule, NzSelectModule, UserComponent],
  templateUrl: './issue-reporter-select.component.html',
  styleUrl: './issue-reporter-select.component.scss'
})
export class IssueReporterSelectComponent {
  @Input() control!: FormControl;
  @Input() users!: JUser[];

  constructor() {}

  getUser(userId: string) {
    return this.users.find((user) => user.id === userId);
  }
}
