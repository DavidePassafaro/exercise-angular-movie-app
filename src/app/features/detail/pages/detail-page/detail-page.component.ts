import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DetailStore } from '../../store/detail';
import { MovieDetail } from '../../models/movie-detail.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ma-detail-page',
  templateUrl: './detail-page.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class DetailPageComponent {
  private readonly store: Store = inject(Store);

  public movieDetail$: Observable<MovieDetail> = this.store.select(
    DetailStore.getDetailMovieDetail
  );
}
