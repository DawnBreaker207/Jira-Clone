import { ProjectQuery } from '@/project/state/project/project.query';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil
} from 'rxjs';
import { JIssue } from '@/interface/issue';
import { IssueModalComponent } from '../../issues/issue-modal/issue-modal.component';
import { IssueUtil } from '@/project/utils/issue';
import { SvgIconComponent } from '../../../../jira-control/svg-icon/svg-icon.component';
import { IssueResultComponent } from '../issue-result/issue-result.component';
import { InputComponent } from '../../../../jira-control/input/input.component';
@Component({
  selector: 'search-drawer',
  standalone: true,
  imports: [
    NzModalModule,
    NzDrawerModule,
    CommonModule,
    SvgIconComponent,
    IssueResultComponent,
    InputComponent
  ],
  providers: [ProjectQuery, NzModalService],
  templateUrl: './search-drawer.component.html',
  styleUrl: './search-drawer.component.scss'
})
export class SearchDrawerComponent implements OnInit, OnDestroy {
  searchControl: FormControl = new FormControl('');
  results$!: Observable<JIssue[]>;
  recentIssues$!: Observable<JIssue[]>;
  destroyed$ = new Subject<void>();
  get hasSearchTermInput(): boolean {
    return !!this.searchControl.value;
  }
  constructor(
    private projectQuery: ProjectQuery,
    private drawer: NzDrawerRef,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    const search$ = this.searchControl.valueChanges.pipe(
      debounceTime(50),
      startWith(this.searchControl.value)
    );
    this.recentIssues$ = this.projectQuery.issues$.pipe(map((issues) => issues.slice(0, 5)));
    this.results$ = combineLatest([search$, this.projectQuery.issues$]).pipe(
      takeUntil(this.destroyed$),
      switchMap(([term, issues]) => {
        const matchIssues = issues.filter((issue) => {
          const foundInTitle = IssueUtil.searchString(issue.title, term);
          const foundInDescription = IssueUtil.searchString(issue.description, term);
          return foundInTitle || foundInDescription;
        });
        return of(matchIssues);
      })
    );
  }

  closeDrawer() {
    this.drawer.close();
  }

  openIssueModal(issue: JIssue) {
    this.modalService.create({
      nzContent: IssueModalComponent,
      nzWidth: 1040,
      nzClosable: false,
      nzFooter: null,
      nzData: {
        issue$: this.projectQuery.issueById$(issue.id)
      }
    });
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
