import RadioButton from '@/components/UI/RadioButton/RadioButton';
import m from './ClearLeaderboard.module.scss';
import { useState } from 'react';

const ClearLeaderboard = ({item}: any) => {
  const [isSelected, setIsSelected] = useState({ optionID: 1, isActive: true });
  return (
    <div className={m.container}>
      {item?.options.map((el: any) => (
        <RadioButton
          key={el.id}
          items={el}
          title={el.title}
          isChecked={isSelected}
          onChange={setIsSelected}
        />
      ))}
    </div>
  );
}

export default ClearLeaderboard;