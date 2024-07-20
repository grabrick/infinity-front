import Image from "next/image";
import setting from "@/assets/icons/setting-3.svg";
import m from "./Lesson.module.scss";
import { motion } from "framer-motion";
import { convertMongoDate } from "@/utils/convertMongaDate";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ContextMenu from "./ContextMenu/ContextMenu";
import { blinkAnimation } from "@/assets/animation/animation";

const Lesson = ({
  lessonData,
  image,
  setIsOpenEditor,
  deleteLesson,
  setSelectedLesson,
  searchField,
  deletingLessonId,
  setDeletingLessonId,
  moveLessonId,
  moveBackLessonId
}: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<any>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "LESSON",
    item: { id: lessonData._id, type: "LESSON" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  }));

  drag(ref);

  const handleActiveMenu = (e: any) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChoice = (e: any, type: string) => {
    e.stopPropagation();
    setIsMenuOpen(false);

    switch (type) {
      case "edit":
        setSelectedLesson(lessonData);
        setIsOpenEditor(true);
        break;
      case "delete":
        setDeletingLessonId(lessonData?._id);
        deleteLesson.mutate(lessonData?._id, {
          onSettled: () => {
            setDeletingLessonId(null);
          },
        });
        setIsMenuOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        opacity: isDragging ? 0 : 1,
      }}
      className={m.wrapper}
      ref={ref}
    >
      <motion.div
        className={
          searchField &&
          lessonData?.lessonName
            .toLowerCase()
            .includes(searchField.toLowerCase())
            ? m.finded
            : m.lesson
        }
        whileHover={{ scale: 1.03, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        variants={blinkAnimation}
        initial="initial"
        animate={
          ((deletingLessonId === lessonData?._id) ||
          (moveLessonId === lessonData?._id) ||
          (moveBackLessonId === lessonData?._id))
            ? "blink"
            : "initial"
        }
      >
        <div className={m.imageWrapper}>
          {image === null ? (
            <div className={m.mock} />
          ) : (
            <Image src={image} alt="" />
          )}
        </div>
        <div className={m.titleWrapp}>
          <h2 className={m.name}>{lessonData?.lessonName}</h2>

          <div className={m.createAt}>
            <span className={m.time}>{`Был создан: ${convertMongoDate(
              lessonData?.createdAt
            )}`}</span>
            <div className={m.menuWrapper}>
              <Image
                src={setting}
                className={m.img}
                onClick={(e) => handleActiveMenu(e)}
                alt=""
              />
            </div>
          </div>
        </div>
      </motion.div>
      {isMenuOpen && (
        <ContextMenu
          handleChoice={handleChoice}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
    </div>
  );
};

export default Lesson;
