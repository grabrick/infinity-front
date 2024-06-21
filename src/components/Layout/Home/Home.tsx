import Image from "next/image";
import m from "./Home.module.scss";
import logo from "@/assets/images/quiz.png";
import LessonTemplateCard from "@/components/UI/LessonTemplateCard/LessonTemplateCard";

const Home = () => {
  return (
    <section className={m.container}>
      <div className={m.titleWrapper}>
        <h1 className={m.title}>
          Добро пожаловать в <span className={m.activeName}>Infinity</span>
        </h1>
        <span className={m.span}>Качество и надежность в каждом уроке</span>
      </div>

      <div className={m.section}>
        <div className={m.cardsWrapper}>
          {Array.from({ length: 9 }, (i) => (
            <LessonTemplateCard
              key={i}
              title={"Quiz"}
              desc={
                "Серия вопросов с несколькими вариантами ответов. Нажмите на правильный ответ, чтобы продолжить."
              }
              logo={logo}
            />
          ))}
        </div>

        <div className={m.catalogWrapp}>
          <div className={m.textWrapp}>
            <h1 className={m.title}>Не нашли нужный урок?</h1>
            <span className={m.subText}>Тогда вам понадобиться каталог</span>
          </div>
          <div className={m.catalogBtnWrapper}>
            <button className={m.catalogBtn}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 11.3V7.04001C20.5 3.01001 19.56 2 15.78 2H8.22C4.44 2 3.5 3.01001 3.5 7.04001V18.3C3.5 20.96 4.96001 21.59 6.73001 19.69L6.73999 19.68C7.55999 18.81 8.80999 18.88 9.51999 19.83L10.53 21.18"
                  stroke="#1C2846"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.2 21.4C19.9673 21.4 21.4 19.9673 21.4 18.2C21.4 16.4327 19.9673 15 18.2 15C16.4327 15 15 16.4327 15 18.2C15 19.9673 16.4327 21.4 18.2 21.4Z"
                  stroke="#1C2846"
                  stroke-opacity="0.4"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 22L21 21"
                  stroke="#1C2846"
                  stroke-opacity="0.4"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M8 7H16"
                  stroke="#1C2846"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M9 11H15"
                  stroke="#1C2846"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Каталог
            </button>
          </div>
          <span className={m.minDesc}>Здесь вы найдете все что вам нужно</span>
        </div>
      </div>
    </section>
  );
};

export default Home;
