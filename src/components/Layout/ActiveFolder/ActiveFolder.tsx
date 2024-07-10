import Crumbs from "@/components/UI/Crumbs/Crumbs";
import m from "./ActiveFolder.module.scss";
import Header from "../Activity/Header/Header";
import folder from "@/assets/icons/folder-2.svg";
import lessons from "@/assets/icons/clipboard.svg";
import Image from "next/image";
import FolderChild from "../Activity/Folder/Folder";
import LessonChild from "../Activity/Lesson/Lesson";
import { AnimatePresence, motion } from "framer-motion";
import { topToBottom } from "@/assets/animation/animation";
import { useState } from "react";
import CreateFolder from "@/components/UI/Popups/CreateFolder/CreateFolder";
import DeleteFolder from "@/components/UI/Popups/DeleteFolder/DeleteFolder";
import { useAppSelector } from "@/redux/hook/redux.hook";
import { useActiveFolder } from "./useActiveFolder";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ActiveFolder = ({ folderSlug }: any) => {
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [searchField, setSearchField] = useState("");

  const userData = useAppSelector((state) => state.userSlice.userData);

  const { data, error, createNewFolder, deleteFolder } = useActiveFolder(
    userData?._id || "",
    folderSlug._id
  );

  const moveFolder = (draggedId: any, targetId: any) => {
    // логика для перемещения папки
    console.log({ draggedId: draggedId, targetId: targetId });
  };

  const moveLesson = (draggedId: any, targetFolderId: any) => {
    // логика для перемещения урока
    console.log({ draggedId: draggedId, targetFolderId: targetFolderId });
  };

  if (data?.length === 0) {
    return (
      <section className={m.container}>
        <Crumbs
          // firstPage={"/"}
          // secondPage={"/activity"}
          // secondPageTitle={"Активность"}
          ThirdPage={`/folder/${folderSlug}`}
          ThirdPageTitle={`Папка #${folderSlug?.folderName}`}
          isDeepFolders={true}
        />

        <Header
          setIsCreateActive={setIsCreateActive}
          setIsDeleteActive={setIsDeleteActive}
          setSearchField={setSearchField}
          searchField={searchField}
        />

        <motion.div
          className={m.ErrorContent}
          key={folderSlug._id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          variants={topToBottom}
        >
          <h1 className={m.error}>В данной папке ничего нет</h1>
          <span className={m.errorSpan}>Добавив урок или папку я пропаду</span>
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
                folderID={folderSlug._id}
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
                folderData={data}
                folderID={folderSlug._id}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <section className={m.container}>
        <Crumbs
          // firstPage={"/"}
          // secondPage={"/activity"}
          // secondPageTitle={"Активность"}
          ThirdPage={`/folder/${folderSlug}`}
          ThirdPageTitle={`Папка #${folderSlug?.folderName}`}
          isDeepFolders={true}
        />

        <Header
          setIsCreateActive={setIsCreateActive}
          setIsDeleteActive={setIsDeleteActive}
          setSearchField={setSearchField}
          searchField={searchField}
        />

        <motion.div
          className={m.content}
          key={folderSlug._id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          variants={topToBottom}
        >
          <div className={m.section}>
            {data?.length > 0 && (
              <div className={m.titleWrapp}>
                <Image src={folder} alt="" />
                <h1 className={m.title}>Папки</h1>
              </div>
            )}

            <div className={m.folders}>
              {data?.map((items: any, i: any) => (
                <FolderChild
                  key={i}
                  folderData={items}
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
              {/* Здесь будет код для отображения уроков */}
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
                folderID={folderSlug._id}
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
                folderData={data}
                folderID={folderSlug._id}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </DndProvider>
  );
};

export default ActiveFolder;
