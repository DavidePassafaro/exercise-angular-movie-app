import { TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieCardComponent, RouterTestingModule],
    });
    const fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => expect(component).toBeTruthy());
});
