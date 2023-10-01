import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { DetailService } from './services/detail/detail.service';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DETAIL_KEY } from './store/detail/detail.selectors';
import { DetailReducer, DetailStore } from './store/detail';
import { DetailEffects } from './store/detail/detail.effects';
import { filter } from 'rxjs';

export const movieResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
) => {
  const store: Store = inject(Store);
  store.dispatch(DetailStore.detailOpen({ id: route.params['movieId'] }));
  return store.select(DetailStore.getDetailMovieDetail).pipe(filter(Boolean));
};

const routes: Routes = [
  {
    path: ':movieId',
    component: DetailPageComponent,
    resolve: { movie: movieResolver },
    canDeactivate: [() => inject(Store).dispatch(DetailStore.reset())],
  },
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(DETAIL_KEY, DetailReducer),
    EffectsModule.forFeature([DetailEffects]),
  ],
  providers: [DetailService],
  exports: [RouterModule],
})
export class DetailModule {}
