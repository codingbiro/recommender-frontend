import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Review } from "../../../types/typedefs";
import { REV_Q } from "../../../types/models";
import { UserContext } from "../../usercontext";

interface lrProps {
  searchString: string;
}

function ListReviews(props: lrProps) {
  const search = props.searchString;
  const user = useContext(UserContext).user;

  const { loading: isLoading, error, data } = useQuery(REV_Q, {
    variables: { search: search },
  });

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  if (error || !user) return <h1>Log in to view reviews.</h1>;

  const reviews = data.reviews;
  const filteredReviews = reviews.filter((r: Review) => r.user.id === user.id);

  const listItems = filteredReviews.map((review: Review) => {
    return (<h1 key={review.id}>{review.review} <br />on {review.movie.title}</h1>);
  });

  if (listItems.length === 0) return <h1>No reviews found.</h1>;
  return listItems;
}

export default ListReviews;