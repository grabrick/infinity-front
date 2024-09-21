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
import { useEffect, useState } from "react";
import CreateFolder from "@/components/UI/Popups/CreateFolder/CreateFolder";
import DeleteFolder from "@/components/UI/Popups/DeleteFolder/DeleteFolder";
import { useAppDispatch, useAppSelector } from "@/redux/hook/redux.hook";
import { useActiveFolder } from "./useActiveFolder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ChangeFolder from "@/components/UI/Popups/ChangeFolder/ChangeFolder";
// import LessonConstructor from "@/components/UI/Popups/LessonConstructor/LessonConstructor";
import MoveBack from "./MoveBack/MoveBack";
import { moveChildFolder, backChildFolder } from "@/redux/slices/folder.slice";
import { backChildLesson, moveChildLesson } from "@/redux/slices/lesson.slice";
import LessonShare from "@/components/UI/Popups/LessonShare/LessonShare";
import SharedLesson from "../MyResults/SharedLesson/SharedLesson";

const ActiveFolder = ({ folderSlug }: any) => {
  const userData = useAppSelector((state) => state.userSlice.userData);
  const folderData = useAppSelector((state) => state.folderSlice.childData);
  const lessonData = useAppSelector((state) => state.lessonSlice.childData);
  const dispatch = useAppDispatch();

  const [isCreateActive, setIsCreateActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState({ isActive: false, lessonData: null });
  const [isChangeFolderName, setIsChangeFolderName] = useState({
    flag: false,
    folderData: null,
  });
  const [deletingFolderId, setDeletingFolderId] = useState(null);
  const [deleteFoldersID, setDeleteFoldersID] = useState<any>(null);
  const [deletingLessonId, setDeletingLessonId] = useState(null);
  const [moveFolderId, setMoveFolderId] = useState(null);
  const [moveLessonId, setMoveLessonId] = useState(null);
  const [moveBackFolderId, setMoveBackFolderId] = useState(null);
  const [moveBackLessonId, setMoveBackLessonId] = useState(null);

  const {
    // data,
    isLoading,
    createNewFolder,
    moveFolders,
    moveLessons,
    deleteFolder,
    deleteLesson,
    changeNameFolder,
    moveBackLesson,
    moveBackFolder,
  } = useActiveFolder(userData?._id || "", folderSlug._id);

  const handleMoveFolder = (draggedId: any, targetId: any) => {
    moveFolders.mutate(
      { targetID: targetId, draggedId: draggedId },
      {
        onSuccess: () => {
          dispatch(
            moveChildFolder({ targetID: targetId, draggedId: draggedId })
          );
          setMoveFolderId(null);
        },
      }
    );
  };

  const handleMoveBackFolder = (draggedId: any) => {
    moveBackFolder.mutate(draggedId, {
      onSuccess: () => {
        dispatch(backChildFolder({ draggedId: draggedId }));
      },
    });
  };

  const handleMoveBackLesson = (draggedId: any) => {
    moveBackLesson.mutate(draggedId, {
      onSuccess: () => {
        dispatch(backChildLesson({ draggedId: draggedId }));
      },
    });
  };

  const handleMoveLesson = (draggedId: any, targetFolderId: any) => {
    moveLessons.mutate(
      { targetID: targetFolderId, draggedId: draggedId },
      {
        onSuccess: () => {
          dispatch(moveChildLesson({ draggedId: draggedId }));
          setMoveLessonId(null);
        },
      }
    );
  };

  if (folderData?.length === 0 && lessonData?.length === 0) {
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
                folderData={folderData}
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
          <MoveBack
            handleMoveBackLesson={handleMoveBackLesson}
            handleMoveBackFolder={handleMoveBackFolder}
            setMoveBackFolderId={setMoveBackFolderId}
            setMoveBackLessonId={setMoveBackLessonId}
          />

          <div className={m.sectionsContainer}>
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
                          <FolderChild
                            key={items._id}
                            folderData={items}
                            searchField={searchField}
                            setIsChangeFolderName={setIsChangeFolderName}
                            handleMoveFolder={handleMoveFolder}
                            handleMoveLesson={handleMoveLesson}
                            deleteFolder={deleteFolder}
                            setDeletingFolderId={setDeletingFolderId}
                            deletingFolderId={deletingFolderId}
                            setMoveLessonId={setMoveLessonId}
                            setMoveFolderId={setMoveFolderId}
                            moveFolderId={moveFolderId}
                            moveBackFolderId={moveBackFolderId}
                            deleteFoldersID={deleteFoldersID?.find(
                              (el: any) => el === items._id
                            )}
                          />
                        ))}
                      </>
                    ) : (
                      <div className={m.errorWrapper}>
                        <h1 className={m.error}>В данной папке нет папок</h1>
                        <span className={m.errorSpan}>
                          Создайте папку чтобы пропало сообщение
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
                          <>
                            {items.type === "sharedResult" ? (
                              <SharedLesson
                                key={items._id}
                                lessonData={items}
                                image={null}
                                deleteLesson={deleteLesson}
                                setSelectedLesson={setSelectedLesson}
                                searchField={searchField}
                                deletingLessonId={deletingLessonId}
                                setDeletingLessonId={setDeletingLessonId}
                                moveLessonId={moveLessonId}
                                // setIsShareOpen={setIsShareOpen}
                              />
                            ) : (
                              <LessonChild
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
                                moveBackLessonId={moveBackLessonId}
                                setIsShareOpen={setIsShareOpen}
                              />
                            )}
                          </>
                        ))}
                      </>
                    ) : (
                      <div className={m.errorWrapper}>
                        <h1 className={m.error}>В данной папке нет уроков</h1>
                        <span className={m.errorSpan}>
                          Добавьте урок в эту папку
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
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

          {/* {isOpenEditor && (
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
          )} */}

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
                folderID={folderSlug._id}
                setDeleteFoldersID={setDeleteFoldersID}
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
              <LessonShare setIsShareOpen={setIsShareOpen} isShareOpen={isShareOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </DndProvider>
  );
};

export default ActiveFolder;
