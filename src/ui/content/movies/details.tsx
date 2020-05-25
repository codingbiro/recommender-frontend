import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Movie } from "../../../types/typedefs";
import { MOV_Q } from "../../../types/models";

interface mProps {
    id: string;
}

export function Details(props: mProps) {
    const search = '';
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
        movie.id === props.id ? <div key={movie.id}><h1>Title: {movie.title}</h1><h2>Length: {movie.length ? movie.length : 'No info.'}</h2></div> : ''
    ));

    return listItems;
}