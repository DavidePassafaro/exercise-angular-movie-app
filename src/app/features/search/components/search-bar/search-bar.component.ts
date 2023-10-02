import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IconDefinition,
  faChevronDown,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgClass, NgFor } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

export interface SearchCategory {
  label: string;
  placeholder: string;
  icon: IconDefinition;
  id: string;
}

interface SearchForm {
  title: FormControl<string>;
  type: FormControl<string>;
}

export interface SearchParameters {
  title: string;
  type: string;
}

@Component({
  selector: 'ma-search-bar',
  templateUrl: './search-bar.component.html',
  standalone: true,
  imports: [NgFor, NgClass, FontAwesomeModule, ReactiveFormsModule],
})
export class SearchBarComponent implements OnInit {
  @Input({ required: true }) public categories: SearchCategory[];
  @Input() public selectedCategory: number = 0;

  @Output() public search: EventEmitter<SearchParameters> = new EventEmitter();

  public formGroup: FormGroup<SearchForm>;

  public isDropdownOpen: boolean;

  public readonly faChevronDown: IconDefinition = faChevronDown;
  public readonly faMagnifyingGlass: IconDefinition = faMagnifyingGlass;

  public ngOnInit(): void {
    const selectCategoryId: string = this.categories[this.selectedCategory].id;

    this.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      type: new FormControl(selectCategoryId),
    });
  }

  public switchDropdownMenu(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public selectCategory(index: number): void {
    this.selectedCategory = index;
    this.isDropdownOpen = false;
  }

  public formSubmit(): void {
    this.search.emit(this.formGroup.getRawValue());
    (document.activeElement as HTMLInputElement).blur();
  }
}
