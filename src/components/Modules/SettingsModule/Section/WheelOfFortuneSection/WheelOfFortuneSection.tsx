import m from "./WheelOfFortuneSection.module.scss";
import CheckboxButton from "@/components/UI/CheckboxButton/CheckboxButton";
import { motion } from "framer-motion";
import Timer from "../../Fields/LessonSettings/Timer/Timer";
import Access from "../../Fields/LessonSettings/Access/Access";
import Privacy from "../../Fields/LessonSettings/Privacy/Privacy";

const WheelOfFortuneSection = ({
  actions,
  register,
  control,
  formState,
}: any) => {
  const data = [
    {
      id: 0,
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
      id: 1,
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
      id: 2,
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
              {item.settingsTitle === "Настройки таймера" && item.isChecked && (
                <Timer
                  item={item}
                  register={register}
                  control={control}
                  setValue={actions.setValue}
                  timerFormState={formState?.timer}
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

export default WheelOfFortuneSection;
