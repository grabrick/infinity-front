import Crumbs from "@/components/UI/Crumbs/Crumbs";
import m from "./Folder.module.scss";
import Header from "../Activity/Header/Header";
import folder from "@/assets/icons/folder-2.svg";
import lessons from "@/assets/icons/clipboard.svg";
import Image from "next/image";
import FolderChild from "../Activity/Folder/Folder";
import LessonChild from "../Activity/Lesson/Lesson";
import { motion } from "framer-motion";
import { topToBottom } from "@/assets/animation/animation";

const Folder = ({ folderSlug }: any) => {
  return (
    <section className={m.container}>
      <Crumbs
        firstPage={"/"}
        secondPage={"/activity"}
        secondPageTitle={"Активность"}
        ThirdPage={`/folder/${folderSlug}`}
        ThirdPageTitle={`Папка #${folderSlug}`}
      />
      <Header />

      <motion.div 
        className={m.content}
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
            {Array.from({ length: 3 }, (_, i) => (
              <FolderChild
                key={i}
                folderName={"Понидельник"}
                lessonsCount={5}
                id={i}
                createAt={`Был создан: ${"12.02.2024"}`}
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
            {Array.from({ length: 1 }, (_, i) => (
              <LessonChild
                key={i}
                lessonName={"Quiz"}
                image={null}
                createAt={`Был создан: ${"12.02.2024"}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Folder;
