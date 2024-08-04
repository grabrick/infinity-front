import CheckboxButton from "@/components/UI/CheckboxButton/CheckboxButton";
import m from "./Labeling.module.scss";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const Labeling = ({ item, control, onChange, setValue, labelingFormState }: any) => {
  const [isActive, setIsActive] = useState({
    name: "Автоматически продолжить после маркировки",
    optionID: 1,
    selected: true,
  });

  useEffect(() => {
    if (labelingFormState) {
      setValue("lessonSettings.labeling", labelingFormState);
      setIsActive(labelingFormState);
    } else {
      setValue("lessonSettings.labeling", {
        name: isActive.name,
        optionID: isActive.optionID,
        selected: isActive.selected,
      });
    }

    if (isActive.selected === false) {
      setValue("lessonSettings.labeling", null);
      onChange(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, labelingFormState, isActive]);

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
