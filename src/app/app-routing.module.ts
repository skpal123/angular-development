import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoRoute } from './enums/demo-app.route';

const routes: Routes = [
  {
    path: DemoRoute.DEFAULT_ROUTE,
    loadChildren: () => import('./repository/repository.module').then(m => m.RepositoryModule),
  },

  {
    path: DemoRoute.REPOSITORY,
    loadChildren: () => import('./repository/repository.module').then(m => m.RepositoryModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
