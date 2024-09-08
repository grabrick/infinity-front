import m from "./Activity.module.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AnimatePresence, motion } from "framer-motion";
import { topToBottom } from "@/assets/animation/animation";
import { useActivity } from "./useActivity";
import { useAppDispatch, useAppSelector } from "@/redux/hook/redux.hook";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Crumbs from "@/components/UI/Crumbs/Crumbs";
import Header from "./Header/Header";
import folder from "@/assets/icons/folder-2.svg";
import lessons from "@/assets/icons/clipboard.svg";
import Image from "next/image";
import Folder from "./Folder/Folder";
import Lesson from "./Lesson/Lesson";
import CreateFolder from "@/components/UI/Popups/CreateFolder/CreateFolder";
import DeleteFolder from "@/components/UI/Popups/DeleteFolder/DeleteFolder";
import ChangeFolder from "@/components/UI/Popups/ChangeFolder/ChangeFolder";
import { moveRootFolder } from "@/redux/slices/folder.slice";
import { moveRootLesson } from "@/redux/slices/lesson.slice";
import LessonShare from "@/components/UI/Popups/LessonShare/LessonShare";
import FieldsModule from "@/modules/FieldsModule/FieldsModule";

const Activity = () => {
  const userData = useAppSelector((state) => state.userSlice.userData);
  const folderData = useAppSelector((state) => state.folderSlice.folderData);
  const lessonData = useAppSelector((state) => state.lessonSlice.lessonData);
  const dispatch = useAppDispatch();

  const [isCreateActive, setIsCreateActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState({ isActive: false, lessonData: null });
  const [isChangeFolderName, setIsChangeFolderName] = useState({
    flag: false,
    folderData: null,
  });
  const [deletingFolderId, setDeletingFolderId] = useState(null);
  const [deletingLessonId, setDeletingLessonId] = useState(null);
  const [moveFolderId, setMoveFolderId] = useState(null);
  const [moveLessonId, setMoveLessonId] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [deleteFoldersID, setDeleteFoldersID] = useState<any>(null);
  const [searchField, setSearchField] = useState("");
  const {
    isLoading,
    createNewFolder,
    deleteFolder,
    deleteLesson,
    changeNameFolder,
    moveFolders,
    moveLessons,
    createShareUrl,
  } = useActivity(userData?._id || "");

  const handleMoveFolder = (draggedId: any, targetId: any) => {
    moveFolders.mutate(
      { targetID: targetId, draggedId: draggedId },
      {
        onSuccess: () => {
          dispatch(moveRootFolder({ draggedId: draggedId }));
          setMoveFolderId(null);
        },
      }
    );
  };

  const handleMoveLesson = (draggedId: any, targetFolderId: any) => {
    moveLessons.mutate(
      { targetID: targetFolderId, draggedId: draggedId },
      {
        onSuccess: () => {
          dispatch(moveRootLesson({ draggedId: draggedId }));
          setMoveLessonId(null);
        },
      }
    );
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
              {isLoading ? (
                <SkeletonTheme baseColor="#8A9FD3" highlightColor="#A8BDF4">
                  <Skeleton
                    className={m.skeleton}
                    containerClassName={m.skeletonContainer}
                    duration={1.2}
                    count={5}
                  />
                </SkeletonTheme>
              ) : (
                <>
                  {folderData?.length !== 0 ? (
                    <>
                      {folderData?.map((items: any, i: any) => (
                        <Folder
                          key={items._id}
                          folderData={items}
                          setIsChangeFolderName={setIsChangeFolderName}
                          searchField={searchField}
                          handleMoveFolder={handleMoveFolder}
                          handleMoveLesson={handleMoveLesson}
                          deleteFolder={deleteFolder}
                          setDeletingFolderId={setDeletingFolderId}
                          deletingFolderId={deletingFolderId}
                          setMoveFolderId={setMoveFolderId}
                          moveFolderId={moveFolderId}
                          setMoveLessonId={setMoveLessonId}
                          deleteFoldersID={deleteFoldersID?.find(
                            (el: any) => el === items._id
                          )}
                        />
                      ))}
                    </>
                  ) : (
                    <div className={m.errorWrapper}>
                      <h1 className={m.error}>У вас нет созданых папок</h1>
                      <span className={m.errorSpan}>
                        После создания папки данное сообщение пропадет
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={m.section}>
            <div className={m.titleWrapp}>
              <Image src={lessons} alt="" />
              <h1 className={m.title}>Уроки</h1>
            </div>
            <div className={m.lessons}>
              {isLoading ? (
                <SkeletonTheme baseColor="#8A9FD3" highlightColor="#A8BDF4">
                  <Skeleton
                    className={m.skeleton}
                    containerClassName={m.skeletonContainer}
                    duration={1.2}
                    count={5}
                  />
                </SkeletonTheme>
              ) : (
                <>
                  {lessonData?.length !== 0 ? (
                    <>
                      {lessonData?.map((items: any, i: any) => (
                        <Lesson
                          key={items._id}
                          lessonData={items}
                          image={null}
                          deleteLesson={deleteLesson}
                          setIsOpenEditor={setIsOpenEditor}
                          setSelectedLesson={setSelectedLesson}
                          searchField={searchField}
                          deletingLessonId={deletingLessonId}
                          setDeletingLessonId={setDeletingLessonId}
                          moveLessonId={moveLessonId}
                          setIsShareOpen={setIsShareOpen}
                        />
                      ))}
                    </>
                  ) : (
                    <div className={m.errorWrapper}>
                      <h1 className={m.error}>У вас нет уроков</h1>
                      <span className={m.errorSpan}>
                        После создания урока данное сообщение пропадет
                      </span>
                    </div>
                  )}
                </>
              )}
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
                createdIn={'activity'}
              />
            </motion.div>
          )}

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
                folderData={folderData}
                setDeleteFoldersID={setDeleteFoldersID}
              />
            </motion.div>
          )}

          {isOpenEditor && (
            <motion.div
              className={m.wrapp}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FieldsModule
                template={selectedLesson?.template}
                isOpenEditor={isOpenEditor}
                setIsOpenEditor={setIsOpenEditor}
                selectedLesson={selectedLesson}
              />
            </motion.div>
          )}

          {isShareOpen.isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LessonShare 
                setIsShareOpen={setIsShareOpen} 
                isShareOpen={isShareOpen}
                createShareUrl={createShareUrl}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </DndProvider>
  );
};

export default Activity;
