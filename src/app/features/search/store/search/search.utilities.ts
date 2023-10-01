import { Movie } from '../../models/movie.interface';
import { ResultsGroup } from '../../models/results-group.interface';

export function sortMoviesByYear(movies: Movie[]): ResultsGroup[] {
  const response = movies.reduce((acc, movie) => {
    const year: string = movie.Year.slice(0, 4);
    (acc[year] = acc[year] || []).push(movie);
    return acc;
  }, {});

  return Object.keys(response)
    .sort()
    .reverse()
    .map((key: string) => ({ year: +key, results: response[key] }));
}
