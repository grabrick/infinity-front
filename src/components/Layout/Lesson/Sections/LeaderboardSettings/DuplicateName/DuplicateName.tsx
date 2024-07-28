import RadioButton from "@/components/UI/RadioButton/RadioButton";
import m from "./DuplicateName.module.scss";
import { useState } from "react";

const DuplicateName = ({ item }: any) => {
  const [isSelected, setIsSelected] = useState({ optionID: 1, isActive: true });
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

export default DuplicateName;
