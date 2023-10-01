import { NgModule, isDevMode } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SpinnerReducer } from './store/spinner/spinner.reducer';
import { SPINNER_KEY } from './store/spinner/spinner.selectors';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const COMPONENTS: any[] = [HeaderComponent, FooterComponent, SpinnerComponent];
const PAGES: any[] = [Error404Component];

const MODULES = [...COMPONENTS, ...PAGES];

@NgModule({
  imports: [
    ...MODULES,
    StoreModule.forRoot({ [SPINNER_KEY]: SpinnerReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  exports: MODULES,
})
export class CoreModule {}
