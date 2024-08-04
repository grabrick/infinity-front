import m from "./Symbol.module.scss";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import RadioButton from "@/components/UI/RadioButton/RadioButton";

const Symbol = ({ item, control, setValue, symbolFormState }: any) => {
  const [symbols, setSymbols] = useState(item?.options?.map((option: any) => ({
    id: option.id,
    title: option.title,
    selected: option.id === 1
  })));
  
  
  useEffect(() => {
    if (symbolFormState) {
      setValue("lessonSettings.symbol", symbolFormState);
      setSymbols(symbolFormState)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbolFormState])
  
  const handleRadioButtonChange = (id: any) => {
    const updatedSymbols = symbols.map((option: any) =>
      option.id === id
        ? { ...option, selected: true }
        : { ...option, selected: false }
    );
    setSymbols(updatedSymbols);
    setValue("lessonSettings.symbol", updatedSymbols);
  };

  return (
    <div className={m.container}>
      {symbols.map((el: any) => (
        <Controller
          key={el.id}
          name={`lessonSettings.symbol[${el.id - 1}].selected`}
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

export default Symbol;
