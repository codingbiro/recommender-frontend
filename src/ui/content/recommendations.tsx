import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const REC_Q = gql`
  query recommendMovies {
    recommendMovies {
        movie {
            id, title
        }, info {
            user_id,
            movies
        }
    }
  }
`;

type Recommendations = {
    movie: Movie;
    info: InfoOnRec;
};

type InfoOnRec = {
    user_id: string | undefined;
    movies: string[] | undefined;
};

type Movie = {
    id: string;
    length: number | null;
    title: string;
};

interface lmProps {};

export function Recommendations(props: lmProps) {
    const { loading: isLoading, error, data } = useQuery(REC_Q);

    if (isLoading) return <p>Loading ...</p>;
    if (error) return <h1>Log in to view movies.</h1>;

    if (data.recommendMovies.length === 0) return <h1>No Recommendations were found.</h1>;
    const recs = data.recommendMovies;
    
    const listItems = recs.map((rec: Recommendations) => (
    <h1 key={rec.movie.id}>{rec.movie.title}<br/><kbd>Because <em>{rec.info.user_id} </em> liked these similarly as you:<br/>{rec.info.movies}</kbd></h1>
    ));
    return listItems;
}