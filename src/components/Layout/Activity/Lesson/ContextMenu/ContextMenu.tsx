import Image from "next/image";
import m from "./ContextMenu.module.scss";
import { motion } from 'framer-motion';
import ShareIcon from '@/assets/icons/share.svg';
import EditPenIcon from '@/assets/icons/edit-pen.svg';
import TrashCanIcon from '@/assets/icons/trash-can.svg';

const ContextMenu = ({ setIsMenuOpen, handleChoice }: any) => {
  return (
    <div className={m.menu} onMouseLeave={() => setIsMenuOpen(false)}>
      <ul>
        <motion.li 
          onClick={(e) => handleChoice(e, "edit")}
          whileHover={{ backgroundColor: '#A8BBFF', scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={EditPenIcon} alt="" />
          Редактировать контент
        </motion.li>
        <motion.li 
          onClick={(e) => handleChoice(e, "share")}
          whileHover={{ backgroundColor: '#A8BBFF', scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={ShareIcon} alt="" />
          Поделиться
        </motion.li>
        <motion.li 
          onClick={(e) => handleChoice(e, "delete")}
          whileHover={{ backgroundColor: '#A8BBFF', scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={TrashCanIcon} alt="" />
          Удалить
        </motion.li>
      </ul>
    </div>
  );
};

export default ContextMenu;
