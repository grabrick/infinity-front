import { useForm } from "react-hook-form";
import m from "./CreateFolder.module.scss";
import { motion } from "framer-motion";
import { isVisible, topToBottom } from "@/assets/animation/animation";
import { useEffect, useRef } from "react";
import Image from "next/image";
import FingerPrint from '@/assets/icons/finger-print.svg';

const CreateFolder = ({ folderID, isCreateActive, setIsCreateActive, createNewFolder, createdIn }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();
  const inputRef = useRef<any>(null);
  const onSubmit = (data: any) => {
    createNewFolder.mutate({ folderID: folderID, folderName: data.folderName, createdIn: createdIn });
    setIsCreateActive(!isCreateActive)
  };

  useEffect(() => {
    if (isCreateActive) {
      setFocus("folderName");
    }
  }, [isCreateActive, setFocus]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (inputRef.current && event.key.length === 1) {
        setFocus("folderName");
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
      onClick={() => setIsCreateActive(false)}
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          animate="visible"
          variants={isVisible}
        >
          <h1 className={m.title}>Создание папки</h1>
          {/* <span className={m.subTitle}>
            При смене пароля вас отсоединит от аккаунта, будте внимательней при
            смене пароля
          </span> */}
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
            className={m.oldPasswdInput}
            placeholder="Введите название папки"
            {...register("folderName", { required: true, maxLength: 80 })}
          />
          
          <motion.div
            className={m.buttonWrapp}
            whileHover={{ scale: 1.02, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.button
              className={m.button}
              type="submit"
              initial={{ backgroundColor: "#88a1f3" }}
              whileHover={{
                backgroundColor: "#9fb3ff",
              }}
              transition={{ duration: 0.5 }}
            >
              <Image src={FingerPrint} alt="" />
              Сохранить
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default CreateFolder;
