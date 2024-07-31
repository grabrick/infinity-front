import { Key, useState } from "react";
import m from "./LessonSettings.module.scss";
import CheckboxButton from "@/components/UI/CheckboxButton/CheckboxButton";
import RadioButton from "@/components/UI/RadioButton/RadioButton";
import Timer from "./Timer/Timer";
import ProgressBar from "@/components/UI/ProgressBar/ProgressBar";
import LimitOnLives from "./LimitOnLives/LimitOnLives";
import Shuffling from "./Shuffling/Shuffling";
import Labeling from "./Labeling/Labeling";
import EndGame from "./EndGame/EndGame";
import Symbol from "./Symbol/Symbol";
import { motion } from "framer-motion";

const LessonSettings = ({
  setIsLeaderboard,
  isLeaderboard,
  setIsSound,
  isSound,
  isTimer,
  setIsTimer,
  isLimitOnLives, 
  setIsLimitOnLives,
  isLabeling, 
  setIsLabeling,
  register,
  control,
  setValue
}: any) => {

  const data = [
    {
      id: 0,
      settingsTitle: "Настройки таймера",
      isChecked: isTimer,
      onChange: setIsTimer,
      options: [
        {
          id: 1,
          title: "Прямой счёт",
        },
        {
          id: 2,
          title: "Обратный счёт",
        },
      ],
    },
    {
      id: 1,
      settingsTitle: "Лимит на жизни",
      isChecked: isLimitOnLives,
      onChange: setIsLimitOnLives,
    },
    {
      id: 2,
      settingsTitle: "Перетасовка",
      isChecked: null,
      onChange: null,
      options: [
        {
          id: 1,
          title: "Порядок вопросов",
        },
        {
          id: 2,
          title: "Порядок ответов",
        },
      ],
    },
    {
      id: 3,
      settingsTitle: "Маркировка",
      isChecked: isLabeling,
      onChange: setIsLabeling,
      options: [
        {
          id: 1,
          title: "Автоматически продолжить после маркировки",
        },
      ],
    },
    {
      id: 4,
      settingsTitle: "Конец игры",
      isChecked: null,
      onChange: null,
      options: [
        {
          id: 1,
          title: "Показать ответы после игры",
        },
      ],
    },
    {
      id: 5,
      settingsTitle: "Буквы на ответах",
      isChecked: null,
      onChange: null,
      options: [
        {
          id: 1,
          title: "A, B, C",
        },
        {
          id: 2,
          title: "Никакой",
        },
      ],
    },
    {
      id: 6,
      settingsTitle: "Таблица лидеров",
      isChecked: isLeaderboard,
      onChange: setIsLeaderboard,
    },
    {
      id: 7,
      settingsTitle: "Музыка",
      isChecked: isSound,
      onChange: setIsSound,
    },
  ];

  return (
    <div className={m.container}>
      <h1 className={m.sectionTitle}>Параметры урока</h1>

      <div className={m.content}>
        {data.map((item) => (
          <motion.div 
            className={m.card} 
            key={item.id}
          >
            <div
              className={
                item.isChecked &&
                item.settingsTitle !== "Таблица лидеров" &&
                item.settingsTitle !== "Музыка"
                  ? m.isActiveHeader
                  : m.header
              }
            >
              <h3 className={m.title}>{item.settingsTitle}</h3>
              {(item.isChecked && item.onChange) !== null && (
                <CheckboxButton
                  isChecked={item.isChecked}
                  onChange={item.onChange}
                  title={"Включить"}
                />
              )}
            </div>

            <>
              {item.settingsTitle === "Настройки таймера" && item.isChecked && (
                <Timer item={item} register={register} control={control} setValue={setValue} />
              )}
              {item.settingsTitle === "Лимит на жизни" && item.isChecked && (
                <LimitOnLives control={control} setValue={setValue} />
              )}
              {item.settingsTitle === "Перетасовка" && (
                <Shuffling item={item} register={register} control={control} setValue={setValue} />
              )}
              {item.settingsTitle === "Маркировка" && item.isChecked && (
                <Labeling item={item} control={control} setValue={setValue} />
              )}
              {item.settingsTitle === "Конец игры" && (
                <EndGame item={item} control={control} setValue={setValue} />
              )}
              {item.settingsTitle === "Буквы на ответах" && (
                <Symbol item={item} register={register} control={control} setValue={setValue} />
              )}
            </>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LessonSettings;