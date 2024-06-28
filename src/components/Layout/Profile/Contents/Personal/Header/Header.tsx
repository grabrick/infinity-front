import Image from "next/image";
import user from "@/assets/icons/user.svg";
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.0399 3.01976L8.15988 10.8998C7.85988 11.1998 7.55988 11.7898 7.49988 12.2198L7.06988 15.2298C6.90988 16.3198 7.67988 17.0798 8.76988 16.9298L11.7799 16.4998C12.1999 16.4398 12.7899 16.1398 13.0999 15.8398L20.9799 7.95976C22.3399 6.59976 22.9799 5.01976 20.9799 3.01976C18.9799 1.01976 17.3999 1.65976 16.0399 3.01976Z"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M14.9102 4.1499C15.5802 6.5399 17.4502 8.4099 19.8502 9.0899"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
            Сохранить
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Header;
