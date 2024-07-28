import RadioButton from "@/components/UI/RadioButton/RadioButton";
import m from "./Timer.module.scss";
import { useState } from "react";

const Timer = ({ item }: any) => {
  const [isTime, setIsTime] = useState<any>({ minuts: 5, seconds: 0 });
  const [isCurrentRoad, setIsCurrentRoad] = useState({
    optionID: 1,
    isActive: true,
  });
  
  return (
    <div className={m.settingTimer}>
      <div className={m.selector}>
        {item.options?.map((el: any) => (
          <RadioButton
            key={el.id}
            items={el}
            isChecked={isCurrentRoad}
            onChange={setIsCurrentRoad}
            title={el.title}
          />
        ))}
      </div>
      <div className={m.timerWrapper}>
        <div className={m.timer}>
          <label>Минута</label>
          <input
            className={m.time}
            value={isTime.minuts}
            onChange={(e) => setIsTime({ ...isTime, minuts: e.target.value })}
            placeholder="0"
          />
        </div>
        <div className={m.timer}>
          <label>Секунда</label>
          <input
            className={m.time}
            value={isTime.seconds}
            onChange={(e) => setIsTime({ ...isTime, seconds: e.target.value })}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default Timer;
