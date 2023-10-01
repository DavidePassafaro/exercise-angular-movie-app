import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const COMPONENTS: any[] = [HeaderComponent, FooterComponent];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {}
