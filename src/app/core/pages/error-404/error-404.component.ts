import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ma-error-404',
  templateUrl: './error-404.component.html',
  standalone: true,
  imports: [FontAwesomeModule],
})
export class Error404Component {
  public readonly faVideoSlash: IconDefinition = faVideoSlash;
}
