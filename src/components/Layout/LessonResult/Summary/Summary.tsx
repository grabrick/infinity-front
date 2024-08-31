import { convertMongoDate } from "@/utils/convertMongaDate";
import m from "./Summary.module.scss";
import Image from "next/image";
import ClipboardIcon from "@/assets/icons/clipboard-white.svg";
import ClipboardCheckIcon from "@/assets/icons/clipboard-tick-white.svg";
import { toastError, toastSuccess } from "@/components/UI/Toast/Toast";
import { useEffect, useState } from "react";
import BarChart from "./BarChart/BarChart";

const Summary = ({ sharedLesson, originLesson }: any) => {
  const [isClicked, setIsClicked] = useState(false);
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.protocol}//${window.location.host}/lesson/${sharedLesson.lessonID}`);
    }
  }, [sharedLesson.lessonID]);
  
  const users = sharedLesson.users;
  const originLessonData = [
    {
      id: 0,
      title: "Выбранный шаблон урока:",
      value: originLesson.template,
    },
    {
      id: 1,
      title: "Дата создания урока:",
      value: convertMongoDate(originLesson.createdAt),
    },
    {
      id: 2,
      title: "Дата добавления урока в мои результаты:",
      value: convertMongoDate(sharedLesson.createdAt),
    },
    {
      id: 3,
      title: "Предельный срок выполнения задания:",
      value:
        sharedLesson.activeSharedUrl === null
          ? "Не указан"
          : sharedLesson.activeSharedUrl,
    },
  ];
  function timeToSeconds(time: string): number {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  }

  const findQuickUser = users.reduce((quickestUser: any, currentUser: any) => {
    if (!currentUser.currentTime) return quickestUser;
    
    const currentTimeInSeconds = timeToSeconds(currentUser.currentTime);

    // Если у нас еще нет быстрого пользователя или текущий пользователь быстрее
    if (
      !quickestUser ||
      currentTimeInSeconds < timeToSeconds(quickestUser.currentTime)
    ) {
      return currentUser;
    }

    return quickestUser;
  }, null);

  const statisticsData = [
    {
      id: 0,
      title: "Число учеников прошедших урок:",
      value: sharedLesson.visitCount,
    },
    {
      id: 1,
      title: "Наивысший балл:",
      value: sharedLesson.questions.length,
    },
    {
      id: 2,
      title: "Средний бал",
      value: sharedLesson.questions.length / 2,
    },
    {
      id: 3,
      title: "Самый быстрый:",
      value: findQuickUser.userName,
    },
  ];

  const data = {
    labels: users.map((user: any) => user.userName),
    datasets: [
      {
        label: "Правильно",
        data: users.map((user: any) => user.correct),
        backgroundColor: "#B0C5FF",
        borderRadius: 20,
      },
      {
        label: "Неправильно",
        data: users.map((user: any) => user.incorrect),
        backgroundColor: "#2A3759",
        borderRadius: 20,
      },
    ],
  };

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
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
            <p className={m.link}>{fullUrl}</p>
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
  );
};

export default Summary;
