import m from "./Activity.module.scss";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AnimatePresence, motion } from "framer-motion";
import { topToBottom } from "@/assets/animation/animation";
import { useActivity } from "./useActivity";
import { useAppSelector } from "@/redux/hook/redux.hook";

import Crumbs from "@/components/UI/Crumbs/Crumbs";
import Header from "./Header/Header";
import folder from "@/assets/icons/folder-2.svg";
import lessons from "@/assets/icons/clipboard.svg";
import Image from "next/image";
import Folder from "./Folder/Folder";
import Lesson from "./Lesson/Lesson";
import CreateFolder from "@/components/UI/Popups/CreateFolder/CreateFolder";
import DeleteFolder from "@/components/UI/Popups/DeleteFolder/DeleteFolder";
import LessonConstructor from "@/components/UI/Popups/LessonConstructor/LessonConstructor";
import ChangeFolder from "@/components/UI/Popups/ChangeFolder/ChangeFolder";

const Activity = () => {
  const userData = useAppSelector((state) => state.userSlice.userData);
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const [isChangeFolderName, setIsChangeFolderName] = useState({
    flag: false,
    folderData: null,
  });
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [searchField, setSearchField] = useState("");
  const {
    data,
    createNewFolder,
    deleteFolder,
    deleteLesson,
    changeNameFolder,
  } = useActivity(userData?._id || "");

  const moveFolder = (draggedId: any, targetId: any) => {
    // логика для перемещения папки
    console.log({draggedId: draggedId, targetId: targetId});
    
  };

  const moveLesson = (draggedId: any, targetFolderId: any) => {
    // логика для перемещения урока
    console.log({draggedId: draggedId, targetFolderId: targetFolderId});
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className={m.container}>
        <Crumbs
          firstPage={"/"}
          secondPage={"/activity"}
          secondPageTitle={"Активность"}
        />

        <Header
          setIsCreateActive={setIsCreateActive}
          setIsDeleteActive={setIsDeleteActive}
          setSearchField={setSearchField}
          searchField={searchField}
        />

        <motion.div
          className={m.activity}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          variants={topToBottom}
        >
          <div className={m.section}>
            <div className={m.titleWrapp}>
              <Image src={folder} alt="" />
              <h1 className={m.title}>Папки</h1>
            </div>
            <div className={m.folders}>
              {data?.data?.folder?.map((items: any, i: any) => (
                <Folder
                  key={i}
                  folderData={items}
                  setIsChangeFolderName={setIsChangeFolderName}
                  searchField={searchField}
                  moveFolder={moveFolder}
                />
              ))}
            </div>
          </div>
          <div className={m.section}>
            <div className={m.titleWrapp}>
              <Image src={lessons} alt="" />
              <h1 className={m.title}>Уроки</h1>
            </div>
            <div className={m.lessons}>
              {data?.data?.lesson?.map((items: any, i: any) => (
                <Lesson
                  key={i}
                  lessonData={items}
                  image={null}
                  deleteLesson={deleteLesson}
                  setIsOpenEditor={setIsOpenEditor}
                  setSelectedLesson={setSelectedLesson}
                  searchField={searchField}
                  moveLesson={moveLesson}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isCreateActive && (
            <motion.div
              className={m.wrapp}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CreateFolder
                isCreateActive={isCreateActive}
                setIsCreateActive={setIsCreateActive}
                createNewFolder={createNewFolder}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isChangeFolderName.flag && (
            <motion.div
              className={m.wrapp}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChangeFolder
                isChangeFolderName={isChangeFolderName}
                setIsChangeFolderName={setIsChangeFolderName}
                changeNameFolder={changeNameFolder}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isDeleteActive && (
            <motion.div
              className={m.wrapp}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DeleteFolder
                isDeleteActive={isDeleteActive}
                setIsDeleteActive={setIsDeleteActive}
                deleteFolder={deleteFolder}
                folderData={data?.data.folder}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpenEditor && (
            <motion.div
              className={m.wrapp}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LessonConstructor
                isOpenEditor={isOpenEditor}
                setIsOpenEditor={setIsOpenEditor}
                selectedLesson={selectedLesson}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </DndProvider>
  );
};

export default Activity;
