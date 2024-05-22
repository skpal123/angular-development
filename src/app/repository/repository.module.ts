import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { GridViewComponent } from './grid-view/grid-view.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryComponent } from './repository/repository.component';
import { CardViewComponent } from './card-view/card-view.component';


@NgModule({
  declarations: [
    RepositoryListComponent,
    RepositoryComponent,
    GridViewComponent,
    CardViewComponent
  ],
  imports: [
    CommonModule,
    RepositoryRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class RepositoryModule { }
