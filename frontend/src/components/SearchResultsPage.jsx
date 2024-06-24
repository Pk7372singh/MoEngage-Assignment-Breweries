import React from "react";
import { useLocation } from "react-router-dom";

const SearchResultsPage = () => {
  const location = useLocation();
  const { breweries } = location.state;

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {breweries.map((brewery) => (
          <li key={brewery.id}>
            <h3>{brewery.name}</h3>
            <p>
              Address: {brewery.street}, {brewery.city}, {brewery.state},{" "}
              {brewery.postal_code}
            </p>
            <p>Phone: {brewery.phone}</p>
            <p>
              Website:{" "}
              <a
                href={brewery.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {brewery.website_url}
              </a>
            </p>
            <h4>
              Current Rating:{" "}
              {brewery.reviews.length > 0
                ? (
                    brewery.reviews.reduce(
                      (acc, review) => acc + review.rating,
                      0
                    ) / brewery.reviews.length
                  ).toFixed(1)
                : "No ratings yet"}
            </h4>
            <h4>Reviews:</h4>
            <ul>
              {brewery.reviews.map((review, index) => (
                <li key={index}>
                  <p>
                    <strong>{review.username}</strong>: {review.rating} -{" "}
                    {review.description}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsPage;
