import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationPage } from '@ma-shared';

@Component({
  selector: 'ma-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule],
})
export class FooterComponent {
  @Input() public pages: NavigationPage[];
}
