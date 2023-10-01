import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faBug } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ma-technical-error',
  templateUrl: './technical-error.component.html',
  standalone: true,
  imports: [FontAwesomeModule],
})
export class TechnicalErrorComponent {
  public readonly faBug: IconDefinition = faBug;
}
