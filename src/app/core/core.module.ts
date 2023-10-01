import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Error404Component } from './pages/error-404/error-404.component';

const COMPONENTS: any[] = [HeaderComponent, FooterComponent, Error404Component];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {}
