import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IconDefinition,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.interface';
import { AppPaths } from '@ma-shared';

@Component({
  selector: 'ma-movie-card',
  templateUrl: './movie-card.component.html',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
})
export class MovieCardComponent {
  @Input() public movie: Movie;

  @Output() public detailClick: EventEmitter<void> = new EventEmitter();

  public readonly faArrowRight: IconDefinition = faArrowRight;
  public readonly detailPath: string = AppPaths.Detail;
}
