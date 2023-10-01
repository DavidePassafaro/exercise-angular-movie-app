import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { Error404Component } from './pages/error-404/error-404.component';

const COMPONENTS: any[] = [HeaderComponent, FooterComponent, SpinnerComponent];
const PAGES: any[] = [Error404Component];

const MODULES = [...COMPONENTS, ...PAGES];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class CoreModule {}
