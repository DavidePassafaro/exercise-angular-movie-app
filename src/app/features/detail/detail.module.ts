import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { DetailService } from './services/detail/detail.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DETAIL_KEY } from './store/detail/detail.selectors';
import { DetailReducer } from './store/detail';
import { DetailEffects } from './store/detail/detail.effects';

const routes: Routes = [{ path: ':movieId', component: DetailPageComponent }];

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
