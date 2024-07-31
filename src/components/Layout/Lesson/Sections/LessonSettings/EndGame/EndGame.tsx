import CheckboxButton from "@/components/UI/CheckboxButton/CheckboxButton";
import m from "./EndGame.module.scss";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const EndGame = ({ item, control, setValue }: any) => {
  const [isActive, setIsActive] = useState({
    optionID: 1,
    name: "Показать ответы после игры",
    selected: false,
  });

  useEffect(() => {
    setValue("lessonSettings.endGame", {
      optionID: isActive.optionID,
      name: isActive.name,
      selected: isActive.selected,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  return (
    <div className={m.container}>
      {item.options.map((el: any) => (
        <Controller
          key={el.id}
          name="lessonSettings.endGame"
          control={control}
          render={({ field }) => (
            <CheckboxButton
              key={el.id}
              item={el}
              title={el.title}
              isChecked={isActive.selected}
              onChange={(value: any) => {
                field.onChange({
                  optionID: el.id,
                  name: el.title,
                  selected: value,
                });
                setIsActive({
                  optionID: isActive.optionID,
                  name: isActive.name,
                  selected: value,
                });
              }}
            />
          )}
        />
        // <CheckboxButton
        //   key={el.id}
        //   item={el}
        //   title={el.title}
        //   isChecked={isActive.selected}
        //   onChange={setIsActive}
        // />
      ))}
    </div>
  );
};

export default EndGame;
