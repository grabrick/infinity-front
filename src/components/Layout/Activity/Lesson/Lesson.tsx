import Image from 'next/image';
import setting from '@/assets/icons/setting-3.svg'
import m from './Lesson.module.scss';
import { motion } from 'framer-motion';
import { convertMongoDate } from '@/utils/convertMongaDate';

const Lesson = ({ lessonData, image }: any) => {
  
  return (
    <motion.div 
      className={m.lesson}
      whileHover={{ scale: 1.03, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10}}
    >
      <div className={m.imageWrapper}>
        {image === null ? (
          <div className={m.mock} />
        ) : (
          <Image src={image} alt='' />
        )}
      </div>
      <div className={m.titleWrapp}>
        <h2 className={m.name}>{lessonData?.lessonName}</h2>

        <div className={m.createAt}>
          <span className={m.time}>{`Был создан: ${convertMongoDate(lessonData?.createdAt)}`}</span>
          <Image src={setting} alt='' />
        </div>
      </div>
    </motion.div>
  )
}

export default Lesson;