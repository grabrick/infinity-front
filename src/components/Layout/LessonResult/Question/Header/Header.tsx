import Image from 'next/image';
import m from './Header.module.scss';
import LoopIcon from '@/assets/icons/search-normal.svg';
import FilterIcons from '@/assets/icons/filter.svg';

const Header = () => {
  return (
    <div className={m.container}>
      <div className={m.searchWrap}>
        <div className={m.search}>
          <Image src={LoopIcon} alt='' />
          <input type="text" placeholder='Поиск...' className={m.input} />
        </div>
      </div>
      <div className={m.filterWrap}>
        <div className={m.filter}>
          <Image src={FilterIcons} alt='' />
        </div>
      </div>
    </div>
  )
}

export default Header;