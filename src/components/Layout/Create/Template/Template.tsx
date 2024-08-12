import Image from 'next/image';
import m from './Template.module.scss';
import { motion } from 'framer-motion';

const Template = ({ title, type, image, desc, setIsChoice }: any) => {
  
  return (
    <motion.div 
      className={m.container} 
      onClick={() => setIsChoice({ type: type, isActive: true })}
      whileHover={{ backgroundColor: '#a6b9ee' }}
      transition={{ duration: 0.3 }}
    >
      <Image width={45} height={45} src={image} alt='' />
      <div className={m.titleWrapper}>
        <h3 className={m.title}>{title}</h3>
        <p className={m.desc}>{desc}</p>
      </div>
    </motion.div>
  )
}

export default Template;