import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { AppTitleStrategy, Error404Component } from '@ma-core';

const routes: Routes = [
  { path: 'error-404', component: Error404Component, title: '404' },
  { path: '**', redirectTo: '/error-404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: TitleStrategy, useClass: AppTitleStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
