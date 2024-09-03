import Image from "next/image";
import m from "./Preview.module.scss";
import { motion } from "framer-motion";
import VolumeIcons from "@/assets/icons/volume-high.svg";
import MuteVolume from "@/assets/icons/volume-cross.svg";
import ResizeIcons from "@/assets/icons/resize.svg";
import PlayIcons from "@/assets/icons/play.svg";
import ClaimIcons from "@/assets/icons/tick-square.svg";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const Preview = ({
  lessonSlug,
  settings,
  setIsPlay,
  setIsVisible,
  isVisible,
  setIsVisiblePlayer,
  setIsPlayingUser,
  userData,
  handleFullScreen,
  toggleMute,
  isMuted,
}: any) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();
  const [isActiveWriteName, setIsActiveWriteName] = useState(false);
  const inputRef = useRef<any>(null);

  const onSubmit = (data: any) => {
    setIsPlayingUser({
      userName: data.userName,
      userID: null,
      correct: 0,
      incorrect: 0,
      selectedAnswers: [],
    });
    setIsActiveWriteName(false);
    setIsPlay(true)
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        inputRef.current &&
        event.key.length === 1 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        setFocus("userName");
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [setFocus]);
  
  const handlePlay = () => {
    if (settings.access.title === "Для не зарегистрированных пользователей") {
      setIsActiveWriteName(true);
    } else if (settings.access.title === "Для зарегистрированных пользователей") {
      setIsPlayingUser({
        userName: userData.firstName,
        userID: userData._id,
        correct: 0,
        incorrect: 0,
        selectedAnswers: [],
      });
      setIsPlay(true)
    } else if (settings.access.title === "Для анонимных пользователей") {
      setIsPlayingUser({
        userName: null,
        userID: null,
        correct: 0,
        incorrect: 0,
        selectedAnswers: [],
      });
      setIsPlay(true)
    }
  };
  
  return (
    <motion.div
      className={m.overlay}
      onAnimationComplete={() => {
        setIsVisible(true), setIsVisiblePlayer(true);
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {isVisible && (
        <>
          <motion.div
            className={m.info}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            <h1 className={m.title}>{lessonSlug?.lessonName}</h1>
            <motion.span
              className={m.desc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
              Серия вопросов с множественным выбором. Нажмите на правильный
              ответ чтобы продолжить
            </motion.span>
          </motion.div>
          {!isActiveWriteName ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: "easeOut",
              }}
            >
              <motion.button
                className={m.play}
                onClick={() => handlePlay()}
                whileHover={{ scale: 1.08, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Image src={PlayIcons} alt="" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: "easeOut",
              }}
              style={{ width: '100%' }}
            >
              <motion.form
                className={m.wrapp}
                ref={inputRef}
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  className={m.input}
                  placeholder="Введите ваше имя"
                  {...register("userName", { required: true, maxLength: 80 })}
                />
                <motion.div
                  className={m.buttonWrapp}
                  whileHover={{ scale: 1.02, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.button
                    className={m.button}
                    initial={{ backgroundColor: "#88a1f3" }}
                    whileHover={{
                      backgroundColor: "#9fb3ff",
                    }}
                    transition={{ duration: 0.5 }}
                    type="submit"
                  >
                    <Image src={ClaimIcons} alt="" />
                    {/* Сохранить */}
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
          )}

          <motion.div
            className={m.controls}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            <motion.button
              className={m.button}
              whileHover={{ scale: 1.03, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={toggleMute}
            >
              <Image src={isMuted ? MuteVolume : VolumeIcons} alt="" />
              {isMuted ? "Включить звук" : "Выключить звук"} 
            </motion.button>
            <motion.button
              className={m.button}
              whileHover={{ scale: 1.03, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={handleFullScreen}
            >
              <Image src={ResizeIcons} alt="" />
              На весь экран
            </motion.button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Preview;
