import Image from 'next/image';
import setting from '@/assets/icons/setting-3.svg'
import m from './Folder.module.scss';
import { motion } from 'framer-motion';
import { convertMongoDate } from '@/utils/convertMongaDate';

const Folder = ({ folderData, isSelected, setIsSelected }: any) => {

  const handleChoice = (folderID: string) => {
    setIsSelected((prevSelected: string[]) => {
      if (prevSelected.includes(folderID)) {
        return prevSelected.filter(id => id !== folderID);
      } else {
        return [...prevSelected, folderID];
      }
    });
  }

  return (
    <motion.div 
      className={`${m.folder} ${isSelected.includes(folderData?._id) ? m.selected : ''}`} 
      onClick={() => handleChoice(folderData?._id)}
      whileHover={{ scale: 1.01, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10}}
    >
      <div className={m.titleWrapp}>
        <h2 className={m.name}>{folderData?.folderName}</h2>
        {/* <span className={m.count}>{folderData?.children.length} уроков</span> */}
      </div>

      <div className={m.createAt}>
        <span className={m.time}>{`Был создан: ${convertMongoDate(folderData?.createdAt)}`}</span>
        {/* <Image src={setting} alt='' /> */}
      </div>
    </motion.div>
  )
}

export default Folder;