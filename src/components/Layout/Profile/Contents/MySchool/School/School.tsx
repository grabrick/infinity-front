import { motion } from "framer-motion";
import m from "./School.module.scss";
import Image from "next/image";
import TrashCan from '@/assets/icons/trash-can.svg';

const School = ({ name, count }: any) => {
  return (
    <div className={m.container}>
      <div className={m.nameWrapper}>
        <h2 className={m.name}>{name}</h2>
        <span className={m.count}>{`Всего учеников: ${count}`}</span>
      </div>
      <div className={m.deleteWrapper}>
        <motion.button 
          className={m.button}
          initial={{ backgroundColor: '#88a1f3' }}
          whileHover={{
            backgroundColor: '#9fb3ff',
          }}
          transition={{ duration: 0.5 }}
        >
          <Image src={TrashCan} alt="" />
          Удалить
        </motion.button>
      </div>
    </div>
  );
};

export default School;