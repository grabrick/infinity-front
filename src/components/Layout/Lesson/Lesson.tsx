import Crumbs from "@/components/UI/Crumbs/Crumbs";
import m from "./Lesson.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { topToBottom } from "@/assets/animation/animation";
import { useState } from "react";
import LessonSettings from "./Sections/LessonSettings/LessonSettings";
import LeaderboardSettings from "./Sections/LeaderboardSettings/LeaderboardSettings";
import SoundSettings from "./Sections/SoundSettings/SoundSettings";
import { useForm } from "react-hook-form";
import Player from "./Player/Player";

const Lesson = ({ lessonSlug }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lessonSettings: {
        timer: null,
        limitOnLives: null,
        shuffling: [
          { optionID: 1, name: "Порядок вопросов", selected: true },
          { optionID: 2, name: "Порядок ответов", selected: false },
        ],
        labeling: null,
        endGame: {
          optionID: 1,
          name: "Показать ответы после игры",
          selected: false,
        },
        symbol: [
          { id: 1, name: "A, B, C", selected: true },
          { id: 2, name: "Никакой", selected: false },
        ],
        leaderboard: null,
        soundboard: null,
      },
    },
  });
  const [isPlay, setIsPlay] = useState(false);
  const [isLeaderboard, setIsLeaderboard] = useState(false);
  const [isSound, setIsSound] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const [isLimitOnLives, setIsLimitOnLives] = useState(false);
  const [isLabeling, setIsLabeling] = useState(false);

  const [isVisibleRoot, setIsVisibleRoot] = useState(false);
  const [isVisiblePlayer, setIsVisiblePlayer] = useState(false);

  const onSubmit = (data: any) => {
    if (!isTimer) {
      data.lessonSettings.timer = null;
    }
    if (!isLimitOnLives) {
      data.lessonSettings.limitOnLives = null;
    }

    if (!isLabeling) {
      data.lessonSettings.labeling = null;
    }

    if (!isLeaderboard) {
      data.lessonSettings.leaderboard = null;
    }

    if (!isSound) {
      data.lessonSettings.soundboard = null;
    }

    console.log(data);
  };

  const onReset = () => {
    reset();
    setIsTimer(false);
    setIsLimitOnLives(false);
    setIsLabeling(false);
    setIsLeaderboard(false);
    setIsSound(false);
  };

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
          <Player
            lessonSlug={lessonSlug}
            isPlay={isPlay}
            setIsPlay={setIsPlay}
            setIsVisiblePlayer={setIsVisiblePlayer}
          />
        )}
        {isVisiblePlayer && (
          <motion.form
            className={m.settings}
            onSubmit={handleSubmit(onSubmit)}
            onReset={onReset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", delay: 0.3, duration: 0.5 }}
          >
            <LessonSettings
              setIsLeaderboard={setIsLeaderboard}
              isLeaderboard={isLeaderboard}
              setIsSound={setIsSound}
              isSound={isSound}
              isTimer={isTimer}
              setIsTimer={setIsTimer}
              isLimitOnLives={isLimitOnLives}
              setIsLimitOnLives={setIsLimitOnLives}
              isLabeling={isLabeling}
              setIsLabeling={setIsLabeling}
              register={register}
              control={control}
              setValue={setValue}
            />
            <AnimatePresence>
              {isLeaderboard && (
                <LeaderboardSettings control={control} setValue={setValue} />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isSound && (
                <SoundSettings control={control} setValue={setValue} />
              )}
            </AnimatePresence>

            <div className={m.buttons}>
              <motion.div 
                className={m.buttonWrapper}
                whileHover={{ scale: 1.03, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10}}
              >
                <motion.button className={m.btn} type="submit">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.34"
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="#D8E9FE"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 12.8801V11.1201C2 10.0801 2.85 9.22006 3.9 9.22006C5.71 9.22006 6.45 7.94006 5.54 6.37006C5.02 5.47006 5.33 4.30006 6.24 3.78006L7.97 2.79006C8.76 2.32006 9.78 2.60006 10.25 3.39006L10.36 3.58006C11.26 5.15006 12.74 5.15006 13.65 3.58006L13.76 3.39006C14.23 2.60006 15.25 2.32006 16.04 2.79006L17.77 3.78006C18.68 4.30006 18.99 5.47006 18.47 6.37006C17.56 7.94006 18.3 9.22006 20.11 9.22006C21.15 9.22006 22.01 10.0701 22.01 11.1201V12.8801C22.01 13.9201 21.16 14.7801 20.11 14.7801C18.3 14.7801 17.56 16.0601 18.47 17.6301C18.99 18.5401 18.68 19.7001 17.77 20.2201L16.04 21.2101C15.25 21.6801 14.23 21.4001 13.76 20.6101L13.65 20.4201C12.75 18.8501 11.27 18.8501 10.36 20.4201L10.25 20.6101C9.78 21.4001 8.76 21.6801 7.97 21.2101L6.24 20.2201C5.33 19.7001 5.02 18.5301 5.54 17.6301C6.45 16.0601 5.71 14.7801 3.9 14.7801C2.85 14.7801 2 13.9201 2 12.8801Z"
                      stroke="#D8E9FE"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Применить настройки
                </motion.button>
              </motion.div>
              <motion.div 
                className={m.buttonWrapper}
                whileHover={{ scale: 1.03, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10}}
              >
                <motion.button className={m.btn} type="reset">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56"
                      stroke="#D8E9FE"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      opacity="0.4"
                      d="M21.89 12C21.89 17.52 17.41 22 11.89 22C6.37 22 3 16.44 3 16.44M3 16.44H7.52M3 16.44V21.44"
                      stroke="#D8E9FE"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Сбросить настройки
                </motion.button>
              </motion.div>
            </div>
          </motion.form>
        )}
      </motion.div>
    </section>
  );
};

export default Lesson;
