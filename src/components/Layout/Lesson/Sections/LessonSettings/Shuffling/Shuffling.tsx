import CheckboxButton from "@/components/UI/CheckboxButton/CheckboxButton";
import m from "./Shuffling.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Shuffling = ({ item }: any) => {
  const [isShuffiling1, setIsShuffiling1] = useState(false);
  const [isShuffiling2, setIsShuffiling2] = useState(false);
  

  return (
    <div className={m.container}>
      {item?.options.map((el: any) => (
        <CheckboxButton
          key={el.id}
          item={el}
          title={el.title}
          isChecked={el.id === 1 ? isShuffiling1 : isShuffiling2}
          onChange={el.id === 1 ? setIsShuffiling1 : setIsShuffiling2}
        />
      ))}
    </div>
  );
};

export default Shuffling;
