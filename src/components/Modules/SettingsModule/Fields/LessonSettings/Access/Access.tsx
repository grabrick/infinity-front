import m from "./Access.module.scss";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import RadioButton from "@/components/UI/RadioButton/RadioButton";

const Access = ({ item, control, setValue, symbolFormState }: any) => {
  const [access, setAccess] = useState(item?.options?.map((option: any) => ({
    id: option.id,
    title: option.title,
    selected: option.id === 1
  })));
  
  useEffect(() => {
    if (symbolFormState) {
      setValue("lessonSettings.access", symbolFormState);
      setAccess(symbolFormState)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbolFormState])
  
  const handleRadioButtonChange = (id: any) => {
    const updatedSymbols = access.map((option: any) =>
      option.id === id
        ? { ...option, selected: true }
        : { ...option, selected: false }
    );
    setAccess(updatedSymbols);
    setValue("lessonSettings.access", updatedSymbols);
  };

  // console.log(access);
  

  return (
    <div className={m.container}>
      {access.map((el: any) => (
        <Controller
          key={el.id}
          name={`lessonSettings.access[${el.id - 1}].selected`}
          control={control}
          render={({ field }) => (
            <RadioButton
              key={el.id}
              items={el}
              title={el.title}
              isChecked={el.selected}
              onChange={() => {
                handleRadioButtonChange(el.id);
              }}
            />
          )}
        />
      ))}
    </div>
  );
};

export default Access;
