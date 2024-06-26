import { motion } from 'framer-motion';
import { isVisible } from '@/assets/animation/animation';
import m from './Default.module.scss';

const Default = ({ userData }: any) => {
  return (
    <motion.div 
      className={m.content}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={4}
      variants={isVisible}
    >
      <h1 className={m.title}>Приветствую вас Алексей</h1>
      <span className={m.desc}>В этом разделе вы можете узнать всю нужную информацию для вас и ваших учеников</span>
    </motion.div>
  )
}

export default Default;