import { motion } from "framer-motion";
import m from "./Header.module.scss";
import Image from "next/image";
import Create from '@/assets/icons/copy-file.svg';

const Header = ({ lessonData, handleCreateIssue, buttonText, isLimit }: any) => {
  return (
    <div className={m.container}>
      <div className={m.nameWrapper}>
        <h1 className={m.name}>{lessonData?.lessonName}</h1>
        <span className={m.template}>
          Выбранный шаблон: <label>{lessonData?.template}</label>
        </span>
      </div>

      {isLimit.isActive && isLimit?.formState?.length === isLimit?.createLimitCount ? (
        null
      ) : (
        <motion.button
          className={m.button}
          onClick={() => handleCreateIssue()}
          type="button"
          initial={{ backgroundColor: "#88a1f3" }}
          whileHover={{
            backgroundColor: "#9fb3ff",
          }}
          transition={{ duration: 0.5 }}
        >
          <Image src={Create} alt="" />
          {buttonText}
        </motion.button>
      )}
    </div>
  );
};

export default Header;
