import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Review } from "../../../types/typedefs";
import { REV_Q } from "../../../types/models";

interface rProps {
  id: string;
}

export default function ListMovieReview(props: rProps) {
  //const search = '';
  const { loading: isLoading, error, data } = useQuery(REV_Q, {
    //variables: { search: search }
  });

  if (isLoading) return <p>Loading ...</p>;
  if (error) return <h1>Log in to view movies.</h1>;

  const reviews = data.reviews;
  const listItems = reviews.map((review: Review) => (
    review.movie.id === props.id ? <div key={review.id}><hr /><h1>Review: {review.review}</h1><h2>By {review.user.name}</h2><h3>Rating: {review.rating} points out of 10</h3></div> : ''
  ));
  let flag = false;
  for (const item of listItems) {
    if (item !== '') flag = true;
  }
  if (!flag)
    return (
      <div>
        <h1>No reviews yet.</h1>
      </div>
    );

  // Reverse order
  const listItems2 = listItems.slice(0).reverse();

  return listItems2;
}