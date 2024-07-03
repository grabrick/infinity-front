import Crumbs from "@/components/UI/Crumbs/Crumbs";
import m from "./Activity.module.scss";
import Header from "./Header/Header";
import folder from "@/assets/icons/folder-2.svg";
import lessons from "@/assets/icons/clipboard.svg";
import Image from "next/image";
import Folder from "./Folder/Folder";
import Lesson from "./Lesson/Lesson";
import { AnimatePresence, motion } from "framer-motion";
import { topToBottom } from "@/assets/animation/animation";
import { useActivity } from "./useActivity";
import { useAppSelector } from "@/redux/hook/redux.hook";
import CreateFolder from "@/components/UI/Popups/CreateFolder/CreateFolder";
import { useState } from "react";
import DeleteFolder from "@/components/UI/Popups/DeleteFolder/DeleteFolder";

const Activity = () => {
  const userData = useAppSelector((state) => state.userSlice.userData);
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const { data, error, isLoading, createNewFolder, deleteFolder } = useActivity(
    userData?._id || ""
  );

  return (
    <section className={m.container}>
      <Crumbs
        firstPage={"/"}
        secondPage={"/activity"}
        secondPageTitle={"Активность"}
      />
      
      <Header
        setIsCreateActive={setIsCreateActive}
        setIsDeleteActive={setIsDeleteActive}
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
                // folderName={"Понидельник"}
                // lessonsCount={5}
                // createAt={`Был создан: ${"12.02.2024"}`}
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
                // lessonName={"Quiz"}
                image={null}
                // createAt={`Был создан: ${"12.02.2024"}`}
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
    </section>
  );
};

export default Activity;
