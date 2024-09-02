import Image from "next/image";
import setting from "@/assets/icons/setting-3.svg";
import m from "./Folder.module.scss";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { convertMongoDate } from "@/utils/convertMongaDate";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ContextMenu from "./ContextMenu/ContextMenu";

const Folder = ({
  folderData,
  setIsChangeFolderName,
  searchField,
  handleMoveFolder,
  handleMoveLesson,
  deleteFolder,
  deletingFolderId,
  setDeletingFolderId,
  setMoveFolderId,
  moveFolderId,
  setMoveLessonId,
  moveBackFolderId,
  deleteFoldersID,
}: any) => {
  const { push } = useRouter();
  const ref = useRef<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  const isHighlighted =
    searchField &&
    folderData?.folderName.toLowerCase().includes(searchField.toLowerCase());

  const isSpecialState =
    deletingFolderId === folderData?._id ||
    moveFolderId === folderData?._id ||
    moveBackFolderId === folderData?._id ||
    deleteFoldersID === folderData?._id;

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
    type: "FOLDER",
    item: { id: folderData._id, type: "FOLDER" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ["FOLDER", "LESSON"],
    drop: (item: any) => {
      if (item.type === "LESSON") {
        handleMoveLesson(item.id, folderData._id);
        setMoveLessonId(item.id);
      } else if (item.type === "FOLDER") {
        if (item.id !== folderData._id) {
          handleMoveFolder(item.id, folderData._id);
          setMoveFolderId(item.id);
        }
      }
    },
  }));

  drag(drop(ref));

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
        setIsChangeFolderName({ flag: true, folderData: folderData });
        break;
      case "delete":
        setDeletingFolderId(folderData?._id);
        deleteFolder.mutate(folderData?._id, {
          onSettled: () => {
            setDeletingFolderId(null);
          },
        });
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
        className={isHighlighted ? m.finded : m.folder}
        onClick={() => push(`/folder/${folderData?._id}`)}
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
        <div className={m.titleWrapp}>
          <h2 className={m.name}>{folderData?.folderName}</h2>
        </div>

        <div className={m.createAt}>
          <span className={m.time}>{`Был создан: ${convertMongoDate(
            folderData?.createdAt
          )}`}</span>
          <div
            className={m.menuWrapper}
            onClick={(e) => handleActiveMenu(e)}
            onMouseEnter={(e) => handleActiveMenu(e)}
          >
            <Image
              src={setting}
              className={m.img}
              alt=""
            />
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

export default Folder;
