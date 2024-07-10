import Image from 'next/image';
import m from './Template.module.scss';

const Template = ({ title, type, image, desc, setIsChoice }: any) => {
  
  return (
    <div className={m.container} onClick={() => setIsChoice({ type: type, isActive: true })}>
      <Image width={45} height={45} src={image} alt='' />
      <div className={m.titleWrapper}>
        <h3 className={m.title}>{title}</h3>
        <p className={m.desc}>{desc}</p>
      </div>
    </div>
  )
}

export default Template;