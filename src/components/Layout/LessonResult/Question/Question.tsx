import { useState } from "react";
import Header from "./Header/Header";
import m from "./Question.module.scss";
import QuestionItems from "./QuestionItems/QuestionItems";

const Question = ({ sharedLesson }: any) => {
  const [searchField, setSearchField] = useState("");

  const filteredQuestions = sharedLesson.questions.filter((items: any) =>
    items.name.toLowerCase().includes(searchField.toLowerCase())
  );
  console.log(filteredQuestions);
  
  return (
    <div className={m.container}>
      <h1 className={m.title}>Результаты по вопросам</h1>

      <div className={m.content}>
        <Header 
          searchField={searchField}
          setSearchField={setSearchField}
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
          {filteredQuestions.map((items: any, i: any) => (
            <QuestionItems
              key={i}
              index={items.id}
              questionName={items.name}
              correct={items.correct}
              incorrect={items.incorrect}
            />
          ))}
          {filteredQuestions.length === 0 && (
            <p>Ничего не найдено!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
