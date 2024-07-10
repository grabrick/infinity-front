import Image from "next/image";
import setting from "@/assets/icons/setting-3.svg";
import m from "./Lesson.module.scss";
import { motion } from "framer-motion";
import { convertMongoDate } from "@/utils/convertMongaDate";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const Lesson = ({
  lessonData,
  image,
  setIsOpenEditor,
  deleteLesson,
  setSelectedLesson,
  searchField,
  moveLesson
}: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<any>(null);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'LESSON',
    item: { id: lessonData.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'LESSON',
    drop: (item: any) => moveLesson(item.id, lessonData.folderId),
  }));

  drag(drop(ref));

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
        deleteLesson.mutate(lessonData?._id);
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
        className={searchField && lessonData?.lessonName.toLowerCase().includes(searchField.toLowerCase()) ? m.finded : m.lesson}
        whileHover={{ scale: 1.03, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
        <div 
          className={m.menu} 
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <ul>
            <li onClick={(e) => handleChoice(e, "edit")}>Редактировать</li>
            <li onClick={(e) => handleChoice(e, "share")}>Поделиться</li>
            <li onClick={(e) => handleChoice(e, "delete")}>Удалить</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Lesson;
