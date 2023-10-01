import { Component, inject } from '@angular/core';
import {
  SearchBarComponent,
  SearchCategory,
  SearchParameters,
} from '../../components/search-bar/search-bar.component';
import {
  IconDefinition,
  faFilm,
  faVideo,
  faHouseLaptop,
  faList,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { SearchStore } from '../../store/search';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { ResultsGroup } from '../../models/results-group.interface';
import { Movie } from '../../models/movie.interface';

const CATEGORIES: SearchCategory[] = [
  {
    label: 'All',
    placeholder: 'Movies, series or episodes title',
    icon: faVideo,
    id: '',
  },
  {
    label: 'Movies',
    placeholder: 'Movie title',
    icon: faFilm,
    id: 'movie',
  },
  {
    label: 'Series',
    placeholder: 'Series title',
    icon: faHouseLaptop,
    id: 'series',
  },
  {
    label: 'Episodes',
    placeholder: 'Episode title',
    icon: faList,
    id: 'episode',
  },
];

@Component({
  selector: 'ma-search-page',
  templateUrl: './search-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    MovieCardComponent,
    NavigationComponent,
    FontAwesomeModule,
  ],
})
export class SearchPageComponent {
  private readonly store: Store = inject(Store);

  public readonly faArrowUp: IconDefinition = faArrowUp;

  public searchCategories: SearchCategory[] = CATEGORIES;

  public searchResults: Observable<ResultsGroup[]> = this.store
    .select(SearchStore.getSearchResults)
    .pipe(tap(() => window.scrollTo({ top: 0, behavior: 'smooth' })));

  public currentPage: Observable<number> = this.store.select(
    SearchStore.getSearchCurrentPage
  );

  public totalPages: Observable<number> = this.store.select(
    SearchStore.getSearchTotalPagesQuantity
  );

  public resultsGroupTrackBy = (_, { year }: ResultsGroup) => year;
  public moviesGroupTrackBy = (_, { imdbID }: Movie) => imdbID;

  public search({ title, type }: SearchParameters): void {
    this.store.dispatch(SearchStore.startResearch({ title, movieType: type }));
  }

  public changePage(pageIndex: number): void {
    this.store.dispatch(SearchStore.changePage({ pageIndex }));
  }
}
