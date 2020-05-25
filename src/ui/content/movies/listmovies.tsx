import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { MOV_Q } from "../../../types/models";

interface Movie {
    title: string;
    id: string;
}

interface lmProps {
    searchString: string;
}

export function ListMovies(props: lmProps) {
    const search = props.searchString;
    const { loading: isLoading, error, data } = useQuery(MOV_Q, {
        variables: { search: search },
    });

    if (isLoading)
        return <p>Loading ...</p>;
    if (error)
        return <h1>Log in to view movies.</h1>;
    if (data.movies.length === 0)
        return <h1>No movies found.</h1>;

    const movies = data.movies;
    const listItems = movies.map((movie: Movie) => (
        <h1 key={movie.id}>{movie.title}<a href={`/movie/${movie.id}`}><img className="reviewimg" src="/review.png" width="20" alt="Write review" /></a></h1>
    ));

    return listItems;
}