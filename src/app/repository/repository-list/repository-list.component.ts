import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { IRepository } from '../interfaces/repository.interface';
import { Observable, map, of } from 'rxjs';
import { IKeyValue } from 'src/app/core/interfaces/generic.interface';
import { LanguagesService } from 'src/app/services/languages.service';
import { ViewTypeEnum } from '../enums/view-type.enum';
import { FormControl } from '@angular/forms';
import { SortOrderEnum } from '../enums/sort-order.enum';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit {

  public repository$!: Observable<IRepository[]>;
  public languages$!: Observable<{label: string; value: string; }[]>;
  public readonly sortOrders: {label: string; value: string}[] = [{ label: 'ASC', value: SortOrderEnum.ASC }, { label:'DESC', value: SortOrderEnum.DESC }];
  public readonly viewTypes: string[] = [ViewTypeEnum.Card_View, ViewTypeEnum.Grid_View];
  public viewTypeCtrl: FormControl = new FormControl(ViewTypeEnum.Card_View);
  public sortCtrl: FormControl = new FormControl(SortOrderEnum.ASC);
  public languageCtrl: FormControl = new FormControl(null);
  public readonly viewTypesEnum = ViewTypeEnum;
  private page = 1;

  constructor(private repositoryService: RepositoryService, private languagesService: LanguagesService) { }

  public ngOnInit(): void {
    this.repository$ = this.getRepositories(this.createParams());
    this.languages$ = this.getLanguages();
  }

  public sortControlChange(): void {
    this.repository$ = this.getRepositories(this.createParams())
  }

  public languageControlChange(): void {
    this.repository$ = this.getRepositories(this.createParams())
  }

  private getRepositories(params: IKeyValue = {}): Observable<IRepository[]> {
    return this.repositoryService.getRepositories(params, this.languageCtrl.value).pipe(map(x => {
      return (<IRepository[]>x['items']).sort((a, b) => a.stargazers_count - b.stargazers_count)
  }));
  }

  private getLanguages(): Observable<{ label: string; value: string; }[]> {
    return this.languagesService.getLanguages().pipe(map(x => x.map(item => {
      return { label: item['name'], value: item['name']}
    })))
  }

  private createParams(): IKeyValue {
    return { order: this.sortCtrl.value, sort: 'stars', page: this.page, per_page: 50 }
  }

}
