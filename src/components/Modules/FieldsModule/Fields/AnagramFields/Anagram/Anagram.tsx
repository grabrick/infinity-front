import Image from "next/image";
import m from "./Anagram.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import TrashCan from "@/assets/icons/trash-can.svg";
import { Controller, useFieldArray } from "react-hook-form";

const Anagram = ({ issueData, control, index, handleDeleteIssue }: any) => {
  return (
    <AnimatePresence>
      <motion.div
        className={m.question}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {issueData?.map((items: any, index: number) => (
          <Controller
            name={`issueData.${index}`}
            key={items.id}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className={m.head}>
                <div className={m.titleWrapper}>
                  <h1 className={m.number}>{index + 1}.</h1>
                  <Controller
                    name={`issueData.${index}.word`}
                    control={control}
                    rules={{
                      required: "Слово обязательно",
                      validate: (value) =>
                        value.trim() !== "" || "Слово не может быть пустым",
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          className={m.name}
                          {...field}
                          placeholder="Слово"
                        />
                        {error && (
                          <span className={m.error}>{error.message}</span>
                        )}
                      </>
                    )}
                  />
                </div>
                <Controller
                  name={`issueData.${index}.hint`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <input
                        className={m.hint}
                        {...field}
                        placeholder="Подсказка"
                      />
                      {error && (
                        <span className={m.error}>{error.message}</span>
                      )}
                    </>
                  )}
                />
                <div className={m.buttons}>
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
            )}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default Anagram;
