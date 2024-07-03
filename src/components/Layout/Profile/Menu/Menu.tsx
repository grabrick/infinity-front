import Image from "next/image";
import m from "./Menu.module.scss";
import user from "@/assets/icons/user.svg";
import { motion } from "framer-motion";
import { isVisible } from "@/assets/animation/animation";
import { logout } from "@/services/auth/auth.helper";
import { useRouter } from "next/router";

const Menu = ({ isSelected, setIsSelected, userData = null }: any) => {
  const { push } = useRouter();
  
  const handleLogout = () => {
    logout();
    push('/auth')
  }
  
  return (
    <motion.div 
      className={m.menu}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={4}
      variants={isVisible}
    >
      <div className={m.wrapper}>
        {isSelected !== "personal" && (
          <div className={m.profileWrapper}>
            <div className={m.avatarWrapp}>
              {userData === null ? (
                <div className={m.mock}>
                  <Image src={user} width={30} height={30} alt="" />
                </div>
              ) : (
                <div className={m.mock}>
                  <Image src={user} className={m.user} width={30} height={30} alt="" />
                </div>
              )}
            </div>
            <div className={m.userInfo}>
              <h2 className={m.name}>{`${userData?.firstName} ${userData?.lastName}`}</h2>
              <span className={m.role}>{userData?.role === "student" ? "Ученик" : "Учитель"}</span>
            </div>
          </div>
        )}
        <div className={m.buttons}>
          <motion.button
            className={isSelected === "personal" ? m.activeBtn : m.button}
            onClick={() => setIsSelected("personal")}
            whileHover={isSelected === "personal" ? {} : { scale: 1.02, opacity: 1 }}
            transition={isSelected === "personal" ? {} : { type: "spring", stiffness: 400, damping: 10}}
          >
            <svg
              className={isSelected === "personal" ? m.activeIcon : m.icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M8 13H12"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M8 17H16"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Мои данные
          </motion.button>
          <motion.button
            className={isSelected === "mySchool" ? m.activeBtn : m.button}
            onClick={() => setIsSelected("mySchool")}
            whileHover={isSelected === "mySchool" ? {} : { scale: 1.02, opacity: 1 }}
            transition={isSelected === "mySchool" ? {} : { type: "spring", stiffness: 400, damping: 10}}
          >
            <svg
              className={isSelected === "mySchool" ? m.activeIcon : m.icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.05 2.53004L4.03002 6.46004C2.10002 7.72004 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73004 19.98 6.47004L13.99 2.54004C12.91 1.82004 11.13 1.82004 10.05 2.53004Z"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M5.63012 13.0801L5.62012 17.7701C5.62012 19.0401 6.60012 20.4001 7.80012 20.8001L10.9901 21.8601C11.5401 22.0401 12.4501 22.0401 13.0101 21.8601L16.2001 20.8001C17.4001 20.4001 18.3801 19.0401 18.3801 17.7701V13.1301"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M21.3999 15V9"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Моя школа
          </motion.button>
          {/* <button
            className={isSelected === "myStudents" ? m.activeBtn : m.button}
            onClick={() => setIsSelected("myStudents")}
          >
            <svg
              className={isSelected === "myStudents" ? m.activeIcon : m.icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M17.9976 7.16C17.9376 7.15 17.8676 7.15 17.8076 7.16C16.4276 7.11 15.3276 5.98 15.3276 4.58C15.3276 3.15 16.4776 2 17.9076 2C19.3376 2 20.4876 3.16 20.4876 4.58C20.4776 5.98 19.3776 7.11 17.9976 7.16Z"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M16.9675 14.4402C18.3375 14.6702 19.8475 14.4302 20.9075 13.7202C22.3175 12.7802 22.3175 11.2402 20.9075 10.3002C19.8375 9.59016 18.3075 9.35016 16.9375 9.59016"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M5.96754 7.16C6.02754 7.15 6.09754 7.15 6.15754 7.16C7.53754 7.11 8.63754 5.98 8.63754 4.58C8.63754 3.15 7.48754 2 6.05754 2C4.62754 2 3.47754 3.16 3.47754 4.58C3.48754 5.98 4.58754 7.11 5.96754 7.16Z"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M6.9975 14.4402C5.6275 14.6702 4.1175 14.4302 3.0575 13.7202C1.6475 12.7802 1.6475 11.2402 3.0575 10.3002C4.1275 9.59016 5.6575 9.35016 7.0275 9.59016"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.0001 14.6302C11.9401 14.6202 11.8701 14.6202 11.8101 14.6302C10.4301 14.5802 9.33008 13.4502 9.33008 12.0502C9.33008 10.6202 10.4801 9.47021 11.9101 9.47021C13.3401 9.47021 14.4901 10.6302 14.4901 12.0502C14.4801 13.4502 13.3801 14.5902 12.0001 14.6302Z"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.08997 17.7804C7.67997 18.7204 7.67997 20.2603 9.08997 21.2003C10.69 22.2703 13.31 22.2703 14.91 21.2003C16.32 20.2603 16.32 18.7204 14.91 17.7804C13.32 16.7204 10.69 16.7204 9.08997 17.7804Z"
                stroke="#D8E9FE"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Мои ученики
          </button> */}
        </div>
      </div>
      <motion.button 
        className={m.logout}
        whileHover={{ scale: 1.03, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10}}
        onClick={() => handleLogout()}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.8999 7.56023C9.2099 3.96023 11.0599 2.49023 15.1099 2.49023H15.2399C19.7099 2.49023 21.4999 4.28023 21.4999 8.75023V15.2702C21.4999 19.7402 19.7099 21.5302 15.2399 21.5302H15.1099C11.0899 21.5302 9.2399 20.0802 8.9099 16.5402"
            stroke="#D8E9FE"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <g opacity="0.4">
            <path
              d="M14.9991 12H3.61914"
              stroke="#D8E9FE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.85 8.65039L2.5 12.0004L5.85 15.3504"
              stroke="#D8E9FE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
        Выход
      </motion.button>
    </motion.div>
  );
};

export default Menu;
