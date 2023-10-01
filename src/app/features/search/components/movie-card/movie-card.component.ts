import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IconDefinition,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';
import { Movie } from '@ma-shared';
import { RouterModule } from '@angular/router';

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
