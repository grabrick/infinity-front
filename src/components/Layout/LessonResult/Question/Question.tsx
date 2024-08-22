import Header from "./Header/Header";
import m from "./Question.module.scss";
import QuestionItems from "./QuestionItems/QuestionItems";

const Question = ({ sharedLesson }: any) => {
  console.log(sharedLesson.questions);
  
  return (
    <div className={m.container}>
      <h1 className={m.title}>Результаты по вопросам</h1>

      <div className={m.content}>
        <Header />
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
          {sharedLesson.questions.map((items: any, i: any) => (
            <QuestionItems
              key={i}
              index={items.id}
              questionName={items.name}
              correctly={items.correctly}
              wrong={items.wrong}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
