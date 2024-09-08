import { motion } from 'framer-motion';
import m from './Intro.module.scss';
import { useForm } from 'react-hook-form';
import { isVisible, topToBottom } from '@/assets/animation/animation';
import { useEffect, useRef } from 'react';

const Intro = ({ setIsChoice, isChoice, createNewLesson }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();
  const inputRef = useRef<any>(null);
  const onSubmit = (data: any) => {
    createNewLesson.mutate({ lessonName: data.lessonName, template: isChoice?.type, desc: isChoice.desc })
  };

  useEffect(() => {
    if (isChoice) {
      setFocus("lessonName");
    }
  }, [isChoice, setFocus]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (inputRef.current && event.key.length === 1) {
        setFocus("lessonName");
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
      onClick={() => setIsChoice({ isActive: false })}
    >
      <motion.div
        className={m.modal}
        onClick={(e) => e.stopPropagation()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
        variants={isVisible}
      >
        <motion.div 
          className={m.introWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          animate="visible"
          variants={isVisible}
        >
          <div className={m.textWrapper}>
            <h1 className={m.title}>Вы выбрали шаблон: {isChoice?.type}</h1>
            <span className={m.desc}>{isChoice.desc}</span>
          </div>
        </motion.div>
        <motion.form
          className={m.form}
          onSubmit={handleSubmit(onSubmit)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          animate="visible"
          variants={topToBottom}
          ref={inputRef}
        >
          <input
            type="text"
            className={m.input}
            placeholder="Введите название урока"
            {...register("lessonName", { required: true, maxLength: 80 })}
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
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M12.0001 14.8799C11.0901 14.8799 10.3501 14.1399 10.3501 13.2299V10.7599C10.3501 9.84989 11.0901 9.10986 12.0001 9.10986C12.9101 9.10986 13.6501 9.84989 13.6501 10.7599V13.2299C13.6501 14.1399 12.9101 14.8799 12.0001 14.8799Z"
                  stroke="#D8E9FE"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  opacity="0.4"
                  d="M16.98 13.4702C16.78 16.0502 14.62 18.0702 12 18.0702C9.24 18.0702 7 15.8302 7 13.0702V10.9302C7 8.17018 9.24 5.93018 12 5.93018C14.59 5.93018 16.72 7.90017 16.97 10.4202"
                  stroke="#D8E9FE"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M15 2H17C20 2 22 4 22 7V9"
                  stroke="#D8E9FE"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 9V7C2 4 4 2 7 2H9"
                  stroke="#D8E9FE"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 22H17C20 22 22 20 22 17V15"
                  stroke="#D8E9FE"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 15V17C2 20 4 22 7 22H9"
                  stroke="#D8E9FE"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Создать урок
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}

export default Intro;