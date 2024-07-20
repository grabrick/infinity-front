import Image from "next/image";
import setting from "@/assets/icons/setting-3.svg";
import m from "./Folder.module.scss";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { convertMongoDate } from "@/utils/convertMongaDate";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ContextMenu from "./ContextMenu/ContextMenu";
import { blinkAnimation } from "@/assets/animation/animation";

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
  deleteFoldersID
}: any) => {
  const { push } = useRouter();
  const ref = useRef<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          setMoveFolderId(item.id)
        }
      }
    },
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
    >
      <motion.div
        className={
          searchField &&
          folderData?.folderName
            .toLowerCase()
            .includes(searchField.toLowerCase())
            ? m.finded
            : m.folder
        }
        onClick={() => push(`/folder/${folderData?._id}`)}
        whileHover={{ scale: 1.03, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        variants={blinkAnimation}
        initial="initial"
        animate={
          (deletingFolderId === folderData?._id) ||
          (moveFolderId === folderData?._id) ||
          (moveBackFolderId === folderData?._id) ||
          (deleteFoldersID === folderData?._id)
            ? "blink"
            : "initial"
        }
      >
        <div className={m.titleWrapp}>
          <h2 className={m.name}>{folderData?.folderName}</h2>
          {/* <span className={m.count}>{folderData?.children.length} уроков</span> */}
        </div>

        <div className={m.createAt}>
          <span className={m.time}>{`Был создан: ${convertMongoDate(
            folderData?.createdAt
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

export default Folder;
