import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewComponent } from './grid-view.component';
import { PartialAssert } from 'src/app/core/utils/partial-assert-helper';
import { IRepository } from '../interfaces/repository.interface';

describe('GridViewComponent', () => {
  let component: GridViewComponent;
  let fixture: ComponentFixture<GridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return unique id concating index number and repository id', () => {
    expect(component.trackByFn(1, PartialAssert<IRepository>({id: '1'}))).toEqual('1_1');
    expect(component.trackByFn(2, PartialAssert<IRepository>({id: 'repo_id'}))).toEqual('2_repo_id');
  });
});
