import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, finalize, map, takeUntil } from 'rxjs';
import { IKeyValue } from 'src/app/core/interfaces/generic.interface';
import { LanguagesService } from 'src/app/services/languages.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { SortOrderEnum } from '../enums/sort-order.enum';
import { ViewTypeEnum } from '../enums/view-type.enum';
import { IRepository } from '../interfaces/repository.interface';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryListComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  public repository$!: Observable<IRepository[]>;
  public languages$!: Observable<{ label: string; value: string; }[]>;
  public readonly sortOrders: { label: string; value: string }[] = [{ label: 'ASC', value: SortOrderEnum.ASC }, { label: 'DESC', value: SortOrderEnum.DESC }];
  public readonly viewTypes: string[] = [ViewTypeEnum.Card_View, ViewTypeEnum.Grid_View];
  public viewTypeCtrl: FormControl = new FormControl(ViewTypeEnum.Card_View);
  public sortCtrl: FormControl = new FormControl(SortOrderEnum.ASC);
  public languageCtrl: FormControl = new FormControl(null);
  public readonly viewTypesEnum = ViewTypeEnum;
  public repositories: IRepository[] = [];
  public loading$ = new BehaviorSubject(false);
  private clearSubs$ = new Subject();
  private page = 1;

  public onWindowScroll() {
    const element = this.scrollContainer.nativeElement;
    const scrolledAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 1;
    if (scrolledAtBottom && !this.loading$.value) {
      this.page++;
      this.loading$.next(true);
      this.getRepositories(this.createParams());
    }
  }

  constructor(private repositoryService: RepositoryService, private languagesService: LanguagesService) { }

  public ngOnInit(): void {
    this.languages$ = this.getLanguages();
    this.getRepositories(this.createParams());
  }

  public ngOnDestroy(): void {
    this.clearSubs$.next(null);
    this.clearSubs$.complete();
  }

  public sortControlChange(): void {
    this.repositories = [];
    this.getRepositories(this.createParams());
  }

  public languageControlChange(): void {
    this.repositories = [];
    this.getRepositories(this.createParams());
  }

  private getRepositories(params: IKeyValue): void {
    this.repositoryService.getRepositories(params, this.languageCtrl.value)
      .pipe(takeUntil(this.clearSubs$), finalize(() => this.loading$.next(false)), map(x => {
        return (<IRepository[]>x['items'])
      })).subscribe({
        next: (res) => {
          this.repositories = this.repositories.concat(res).sort((a, b) => a.stargazers_count - b.stargazers_count)
        },
        error: (error) => console.log(error)
      });
  }

  private getLanguages(): Observable<{ label: string; value: string; }[]> {
    return this.languagesService.getLanguages().pipe(map(x => x.map(item => {
      return { label: item['name'], value: item['name'] }
    })))
  }

  private createParams(): IKeyValue {
    return { order: this.sortCtrl.value, sort: 'stars', page: this.page, per_page: 50 }
  }

}
