import Image from "next/image";
import m from "./Home.module.scss";
import logo from "@/assets/images/quiz.png";
import ListSearch from '@/assets/icons/list-search_black.svg';
import LessonTemplateCard from "@/components/UI/LessonTemplateCard/LessonTemplateCard";
import { motion } from "framer-motion";
import { isVisible, topToBottom } from "@/assets/animation/animation";

const Home = () => {
  return (
    <section className={m.container}>
      <motion.div 
        className={m.titleWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
        variants={topToBottom}
      >
        <h1 className={m.title}>
          Добро пожаловать в <span className={m.activeName}>Infinity</span>
        </h1>
        <span className={m.span}>Качество и надежность в каждом уроке</span>
      </motion.div>

      <motion.div 
        className={m.section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
        variants={topToBottom}
      >
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
              <Image src={ListSearch} alt="" />
              Каталог
            </button>
          </div>
          <span className={m.minDesc}>Здесь вы найдете все что вам нужно</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
