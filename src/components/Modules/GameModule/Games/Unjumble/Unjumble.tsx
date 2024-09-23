import React, { useState, useEffect } from 'react';
import m from './Unjumble.module.scss';

interface Question {
  id: number;
  suggestion: string;
  correct: number;
  incorrect: number;
}

interface UnjumbleProps {
  questions: Question[];
  currentTime: any;
  setIsPlayingUser: (props: any) => void;
  isPlayingUser: any;
  setIsEnd: (isEnd: boolean) => void;
}

const Unjumble: React.FC<UnjumbleProps> = ({
  questions,
  currentTime,
  isPlayingUser,
  setIsPlayingUser,
  setIsEnd,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [correctIndices, setCorrectIndices] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const words = currentQuestion.suggestion.split(' ');
  const correctOrder = words.slice();

  const shuffleWords = () => {
    let shuffled = [...words];
    do {
      shuffled = shuffled.sort(() => Math.random() - 0.5);
    } while (shuffled.join(' ') === correctOrder.join(' '));
    return shuffled;
  };

  useEffect(() => {
    setSelectedWords(shuffleWords());
    setCorrectIndices([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  let draggedIndex: number | null = null;

  const handleDragStart = (index: number) => {
    if (!correctIndices.includes(index)) {
      draggedIndex = index;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index && !correctIndices.includes(index)) {
      const updatedWords = [...selectedWords];
      const temp = updatedWords[draggedIndex];
      updatedWords[draggedIndex] = updatedWords[index];
      updatedWords[index] = temp;

      setSelectedWords(updatedWords);
      draggedIndex = null;

      const newCorrectIndices = updatedWords.reduce<number[]>((acc, word, idx) => {
        if (word === correctOrder[idx]) acc.push(idx);
        return acc;
      }, []);
      setCorrectIndices(newCorrectIndices);

      if (newCorrectIndices.length === words.length) {
        setCorrectCount((prevCount) => {
          const newCorrectCount = prevCount + 1;
          
          setIsPlayingUser({
            ...isPlayingUser,
            correct: newCorrectCount,
            currentTime: currentTime
          });

          return newCorrectCount;
        });

        setTimeout(() => {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          } else {
            setIsEnd(true);
          }
        }, 2000);
      }
    }
  };

  return (
    <div className={m.container}>
      <div className={m.hintWrapper}>
        <p className={m.hint}>Соберите предложение в правильной последовательности</p>
      </div>

      <div className={m.wordsContainer}>
        {selectedWords.map((word, index) => (
          <div
            key={index}
            className={`${m.word} ${correctIndices.includes(index) ? m.correct : ''}`}
            draggable={!correctIndices.includes(index)}
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            {word}
          </div>
        ))}
      </div>

      <div />
    </div>
  );
};

export default Unjumble;
