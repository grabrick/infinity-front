import Header from './Header/Header';
import m from './MySchool.module.scss';
import School from './School/School';
import { motion } from 'framer-motion';
import { isVisible } from '@/assets/animation/animation';

const MySchool = () => {
  return (
    <motion.div 
      className={m.content}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={2}
      variants={isVisible}
    >
      <Header />

      <div className={m.schools}>
        {Array.from({length: 6}, (_, i) => (
          <School key={i} name={"Младшая школа №14"} count={21} />
        ))}
      </div>
    </motion.div>
  )
}

export default MySchool;