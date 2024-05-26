import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryComponent } from './repository.component';
import { repositoryMockData } from 'src/app/test/mocks/repository-data.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RepositoryComponent', () => {
  let component: RepositoryComponent;
  let fixture: ComponentFixture<RepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepositoryComponent);
    component = fixture.componentInstance;
    component.repository = repositoryMockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
