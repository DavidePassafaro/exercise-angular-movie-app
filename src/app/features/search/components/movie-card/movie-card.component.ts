import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IconDefinition,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.interface';

@Component({
  selector: 'ma-movie-card',
  templateUrl: './movie-card.component.html',
  standalone: true,
  imports: [NgClass, FontAwesomeModule, RouterModule],
})
export class MovieCardComponent {
  @Input() public movie: Movie;

  @Output() public detailClick: EventEmitter<void> = new EventEmitter();

  public readonly faArrowRight: IconDefinition = faArrowRight;

  public switchDropdownMenu(): void {}
}
