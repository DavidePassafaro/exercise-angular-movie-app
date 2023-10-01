import {
  Component,
  EventEmitter,
  Input,
  Output,
  numberAttribute,
} from '@angular/core';

@Component({
  selector: 'ma-navigation',
  templateUrl: './navigation.component.html',
  standalone: true,
})
export class NavigationComponent {
  @Input({ transform: numberAttribute })
  public currentPage: number = 1;

  @Input({ required: true, transform: numberAttribute })
  public totalPages: number;

  @Output() public forwardClick: EventEmitter<void> = new EventEmitter();

  @Output() public backClick: EventEmitter<void> = new EventEmitter();

  public forwardClickHandler(): void {
    this.forwardClick.emit();
  }

  public backClickHandler(): void {
    this.backClick.emit();
  }
}
