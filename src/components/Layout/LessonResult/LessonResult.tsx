import Crumbs from "@/components/UI/Crumbs/Crumbs";
import m from "./LessonResult.module.scss";
import { motion } from "framer-motion";
import { topToBottom } from "@/assets/animation/animation";

const LessonResult = () => {
  let folderSlug = {
    folderName: "Zaza",
  };
  return (
    <section className={m.container}>
      <Crumbs
        ThirdPage={`/my-results`}
        ThirdPageTitle={`Результат #${folderSlug?.folderName}`}
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
        
      </motion.div>
    </section>
  );
};

export default LessonResult;
