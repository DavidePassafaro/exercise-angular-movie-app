import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import {
  AppTitleStrategy,
  Error404Component,
  TechnicalErrorComponent,
} from '@ma-core';
import { AppPaths } from '@ma-shared';

const routes: Routes = [
  {
    path: AppPaths.Search,
    loadChildren: () =>
      import('./features/search/search.module').then((m) => m.SearchModule),
    title: 'Search a movie',
  },
  {
    path: AppPaths.Detail,
    loadChildren: () =>
      import('./features/detail/detail.module').then((m) => m.DetailModule),
    title: 'Movie detail',
  },

  { path: AppPaths.Error404, component: Error404Component, title: '404' },
  {
    path: AppPaths.TechnicalError,
    component: TechnicalErrorComponent,
    title: 'Error',
  },

  { path: '', redirectTo: `/${AppPaths.Search}`, pathMatch: 'full' },
  { path: '**', redirectTo: `/${AppPaths.Error404}`, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      bindToComponentInputs: true,
    }),
  ],
  providers: [{ provide: TitleStrategy, useClass: AppTitleStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
