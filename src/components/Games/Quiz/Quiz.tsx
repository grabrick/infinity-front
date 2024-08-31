import React, { useState } from "react";
import { motion } from "framer-motion";
import m from "./Quiz.module.scss";
// import Image from "next/image";
// import CheckIcons from "@/assets/icons/check.svg";
// import XWrongIcons from "@/assets/icons/x-close.svg";

const Quiz = ({
  questions,
  setIsEnd,
  lessonSettings,
  isPlayingUser,
  setIsPlayingUser,
  currentTime,
  setIsLives,
  lives
}: any) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const currentQuestion = questions[currentQuestionIndex];

  const findSelectedSymbol = lessonSettings?.symbol.find(
    (items: any) => items.selected === true
  );

  const handleAnswerClick = (answerIndex: number, field: any) => {
    if (selectedAnswer !== null) {
      return;
    }

    const isCorrect = currentQuestion.fields[answerIndex].isCorrect;
    if (!isCorrect) {
      setIsLives(--lives)
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

    setTimeout(() => {
      setSelectedAnswer(null);
      setFeedback(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsEnd(true);
      }
    }, 1500);
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
      // backgroundColor: "green",
      transition: {
        duration: 0.3,
      },
    },
    selectedIncorrect: {
      scale: 1.05,
      // backgroundColor: "red",
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
        {currentQuestion?.fields
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
                {findSelectedSymbol?.title === "A, B, C" &&
                  findSelectedSymbol?.selected === true && (
                    <span className={m.text}>{`${field.symbol}.`}</span>
                  )}
                <p className={m.text}>{field.answer}</p>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Quiz;
