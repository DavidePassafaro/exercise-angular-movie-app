import { Movie } from '../../models/movie.interface';
import { sortMoviesByYear } from './search.utilities';

addEventListener('message', ({ data }: { data: Movie[] }) =>
  postMessage(sortMoviesByYear(data))
);
