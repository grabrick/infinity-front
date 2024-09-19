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
  const [selectedPair, setSelectedPair] = useState<number | null>(null);
  const [matches, setMatches] = useState<number[]>([]);
  const [isResultsChecked, setIsResultsChecked] = useState(false);

  useEffect(() => {
    if (questions.length > 0) {
      setShuffledFields(shuffleArray(questions[0].fields));
    }
  }, [questions]);

  const handleCardClick = (id: number) => {
    // Если карта уже перевёрнута, игнорируем клик
    if (flippedCards.includes(id)) return;

    if (selectedPair === null) {
      // Первая карта выбирается
      setSelectedPair(id);
    } else {
      // Вторая карта выбирается
      const firstCard = shuffledFields.find(field => field.id === selectedPair);
      const secondCard = shuffledFields.find(field => field.id === id);

      if (firstCard && secondCard && firstCard.isCorrect === secondCard.isCorrect) {
        // Если пара совпала
        setFlippedCards([...flippedCards, selectedPair, id]);
        setMatches([...matches, selectedPair, id]); // Добавляем в список совпадений
      }

      // Сброс выбора
      setSelectedPair(null);
    }
  };

  const checkResults = () => {
    setIsResultsChecked(true);
  };

  return (
    <div className={m.container}>
      {/* Отображаем текст для пары */}
      <h1>{questions[0].pairName}</h1>

      <div className={m.cards}>
        {shuffledFields.map((field) => (
          <div
            key={field.id}
            className={`${m.card} ${flippedCards.includes(field.id) ? m.flipped : ''}`}
            onClick={() => handleCardClick(field.id)}
          >
            <div className={m.cardInner}>
              {/* Передняя сторона карты */}
              <div className={m.cardFront}>
                {/* Это будет закрытая плитка */}
                <div className={m.tile}></div>
              </div>
              {/* Задняя сторона карты */}
              <div className={m.cardBack}>
                {field.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопка для проверки результатов */}
      <button className={m.checkButton} onClick={checkResults}>
        Проверить результаты
      </button>

      {/* Отображение результатов */}
      {isResultsChecked && (
        <div className={m.results}>
          {matches.length === shuffledFields.length
            ? 'Поздравляем! Вы нашли все пары!'
            : `Вы нашли ${matches.length / 2} из ${shuffledFields.length / 2} пар.`}
        </div>
      )}
    </div>
  );
};

export default FindPairs;
