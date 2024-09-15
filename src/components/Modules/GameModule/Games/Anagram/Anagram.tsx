// import { useEffect, useState } from "react";
// import m from "./Anagram.module.scss";

// interface GroupSortingProps {
//   questions: any[];
//   currentTime: any;
//   setIsPlayingUser: (props: any) => void;
//   isPlayingUser: any;
//   setIsEnd: (isEnd: boolean) => void;
// }

// const Anagram: React.FC<GroupSortingProps> = ({
//   questions,
//   currentTime,
//   isPlayingUser,
//   setIsPlayingUser,
//   setIsEnd,
// }) => {
//   const [currentWordIndex, setCurrentWordIndex] = useState(0);
//   const [draggedLetter, setDraggedLetter] = useState(null);
//   const [droppedLetters, setDroppedLetters] = useState([]);

//   useEffect(() => {
//     if (currentWordIndex >= questions.length) {
//       setIsEnd(true);
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentWordIndex, questions])

//   const currentWord = questions && questions[currentWordIndex].word.split("");

//   const handleDragStart = (letter: any) => {
//     setDraggedLetter(letter);
//   };

//   const handleDrop = () => {
//     if (draggedLetter) {
//       setDroppedLetters((prevLetters) => [...prevLetters, draggedLetter]);
//     }
//     setDraggedLetter(null);
//   };

//   const handleContinue = () => {
//     if (droppedLetters.join("") === currentWord.join("")) {
//       // Proceed to the next word
//       setDroppedLetters([]);
//       setCurrentWordIndex((prevIndex) => prevIndex + 1);
//     } else {
//       alert("You haven't completed the word correctly yet!");
//     }
//   };

//   // useEffect(() => {
//   //   if () {
//   //     setIsEnd(true);
//   //   }
//   // }, [])

//   return (
//     <div className={m.container}>
//       <div className={m.letters}>
//         {currentWord.map((letter: any, index: any) => (
//           <div
//             key={index}
//             draggable
//             onDragStart={() => handleDragStart(letter)}
//             className={m.letterBox}
//           >
//             {letter}
//           </div>
//         ))}
//       </div>

//       <div
//         className={m.dropArea}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         {droppedLetters.map((letter, index) => (
//           <span key={index} className={m.droppedLetter}>
//             {letter}
//           </span>
//         ))}
//       </div>

//       <button onClick={handleContinue}>Continue</button>
//     </div>
//   );
// };

// export default Anagram;

import { useEffect, useState } from "react";
import m from "./Anagram.module.scss";

interface GroupSortingProps {
  questions: any[];
  currentTime: any;
  setIsPlayingUser: (props: any) => void;
  isPlayingUser: any;
  setIsEnd: (isEnd: boolean) => void;
}

const Anagram: React.FC<GroupSortingProps> = ({
  questions,
  currentTime,
  isPlayingUser,
  setIsPlayingUser,
  setIsEnd,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [draggedLetter, setDraggedLetter] = useState(null);
  const [droppedLetters, setDroppedLetters] = useState<string[][]>([]);

  useEffect(() => {
    if (currentWordIndex >= questions.length) {
      setIsEnd(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWordIndex, questions]);

  // Split word into parts at spaces
  const currentWord = questions && questions[currentWordIndex].word.split(" ");

  const handleDragStart = (letter: any) => {
    setDraggedLetter(letter);
  };

  const handleDrop = (arenaIndex: number) => {
    if (draggedLetter) {
      setDroppedLetters((prevLetters) => {
        const newDroppedLetters = [...prevLetters];
        if (!newDroppedLetters[arenaIndex]) {
          newDroppedLetters[arenaIndex] = [];
        }
        newDroppedLetters[arenaIndex].push(draggedLetter);
        return newDroppedLetters;
      });
    }
    setDraggedLetter(null);
  };

  const handleContinue = () => {
    const isWordCorrect = currentWord.every((wordPart: any, index: any) =>
      droppedLetters[index]
        ? droppedLetters[index].join("") === wordPart
        : false
    );

    if (isWordCorrect) {
      // Proceed to the next word
      setDroppedLetters([]);
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("You haven't completed the word correctly yet!");
    }
  };

  return (
    <div className={m.container}>
      <div className={m.wordWrap}>
        <div className={m.letters}>
          {currentWord
            .join("")
            .split("")
            .map((letter: any, index: any) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(letter)}
                className={m.letterBox}
              >
                {letter}
              </div>
            ))}
        </div>
        <div className={m.dropAreas}>
          {currentWord.map((wordPart: string, arenaIndex: number) => (
            <div
              key={arenaIndex}
              className={m.dropArea}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(arenaIndex)}
            >
              {droppedLetters[arenaIndex] &&
                droppedLetters[arenaIndex].map((letter, index) => (
                  <span key={index} className={m.droppedLetter}>
                    {letter}
                  </span>
                ))}
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default Anagram;
