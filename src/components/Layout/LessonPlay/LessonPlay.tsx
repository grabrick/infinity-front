import { AnimatePresence, motion } from "framer-motion";
import m from "./LessonPlay.module.scss";
import { topToBottom } from "@/assets/animation/animation";
import { useState } from "react";
import NotAuthModal from "./NotAuthModal/NotAuthModal";
import Player from "./Player/Player";
import { useLessonPlay } from "./useLessonPlay";
import { useAppSelector } from "@/redux/hook/redux.hook";
import { useSettings } from "@/hooks/useSettings/useSettings";

type TUser = {
  userName: string;
  userID: number | string;
  correct: number;
  incorrect: number;
  selectedAnswers: any[];
};

const LessonPlay = ({ lessonSlug }: any) => {
  const { access } = useSettings(lessonSlug.lessonSettings);
  const userData = useAppSelector((state) => state.userSlice.userData);
  const [isAnimateOver, setIsAnimateOver] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isPlayingUser, setIsPlayingUser] = useState<TUser | null>(null);

  const [isOpen, setIsOpen] = useState(
    access?.title === "Для не зарегистрированных пользователей" &&
      access?.selected === true
      ? true
      : false
  );

  return (
    <section className={m.container}>
      <motion.div
        className={m.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
        variants={topToBottom}
        onAnimationComplete={() => setIsAnimateOver(true)}
      >
        <Player
          lessonSlug={lessonSlug}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
          setIsPlayingUser={setIsPlayingUser}
          isPlayingUser={isPlayingUser}
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && isAnimateOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NotAuthModal
              setIsOpen={setIsOpen}
              userID={userData?._id}
              setIsPlayingUser={setIsPlayingUser}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LessonPlay;
