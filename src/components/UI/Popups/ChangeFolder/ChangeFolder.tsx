import { useForm } from "react-hook-form";
import m from "./ChangeFolder.module.scss";
import { motion } from "framer-motion";
import { isVisible, topToBottom } from "@/assets/animation/animation";
import { useEffect, useRef } from "react";
import Image from "next/image";
import FingerPrint from '@/assets/icons/finger-print.svg';

const ChangeFolder = ({
  isChangeFolderName,
  setIsChangeFolderName,
  changeNameFolder,
}: any) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();
  const inputRef = useRef<any>(null);
  const folderData = isChangeFolderName.folderData;

  const onSubmit = (data: any) => {
    changeNameFolder.mutate({
      folderID: isChangeFolderName.folderData._id,
      folderName: data.folderName,
    });
    setIsChangeFolderName({ flag: !isChangeFolderName.flag, folderData: null });
  };

  useEffect(() => {
    if (isChangeFolderName.flag) {
      setFocus("folderName");
    }
  }, [isChangeFolderName.flag, setFocus]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (inputRef.current && event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
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
      onClick={() => setIsChangeFolderName({ flag: false, folderData: null })}
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
          <h1 className={m.title}>Изменение названия папки</h1>
          <span className={m.subTitle}>
            Старое название папки: {folderData.folderName}
          </span>
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
            placeholder="Введите новое название папки"
            {...register("folderName", { required: true, maxLength: 80 })}
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
              type="submit"
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

export default ChangeFolder;
