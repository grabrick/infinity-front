import { AnimatePresence, motion } from "framer-motion";
import m from "./LessonPlay.module.scss";
import { topToBottom } from "@/assets/animation/animation";
import { useState } from "react";
import NotAuthModal from "./NotAuthModal/NotAuthModal";
import Player from "./Player/Player";
import { useLessonPlay } from "./useLessonPlay";
import { useAppSelector } from "@/redux/hook/redux.hook";

type TUser = {
  userName: string;
  userID: number | string;
  correct: number;
  incorrect: number;
  selectedAnswers: any[]
};

const LessonPlay = ({ lessonSlug }: any) => {
  const userData = useAppSelector((state) => state.userSlice.userData);
  const findSelected = lessonSlug?.lessonSettings?.access.find(
    (items: any) => items.selected === true
  );
  const [isAnimateOver, setIsAnimateOver] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isPlayingUser, setIsPlayingUser] = useState<TUser | null>(null);

  const [isOpen, setIsOpen] = useState(
    findSelected?.title === "Для не зарегистрированных пользователей" &&
      findSelected?.selected === true
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
