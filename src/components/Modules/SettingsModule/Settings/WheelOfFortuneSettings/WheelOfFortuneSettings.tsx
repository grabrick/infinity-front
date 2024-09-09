import { motion } from 'framer-motion';
import Arrow from "@/assets/icons/arrow-mini-bottom.svg";
import CogIcons from "@/assets/icons/cog.svg";
import ArrowCircleIcons from "@/assets/icons/arrow-circle.svg";
import m from './WheelOfFortuneSettings.module.scss';
import { useLesson } from '@/components/Layout/Lesson/useLesson';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import WheelOfFortuneSection from '../../Section/WheelOfFortuneSection/WheelOfFortuneSection';

const WheelOfFortuneSettings = ({ lessonSlug, userData }: any) => {
  const {
    data,
    saveLessonSettings,
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
  const [isTimer, setIsTimer] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.lessonSettings]);

  const onSubmit = (data: any) => {
    if (!isTimer) {
      data.lessonSettings.timer = null;
    }
    saveLessonSettings.mutate(data.lessonSettings);
  };

  const onReset = () => {
    reset();
    setIsTimer(false);
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
          <WheelOfFortuneSection
            actions={{
              isTimer,
              setIsTimer,
              setValue
            }}
            register={register}
            control={control}
            formState={formState}
          />
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
}

export default WheelOfFortuneSettings;