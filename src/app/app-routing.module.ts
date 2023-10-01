import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import {
  AppTitleStrategy,
  Error404Component,
  TechnicalErrorComponent,
} from '@ma-core';

const routes: Routes = [
  {
    path: 'search',
    loadChildren: () =>
      import('./features/search/search.module').then((m) => m.SearchModule),
    title: 'Search a movie',
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./features/detail/detail.module').then((m) => m.DetailModule),
    title: 'Movie detail',
  },

  { path: 'error-404', component: Error404Component, title: '404' },
  {
    path: 'technical-error',
    component: TechnicalErrorComponent,
    title: 'Error',
  },

  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', redirectTo: '/error-404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  providers: [{ provide: TitleStrategy, useClass: AppTitleStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
