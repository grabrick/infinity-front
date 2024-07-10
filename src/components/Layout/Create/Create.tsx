import Crumbs from "@/components/UI/Crumbs/Crumbs";
import m from "./Create.module.scss";
import Template from "./Template/Template";

import Quize from "@/assets/images/quiz.png";
import { AnimatePresence, motion } from "framer-motion";
import { topToBottom } from "@/assets/animation/animation";
import { useState } from "react";
import { useCreate } from "./useCreate";
import { useAppSelector } from "@/redux/hook/redux.hook";
import LessonConstructor from "../../UI/Popups/LessonConstructor/LessonConstructor";
import Intro from "@/components/UI/Popups/LessonConstructor/Intro/Intro";

type TIsChoice = {
  type: string;
  isActive: boolean;
};

const Create = () => {
  const [isChoice, setIsChoice] = useState<TIsChoice | null>(null);
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const userData = useAppSelector((state) => state.userSlice.userData);
  const { createNewLesson } = useCreate(
    userData?._id || ""
  );

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
              type={"quiz"}
              uniqueClassName={i}
              setIsChoice={setIsChoice}
              image={Quize}
              desc={"Серия вопросов с несколькими вариантами ответов."}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {isChoice?.isActive && (
          <motion.div
            className={m.wrapp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Intro
              setIsChoice={setIsChoice}
              createNewLesson={createNewLesson}
              isChoice={isChoice}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Create;
