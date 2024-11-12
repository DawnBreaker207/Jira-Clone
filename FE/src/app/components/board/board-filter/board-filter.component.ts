import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../jira-control/button/button.component';
import { AvatarComponent } from '../../../jira-control/avatar/avatar.component';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProjectQuery } from '@/project/state/project/project.query';
import { FilterQuery } from '@/project/state/filter/filter.query';
import { FilterService } from '@/project/state/filter/filter.service';
import { JUser } from '@/interface/user';
import { CommonModule } from '@angular/common';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { InputComponent } from '../../../jira-control/input/input.component';

@Component({
  selector: 'board-filter',
  standalone: true,
  imports: [ButtonComponent, AvatarComponent, CommonModule, NzToolTipModule, InputComponent],
  templateUrl: './board-filter.component.html',
  styleUrl: './board-filter.component.scss'
})
export class BoardFilterComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  searchControl: FormControl = new FormControl('');
  userIds: string[] = [];

  constructor(
    public projectQuery: ProjectQuery,
    public filterQuery: FilterQuery,
    public filterService: FilterService
  ) {
    this.userIds = [];
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((term) => {
        this.filterService.updateSearchTerm(term);
      });
    this.filterQuery.userId$.pipe(takeUntil(this.destroyed$)).subscribe((userIds) => {
      this.userIds = userIds;
    });
  }

  isUserSelected(user: JUser) {
    return this.userIds.includes(user.id);
  }

  ignoreResolvedChanged() {
    this.filterService.toggleIgnoreResolve();
  }

  onlyMyIssueChanged() {
    this.filterService.toggleOnlyMyIssue();
  }

  userChanged(user: JUser) {
    this.filterService.toggleUserId(user.id);
  }

  resetAll() {
    this.searchControl.setValue('');
    this.filterService.resetAll();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
