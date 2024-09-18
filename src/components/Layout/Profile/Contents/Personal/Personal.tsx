import Image from "next/image";
import m from "./Personal.module.scss";
import { useState } from "react";
import Header from "./Header/Header";
import { useForm } from "react-hook-form";
import ChangePassword from "@/components/UI/Popups/ChangePassword/ChangePassword";
import KeyWhite from '@/assets/icons/key-white.svg';
import { AnimatePresence, motion } from "framer-motion";
import { isVisible } from "@/assets/animation/animation";
import { IUser } from "@/types/types";

const Personal = ({ userData, handleOnSubmit }: {userData: IUser | null, handleOnSubmit: any}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = (data: any) => {
    setIsEdit(!isEdit);
    handleOnSubmit(userData?._id, data);
  };

  return (
    <motion.div
      className={m.content}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={2}
      variants={isVisible}
    >
      <Header 
        isEdit={isEdit} 
        userData={userData} 
        setIsEdit={setIsEdit} 
        onSubmit={handleSubmit(onSubmit)} 
      />

      <form className={m.form}>
        <h2 className={m.info}>Подробная информация</h2>
        <div className={m.userInfoWrapper}>
          <div className={m.inputWrapper}>
            <label className={m.label}>Имя</label>
            <input
              type="text"
              className={m.input}
              defaultValue={userData?.firstName}
              placeholder="Введите имя"
              disabled={!isEdit}
              {...register("firstName", { maxLength: 80 })}
            />
          </div>
          <div className={m.inputWrapper}>
            <label className={m.label}>Фамилию</label>
            <input
              type="text"
              className={m.input}
              defaultValue={userData?.lastName}
              placeholder="Введите фамилию"
              disabled={!isEdit}
              {...register("lastName", { maxLength: 80 })}
            />
          </div>
          <div className={m.inputWrapper}>
            <label className={m.label}>Отчество</label>
            <input
              type="text"
              className={m.input}
              defaultValue={userData?.middleName}
              placeholder="Введите отчество"
              disabled={!isEdit}
              {...register("middleName", { maxLength: 80 })}
            />
          </div>

          <div className={m.inputWrapper}>
            <label className={m.label}>Должность</label>
            <input
              type="text"
              className={m.input}
              defaultValue={userData?.role === "student" ? "Ученик" : "Учитель"}
              disabled
              // {...register("middleName", { maxLength: 80 })}
            />
          </div>
          <div className={m.inputWrapper}>
            <label className={m.label}>Почта</label>
            <input
              type="text"
              className={m.input}
              defaultValue={userData?.email}
              placeholder="Введите почту"
              disabled={!isEdit}
              {...register("email", { maxLength: 80 })}
            />
          </div>
          <div className={m.inputWrapper}>
            <label className={m.label}>Страна проживания</label>
            <input
              type="text"
              className={m.input}
              defaultValue={userData?.country}
              placeholder="Страна проживания"
              disabled={!isEdit}
              {...register("country", { maxLength: 80 })}
            />
          </div>
          <div className={m.inputWrapper}>
            <label className={m.label}>Дата рождения</label>
            <input
              type="text"
              className={m.input}
              defaultValue={userData?.birthday}
              placeholder="Дата рождения"
              disabled={!isEdit}
              {...register("birthday", { maxLength: 80 })}
            />
          </div>
        </div>
        <h2 className={m.info}>Смена пароля</h2>
        <div className={m.editButtonWrapp}>
          <motion.button
            className={isActive === true ? m.activeBtn : m.button}
            type="button"
            onClick={() => setIsActive(true)}
            initial={{ backgroundColor: "#88a1f3" }}
            whileHover={{
              backgroundColor: "#9fb3ff",
            }}
            transition={{ duration: 0.5 }}
          >
            <Image src={KeyWhite} alt="" />
            Сменить пароль
          </motion.button>
        </div>
      </form>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className={m.wrapp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChangePassword isActive={isActive} setIsActive={setIsActive} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Personal;
