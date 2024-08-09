import Crumbs from "@/components/UI/Crumbs/Crumbs";
import m from "./Lesson.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { topToBottom } from "@/assets/animation/animation";
import { useEffect, useState } from "react";
import LessonSettings from "./Sections/LessonSettings/LessonSettings";
import LeaderboardSettings from "./Sections/LeaderboardSettings/LeaderboardSettings";
import SoundSettings from "./Sections/SoundSettings/SoundSettings";
import { useForm } from "react-hook-form";
import Player from "./DemoPlayer/DemoPlayer";
import { useLesson } from "./useLesson";
import Image from "next/image";
import CogIcons from "@/assets/icons/cog.svg";
import ArrowCircleIcons from "@/assets/icons/arrow-circle.svg";
import { useAppSelector } from "@/redux/hook/redux.hook";

const Lesson = ({ lessonSlug }: any) => {
  const {
    data,
    saveLessonSettings,
    uploadMusicFile,
    uploadSoundsFile,
    deleteUploadMusicFile,
    deleteUploadSoundFile,
  } = useLesson(lessonSlug._id);
  const userData = useAppSelector((state) => state.userSlice.userData);
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
      lessonSettings: data?.data?.lessonSettings,
    },
  });
  const formState = getValues("lessonSettings");

  const [isPlay, setIsPlay] = useState(false);
  const [isLeaderboard, setIsLeaderboard] = useState(false);
  const [isSound, setIsSound] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const [isLimitOnLives, setIsLimitOnLives] = useState(false);
  const [isLabeling, setIsLabeling] = useState(false);

  const [isVisibleRoot, setIsVisibleRoot] = useState(false);
  const [isVisiblePlayer, setIsVisiblePlayer] = useState(false);

  useEffect(() => {
    setValue("lessonSettings", data?.data?.lessonSettings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.lessonSettings]);

  useEffect(() => {
    const lessonData = data?.data?.lessonSettings;

    if (lessonData?.timer) {
      setIsTimer(true);
      setValue("lessonSettings.timer", lessonData?.timer);
    }
    if (lessonData?.limitOnLives) {
      setIsLimitOnLives(true);
      setValue("lessonSettings.limitOnLives", lessonData?.limitOnLives);
    }
    if (lessonData?.labeling) {
      setIsLabeling(true);
      setValue("lessonSettings.labeling", lessonData?.labeling);
    }
    if (lessonData?.leaderboard) {
      setIsLeaderboard(true);
    }
    if (
      lessonData?.soundboard?.music === null &&
      lessonData?.soundboard?.sounds.length === 0
    ) {
      setIsSound(false);
    } else {
      setIsSound(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.lessonSettings]);

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
      data.lessonSettings.soundboard = { music: null, sounds: [] };
    }
    // console.log({ data: data });
    saveLessonSettings.mutate(data.lessonSettings);
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
              formState={formState}
            />
            <AnimatePresence>
              {isLeaderboard && (
                <LeaderboardSettings
                  control={control}
                  setValue={setValue}
                  formState={formState?.leaderboard}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isSound && (
                <SoundSettings
                  control={control}
                  setValue={setValue}
                  uploadMusicFile={uploadMusicFile}
                  uploadSoundsFile={uploadSoundsFile}
                  deleteUploadMusicFile={deleteUploadMusicFile}
                  deleteUploadSoundFile={deleteUploadSoundFile}
                  formState={formState?.soundboard}
                  lessonSlug={lessonSlug}
                />
              )}
            </AnimatePresence>
            {lessonSlug.ownerID === userData?._id && (
              <div className={m.buttons}>
                <motion.div
                  className={m.buttonWrapper}
                  whileHover={{ scale: 1.03, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.button className={m.btn} type="submit">
                    <Image src={CogIcons} alt="" />
                    Применить настройки
                  </motion.button>
                </motion.div>
                <motion.div
                  className={m.buttonWrapper}
                  whileHover={{ scale: 1.03, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.button className={m.btn} type="reset">
                    <Image src={ArrowCircleIcons} alt="" />
                    Сбросить настройки
                  </motion.button>
                </motion.div>
              </div>
            )}
          </motion.form>
        )}
      </motion.div>
    </section>
  );
};

export default Lesson;
