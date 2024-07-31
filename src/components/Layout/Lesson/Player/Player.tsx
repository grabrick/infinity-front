import { motion } from "framer-motion";
import m from "./Player.module.scss";
import { useState } from "react";

const Player = ({ lessonSlug, setIsPlay, isPlay, setIsVisiblePlayer }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div 
      className={m.player}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {!isPlay && (
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
                initial={{ opacity: 0,  y: -40 }}
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
                  transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                >
                  Серия вопросов с множественным выбором. Нажмите на правильный
                  ответ что бы продолжить
                </motion.span>
              </motion.div>
              <motion.button
                className={m.play}
                onClick={() => setIsPlay(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12V8.44C4 4.02 7.13 2.21 10.96 4.42L14.05 6.2L17.14 7.98C20.97 10.19 20.97 13.81 17.14 16.02L14.05 17.8L10.96 19.58C7.13 21.79 4 19.98 4 15.56V12Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </motion.button>
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
                <button className={m.button}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 10V14C2 16 3 17 5 17H6.43C6.8 17 7.17 17.11 7.49 17.3L10.41 19.13C12.93 20.71 15 19.56 15 16.59V7.41C15 4.43 12.93 3.29 10.41 4.87L7.49 6.7C7.17 6.89 6.8 7 6.43 7H5C3 7 2 8 2 10Z"
                      stroke="#D8E9FE"
                      stroke-width="1.5"
                    />
                    <path
                      opacity="0.4"
                      d="M18 8C19.78 10.37 19.78 13.63 18 16"
                      stroke="#D8E9FE"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      opacity="0.4"
                      d="M19.83 5.5C22.72 9.35 22.72 14.65 19.83 18.5"
                      stroke="#D8E9FE"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Включить звук
                </button>
                <button className={m.button}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.97 12.25V16.75C16.97 20.5 15.47 22 11.72 22H7.21997C3.46997 22 1.96997 20.5 1.96997 16.75V12.25C1.96997 8.5 3.46997 7 7.21997 7H11.72C15.47 7 16.97 8.5 16.97 12.25Z"
                      stroke="#D8E9FE"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      opacity="0.4"
                      d="M21.97 5.85V9.15C21.97 11.9 20.87 13 18.12 13H16.97V12.25C16.97 8.5 15.47 7 11.72 7H10.97V5.85C10.97 3.1 12.07 2 14.82 2H18.12C20.87 2 21.97 3.1 21.97 5.85Z"
                      stroke="#D8E9FE"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  На весь экран
                </button>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Player;
