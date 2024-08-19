import Header from "./Header/Header";
import m from "./Question.module.scss";
import QuestionItems from "./QuestionItems/QuestionItems";

const Question = () => {
  const mockData = [
    {
      id: 0,
      questionName: "Как называется песня?",
      correctly: 9,
      wrong: 27,
    },
    {
      id: 1,
      questionName: "Какой цвет у солнца",
      correctly: 7,
      wrong: 29,
    },
    {
      id: 2,
      questionName: "Сколько весит пух",
      correctly: 5,
      wrong: 31,
    },
    {
      id: 3,
      questionName: "2 + 3 = ?",
      correctly: 2,
      wrong: 34,
    },
  ];
  
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
          {mockData.map((items, i) => (
            <QuestionItems
              key={i}
              index={++i}
              questionName={items.questionName}
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
