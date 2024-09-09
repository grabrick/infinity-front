import Image from 'next/image';
import m from './Header.module.scss';
import LoopIcon from '@/assets/icons/search-normal.svg';
import FilterIcons from '@/assets/icons/filter.svg';
import { motion } from 'framer-motion';

const Header = ({ setSearchField, searchField }: any) => {
  return (
    <div className={m.container}>
      <div className={m.searchWrap}>
        <motion.input 
          type="text" 
          placeholder='Поиск...' 
          className={m.input}
          onChange={(e) => setSearchField(e.target.value)}
          value={searchField}
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
    </div>
  )
}

export default Header;