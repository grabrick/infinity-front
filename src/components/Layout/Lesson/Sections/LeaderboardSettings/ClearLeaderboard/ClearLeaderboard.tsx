import RadioButton from '@/components/UI/RadioButton/RadioButton';
import m from './ClearLeaderboard.module.scss';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

const ClearLeaderboard = ({ item, control, setValue }: any) => {
  const [leaderboard, setLeaderboards] = useState(
    item?.options?.map((option: any) => ({
      id: option.id,
      title: option.title,
      selected: option.id === 1,
    }))
  );

  useEffect(() => {
    setValue("lessonSettings.leaderboard.clearTime", leaderboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  const handleRadioButtonChange = (id: any) => {
    const updatedSymbols = leaderboard.map((option: any) =>
      option.id === id
        ? { ...option, selected: true }
        : { ...option, selected: false }
    );
    setLeaderboards(updatedSymbols);
    setValue("lessonSettings.leaderboard.clearTime", updatedSymbols);
  };

  return (
    <div className={m.container}>
      {leaderboard.map((el: any, index: any) => (
        <Controller
          key={el.id}
          name={`lessonSettings.leaderboard.clearTime[${index}]`}
          control={control}
          render={({ field }) => (
            <RadioButton
              items={el}
              isChecked={el.selected}
              onChange={() => {
                handleRadioButtonChange(el.id);
              }}
              title={el.title}
            />
          )}
        />
      ))}
    </div>
  );
}

export default ClearLeaderboard;