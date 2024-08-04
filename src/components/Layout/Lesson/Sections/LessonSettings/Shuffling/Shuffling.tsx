import CheckboxButton from "@/components/UI/CheckboxButton/CheckboxButton";
import m from "./Shuffling.module.scss";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const Shuffling = ({ control, setValue, shufflingFormState }: any) => {
  const [shufflingOptions, setShufflingOptions] = useState([
    { optionID: 1, name: 'Порядок вопросов', selected: true },
    { optionID: 2, name: 'Порядок ответов', selected: false }
  ]);

  useEffect(() => {
    if (shufflingFormState) {
      setValue("lessonSettings.shuffling", shufflingFormState);
      setShufflingOptions(shufflingFormState);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shufflingFormState])
  
  const handleCheckboxChange = (optionID: any) => {
    const updatedOptions = shufflingOptions.map(option =>
      option.optionID === optionID
        ? { ...option, selected: !option.selected }
        : option
    );
    setShufflingOptions(updatedOptions);
    setValue("lessonSettings.shuffling", updatedOptions);
  };

  return (
    <div className={m.container}>
      {shufflingOptions.map((el) => (
        <Controller
          key={el.optionID}
          name={`lessonSettings.shuffling[${el.optionID - 1}].selected`}
          control={control}
          defaultValue={el.selected}
          render={({ field }) => (
            <CheckboxButton
              item={el}
              title={el.name}
              isChecked={el.selected}
              onChange={() => {
                handleCheckboxChange(el.optionID);
                field.onChange(!el.selected);
              }}
            />
          )}
        />
      ))}
    </div>
  );
};

export default Shuffling;
