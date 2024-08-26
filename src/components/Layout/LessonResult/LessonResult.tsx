import Crumbs from "@/components/UI/Crumbs/Crumbs";
import m from "./LessonResult.module.scss";
import { motion } from "framer-motion";
import { topToBottom } from "@/assets/animation/animation";
import Summary from "./Summary/Summary";
import Students from "./Students/Students";
import Question from "./Question/Question";

const LessonResult = ({ getLesson }: any) => {
  return (
    <section className={m.container}>
      <Crumbs
        ThirdPage={`/my-results`}
        ThirdPageTitle={`Результат #${getLesson?.shared?.lessonName}`}
        isDeepFolders={true}
      />

      <motion.div
        className={m.results}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
        variants={topToBottom}
      >
        <div className={m.content}>
          <Summary sharedLesson={getLesson?.shared} originLesson={getLesson?.originLesson} />
          <Students sharedLesson={getLesson?.shared} />
          <Question sharedLesson={getLesson?.shared} />
        </div>
      </motion.div>
    </section>
  );
};

export default LessonResult;
