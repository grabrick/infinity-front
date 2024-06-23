import Link from 'next/link';
import m from './Crumbs.module.scss';
import arrowRight from '@/assets/icons/arrow-right.svg'
import Image from 'next/image';

const Crumbs = ({ firstPage, secondPage, secondPageTitle }: any) => {
  return (
    <div className={m.container}>
      <Link  className={m.link} href={firstPage}>{firstPage === "/" && "Главная"}</Link>
      <Image src={arrowRight} alt='' />
      <Link className={m.activeLink} href={secondPage}>{secondPageTitle}</Link>
    </div>
  )
}

export default Crumbs;