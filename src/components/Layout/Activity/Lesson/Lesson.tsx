import Image from 'next/image';
import setting from '@/assets/icons/setting-3.svg'
import m from './Lesson.module.scss';

const Lesson = ({ lessonName, image, createAt }: any) => {
  return (
    <div className={m.lesson}>
      <div className={m.imageWrapper}>
        {image === null ? (
          <div className={m.mock} />
        ) : (
          <Image src={image} alt='' />
        )}
      </div>
      <div className={m.titleWrapp}>
        <h2 className={m.name}>{lessonName}</h2>

        <div className={m.createAt}>
          <span className={m.time}>{createAt}</span>
          <Image src={setting} alt='' />
        </div>
      </div>
    </div>
  )
}

export default Lesson;