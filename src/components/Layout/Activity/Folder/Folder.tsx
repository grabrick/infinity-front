import Image from 'next/image';
import setting from '@/assets/icons/setting-3.svg'
import m from './Folder.module.scss';

const Folder = ({ folderName, lessonsCount, createAt }: any) => {
  return (
    <div className={m.folder}>
      <div className={m.titleWrapp}>
        <h2 className={m.name}>{folderName}</h2>
        <span className={m.count}>{lessonsCount} уроков</span>
      </div>

      <div className={m.createAt}>
        <span className={m.time}>{createAt}</span>
        <Image src={setting} alt='' />
      </div>
    </div>
  )
}

export default Folder;