import Crumbs from "@/components/UI/Crumbs/Crumbs";
import m from "./Lesson.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { topToBottom } from "@/assets/animation/animation";
import { useEffect, useState } from "react";
import LessonSettings from "./Settings/Sections/LessonSettings/LessonSettings";
import LeaderboardSettings from "./Settings/Sections/LeaderboardSettings/LeaderboardSettings";
import SoundSettings from "./Settings/Sections/SoundSettings/SoundSettings";
import { useForm } from "react-hook-form";
import DemoPlayer from "./DemoPlayer/DemoPlayer";
import { useLesson } from "./useLesson";
import Image from "next/image";
import { useAppSelector } from "@/redux/hook/redux.hook";
import Settings from "./Settings/Settings";
import Leaderboard from "./Leaderboard/Leaderboard";

const Lesson = ({ lessonSlug, sharedLesson }: any) => {
  const userData = useAppSelector((state) => state.userSlice.userData);
  const [isPlay, setIsPlay] = useState(false);
  const [isPlayingUser, setIsPlayingUser] = useState<any>(null);
  const [isVisibleRoot, setIsVisibleRoot] = useState(false);
  const [isVisiblePlayer, setIsVisiblePlayer] = useState(false);

  return (
    <section className={m.container}>
      <Crumbs
        ThirdPage={`/lesson/${lessonSlug}`}
        ThirdPageTitle={`${lessonSlug?.lessonName}`}
        isDeepFolders={true}
      />

      <motion.div
        className={m.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
        variants={topToBottom}
        onAnimationComplete={() => setIsVisibleRoot(true)}
      >
        {isVisibleRoot && (
          <DemoPlayer
            lessonSlug={lessonSlug}
            lessonSettings={lessonSlug.lessonSettings}
            isPlay={isPlay}
            setIsPlay={setIsPlay}
            setIsVisiblePlayer={setIsVisiblePlayer}
            isPlayingUser={isPlayingUser}
            setIsPlayingUser={setIsPlayingUser}
          />
        )}
        {isVisiblePlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={m.wraper}
          >
            <Leaderboard lessonSlug={lessonSlug} sharedLesson={sharedLesson} />
            <Settings lessonSlug={lessonSlug} userData={userData} />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Lesson;
