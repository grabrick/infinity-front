import ProgressBar from "@/components/UI/ProgressBar/ProgressBar";
import m from "./LimitOnLives.module.scss";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

const LimitOnLives = ({ control, setValue }: any) => {
  const [isValue, setIsValue] = useState(1);

  useEffect(() => {
    setValue("lessonSettings.limitOnLives", {
      lives: 1
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  return (
    <div className={m.container}>
      <Controller
        name="lessonSettings.limitOnLives"
        control={control}
        render={({ field }) => (
          <ProgressBar 
            min={1} 
            max={10} 
            value={isValue}
            onChange={(value: any) => {
              field.onChange({ lives: Number(value)});
              setIsValue(value)
            }}
          />
        )}
      />
      <span>Минимальное количество жизней составляет 1, максимальное 10</span>
    </div>
  );
};

export default LimitOnLives;
