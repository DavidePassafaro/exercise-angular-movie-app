import { Component } from '@angular/core';
import { NavigationPage } from '@ma-shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public pages: NavigationPage[] = [
    { label: 'Search a movie', link: 'search' },
  ];

  public isSpinnerOn: boolean;
}
