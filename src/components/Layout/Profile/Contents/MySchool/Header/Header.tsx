import Image from "next/image";
import user from "@/assets/icons/user.svg";
import m from "./Header.module.scss";
import { motion } from "framer-motion";

const Header = ({ userData = null, isEdit, setIsEdit }: any) => {
  return (
    <div className={m.header}>
      <div className={m.searchWrapper}>
        <motion.input
          className={m.input}
          placeholder="Поиск..."
          initial={{ backgroundColor: '#88a1f3' }}
          whileFocus={{
            backgroundColor: ['#88a1f3', '#a4b8fe', '#88a1f3'],
            transition: {
              duration: 3,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
      </div>
      <div className={m.infoWrapp}>
        <div className={m.info}>
          Доступные школы: 4
        </div>
      </div>
    </div>
  );
};

export default Header;
