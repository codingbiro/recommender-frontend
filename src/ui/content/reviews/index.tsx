import React, { useState, useContext } from "react";
import ListReviews from "./listreviews";
import { UserContext } from "../../usercontext";

interface revProps { }

export function Reviews(props: revProps) {
  const [search, upSearch] = useState("");
  const user = useContext(UserContext).user;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    upSearch(event.currentTarget.value);
  }

  if (!user) return <h1>Log in to view page.</h1>;
  else {
    return (
      <aside>
        <h3>Reviews by {user.name}</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="search"
              onChange={handleChange}
              value={search}
              placeholder="type to search"
            />
            <button onClick={() => upSearch("")}>Reset</button>
          </form>
          <ListReviews searchString={search} />
        </div>
      </aside>
    );
  }
}
