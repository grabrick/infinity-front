import { motion } from "framer-motion";
import m from "./Menu.module.scss";
import Image from "next/image";
import RestartLessonIcon from "@/assets/icons/rotate-left.svg";
import ShowSelected from "@/assets/icons/task-square.svg";

const Menu = ({
  setIsShowAnswer,
  handleResetLesson,
  lessonSlug,
  currentTime,
  isPlayingUser,
  lives,
}: any) => {
  return (
    <>
      <motion.div
        className={m.info}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <h1 className={m.title}>
          {lives === 0
            ? `Вы не прошли урок: ${lessonSlug?.lessonName}`
            : `Вы прошли урок: ${lessonSlug?.lessonName}`}
        </h1>
        <motion.span
          className={m.desc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          {lives === 0
            ? `Ваши результаты не будут записаны у преподавателя, так как вы потеряли все попытки`
            : `Ваши результаты будут записаны у преподавателя, для обратной связи
          обратитесь к преподавателю или создателю урока`}
        </motion.span>
      </motion.div>
      <motion.div
        className={m.endWrapp}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <div className={m.textWrapp}>
          <span>{`Время: ${currentTime}`}</span>
          <span>{`Баллы: ${isPlayingUser.correct}`}</span>
        </div>
        <div className={m.buttons}>
          <motion.button
            className={m.button}
            whileHover={{ scale: 1.03, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => setIsShowAnswer(true)}
          >
            <Image src={ShowSelected} alt="" />
            Показать ответы
          </motion.button>
          <motion.button
            className={m.button}
            whileHover={{ scale: 1.03, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => handleResetLesson()}
          >
            <Image src={RestartLessonIcon} alt="" />
            Начать заново
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};
export default Menu;
