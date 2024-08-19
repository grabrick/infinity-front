import { convertMongoDate } from "@/utils/convertMongaDate";
import m from "./Summary.module.scss";
import Image from "next/image";
import ClipboardIcon from "@/assets/icons/clipboard-white.svg";
import ClipboardCheckIcon from "@/assets/icons/clipboard-tick-white.svg";
import { toastError, toastSuccess } from "@/components/UI/Toast/Toast";
import { useState } from "react";
import BarChart from "./BarChart/BarChart";

const Summary = ({ sharedLesson, originLesson }: any) => {
  const [isClicked, setIsClicked] = useState(false);
  const originLessonData = [
    {
      id: 0,
      title: "Выбранный шаблон урока:",
      value: originLesson.template
    },
    {
      id: 1,
      title: "Дата создания урока:",
      value: convertMongoDate(originLesson.createdAt)
    },
    {
      id: 2,
      title: "Дата добавления урока в мои результаты:",
      value: convertMongoDate(sharedLesson.createdAt)
    },
    {
      id: 3,
      title: "Предельный срок выполнения задания:",
      value: sharedLesson.activeSharedUrl === null ? "Не указан" : sharedLesson.activeSharedUrl
    },
  ];

  const statisticsData = [
    {
      id: 0,
      title: "Число учеников прошедших урок:",
      value: sharedLesson.visitCount
    },
    {
      id: 1,
      title: "Наивысший балл:",
      value: 2
    },
    {
      id: 2,
      title: "Средний бал",
      value: "1.5 / 2"
    },
    {
      id: 3,
      title: "Самый быстрый:",
      value: "Тоха"
    },
  ];

  const users = [
    { name: "Миша", correct: 0, incorrect: 3 },
    { name: "Рома", correct: 1, incorrect: 2 },
    { name: "Таня", correct: 2, incorrect: 1 },
    { name: "Дима", correct: 0, incorrect: 1 },
  ];

  const data = {
    // labels: originLesson.questions,
    labels: users.map(user => user.name),
    datasets: [
      {
        label: 'Правильно',
        data: users.map(user => user.correct),
        backgroundColor: "#B0C5FF",
        borderRadius: 20,
      },
      {
        label: 'Неправильно',
        data: users.map(user => user.incorrect),
        backgroundColor: "#2A3759",
        borderRadius: 20,
      },
    ],
  };

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(`https://infinity.com/lesson/${sharedLesson.lessonID}`);
      const result = await navigator.clipboard.readText();
      if (result) {
        toastSuccess("Адрес был скопирован в буфер обмена");

        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 2000);
      }
    } catch (err) {
      toastError("Не удалось скопировать текст");
    }
  };


  return (
    <div className={m.container}>
      <h1 className={m.title}>Сводка</h1>

      <div className={m.content}>
        <h3 className={m.section}>Информация о уроке</h3>

        <div className={m.barWrapper}>
          {originLessonData.map((items) => (
            <div key={items.id} className={m.bar}>
              {items.title}
              <span className={m.value}>{items.value}</span>
            </div>
          ))}
          <div className={m.linkLesson}>
            <p className={m.link}>{`https://infinity.com/lesson/${sharedLesson.lessonID}`}</p>
            <Image 
              src={isClicked ? ClipboardCheckIcon : ClipboardIcon}
              className={m.icons} 
              onClick={() => handleClick()} 
              alt="" 
            />
          </div>
        </div>
        <div className={m.statistics}>
          <div className={m.barWrapper}>
            {statisticsData.map((items) => (
              <div key={items.id} className={m.bar}>
                {items.title}
                <span className={m.value}>{items.value}</span>
              </div>
            ))}
          </div>
          <BarChart data={data} questions={originLesson.questions} />
        </div>
      </div>
    </div>
  )
}

export default Summary;