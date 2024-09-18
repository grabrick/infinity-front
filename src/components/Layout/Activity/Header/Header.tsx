import { motion } from "framer-motion";
import m from "./Header.module.scss";
import { topToBottom } from "@/assets/animation/animation";
import Image from "next/image";
import CreateFolder from '@/assets/icons/create-folder.svg';
import DeleteFolder from '@/assets/icons/delete-folder.svg';

const Header = ({ setIsCreateActive, setIsDeleteActive, setSearchField, searchField }: any) => {

  return (
    <motion.div 
      className={m.header}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={3}
      variants={topToBottom}
    >
      <div className={m.searchWrapper}>
        <motion.input 
          className={m.search}
          onChange={(e) => setSearchField(e.target.value)}
          value={searchField}
          placeholder="Поиск..."
          initial={{ backgroundColor: '#c8d3f8' }}
          whileFocus={{
            backgroundColor: ['#c8d3f8', '#dae2ff', '#c8d3f8'],
            transition: {
              duration: 1.5,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
      </div>

      <div className={m.buttons}>
        <div className={m.buttonWrapper}>
          <motion.button 
            className={m.button}
            whileHover={{ backgroundColor: '#afbffa' }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCreateActive(true)}
          >
            <Image src={CreateFolder} alt="" />
            Создать папку
          </motion.button>
        </div>
        <div className={m.buttonWrapper}>
          <motion.button 
            className={m.button}
            whileHover={{ backgroundColor: '#afbffa' }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsDeleteActive(true)}
          >
            <Image src={DeleteFolder} alt="" />
            Удалить папку
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
