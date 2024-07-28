import CheckboxButton from "@/components/UI/CheckboxButton/CheckboxButton";
import m from "./Symbol.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RadioButton from "@/components/UI/RadioButton/RadioButton";

const Symbol = ({ item }: any) => {
  const [isSelected, setIsSelected] = useState({ optionID: 1, isActive: true});

  return (
    <div className={m.container}>
      {item?.options.map((el: any) => (
        <RadioButton
          key={el.id}
          items={el}
          title={el.title}
          isChecked={isSelected}
          onChange={setIsSelected}
        />
      ))}
    </div>
  );
};

export default Symbol;
