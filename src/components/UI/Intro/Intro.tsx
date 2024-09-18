import { motion } from 'framer-motion';
import m from './Intro.module.scss';
import { useForm } from 'react-hook-form';
import { isVisible, topToBottom } from '@/assets/animation/animation';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import CreateLesson from '@/assets/icons/copy-file2.svg';

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
              <Image src={CreateLesson} alt='' />
              Создать урок
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}

export default Intro;