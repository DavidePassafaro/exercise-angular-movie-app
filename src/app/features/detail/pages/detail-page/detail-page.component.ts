import { Component, Input, OnInit, inject } from '@angular/core';
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
export class DetailPageComponent implements OnInit {
  private readonly store: Store = inject(Store);

  @Input() public movieId: string = '';

  public movieDetail: Observable<MovieDetail> = this.store.select(
    DetailStore.getDetailMovieDetail
  );

  public ngOnInit(): void {
    this.store.dispatch(DetailStore.detailOpen({ id: this.movieId }));
  }
}
