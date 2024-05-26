import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { LanguagesService } from 'src/app/services/languages.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { repositoryMockData } from 'src/app/test/mocks/repository-data.mock';
import { languageServiceStub } from 'src/app/test/stubs/language.service.stubs';
import { repositoryServiceStub } from 'src/app/test/stubs/repository.service.stubs';
import { SortOrderEnum } from '../enums/sort-order.enum';
import { RepositoryListComponent } from './repository-list.component';

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;
  let languageService: LanguagesService;
  let repositoryService: RepositoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryListComponent ],
      providers: [
        { provide: RepositoryService, useValue: repositoryServiceStub },
        { provide: LanguagesService, useValue: languageServiceStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguagesService);
    (<jasmine.Spy>languageService.getLanguages).and.returnValue(of([{ name: 'lang1' }, { name: 'lang2' }]))
    repositoryService = TestBed.inject(RepositoryService);
    (<jasmine.Spy>repositoryService.getRepositories).and.returnValue(of({ items: [ repositoryMockData ]}))
    component.languageCtrl = new FormControl(null);
    component.sortCtrl = new FormControl(SortOrderEnum.ASC);
    component['page'] = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(repositoryService.getRepositories).toHaveBeenCalledWith({order: SortOrderEnum.ASC, sort: 'stars', page: 1, per_page: 50 }, <never>null);
    expect(languageService.getLanguages).toHaveBeenCalled();
  });

  it('should destroy subscription', () => {
    const spy = spyOn(component['clearSubs$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should called with sort order DESC', () => {
    component.sortCtrl.setValue(SortOrderEnum.DESC);
    component.sortControlChange();
    expect(repositoryService.getRepositories).toHaveBeenCalledWith({order: SortOrderEnum.DESC, sort: 'stars', page: 1, per_page: 50 }, <never>null);
  });

  it('should called with selected language', () => {
    component.languageCtrl.setValue('Typescript');
    component.languageControlChange();
    expect(repositoryService.getRepositories).toHaveBeenCalledWith({order: SortOrderEnum.ASC, sort: 'stars', page: 1, per_page: 50 }, 'Typescript');
  });

  it('should sort by ascending order', () => {
    component.repositories = [];
    component.languageCtrl.setValue('Typescript');
    (<jasmine.Spy>repositoryService.getRepositories).and.returnValue(of({ items: [{ stargazers_count: 90 }, { stargazers_count: 80 }] }))
    component['getRepositories']({order: SortOrderEnum.ASC, sort: 'stars', page: 1, per_page: 50 });
    expect(repositoryService.getRepositories).toHaveBeenCalled();
    expect(component.repositories).toEqual(<never>[{ stargazers_count: 80 }, { stargazers_count: 90 }])
  });

  it('should called infinite scroll when scroll end', () => {
    component.scrollContainer = { nativeElement: { scrollHeight: 400, scrollTop: 200, clientHeight: 201}}
    component.onWindowScroll();

    (<jasmine.Spy>repositoryService.getRepositories).and.returnValue(of({ items: [{ stargazers_count: 90 }, { stargazers_count: 80 }] }))
    expect(repositoryService.getRepositories).toHaveBeenCalledWith({order: SortOrderEnum.ASC, sort: 'stars', page: 2, per_page: 50 }, <never>null);
    expect(component.repositories.length).toEqual(2)
  });
});
