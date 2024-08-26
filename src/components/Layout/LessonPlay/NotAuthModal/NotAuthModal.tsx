import { motion } from "framer-motion";
import m from "./NotAuthModal.module.scss";
import { isVisible } from "@/assets/animation/animation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const NotAuthModal = ({ setIsOpen, userID, setIsPlayingUser }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();
  const inputRef = useRef<any>(null);

  const onSubmit = (data: any) => {
    setIsPlayingUser({ userName: data.userName, userID: userID, correct: 0, incorrect: 0, selectedAnswers: [] });
    setIsOpen(false)
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (inputRef.current && event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
        setFocus("userName");
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [setFocus]);

  return (
    <motion.div 
      className={m.overlay} 
      // onClick={() => setIsOpen(false)}
    >
      <motion.div
        className={m.modal}
        // ref={ref}
        onClick={(e) => e.stopPropagation()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
        variants={isVisible}
      >
        <motion.div
          className={m.textWrapper}
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ once: true }}
          // custom={3}
          // animate="visible"
          // variants={isVisible}
        >
          <h1 className={m.title}>Введите своя имя</h1>
          <span className={m.subTitle}>
            Для прохождения урока вам нужно ввести своя имя
          </span>
        </motion.div>
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
          <div className={m.btnContainer}>
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
                Сохранить
              </motion.button>
            </motion.div>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default NotAuthModal;
