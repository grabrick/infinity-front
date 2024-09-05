import Image from "next/image";
import Arrow from "@/assets/icons/arrow-mini-bottom.svg";
import m from "./Leaderboard.module.scss";
import { useState } from "react";
import User from "./User/User";
import Header from "./Header/Header";
import { convertMongoDate } from "@/utils/convertMongaDate";

const compareTime = (time1: string, time2: string) => {
  const [min1, sec1] = time1.split(":").map(Number);
  const [min2, sec2] = time2.split(":").map(Number);

  // Переводим время в секунды для упрощения сравнения
  const totalSec1 = min1 * 60 + sec1;
  const totalSec2 = min2 * 60 + sec2;

  return totalSec1 - totalSec2;
};

const Leaderboard = ({ lessonSlug, sharedLesson }: any) => {
  const [isOpenLeaderboard, setIsOpenLeaderboard] = useState(false);
  const users = sharedLesson.users;
  const lessonSettings = lessonSlug.lessonSettings.leaderboard;
  const [searchField, setSearchField] = useState("");

  // Обработка настройки `clearTime`
  const currentTime: any = new Date().getTime();
  let filteredUsers = users.filter((user: any) => {
    const userTime = new Date(user.createdAt).getTime();
    const clearTimeSetting = lessonSettings.clearTime.find(
      (item: any) => item.selected
    ).title;

    switch (clearTimeSetting) {
      case "24 часа":
        return currentTime - userTime <= 24 * 60 * 60 * 1000;
      case "1 неделя":
        return currentTime - userTime <= 7 * 24 * 60 * 60 * 1000;
      case "1 месяц":
        return currentTime - userTime <= 30 * 24 * 60 * 60 * 1000;
      case "1 год":
        return currentTime - userTime <= 365 * 24 * 60 * 60 * 1000;
      default: // "Никогда"
        return true;
    }
  });

  // Сортируем пользователей по правильным ответам и времени
  filteredUsers.sort((a: any, b: any) => {
    if (b.correct !== a.correct) {
      return b.correct - a.correct; // Сортируем по количеству правильных ответов
    } else {
      return compareTime(a.currentTime, b.currentTime); // Если правильные ответы равны, сортируем по времени
    }
  });

  // Ограничение количества лидеров в соответствии с `leadersSize`
  const leadersSize = lessonSettings.leadersSize.leaders;
  const finalUsers = filteredUsers.slice(0, leadersSize);

  // Применяем поиск только к отобранным пользователям
  const searchedUsers = finalUsers.filter((user: any) =>
    user.userName.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className={m.container}>
      <div className={m.header}>
        <h1 className={m.sectionTitle}>Таблица лидеров</h1>
        <Image
          src={Arrow}
          alt=""
          onClick={() => setIsOpenLeaderboard(!isOpenLeaderboard)}
          style={{
            rotate: isOpenLeaderboard ? "180deg" : "0deg",
            cursor: "pointer",
          }}
        />
      </div>
      {isOpenLeaderboard && (
        <div className={m.leaderboard}>
          <Header setSearchField={setSearchField} searchField={searchField} />
          <div className={m.labelsWrapper}>
            <div className={m.left}>
              <label>Номер</label>
              <label>Имя</label>
            </div>
            <div className={m.right}>
              <label>Баллы</label>
              <label>Время</label>
            </div>
          </div>
          <div className={m.results}>
            {searchedUsers.map((items: any, i: any) => (
              <User
                key={i}
                index={i + 1}
                userName={items.userName}
                createdAt={convertMongoDate(items.createdAt)}
                correct={items.correct}
                incorrect={items.incorrect}
                time={items.currentTime}
              />
            ))}
            {searchedUsers.length === 0 && <p>Ничего не найдено!</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
