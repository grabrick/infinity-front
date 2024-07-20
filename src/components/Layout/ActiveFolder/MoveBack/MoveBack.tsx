import { useRef } from "react";
import m from "./MoveBack.module.scss";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { isVisible } from "@/assets/animation/animation";

const MoveBack = ({ handleMoveBackLesson, handleMoveBackFolder, setMoveBackFolderId, setMoveBackLessonId }: any) => {
  const ref = useRef<any>(null);

  const [, drop] = useDrop(() => ({
    accept: ["FOLDER", "LESSON"],
    drop: (item: any) => {
      if (item.type === "FOLDER") {
        handleMoveBackFolder(item.id);
        setMoveBackFolderId(item.id)
      } else if (item.type === "LESSON") {
        handleMoveBackLesson(item.id);
        setMoveBackLessonId(item.id)
      }
    },
  }));

  drop(ref);

  return (
    <motion.div 
      className={m.folder}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={0}
      variants={isVisible}
      ref={ref}
    >
      <h1 className={m.title}>Переместить назад</h1>
    </motion.div>
  );
};

export default MoveBack;
