import m from "./QuizSection.module.scss";
import CheckboxButton from "@/components/UI/CheckboxButton/CheckboxButton";
import { motion } from "framer-motion";
import Timer from "../../Fields/LessonSettings/Timer/Timer";
import LimitOnLives from "../../Fields/LessonSettings/LimitOnLives/LimitOnLives";
import Shuffling from "../../Fields/LessonSettings/Shuffling/Shuffling";
import Labeling from "../../Fields/LessonSettings/Labeling/Labeling";
import EndGame from "../../Fields/LessonSettings/EndGame/EndGame";
import Symbol from "../../Fields/LessonSettings/Symbol/Symbol";
import Access from "../../Fields/LessonSettings/Access/Access";
import Privacy from "../../Fields/LessonSettings/Privacy/Privacy";

const QuizSection = ({
  actions,
  register,
  control,
  formState,
}: any) => {
  const data = [
    {
      id: 0,
      settingsTitle: "Настройки таймера",
      isChecked: actions.isTimer,
      onChange: actions.setIsTimer,
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
      isChecked: actions.isLimitOnLives,
      onChange: actions.setIsLimitOnLives,
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
      isChecked: actions.isLabeling,
      onChange: actions.setIsLabeling,
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
      settingsTitle: "Доступ к уроку для прохождения",
      isChecked: null,
      onChange: null,
      options: [
        {
          id: 1,
          title: "Для не зарегистрированных пользователей",
        },
        {
          id: 2,
          title: "Для зарегистрированных пользователей",
        },
        {
          id: 3,
          title: "Для анонимных пользователей",
        },
      ],
    },
    {
      id: 7,
      settingsTitle: "Приватность",
      isChecked: null,
      onChange: null,
      options: [
        {
          id: 1,
          title: "Открытый доступ к уроку",
        },
        {
          id: 2,
          title: "Закрытый доступ к уроку",
        },
      ],
    },
    {
      id: 8,
      settingsTitle: "Таблица лидеров",
      isChecked: actions.isLeaderboard,
      onChange: actions.setIsLeaderboard,
    },
    {
      id: 9,
      settingsTitle: "Музыка",
      isChecked: actions.isSound,
      onChange: actions.setIsSound,
    },
  ];

  return (
    <div className={m.container}>
      <div className={m.content}>
        {data.map((item) => (
            <motion.div className={m.card} key={item.id}>
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
                {item.settingsTitle === "Настройки таймера" &&
                  item.isChecked && (
                    <Timer
                      item={item}
                      register={register}
                      control={control}
                      setValue={actions.setValue}
                      timerFormState={formState?.timer}
                    />
                  )}
                {item.settingsTitle === "Лимит на жизни" && item.isChecked && (
                  <LimitOnLives
                    control={control}
                    setValue={actions.setValue}
                    livesFormState={formState?.limitOnLives}
                  />
                )}
                {item.settingsTitle === "Перетасовка" && (
                  <Shuffling
                    register={register}
                    control={control}
                    setValue={actions.setValue}
                    shufflingFormState={formState?.shuffling}
                  />
                )}
                {item.settingsTitle === "Маркировка" && item.isChecked && (
                  <Labeling
                    item={item}
                    control={control}
                    setValue={actions.setValue}
                    onChange={item.onChange}
                    labelingFormState={formState?.labeling}
                  />
                )}
                {item.settingsTitle === "Конец игры" && (
                  <EndGame
                    item={item}
                    control={control}
                    setValue={actions.setValue}
                    endGameFormState={formState?.endGame}
                  />
                )}
                {item.settingsTitle === "Буквы на ответах" && (
                  <Symbol
                    item={item}
                    register={register}
                    control={control}
                    setValue={actions.setValue}
                    symbolFormState={formState?.symbol}
                  />
                )}
                {item.settingsTitle === "Доступ к уроку для прохождения" && (
                  <Access
                    item={item}
                    register={register}
                    control={control}
                    setValue={actions.setValue}
                    symbolFormState={formState?.access}
                  />
                )}
                {item.settingsTitle === "Приватность" && (
                  <Privacy
                    item={item}
                    register={register}
                    control={control}
                    setValue={actions.setValue}
                    symbolFormState={formState?.privacy}
                  />
                )}
              </>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default QuizSection;
