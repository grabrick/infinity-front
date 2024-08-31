import { motion } from "framer-motion";
import m from "./ShowAnswer.module.scss";
import Image from "next/image";

const ShowAnswer = ({ lessonSlug, questions, setIsShowAnswer }: any) => {
  return (
    <>
      <motion.div
        className={m.allAnswers}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <h1 className={m.title}>{`Ответы урока: ${lessonSlug?.lessonName}`}</h1>
        <div className={m.currentAnswerWrap}>
          {questions.map((items: any) => (
            <div key={items.id} className={m.currentAnswer}>
              <span>{`Вопрос: ${items.name}`}</span>
              {items.fields
                .filter((el: any) => el.isCorrect === true)
                .map((item: any) => (
                  <span
                    key={item.number}
                  >{`Правильный ответ: ${item.answer}`}</span>
                ))}
            </div>
          ))}
        </div>
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
        <div className={m.buttons}>
          <motion.button
            className={m.button}
            whileHover={{ scale: 1.03, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => setIsShowAnswer(false)}
          >
            {/* <Image src={ShowSelected} alt="" /> */}
            Продолжить
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default ShowAnswer;
