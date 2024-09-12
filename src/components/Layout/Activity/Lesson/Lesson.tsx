import Image from "next/image";
import setting from "@/assets/icons/setting-3.svg";
import m from "./Lesson.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { convertMongoDate } from "@/utils/convertMongaDate";
import { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import ContextMenu from "./ContextMenu/ContextMenu";
import { useRouter } from "next/router";

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
  moveBackLessonId,
  setIsShareOpen
}: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const { push } = useRouter();
  const ref = useRef<any>(null);

  const isHighlighted =
    searchField &&
    lessonData?.lessonName.toLowerCase().includes(searchField.toLowerCase());

  const isSpecialState =
    deletingLessonId === lessonData?._id ||
    moveLessonId === lessonData?._id ||
    moveBackLessonId === lessonData?._id;

  const variants: any = {
    initial: {
      backgroundColor: isHighlighted ? "#7790d6" : "#9bb1ec",
      scale: 1,
      opacity: 1,
    },
    blink: {
      backgroundColor: isHighlighted ? "#7790d6" : "#9bb1ec",
      opacity: [1, 0.2, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
    hover: {
      scale: 1.03,
      opacity: 1,
      backgroundColor: isHighlighted ? "#8ca7f0" : "#A8BDF4",
      transition: { duration: 0.3 },
    },
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "LESSON",
    item: { id: lessonData._id, type: "LESSON" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref);

  const handleActiveMenu = (e: any) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = (e: any) => {
    e.stopPropagation();
    if (!isMenuHovered) {
      setIsMenuOpen(false);
    }
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
      case "share":
        setIsShareOpen({ isActive: true, lessonData: lessonData });
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        position: "relative",
        opacity: isDragging ? 0 : 1,
      }}
      className={m.wrapper}
      ref={ref}
      onMouseLeave={handleCloseMenu}
    >
      <motion.div
        className={isHighlighted ? m.finded : m.lesson}
        onClick={() => push(`/lesson/${lessonData._id}`)}
        initial="initial"
        animate={isSpecialState ? "blink" : "initial"}
        whileHover="hover"
        variants={variants}
        transition={{
          backgroundColor: { duration: 0.3, ease: "linear" },
          scale: { type: "spring", stiffness: 400, damping: 10 },
          opacity: { type: "spring", stiffness: 400, damping: 10 },
        }}
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
            <div
              className={m.menuWrapper}
              onClick={(e) => handleActiveMenu(e)}
              onMouseEnter={(e) => handleActiveMenu(e)}
            >
              <Image src={setting} className={m.img} alt="" />
            </div>
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: 1 }}
            onMouseEnter={() => setIsMenuHovered(true)}
            onMouseLeave={() => {
              setIsMenuHovered(false);
              setIsMenuOpen(false);
            }}
          >
            <ContextMenu
              handleChoice={handleChoice}
              setIsMenuOpen={setIsMenuOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lesson;
