import { Header } from "./header";
import React from "react";
import { MainSpace } from "./mainspace";
import LettersSpace from "./lettersspace";

function App() {
  let [clickedLetter, setClickedLetter] = React.useState("-");
  const [showQuestionBox, setShowQuestionBox] = React.useState(true);

  // console.log(clickedLetter)
  return (
    <div className="App">
      <Header />
      <MainSpace
        clickedLetter={clickedLetter}
        showQuestionBox={showQuestionBox}
        setShowQuestionBox={setShowQuestionBox}
      />
      <LettersSpace
        setClickedLetter={setClickedLetter}
        showQuestionBox={showQuestionBox}
      />
    </div>
  );
}

export default App;
