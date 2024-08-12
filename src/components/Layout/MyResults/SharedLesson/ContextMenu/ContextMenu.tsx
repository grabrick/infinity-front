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
          onClick={(e) => handleChoice(e, "editName")}
          whileHover={{ backgroundColor: '#A8BBFF', scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={EditPenIcon} alt="" />
          Переименовать
        </motion.li>
        <motion.li 
          onClick={(e) => handleChoice(e, "editActiveSharedUrl")}
          whileHover={{ backgroundColor: '#A8BBFF', scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={EditPenIcon} alt="" />
          Изменить предельный срок
        </motion.li>
        <motion.li 
          onClick={(e) => handleChoice(e, "shareАnalytics")}
          whileHover={{ backgroundColor: '#A8BBFF', scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={ShareIcon} alt="" />
          Поделиться результатами
        </motion.li>
        <motion.li 
          onClick={(e) => handleChoice(e, "sharePlayLesson")}
          whileHover={{ backgroundColor: '#A8BBFF', scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={ShareIcon} alt="" />
          Поделиться заданием
        </motion.li>
        <motion.li 
          onClick={(e) => handleChoice(e, "moveToRootLesson")}
          whileHover={{ backgroundColor: '#A8BBFF', scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={ShareIcon} alt="" />
          Перейти к уроку
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
