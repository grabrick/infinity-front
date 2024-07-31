import CheckboxButton from "@/components/UI/CheckboxButton/CheckboxButton";
import m from "./Labeling.module.scss";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const Labeling = ({ item, control, setValue }: any) => {
  const [isActive, setIsActive] = useState({
    name: "Автоматически продолжить после маркировки",
    optionID: 1,
    selected: true,
  });

  useEffect(() => {
    setValue("lessonSettings.labeling", {
      name: isActive.name,
      optionID: isActive.optionID,
      selected: isActive.selected,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  return (
    <div className={m.container}>
      {item?.options.map((el: any) => (
        <Controller
          key={el.id}
          name="lessonSettings.labeling"
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
                setIsActive({ name: isActive.name, optionID: isActive.optionID, selected: value });
              }}
            />
          )}
        />
      ))}
    </div>
  );
};

export default Labeling;
