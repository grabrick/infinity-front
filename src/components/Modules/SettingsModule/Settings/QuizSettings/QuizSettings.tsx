import { AnimatePresence, motion } from "framer-motion";
import m from "./QuizSettings.module.scss";
import Arrow from "@/assets/icons/arrow-mini-bottom.svg";
import CogIcons from "@/assets/icons/cog.svg";
import ArrowCircleIcons from "@/assets/icons/arrow-circle.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLesson } from "@/components/Layout/Lesson/useLesson";
import LeaderboardSettings from "../../Fields/LeaderboardSettings/LeaderboardSettings";
import SoundSettings from "../../Fields/SoundSettings/SoundSettings";
import QuizSection from "../../Section/QuizSection/QuizSection";

const QuizSettings = ({ lessonSlug, userData }: any) => {
  const {
    data,
    saveLessonSettings,
    uploadMusicFile,
    uploadSoundsFile,
    deleteUploadMusicFile,
    deleteUploadSoundFile,
  } = useLesson(lessonSlug._id);
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

  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const [isLeaderboard, setIsLeaderboard] = useState(false);
  const [isSound, setIsSound] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const [isLimitOnLives, setIsLimitOnLives] = useState(false);
  const [isLabeling, setIsLabeling] = useState(false);

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
    <form
      className={m.settings}
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
    >
      <div className={m.header}>
        <h1 className={m.sectionTitle}>Параметры урока</h1>
        <Image
          src={Arrow}
          alt=""
          onClick={() => setIsOpenSettings(!isOpenSettings)}
          style={{
            rotate: isOpenSettings ? "180deg" : "0deg",
            cursor: "pointer",
          }}
        />
      </div>
      {isOpenSettings && (
        <>
          <QuizSection
            actions={{
              setIsLeaderboard,
              isLeaderboard,
              setIsSound,
              isSound,
              isTimer,
              setIsTimer,
              isLimitOnLives,
              setIsLimitOnLives,
              isLabeling,
              setIsLabeling,
              setValue
            }}
            register={register}
            control={control}
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
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <motion.button className={m.btn} type="submit">
                  <Image src={CogIcons} alt="" />
                  Применить настройки
                </motion.button>
              </motion.div>
              <motion.div
                className={m.buttonWrapper}
                whileHover={{ scale: 1.03, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <motion.button className={m.btn} type="reset">
                  <Image src={ArrowCircleIcons} alt="" />
                  Сбросить настройки
                </motion.button>
              </motion.div>
            </div>
          )}
        </>
      )}
    </form>
  );
};

export default QuizSettings;