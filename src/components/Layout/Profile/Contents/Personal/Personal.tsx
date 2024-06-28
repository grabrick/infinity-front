import Image from "next/image";
import m from "./Personal.module.scss";
import { useState } from "react";
import Header from "./Header/Header";
import { useForm } from "react-hook-form";
import ChangePassword from "@/components/UI/Popups/ChangePassword/ChangePassword";
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.7899 14.9298C17.7299 16.9798 14.7799 17.6098 12.1899 16.7998L7.4799 21.4998C7.1399 21.8498 6.4699 22.0598 5.9899 21.9898L3.8099 21.6898C3.0899 21.5898 2.4199 20.9098 2.3099 20.1898L2.0099 18.0098C1.9399 17.5298 2.1699 16.8598 2.4999 16.5198L7.1999 11.8198C6.3999 9.21982 7.0199 6.26982 9.0799 4.21982C12.0299 1.26982 16.8199 1.26982 19.7799 4.21982C22.7399 7.16982 22.7399 11.9798 19.7899 14.9298Z"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M6.88989 17.4902L9.18989 19.7902"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M14.5 11C15.3284 11 16 10.3284 16 9.5C16 8.67157 15.3284 8 14.5 8C13.6716 8 13 8.67157 13 9.5C13 10.3284 13.6716 11 14.5 11Z"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
