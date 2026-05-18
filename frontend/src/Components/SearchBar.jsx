import React from "react";

function SearchBar({
  search,
  setSearch
}) {

  return (

    <input
      type="text"
      placeholder="Search by category or merchant..."
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
      className="w-full p-4 border rounded-2xl mb-6"
    />

  );

}

export default SearchBar;