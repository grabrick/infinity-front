import CheckboxButton from '@/components/UI/CheckboxButton/CheckboxButton';
import m from './Labeling.module.scss';
import { useState } from 'react';

const Labeling = ({item}: any) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={m.container}>
      {item?.options.map((el: any) => (
        <CheckboxButton key={el.id} item={el} title={el.title} isChecked={isActive} onChange={setIsActive} />
      ))}
    </div>
  )
}

export default Labeling;