export type User = {
  id: string;
  name: string;
  email: string;
  age: number;
};

export type Movie = {
  id: string;
  title: string;
  length?: number;
}

export type Review = {
  review: string;
  id: string;
  rating: number;
  movie: Movie;
  user: User;
}

