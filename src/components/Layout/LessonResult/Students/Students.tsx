import { convertMongoDate } from "@/utils/convertMongaDate";
import Header from "./Header/Header";
import m from "./Students.module.scss";
import User from "./User/User";
import { useState } from "react";

const Students = ({ sharedLesson }: any) => {
  const users = sharedLesson?.users;
  const [searchField, setSearchField] = useState("");

  const filteredUsers = users.filter((user: any) =>
    user.userName.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className={m.container}>
      <h1 className={m.title}>Сводка</h1>

      <div className={m.content}>
        <Header
          setSearchField={setSearchField}
          searchField={searchField}
        />
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
          {filteredUsers.map((items: any, i: any) => (
            <User
              key={i}
              index={++i}
              userName={items.userName}
              createdAt={convertMongoDate(items.createdAt)}
              correct={items.correct}
              incorrect={items.incorrect}
              time={items.currentTime}
            />
          ))}
          {filteredUsers.length === 0 && (
            <p>Ничего не найдено!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
