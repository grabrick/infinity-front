import { useForm } from "react-hook-form";
import m from "./DeleteFolder.module.scss";
import { motion } from "framer-motion";
import { isVisible, topToBottom } from "@/assets/animation/animation";
import Folder from "./Folder/Folder";
import { useState } from "react";
import Image from "next/image";
import TrashCan from '@/assets/icons/trash-can.svg';

const DeleteFolder = ({
  folderID,
  folderData,
  isDeleteActive,
  setIsDeleteActive,
  deleteFolder,
  setDeleteFoldersID,
}: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSelected, setIsSelected] = useState<string[]>([]);

  const onSubmit = () => {
    setDeleteFoldersID(isSelected);
    deleteFolder.mutate(isSelected);
    setIsDeleteActive(!isDeleteActive);
  };

  if (folderData?.length <= 0 || folderData === null) {
    return (
      <motion.div className={m.overlay} onClick={() => setIsDeleteActive(false)}>
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
          <h1 className={m.title}>Нет папок для удаления</h1>
          <span className={m.subTitle}>
            В настоящее время у вас нет папок для удаления
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
    )
  }

  return (
    <motion.div className={m.overlay} onClick={() => setIsDeleteActive(false)}>
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
          <h1 className={m.title}>Удаление папки</h1>
          <span className={m.subTitle}>
            При удалении папки вы не сможете её вернуть, так как папка удаляется
            без возвратно вместе с содержимым внутри папки
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
        >
          <div className={m.folderWrapper}>
            {folderData?.map((items: any, i: any) => (
              <Folder
                key={i}
                folderData={items}
                setIsSelected={setIsSelected}
                isSelected={isSelected}
              />
            ))}
          </div>

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
              <Image src={TrashCan} alt="" />
              Удалить
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default DeleteFolder;
