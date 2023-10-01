import { Component } from '@angular/core';
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
    placeholder: 'Serie title',
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
  imports: [SearchBarComponent, FontAwesomeModule],
})
export class SearchPageComponent {
  public readonly faArrowUp: IconDefinition = faArrowUp;

  public searchCategories: SearchCategory[] = CATEGORIES;

  public search(parameters: SearchParameters): void {
    console.log(parameters);
  }
}
