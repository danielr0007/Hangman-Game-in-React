import { useState } from "react";
function LettersSpace({ setClickedLetter, showQuestionBox }) {
  const [alphabet, setAlphabet] = useState([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]);
  if (showQuestionBox === true) return;
  return (
    <div className="outer-wrap">
      <div className="letters-container">
        {alphabet.map((letter, i) => (
          <div
            onClick={() =>
              setClickedLetter((prevState) => {
                return prevState + letter;
              })
            }
            className="individual-letter-container"
            key={i}
          >
            <p>{letter}</p>
          </div>
        ))}
        <button
          className="buttons"
          onClick={() => window.location.reload()}
          id="reset"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default LettersSpace;
