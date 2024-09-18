import Image from "next/image";
import user from "@/assets/icons/user.svg";
import Edit from '@/assets/icons/edit.svg';
import Save from '@/assets/icons/finger-print.svg';
import m from "./Header.module.scss";
import { motion } from "framer-motion";

const   Header = ({ userData = null, onSubmit, isEdit, setIsEdit }: any) => {
  return (
    <div className={m.header}>
      <div className={m.profileWrapper}>
        <div className={m.avatarWrapp}>
          {userData === null ? (
            <div className={m.mock}>
              <Image src={user} width={30} height={30} alt="" />
            </div>
          ) : (
            <div className={m.mock}>
              <Image src={user} width={30} height={30} className={m.user} alt="" />
            </div>
          )}
        </div>
        <div className={m.userInfo}>
          <h2 className={m.name}>{`${userData?.firstName} ${userData?.lastName} ${userData?.middleName ?? ''}`}</h2>
          <span className={m.role}>{userData?.role === "student" ? "Ученик" : "Учитель"}</span>
        </div>
      </div>
      <div className={m.editButtonWrapp}>
        {isEdit === false ? (
          <motion.button 
            className={m.button} 
            onClick={() => setIsEdit(!isEdit)}
            initial={{ backgroundColor: '#88a1f3' }}
            whileHover={{
              backgroundColor: '#9fb3ff',
            }}
            transition={{ duration: 0.5 }}
          >
            <Image src={Edit} alt="" />
            Редактировать
          </motion.button>
        ) : (
          <motion.button 
            className={m.button}
            onClick={onSubmit}
            initial={{ backgroundColor: '#88a1f3' }}
            animate={{
              backgroundColor: isEdit ? ['#88a1f3', '#9fb3ff', '#88a1f3'] : '#88a1f3',
              transition: isEdit ? {
                duration: 1.5,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse"
              } : {}
            }}
          >
            <Image src={Save} alt="" />
            Сохранить
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Header;
