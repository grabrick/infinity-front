import Header from "./Header/Header";
import m from "./Students.module.scss";
import User from "./User/User";

const Students = () => {
  const mockData = [
    {
      id: 0,
      userName: "Александр",
      sendTime: "12:57 - 5 май 2024",
      correctly: 9,
      wrong: 27,
      time: "1:00",
    },
    {
      id: 1,
      userName: "Тима",
      sendTime: "10:00 - 5 май 2024",
      correctly: 7,
      wrong: 29,
      time: "2:00",
    },
    {
      id: 2,
      userName: "Зубенко",
      sendTime: "15:20 - 5 май 2024",
      correctly: 5,
      wrong: 31,
      time: "3:00",
    },
    {
      id: 3,
      userName: "Петя",
      sendTime: "9:40 - 5 май 2024",
      correctly: 2,
      wrong: 34,
      time: "4:00",
    },
  ];
  
  return (
    <div className={m.container}>
      <h1 className={m.title}>Сводка</h1>

      <div className={m.content}>
        <Header />
        <div className={m.labelsWrapper}>
          <div className={m.left}>
            <label>Номер</label>
            <label>Имя</label>
          </div>
          <div className={m.right}>
            <label>Отправлен</label>
            <label>Правильно</label>
            <label>Неправильно</label>
            <label>Время</label>
          </div>
        </div>
        <div className={m.results}>
          {mockData.map((items, i) => (
            <User
              key={i}
              index={++i}
              userName={items.userName}
              sendTime={items.sendTime}
              correctly={items.correctly}
              wrong={items.wrong}
              time={items.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Students;
