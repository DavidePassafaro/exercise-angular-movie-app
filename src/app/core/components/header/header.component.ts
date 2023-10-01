import { Component, Input } from '@angular/core';
import { IconDefinition, faBars } from '@fortawesome/free-solid-svg-icons';
import { NavigationPage } from '@ma-shared';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ma-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, RouterModule, FontAwesomeModule],
})
export class HeaderComponent {
  @Input() public pages: NavigationPage[];

  public isMobileMenuOpen: boolean;

  public readonly faBars: IconDefinition = faBars;

  public mobileMenuSwitch(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  public mobileMenuClose(): void {
    this.isMobileMenuOpen = false;
  }
}
