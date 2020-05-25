import React from "react";
import { useParams } from "react-router-dom";
import { Details } from "./details";
import ListMovieReview from "./listreviews";
import MovieReview from "./review";

export function Movie() {
  const { movieId } = useParams();

  if (!movieId)
    return <h1>No movie found.</h1>;

  return (
    <div>
      <Details id={movieId} />
      <MovieReview id={movieId} />
      <ListMovieReview id={movieId} />
    </div>
  );
}