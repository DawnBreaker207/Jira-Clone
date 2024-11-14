import { AvatarComponent } from '@/jira-control/avatar/avatar.component';
import { ButtonComponent } from '@/jira-control/button/button.component';
import { AuthQuery } from '@/project/auth/auth.query';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AddIssueModalComponent } from '../../add-issue-modal/add-issue-modal.component';
import { SearchDrawerComponent } from '../../search/search-drawer/search-drawer.component';

@Component({
  selector: 'app-navbar-left',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    NzToolTipModule,
    AvatarComponent,
    NzPopoverModule,
    NzIconModule
  ],
  providers: [NzDrawerService, NzModalService, AuthQuery],
  templateUrl: './navbar-left.component.html',
  styleUrl: './navbar-left.component.scss'
})
export class NavbarLeftComponent implements OnInit {
  items!: NavItem[];
  constructor(
    public authQuery: AuthQuery,
    private drawerService: NzDrawerService,
    private modalService: NzModalService
  ) {}
  ngOnInit(): void {
    this.items = [
      new NavItem('search', 'Search Issue', () => this.openSearchDrawler.bind(this)),
      new NavItem('plus', 'Create Issue', () => this.openCreateIssueModal.bind(this))
    ];
  }

  openCreateIssueModal() {
    this.modalService.create({
      nzContent: AddIssueModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700
    });
  }

  openSearchDrawler() {
    this.drawerService.create({
      nzContent: SearchDrawerComponent,
      nzTitle: undefined,
      nzPlacement: 'left',
      nzClosable: false,
      nzWidth: 500
    });
  }
}

class NavItem {
  constructor(
    public icon: string,
    public tooltip: string,
    public handler: Handler
  ) {}
}

type Handler = () => void;
