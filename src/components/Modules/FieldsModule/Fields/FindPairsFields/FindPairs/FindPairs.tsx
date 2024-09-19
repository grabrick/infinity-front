import m from "./FindPairs.module.scss";
import Image from "next/image";
import TrashCan from "@/assets/icons/trash-can.svg";
import { Controller, useFieldArray } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import correct from "@/assets/icons/correct.svg";
import incorrect from "@/assets/icons/incorrect.svg";
import ElementPlus from "@/assets/icons/element-plus.svg";

const FindPairs = ({
  index,
  issueData,
  formState,
  control,
  handleDeleteIssue,
}: any) => {
  const { append, fields, update, remove } = useFieldArray({
    control,
    name: `issueData.${index}.fields`,
  });

  const addedNewSegment = () => {
    append({
      id: issueData.fields.length,
      answer: "",
      isCorrect: false,
    });
  };

  const handleRemoveSegment = (fieldIndex: number) => {
    remove(fieldIndex);
  };

  const checkNameForDuplicates = (
    pairName: string,
    issueData: any,
    currentIndex: number
  ) => {
    return formState.some(
      (issue: any, index: number) =>
        index !== currentIndex &&
        issue.pairName.toLowerCase() === pairName.toLowerCase()
    );
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
              name={`issueData.${index}.pairName`}
              control={control}
              rules={{
                required: "Название пары обязательно",
                validate: {
                  notEmpty: (value) =>
                    value.trim() !== "" || "Название пары не может быть пустым",
                  notDuplicate: (value) =>
                    !checkNameForDuplicates(value, issueData, index) ||
                    "Такое название уже существует",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div className={m.wrap}>
                  <input
                    className={m.name}
                    {...field}
                    placeholder="Название пары"
                  />
                  {error && <span className={m.error}>{error.message}</span>}
                </div>
              )}
            />
          </div>
          <div className={m.buttons}>
            {fields.length !== 8 && (
              <motion.button
                className={m.button}
                type="button"
                onClick={() => addedNewSegment()}
                initial={{ backgroundColor: "#88a1f3" }}
                whileHover={{
                  backgroundColor: "#9fb3ff",
                }}
                transition={{ duration: 0.5 }}
              >
                <Image src={ElementPlus} alt="" />
                Добавить сегмент
              </motion.button>
            )}
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
        </div>
        <div
          className={m.IssueWrapper}
          style={{
            borderTop: fields.length === 0 ? "none" : "",
            paddingTop: fields.length === 0 ? "0px" : "30px",
            marginTop: fields.length === 0 ? "0px" : "30px",
          }}
        >
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
                <div className={m.buttons}>
                  <motion.button
                    className={m.button}
                    type="button"
                    onClick={() => handleRemoveSegment(fieldIndex)}
                    initial={{ backgroundColor: "#88a1f3" }}
                    whileHover={{
                      backgroundColor: "#9fb3ff",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image src={TrashCan} alt="" />
                  </motion.button>
                  <Controller
                    name={`issueData.${index}.fields.${fieldIndex}.isCorrect`}
                    control={control}
                    render={({ field: correctField }) => (
                      <button
                        className={m.button}
                        onClick={() =>
                          correctField.onChange(!correctField.value)
                        }
                        type="button"
                      >
                        <Image
                          src={correctField.value ? correct : incorrect}
                          alt=""
                        />
                      </button>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FindPairs;
