import React, { useState, useEffect } from 'react';
import m from './MatchUp.module.scss';

interface Question {
  id: number;
  word: string;
  agreements: string;
  correct: number;
  incorrect: number;
}

interface GroupSortingProps {
  questions: Question[];
  currentTime: any;
  setIsPlayingUser: (props: any) => void;
  isPlayingUser: any;
  setIsEnd: (isEnd: boolean) => void;
}

const MatchUp: React.FC<GroupSortingProps> = ({
  questions,
  currentTime,
  isPlayingUser,
  setIsPlayingUser,
  setIsEnd,
}) => {
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [availableWords, setAvailableWords] = useState(() => shuffleArray(questions.map((q) => q.word)));
  const [droppedWords, setDroppedWords] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setAvailableWords(shuffleArray(availableWords));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragStart = (e: React.DragEvent, word: string, source: string) => {
    e.dataTransfer.setData('text/plain', word);
    e.dataTransfer.setData('source', source);
  };

  const handleDrop = (e: React.DragEvent, targetAgreements: string) => {
    e.preventDefault();
    const droppedWord = e.dataTransfer.getData('text/plain');
    const source = e.dataTransfer.getData('source');

    setDroppedWords((prev) => {
      const updatedDroppedWords = { ...prev };
      let wordToMoveToAvailable: string | null = null;

      if (source === 'wordsContainer') {
        if (updatedDroppedWords[targetAgreements]) {
          wordToMoveToAvailable = updatedDroppedWords[targetAgreements];
        }
        setAvailableWords((prevWords) => {
          const index = prevWords.indexOf(droppedWord);
          if (index > -1) {
            const newWords = [...prevWords];
            if (wordToMoveToAvailable) {
              newWords[index] = wordToMoveToAvailable;
            } else {
              newWords.splice(index, 1);
            }
            return newWords;
          }
          return prevWords;
        });
      } 
      else {
        const sourceAgreements = Object.keys(updatedDroppedWords).find(
          key => updatedDroppedWords[key] === droppedWord
        );
        if (sourceAgreements) {
          delete updatedDroppedWords[sourceAgreements];
        }
        if (updatedDroppedWords[targetAgreements]) {
          updatedDroppedWords[sourceAgreements as string] = updatedDroppedWords[targetAgreements];
        }
      }

      updatedDroppedWords[targetAgreements] = droppedWord;

      return updatedDroppedWords;
    });
  };

  const handleDropInWordsContainer = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedWord = e.dataTransfer.getData('text/plain');
    const source = e.dataTransfer.getData('source');

    if (source === 'wordsContainer') return;

    setAvailableWords((prev) => [...prev, droppedWord]);

    setDroppedWords((prev) => {
      const updatedDroppedWords = { ...prev };
      Object.keys(updatedDroppedWords).forEach((key) => {
        if (updatedDroppedWords[key] === droppedWord) {
          delete updatedDroppedWords[key];
        }
      });
      return updatedDroppedWords;
    });
  };

  const checkResults = () => {
    let correct = 0;
    questions.forEach((question) => {
      if (droppedWords[question.agreements] === question.word) {
        correct++;
      }
    });
    setIsEnd(true);
    setIsPlayingUser({
      ...isPlayingUser,
      correct: correct,
      incorrect: 0,
      currentTime: currentTime,
      selectedAnswers: [],
    });
  };

  return (
    <div className={m.container}>
      <div
        className={m.wordsContainer}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropInWordsContainer}
      >
        {availableWords.map((word, index) => (
          <div
            key={index}
            className={m.word}
            draggable
            onDragStart={(e) => handleDragStart(e, word, 'wordsContainer')}
          >
            {word}
          </div>
        ))}
      </div>

      <div className={m.agreementsContainer}>
        {questions.map((question, index) => (
          <div 
            key={index} 
            className={m.agreementItem}
            style={{ flexDirection: questions.length >= 10 ? 'column' : 'row' }}
          >
            <div
              className={m.dropZone}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, question.agreements)}
            >
              {droppedWords[question.agreements] && (
                <span
                  draggable
                  className={m.word}
                  onDragStart={(e) => handleDragStart(e, droppedWords[question.agreements], 'dropZone')}
                >
                  {droppedWords[question.agreements]}
                </span>
              )}
            </div>
            <span className={m.agreements}>{question.agreements}</span>
          </div>
        ))}
      </div>

      <div className={m.buttons}>
        <button className={m.button} onClick={checkResults}>Отправить результат</button>
      </div>
    </div>
  );
};

export default MatchUp;