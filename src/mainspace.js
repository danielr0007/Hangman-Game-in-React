// import { click } from "@testing-library/user-event/dist/click";
import { useState, useEffect, useRef } from "react";

// SECTION THAT HOLDS THE HANGMAN AND BECOMES ADJUSTED AS THE GAME PROGRESSES///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
export function MainSpace({
  clickedLetter,
  showQuestionBox,
  setShowQuestionBox,
}) {
  const [questionMain, setQuestionMain] = useState("");
  const [answerMain, setAnswerMain] = useState("");
  const [score, setScore] = useState(6);
  const [youLose, setYouLose] = useState(false);
  const [youWin, setYouWin] = useState(false);

  // lowers setScore useState without crashing everything
  useEffect(() => {
    if (clickedLetter === "" || clickedLetter === "-") return;

    // makes sure if a user presses a key they already pressed prior, they get no penalty
    for (let i = 0; i < clickedLetter.length - 1; i++) {
      if (clickedLetter[i] === clickedLetter[clickedLetter.length - 1]) return;
    }

    if (answerMain.includes(clickedLetter[clickedLetter.length - 1])) {
      // console.log("includes");
    } else {
      console.log("wrong answer");
      setScore(score - 1);
    }
  }, [clickedLetter]);

  // if user run out of tries, this code changes the displayed component to YOULOSE component
  useEffect(() => {
    if (score === 0) {
      setYouLose(true);
    }
  });

  if (!youLose)
    return (
      <main>
        <div className="man">
          <img
            id="rope"
            src={require("/Users/danielrasch/Desktop/hangman/src/rope.png")}
          />
          <img
            id="head"
            className={score <= 5 ? "" : "hide"}
            src={require("/Users/danielrasch/Desktop/hangman/src/head.png")}
          />
          <img
            id="body"
            className={score <= 4 ? "" : "hide"}
            src={require("/Users/danielrasch/Desktop/hangman/src/bod.png")}
          />
          <img
            id="left-arm"
            className={score <= 3 ? "" : "hide"}
            src={require("/Users/danielrasch/Desktop/hangman/src/left-leg.png")}
          />
          <img
            id="right-arm"
            className={score <= 2 ? "" : "hide"}
            src={require("/Users/danielrasch/Desktop/hangman/src/right-leg.png")}
          />
          <img
            id="left-leg"
            className={score <= 1 ? "" : "hide"}
            src={require("/Users/danielrasch/Desktop/hangman/src/left-leg.png")}
          />
          <img
            id="right-leg"
            className={score <= 0 ? "" : "hide"}
            src={require("/Users/danielrasch/Desktop/hangman/src/right-leg.png")}
          />
        </div>

        {/* empty letter filler boxes that get filled in as user guesses the correct letters */}
        <div className="letter-filler">
          <LetterFiller
            clickedLetter={clickedLetter}
            answerMain={answerMain}
            youWin={youWin}
            setYouWin={setYouWin}
          />
        </div>

        {/* div that shows the initial set up question component and changes to the answer component when game starts
        ///////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div className="question-and-answer-container">
          {showQuestionBox && (
            <SetQuestionInput
              setQuestionMain={setQuestionMain}
              setAnswerMain={setAnswerMain}
              setShowQuestionBox={setShowQuestionBox}
            />
          )}

          {showQuestionBox || (
            <AnswerInput
              score={score}
              setScore={setScore}
              initialQuestion={questionMain}
              initialAnswer={answerMain}
              youWin={youWin}
              setYouWin={setYouWin}
            />
          )}
        </div>
      </main>
    );

  // YOU LOSE SECTION THAT APPEARS WHEN PERSON RUNS OUT OF TRIES/////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  if (youLose) {
    return (
      <div className="youlose-container">
        <h2>You Lose!</h2>
      </div>
    );
  }
}

// INPUT THAT ALLOWS THE PERSON TO SET THE QUESTION TO START THE GAME//////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetQuestionInput({
  setQuestionMain,
  setAnswerMain,
  setShowQuestionBox,
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  function log() {
    if (question === "" || answer === "") return;
    setQuestionMain(question);
    setAnswerMain(answer);
    setShowQuestionBox(false);
  }
  return (
    <div>
      <div className="type-question-container">
        <input
          type="text"
          name="question"
          className="inputs"
          value={question}
          id="question-input"
          placeholder="Type in your question"
          onChange={(e) => setQuestion(e.target.value)}
        />

        <input
          type="text"
          name="answer"
          value={answer}
          id="answer-input"
          className="inputs"
          placeholder="Type in the answer"
          onChange={(e) =>
            setAnswer(e.target.value.replace(" ", "-").toLowerCase())
          }
        />

        <button className="buttons" id="start-btn" onClick={log}>
          Start
        </button>
      </div>
    </div>
  );
}

// INPUT THAT ALLOWS THE PERSON TO INPUT AN ANSWER TO TRY TO WIN THE GAME//////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function AnswerInput({
  initialAnswer,
  initialQuestion,
  setScore,
  score,
  youWin,
  setYouWin,
}) {
  const [playerAnswer, setPlayerAnswer] = useState("");
  // const [youWin, setYouWin] = useState(false);
  console.log(playerAnswer);
  function submitAnswer() {
    if (playerAnswer === initialAnswer) {
      setYouWin(true);
    } else {
      setScore(score - 1);
    }
  }
  return (
    <div className="answer-question-container">
      {youWin ? (
        <p className="you-win">You Win!</p>
      ) : (
        <input
          type="text"
          value={playerAnswer}
          id="user-answer-input"
          className="inputs"
          onChange={(e) =>
            setPlayerAnswer(e.target.value.replace(" ", "-").toLowerCase())
          }
        />
      )}

      <p id="question">{initialQuestion}</p>

      <button className="buttons" onClick={submitAnswer}>
        Submit my answer
      </button>
      {false && <p id="answer">{initialAnswer}</p>}
    </div>
  );
}

// SECTION THAT SHOWS THE LETTERS THAT THE PERSON HAS GUESSED CORRECTLY//////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function LetterFiller({ answerMain, clickedLetter, setYouWin }) {
  useEffect(() => {
    if (answerMain === "") return;

    if (includesAll) {
      setYouWin(true);
    }
  });

  if (answerMain === "") return;

  let letterArray = [...answerMain];

  const includesAll = letterArray.every((x) => {
    return clickedLetter.includes(x);
  });

  return (
    <>
      {letterArray.map((letter, i) => {
        return (
          <div className="letter-box" key={i}>
            <p className={clickedLetter.includes(letter) ? "" : "non-visible"}>
              {letter}
            </p>
          </div>
        );
      })}
    </>
  );
}
