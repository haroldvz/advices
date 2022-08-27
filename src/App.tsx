import { useEffect, useState, useCallback } from "react";
import { Search, Slip } from "./@types";
import { RandomAdvice, SearchAdvice } from "./components";

export default function App() {
  const [advice, setAdvice] = useState<string>("loading...");
  const [loading, setLoading] = useState<boolean>(true);
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true);
  const [results, setResults] = useState<Slip[]>([]);

  const getRandomAdvice = useCallback(async () => {
    try {
      setLoading(true);
      setIsDisabledButton(true);
      const response = await (
        await fetch("https://api.adviceslip.com/advice")
      ).json();
      const advice = response?.slip?.advice;
      setAdvice(advice);
      // Note: Advice is cached for 2 seconds.
      // Any repeat-request within 2 seconds will return the same piece of advice.
      setTimeout(() => {
        setIsDisabledButton(false);
      }, 2000);
    } catch (error) {
      setAdvice("Error trying to get the advice");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchAdvice = async (query: string) => {
    try {
      if (query) {
        const response: Search = await (
          await fetch(`https://api.adviceslip.com/advice/search/${query}`)
        ).json();
        const results = response?.slips;
        console.log({ response, results });
        setResults(results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRandomAdvice();
  }, [getRandomAdvice]);

  function onClick(e) {
    e.preventDefault();
    setAdvice("loading...");
    getRandomAdvice();
  }

  function onSubmit(e) {
    e.preventDefault();
    const term = e.target.term.value;
    searchAdvice(term);
  }

  return (
    <main>
      <h1>Are you looking for advice?</h1>
      <RandomAdvice
        advice={advice}
        onClick={onClick}
        loading={loading || isDisabledButton}
      />
      <SearchAdvice results={results} onSubmit={onSubmit} />
    </main>
  );
}
