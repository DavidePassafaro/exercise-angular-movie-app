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
import { Movie } from '@ma-shared';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule, SearchBarComponent, FontAwesomeModule],
})
export class SearchPageComponent {
  private readonly store: Store = inject(Store);

  public readonly faArrowUp: IconDefinition = faArrowUp;

  public searchCategories: SearchCategory[] = CATEGORIES;

  public searchResults: Observable<Movie[]> = this.store.select(
    SearchStore.getSearchResults
  );

  public search({ title, type }: SearchParameters): void {
    this.store.dispatch(SearchStore.startResearch({ title, movieType: type }));
  }

  public changePage(pageIndex: number): void {
    this.store.dispatch(SearchStore.changePage({ pageIndex }));
  }
}
