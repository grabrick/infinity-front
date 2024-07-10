import Image from "next/image";
import setting from "@/assets/icons/setting-3.svg";
import m from "./Folder.module.scss";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { convertMongoDate } from "@/utils/convertMongaDate";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const Folder = ({ folderData, setIsChangeFolderName, searchField, moveFolder }: any) => {
  const { push } = useRouter();
  const ref = useRef<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FOLDER',
    item: { id: folderData.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  

  const [, drop] = useDrop(() => ({
    accept: ['FOLDER', 'LESSON'],
    drop: (item: any) => moveFolder(item.id, folderData.id),
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
        // setSelectedLesson(lessonData);
        setIsChangeFolderName({ flag: true, folderData: folderData });
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        position: "relative",
        opacity: isDragging ? 0 : 1
      }}
      className={m.wrapper}
      ref={ref}
    >
      <motion.div
        className={searchField && folderData?.folderName.toLowerCase().includes(searchField.toLowerCase()) ? m.finded : m.folder}
        onClick={() => push(`/folder/${folderData?._id}`)}
        whileHover={{ scale: 1.03, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
        <div className={m.menu} onMouseLeave={() => setIsMenuOpen(false)}>
          <ul>
            <li onClick={(e) => handleChoice(e, "edit")}>Редактировать</li>
            {/* <li onClick={(e) => handleChoice(e)}>Delete</li> */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Folder;
