import { useForm } from "react-hook-form";
import m from "./ChangePassword.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { isVisible, topToBottom } from "@/assets/animation/animation";
import Image from "next/image";
import FingerPrint from '@/assets/icons/finger-print.svg';

const ChangePassword = ({ isActive, setIsActive }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <motion.div
      className={m.overlay}
      onClick={() => setIsActive(false)}
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
          <h1 className={m.title}>Смена пароля</h1>
          <span className={m.subTitle}>
            При смене пароля вас отсоединит от аккаунта, будте внимательней при
            смене пароля
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
          <input
            type="text"
            className={m.oldPasswdInput}
            placeholder="Введите старый пароль"
            {...register("oldPassword", { required: true, maxLength: 80 })}
          />
          <div className={m.newPasswdWrapper}>
            <input
              type="text"
              className={m.input}
              placeholder="Введите новый пароль"
              {...register("newPassword", { required: true, maxLength: 80 })}
            />
            <input
              type="text"
              className={m.input}
              placeholder="Повторите пароль"
              {...register("confirmPassword", { required: true, maxLength: 80 })}
            />
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
              <Image src={FingerPrint} alt="" />
              Сохранить
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default ChangePassword;
