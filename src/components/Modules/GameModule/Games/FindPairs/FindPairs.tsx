import React, { useState, useEffect } from 'react';
import m from './FindPairs.module.scss';

interface Field {
  id: number;
  answer: string;
  isCorrect: boolean;
}

interface Question {
  pairName: string;
  fields: Field[];
}

interface FindPairsProps {
  questions: Question[];
  currentTime: any;
  setIsPlayingUser: (props: any) => void;
  isPlayingUser: any;
  setIsEnd: (isEnd: boolean) => void;
}

const shuffleArray = (array: Field[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const FindPairs: React.FC<FindPairsProps> = ({
  questions,
  currentTime,
  isPlayingUser,
  setIsPlayingUser,
  setIsEnd,
}) => {
  const [shuffledFields, setShuffledFields] = useState<Field[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0); // Счетчик правильных карточек для текущего вопроса
  const [incorrectCount, setIncorrectCount] = useState(0); // Счетчик неправильных карточек для текущего вопроса
  const [globalCorrectCount, setGlobalCorrectCount] = useState(0); // Глобальный счетчик правильных карточек
  const [isResultsChecked, setIsResultsChecked] = useState(false);
  const [initialReveal, setInitialReveal] = useState(true); // Состояние для начального показа карт
  const [clickBlocked, setClickBlocked] = useState(true); // Блокировка кликов на начальной стадии
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Индекс текущего вопроса

  useEffect(() => {
    if (questions.length > 0) {
      setShuffledFields(shuffleArray(questions[currentQuestionIndex].fields));
    }

    setTimeout(() => {
      setInitialReveal(false);
      setClickBlocked(false);
    }, 1500);
    
    if (isResultsChecked && currentQuestionIndex + 1 === questions.length) {
      setTimeout(() => {
        setIsEnd(true);
        setIsPlayingUser({
          ...isPlayingUser,
          correct:  incorrectCount === 0 ? globalCorrectCount : globalCorrectCount / incorrectCount,
          incorrect: incorrectCount,
          currentTime: currentTime,
        });
      }, 2000);      
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, currentQuestionIndex, isResultsChecked]);

  const handleCardClick = (id: number) => {
    if (clickBlocked || isResultsChecked) return;

    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter(cardId => cardId !== id));
    } else {
      setFlippedCards([...flippedCards, id]);

      const correctCards = shuffledFields.filter(field => field.isCorrect).map(field => field.id);
      const selectedCorrect = [...flippedCards, id].filter(cardId => correctCards.includes(cardId));

      if (selectedCorrect.length === correctCards.length) {
        setMatches([...matches, ...correctCards]);
      }
    }
  };

  const checkResults = () => {
    let correct = 0;
    let incorrect = 0;

    flippedCards.forEach(cardId => {
      const field = shuffledFields.find(field => field.id === cardId);
      if (field?.isCorrect) {
        correct++;
      } else {
        incorrect++;
      }
    });

    setCorrectCount(correct);   // Счетчик правильных карточек для текущего вопроса
    setIncorrectCount(incorrect); // Счетчик неправильных карточек для текущего вопроса
    setGlobalCorrectCount(globalCorrectCount + correct); // Обновляем глобальный счетчик правильных карточек
    setIsResultsChecked(true);   // Подтверждаем, что результат проверен
  };

  const handleNextQuestion = () => {
    setIsResultsChecked(false); 
    setFlippedCards([]); 
    setMatches([]);
    setCorrectCount(0); 
    setIncorrectCount(0); 
    setInitialReveal(true); 
    setClickBlocked(true); 

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className={m.container}>
      <div className={m.titleWraper}>
        <span className={m.span}>Найдите подходящию пару к слову: </span>
        <h1 className={m.title}>{questions[currentQuestionIndex].pairName}</h1>
      </div>

      <div className={m.cards}>
        {shuffledFields.map((field) => (
          <div
            key={field.id}
            className={`${m.card} ${flippedCards.includes(field.id) || initialReveal ? m.flipped : ''} 
              ${isResultsChecked && flippedCards.includes(field.id) && field.isCorrect ? m.correctShadow : ''} 
              ${isResultsChecked && flippedCards.includes(field.id) && !field.isCorrect ? m.incorrectShadow : ''}`}
            onClick={() => handleCardClick(field.id)}
          >
            <div className={m.cardInner}>
              <div className={m.cardFront} />
              <div className={m.cardBack}>{field.answer}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className={m.buttons}>
        {isResultsChecked && currentQuestionIndex + 1 < questions.length ? (
          <button className={m.button} onClick={handleNextQuestion}>
            Продолжить
          </button>
        ) : (
          <button className={flippedCards.length !== 0 ? m.button : m.disabled} onClick={checkResults} disabled={flippedCards.length === 0}>
            Отправить результат
          </button>
        )}
      </div>
    </div>
  );
};

export default FindPairs;
