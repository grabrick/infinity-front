import RadioButton from "@/components/UI/RadioButton/RadioButton";
import m from "./Timer.module.scss";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const Timer = ({ item, control, setValue, timerFormState }: any) => {
  const [time, setTime] = useState(item?.options?.map((option: any) => ({
    id: option.id,
    title: option.title,
    selected: option.id === 1
  })));
  
  useEffect(() => {
    if (timerFormState !== null) {
      setValue("lessonSettings.timer", timerFormState);
      setTime(timerFormState?.selected);
    } else {
      setValue("lessonSettings.timer.selected", time);
      setValue("lessonSettings.timer.time", {
        minutes: 5,
        seconds: 0,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerFormState, setValue]);

  const handleRadioButtonChange = (id: any) => {
    const updatedSymbols = time?.map((option: any) =>
      option.id === id
        ? { ...option, selected: true }
        : { ...option, selected: false }
    );
    setTime(updatedSymbols);    
    setValue("lessonSettings.timer.selected", updatedSymbols);
  };

  return (
    <div className={m.settingTimer}>
      <div className={m.selector}>
        {time?.map((el: any, index: any) => (
          <Controller
            key={el.id}
            name={`lessonSettings.timer.selected[${index}].selected`}
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
      <div className={m.timerWrapper}>
        <div className={m.timer}>
          <label>Минута</label>
          <Controller
            name="lessonSettings.timer.time.minutes"
            control={control}
            defaultValue={5}
            render={({ field }) => (
              <input
                className={m.time}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(Number(e.target.value));
                }}
                placeholder="0"
              />
            )}
          />
        </div>
        <div className={m.timer}>
          <label>Секунда</label>
          <Controller
            name="lessonSettings.timer.time.seconds"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <input
                className={m.time}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(Number(e.target.value));
                }}
                placeholder="0"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Timer;
