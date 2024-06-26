import Crumbs from "@/components/UI/Crumbs/Crumbs";
import m from "./Create.module.scss";
import Template from "./Template/Template";

import Quize from "@/assets/images/quiz.png";
import { motion } from "framer-motion";
import { topToBottom } from "@/assets/animation/animation";
import { useState } from "react";

const Create = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className={m.container}>
      <Crumbs
        firstPage={"/"}
        secondPage={"/create"}
        secondPageTitle={"Создать урок"}
      />

      <motion.div
        className={m.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
        variants={topToBottom}
      >
        <div className={m.titleWrapper}>
          <h1 className={m.title}>Выберите подходящий шаблон</h1>
          <h1 className={m.desc}>Доступно более 20 шаблонов под ваши задачи</h1>
        </div>

        <div className={m.template}>
          {Array.from({ length: 16 }, (_, i) => (
            <Template
              key={i}
              title={"Quiz"}
              uniqueClassName={i}
              setIsPaused={setIsPaused}
              isPaused={isPaused}
              image={Quize}
              desc={"Серия вопросов с несколькими вариантами ответов."}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Create;
