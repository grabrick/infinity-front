import React, { useState } from "react";
import m from "./FlipTiles.module.scss";

interface Question {
  id: number;
  frontWord: string;
  rearWord: string;
  correct: number;
  incorrect: number;
}

interface FlipTilesProps {
  questions: Question[];
  currentTime: any;
  setIsPlayingUser: (props: any) => void;
  isPlayingUser: any;
  setIsEnd: (isEnd: boolean) => void;
}

const FlipTiles: React.FC<FlipTilesProps> = ({
  questions: initialQuestions,
  currentTime,
  isPlayingUser,
  setIsPlayingUser,
  setIsEnd,
}) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [deletedQuestions, setDeletedQuestions] = useState<Question[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleSelectCard = (id: number) => {
    setSelectedCard(id);
  };

  const handleFlip = () => {
    if (selectedCard !== null) {
      setFlippedCards((prev) => ({
        ...prev,
        [selectedCard]: !prev[selectedCard],
      }));
    }
  };

  const handleDeleteCard = () => {
    if (selectedCard !== null) {
      const deletedCard = questions.find(
        (question) => question.id === selectedCard
      );
      if (deletedCard) {
        setDeletedQuestions((prev) => [deletedCard, ...prev]);
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== selectedCard)
        );
        setSelectedCard(null);
      }
    }
  };

  const handleRestoreLastDeleted = () => {
    if (deletedQuestions.length > 0) {
      const lastDeleted = deletedQuestions[0];
      setQuestions((prev) => [lastDeleted, ...prev]);
      setDeletedQuestions((prev) => prev.slice(1));
    }
  };

  const handleShuffle = () => {
    setQuestions((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleRandomSelect = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomCard = questions[randomIndex];
    setSelectedCard(randomCard.id);
  };

  const handleBackToAllCards = () => {
    setSelectedCard(null);
  };

  const handleOverLesson = () => {
    setIsEnd(true);
  }
  console.log(questions.length);
  
  return (
    <div className={m.container}>
      <div className={m.cards}>
        {questions.map((question) => (
          <div
            key={question.id}
            className={`${m.card} ${
              selectedCard === question.id ? m.selected : ""
            } ${flippedCards[question.id] ? m.flipped : ""}`}
            onClick={() => handleSelectCard(question.id)}
          >
            <div className={m.cardInner}>
              <div className={m.cardFront}>{question.frontWord}</div>
              <div className={m.cardBack}>
                {question.rearWord || "Задняя сторона"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCard !== null && (
        <div className={m.controls}>
          <button className={m.button} onClick={handleDeleteCard}>
            Удалить карточку
          </button>
          <button className={m.button} onClick={handleBackToAllCards}>
            Назад к остальным карточкам
          </button>
          <button className={m.button} onClick={handleFlip}>
            Перевернуть
          </button>
        </div>
      )}
      {selectedCard === null && (
        <div className={m.controls}>
          {deletedQuestions.length === 0 && (
            <button className={m.button} onClick={handleShuffle}>
              Перетасовать карточки
            </button>
          )}
          
          {deletedQuestions.length !== 0 && (
            <button className={m.button} onClick={handleRestoreLastDeleted}>
              Вернуть удалённую карточку
            </button>
          )}
          {deletedQuestions.length === 0 && (
            <button className={m.button} onClick={handleRandomSelect}>
              Случайная карточка
            </button>
          )}
          {questions.length === 0 && (
            <button className={m.button} onClick={handleOverLesson}>
              Завершить урок
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FlipTiles;
