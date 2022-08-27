import React from "react";
import { Slip } from "../../@types";

export const SearchAdvice: React.FC<SearchAdviceProps> = ({
  results,
  onSubmit
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <p>Search for more advice:</p>
        <input type="text" name="term" required />
        <button>Search</button>
      </form>

      {results?.length ? (
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.advice}</li>
          ))}
        </ul>
      ) : (
        <p>No results</p>
      )}
    </>
  );
};

interface SearchAdviceProps {
  results: Slip[];
  onSubmit: (e: any) => void;
}
