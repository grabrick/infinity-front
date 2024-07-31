import RadioButton from "@/components/UI/RadioButton/RadioButton";
import m from "./DuplicateName.module.scss";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const DuplicateName = ({ item, control, setValue }: any) => {
  const [duplicateName, setDuplicateName] = useState(
    item?.options?.map((option: any) => ({
      id: option.id,
      title: option.title,
      selected: option.id === 1,
    }))
  );

  useEffect(() => {
    setValue("lessonSettings.leaderboard.duplicateName", duplicateName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  const handleRadioButtonChange = (id: any) => {
    const updatedSymbols = duplicateName.map((option: any) =>
      option.id === id
        ? { ...option, selected: true }
        : { ...option, selected: false }
    );
    setDuplicateName(updatedSymbols);
    setValue("lessonSettings.leaderboard.duplicateName", updatedSymbols);
  };

  return (
    <div className={m.container}>
      {duplicateName.map((el: any, index: any) => (
        <Controller
          key={el.id}
          name={`lessonSettings.leaderboard.duplicateName[${index}]`}
          control={control}
          render={({ field }) => (
            <RadioButton
              items={el}
              isChecked={el.selected}
              onChange={() => {
                handleRadioButtonChange(el.id);
              }}
              title={el.title}
            />
          )}
        />
      ))}
    </div>
  );
};

export default DuplicateName;
