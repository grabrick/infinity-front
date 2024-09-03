import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import m from "./Quiz.module.scss";

const Quiz = ({
  questions,
  setIsEnd,
  isPlayingUser,
  setIsPlayingUser,
  currentTime,
  setIsLives,
  settings,
  handleClickIncorrect,
  handleClickCorrect,
}: any) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  
  useEffect(() => {
    let shuffled = questions;
    if (settings.shuffling.some((item: any) => item.optionID === 1)) {
      shuffled = [...questions].sort(() => Math.random() - 0.5);
    }
    setShuffledQuestions(shuffled);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shuffledQuestions.length > 0) {
      let currentQuestion: any = shuffledQuestions[currentQuestionIndex];
      if (settings.shuffling.some((item: any) => item.optionID === 2)) {
        const shuffledFields: any = [...currentQuestion.fields].sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffledFields);
      } else {
        setShuffledAnswers(currentQuestion.fields);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, shuffledQuestions]);

  const currentQuestion: any = shuffledQuestions[currentQuestionIndex];

  const handleAnswerClick = (answerIndex: number, field: any) => {
    if (selectedAnswer !== null) {
      return;
    }

    const isCorrect = field.isCorrect;
    if (!isCorrect) {
      setIsLives(--settings.lives);
      handleClickIncorrect();
    } else {
      handleClickCorrect();
    }

    if (isPlayingUser) {
      setIsPlayingUser({
        ...isPlayingUser,
        correct: isCorrect ? isPlayingUser.correct + 1 : isPlayingUser.correct,
        incorrect: !isCorrect
          ? isPlayingUser.incorrect + 1
          : isPlayingUser.incorrect,
        currentTime: currentTime,
        selectedAnswers: [
          ...isPlayingUser.selectedAnswers,
          {
            answer: field.answer,
            symbol: field.symbol,
            isCorrect: field.isCorrect,
            questionName: currentQuestion?.name,
          },
        ],
      });
    }

    setSelectedAnswer(answerIndex);
    setFeedback(isCorrect ? "correct" : "incorrect");
    if (!settings.labeling?.selected) {
      setTimeout(() => {
        goToNextQuestion();
      }, 1500);
    }
  };

  const goToNextQuestion = () => {
    setSelectedAnswer(null);
    setFeedback(null);
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsEnd(true);
    }
  };

  const variants = {
    initial: {
      backgroundColor: "#6982C3",
      scale: 1,
      opacity: 1,
      y: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      backgroundColor: "#A8BDF4",
      transition: { duration: 0.3 },
    },
    selectedCorrect: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
    selectedIncorrect: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  const getAnimationVariant = (index: number) => {
    if (selectedAnswer === index) {
      return feedback === "correct" ? "selectedCorrect" : "selectedIncorrect";
    }
    return "animate";
  };

  return (
    <div className={m.container}>
      <div className={m.wrapper}>
        <motion.h2
          key={currentQuestionIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {currentQuestion?.name}
        </motion.h2>
        <div className={m.answersContainer}>
          {shuffledAnswers
            .filter((field: any) => field.answer.trim() !== "")
            .map((field: any, index: number) => (
              <motion.div
                key={`${currentQuestionIndex}-${index}`}
                className={`${m.answerBox}`}
                onClick={() => handleAnswerClick(index, field)}
                initial="initial"
                animate={getAnimationVariant(index)}
                whileHover={selectedAnswer === null ? "hover" : ""}
                variants={variants}
                transition={{
                  backgroundColor: { duration: 0.3, ease: "linear" },
                  scale: { type: "spring", stiffness: 400, damping: 10 },
                  opacity: { type: "spring", stiffness: 400, damping: 10 },
                }}
                style={{
                  borderColor:
                    selectedAnswer === index
                      ? feedback === "correct"
                        ? "green"
                        : "red"
                      : "transparent",
                  boxShadow:
                    selectedAnswer === index
                      ? feedback === "correct"
                        ? "0 0 20px green"
                        : "0 0 20px red"
                      : "0 4px 20px 0 rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className={m.answerWrap}>
                  {settings.symbol?.title === "A, B, C" &&
                    settings.symbol?.selected === true && (
                      <span className={m.text}>{`${field.symbol}.`}</span>
                    )}
                  <p className={m.text}>{field.answer}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
      {settings.labeling?.selected && selectedAnswer !== null && (
        <motion.div
          className={m.nextBar}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          <motion.button
            className={m.button}
            onClick={goToNextQuestion}
            whileHover={{ scale: 1.03, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {currentQuestionIndex < shuffledQuestions.length - 1
              ? "Следующий вопрос"
              : "Завершить урок"}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
