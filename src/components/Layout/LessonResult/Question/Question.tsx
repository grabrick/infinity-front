import { useState } from "react";
import Header from "./Header/Header";
import m from "./Question.module.scss";
import QuestionItems from "./QuestionItems/QuestionItems";
import useFilteredQuestionResult from "@/hooks/useFilteredQuestionResult/useFilteredQuestionResult";

const Question = ({ sharedLesson }: any) => {
  const { filteredQuestion, isChoice, handleChoice, setSearchField, searchField } =
  useFilteredQuestionResult(sharedLesson);
  
  return (
    <div className={m.container}>
      <h1 className={m.title}>Результаты по вопросам</h1>

      <div className={m.content}>
        <Header 
          searchField={searchField}
          setSearchField={setSearchField}
          handleChoice={handleChoice}
          isChoice={isChoice}
        />
        <div className={m.labelsWrapper}>
          <div className={m.left}>
            <label>Номер</label>
            <label>Вопрос</label>
          </div>
          <div className={m.right}>
            <label>Правильно</label>
            <label>Неправильно</label>
          </div>
        </div>
        <div className={m.results}>
          {filteredQuestion.map((items: any, i: any) => (
            <QuestionItems
              key={i}
              index={items.id}
              questionName={items.name}
              correct={items.correct}
              incorrect={items.incorrect}
            />
          ))}
          {filteredQuestion.length === 0 && (
            <p className={m.warning}>Ничего не найдено!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
