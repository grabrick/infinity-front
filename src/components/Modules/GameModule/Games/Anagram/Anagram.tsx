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
  const [draggedLetter, setDraggedLetter] = useState<{ letter: string, index: number, groupIndex: number } | null>(null);
  const [droppedLetters, setDroppedLetters] = useState<string[][]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[][]>([]);
  const [_, setCorrectMatches] = useState<number>(0);
  const [totalCorrectMatches, setTotalCorrectMatches] = useState<number>(0);

  useEffect(() => {
    if (questions && currentWordIndex >= questions.length) {
      setIsEnd(true);
      setIsPlayingUser({
        ...isPlayingUser,
        correct: totalCorrectMatches,
        incorrect: 0,
        currentTime: currentTime,
        selectedAnswers: [],
      });
    } else {
      const currentWordParts = questions[currentWordIndex]?.word.split(" ") || [];
      const letterGroups = currentWordParts.map((part: string) => part.split("").sort(() => Math.random() - 0.5));
      setAvailableLetters(letterGroups);
      setDroppedLetters(currentWordParts.map(() => []));
      setCorrectMatches(0);
    }
  }, [currentWordIndex, questions, setIsEnd, isPlayingUser, totalCorrectMatches, currentTime, setIsPlayingUser]);

  const handleDragStart = (letter: string, index: number, groupIndex: number) => {
    setDraggedLetter({ letter, index, groupIndex });
  };

  const handleDrop = (targetGroupIndex: number) => {
    if (draggedLetter) {
      setDroppedLetters((prevDropped) => {
        const newDropped = [...prevDropped];
        newDropped[targetGroupIndex] = [...newDropped[targetGroupIndex], draggedLetter.letter];
        return newDropped;
      });

      setAvailableLetters((prevAvailable) => {
        const newAvailable = [...prevAvailable];
        newAvailable[draggedLetter.groupIndex] = newAvailable[draggedLetter.groupIndex].filter((_, index) => index !== draggedLetter.index);
        return newAvailable;
      });
    }
    setDraggedLetter(null);
  };

  const handleContinue = () => {
    const currentWordParts = questions[currentWordIndex]?.word.split(" ") || [];
    let matches = 0;

    currentWordParts.forEach((wordPart: string, partIndex: number) => {
      const droppedPart = droppedLetters[partIndex] || [];
      matches += wordPart.split("").filter((letter, index) => letter === droppedPart[index]).length;
    });

    setCorrectMatches(matches);
    setTotalCorrectMatches((prevTotal) => prevTotal + matches);
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className={m.container}>
      <div className={m.content}>
        {questions[currentWordIndex]?.hint && (
          <div className={m.hintWrapper}>
            <span className={m.span}>Подсказка:</span>
            <p className={m.hint}>{questions[currentWordIndex].hint}</p>
          </div>
        )}
        <div className={m.wordWrap}>
          {availableLetters.map((letterGroup: string[], groupIndex: number) => (
            <div key={groupIndex} className={m.wordGroup}>
              <div className={m.letters}>
                {letterGroup.map((letter: string, index: number) => (
                  <div
                    key={`${groupIndex}-${index}`}
                    draggable
                    onDragStart={() => handleDragStart(letter, index, groupIndex)}
                    className={m.letterBox}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div
                className={m.dropArea}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(groupIndex)}
              >
                {droppedLetters[groupIndex]?.map((letter, index) => (
                  <span key={index} className={m.droppedLetter}>
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={m.buttons}>
        <button className={m.button} onClick={handleContinue}>
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default Anagram;