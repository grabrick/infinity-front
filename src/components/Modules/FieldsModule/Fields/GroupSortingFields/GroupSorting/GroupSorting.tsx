import { AnimatePresence, motion } from "framer-motion";
import m from "./GroupSorting.module.scss";
import { Controller, useFieldArray } from "react-hook-form";
import TrashCan from "@/assets/icons/trash-can.svg";
import ElementPlus from "@/assets/icons/element-plus.svg";
import Image from "next/image";

const GroupSorting = ({
  issueData,
  control,
  index,
  handleDeleteIssue,
}: any) => {
  const { fields, update, append, remove } = useFieldArray({
    control,
    name: `issueData.${index}.fields`,
  });
  
  const addedNewSegment = () => {
    append({
      id: issueData.fields.length,
      answer: "",
      linkGroupID: issueData.id,
    });
  };

  const handleRemoveSegment = (fieldIndex: number) => {
    remove(fieldIndex);
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
              name={`issueData.${index}.groupName`}
              control={control}
              rules={{
                required: "Название группы обязательно",
                validate: (value) =>
                  value.trim() !== "" || "Название не может быть пустым",
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    className={m.name}
                    {...field}
                    placeholder="Название группы"
                  />
                  {error && <span className={m.error}>{error.message}</span>}
                </>
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
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GroupSorting;
