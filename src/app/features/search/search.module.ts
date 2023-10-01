import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SearchService } from './services/search/search.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { SEARCH_KEY } from './store/search/search.selectors';
import { SearchReducer } from './store/search';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './store/search/search.effects';

const routes: Routes = [{ path: '', component: SearchPageComponent }];

@NgModule({
  imports: [
    HttpClientModule,
    SearchPageComponent,
    RouterModule.forChild(routes),
    StoreModule.forFeature(SEARCH_KEY, SearchReducer),
    EffectsModule.forFeature([SearchEffects]),
  ],
  providers: [SearchService],
  exports: [RouterModule],
})
export class SearchModule {}
