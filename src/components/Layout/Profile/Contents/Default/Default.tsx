import { motion } from 'framer-motion';
import { isVisible } from '@/assets/animation/animation';
import m from './Default.module.scss';
import { IUser } from '@/types/types';

const Default = ({ userData }: {userData: IUser | null}) => {
  return (
    <motion.div 
      className={m.content}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={4}
      variants={isVisible}
    >
      <h1 className={m.title}>{`Приветствую вас ${userData?.firstName}`}</h1>
      <span className={m.desc}>В этом разделе вы можете узнать всю нужную информацию для вас и ваших учеников</span>
    </motion.div>
  )
}

export default Default;