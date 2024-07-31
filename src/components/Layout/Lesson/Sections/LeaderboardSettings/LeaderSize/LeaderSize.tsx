import ProgressBar from '@/components/UI/ProgressBar/ProgressBar';
import m from './LeaderSize.module.scss';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

const LeaderSize = ({ item, control, setValue }: any) => {
  const [isValue, setIsValue] = useState(3);

  useEffect(() => {
    setValue("lessonSettings.leaderboard.leadersSize", {
      liders: 3
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  return (
    <div className={m.container}>
      <Controller
        name="lessonSettings.leaderboard.leadersSize"
        control={control}
        render={({ field }) => (
          <ProgressBar 
            min={3} 
            max={40} 
            steps={[3, 10, 15, 20, 30, 40]}
            value={isValue}
            onChange={(value: any) => {
              field.onChange({ liders: Number(value)});
              setIsValue(value)
            }}
          />
        )}
      />
      <span>Минимальное количество лидеров составляет 3 участника, максимальная 40</span>
    </div>
  )
}

export default LeaderSize;