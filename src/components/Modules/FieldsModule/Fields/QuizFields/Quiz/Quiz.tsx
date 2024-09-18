import { AnimatePresence, motion } from "framer-motion";
import m from "./Quiz.module.scss";
import TrashCan from '@/assets/icons/trash-can.svg';
import correct from '@/assets/icons/correct.svg';
import incorrect from '@/assets/icons/incorrect.svg';
import { Controller, useFieldArray } from "react-hook-form";
import Image from "next/image";

const Quiz = ({ issueData, formState, control, index, handleDeleteIssue }: any) => {
  const { fields, update }: any = useFieldArray({
    control,
    name: `issueData.${index}.fields`,
  });
  
  const checkNameForDuplicates = (name: string, issueData: any, currentIndex: number) => {
    return formState.some((issue: any, index: number) => index !== currentIndex && issue.name.toLowerCase() === name.toLowerCase());
  };

  return (
    <AnimatePresence>
      <motion.div
        className={m.question}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={m.head}>
          <div className={m.titleWrapper}>
            <h1 className={m.number}>{index + 1}.</h1>
            <Controller
              name={`issueData.${index}.name`}
              control={control}
              rules={{
                required: "Название вопроса обязательно",
                validate: {
                  notEmpty: (value) =>
                    value.trim() !== "" || "Название не может быть пустым",
                  notDuplicate: (value) =>
                    !checkNameForDuplicates(value, issueData, index) || "Такое название уже существует",
                }
              }}
              render={({ field, fieldState: { error } }) => (
                <div className={m.wrap}>
                  <input
                    className={m.name}
                    {...field}
                    placeholder="Название вопроса"
                  />
                  {error && <span className={m.error}>{error.message}</span>}
                </div>
              )}
            />
          </div>
          <motion.button
            className={m.button}
            type="button"
            onClick={() => handleDeleteIssue(issueData.id)}
            initial={{ backgroundColor: "#88a1f3" }}
            whileHover={{
              backgroundColor: "#9fb3ff",
            }}
            transition={{ duration: 0.5 }}
          >
            <Image src={TrashCan} alt="" />
            Удалить
          </motion.button>
        </div>
        <div className={m.IssueWrapper}>
          <div className={m.inputs}>
            {fields.map((field: any, fieldIndex: any) => (
              <div className={m.inputWrapper} key={field.id}>
                <div className={m.labelWrapper}>
                  <span className={m.label}>{field.symbol}</span>
                  <Controller
                    name={`issueData.${index}.fields.${fieldIndex}.answer`}
                    control={control}
                    render={({ field: answerField }) => (
                      <input
                        className={m.input}
                        placeholder="Введите ответ"
                        {...answerField}
                      />
                    )}
                  />
                </div>
                <Controller
                  name={`issueData.${index}.fields.${fieldIndex}.isCorrect`}
                  control={control}
                  render={({ field: correctField }) => (
                    <button
                      className={m.button}
                      onClick={() => correctField.onChange(!correctField.value)}
                      type="button"
                    >
                      <Image src={correctField.value ? correct : incorrect} alt="" />
                    </button>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Quiz;
