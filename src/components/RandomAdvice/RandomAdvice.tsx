import React from "react";

export const RandomAdvice: React.FC<RandomAdviceProps> = ({
  advice,
  onClick,
  loading
}) => {
  return (
    <>
      <p>"{advice}"</p>
      <form>
        <button onClick={onClick} disabled={loading}>
          Gimme more advice!
        </button>
      </form>
    </>
  );
};

interface RandomAdviceProps {
  advice: string;
  loading: boolean;
  onClick: (e: any) => void;
}
