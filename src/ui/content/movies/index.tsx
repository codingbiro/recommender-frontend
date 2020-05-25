import React, { useState } from "react";
import { ListMovies } from "./listmovies";

export function Movies() {
  const [search, upSearch] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    upSearch(event.currentTarget.value);
  }

  return (
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
      <ListMovies searchString={search} />
    </div>
  );
}
