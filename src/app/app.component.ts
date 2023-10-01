import { Component, inject } from '@angular/core';
import { NavigationPage } from '@ma-shared';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { SpinnerStore } from '@ma-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly store: Store = inject(Store);

  public pages: NavigationPage[] = [
    { label: 'Search a movie', link: 'search' },
  ];

  public isSpinnerOn$: Observable<boolean> = this.store
    .select(SpinnerStore.getSpinnerLoading)
    .pipe(
      switchMap((value: boolean) =>
        value ? of(value).pipe(delay(500)) : of(value)
      )
    );
}
