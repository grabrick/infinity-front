import m from './FlipTiles.module.scss';
import { AnimatePresence, motion } from "framer-motion";
import TrashCan from "@/assets/icons/trash-can.svg";
import { Controller } from "react-hook-form";
import Image from "next/image";

const FlipTiles = ({ issueData, control, handleDeleteIssue }: any) => {
  
  const checkWordForDuplicates = (frontWord: string, issueData: any, currentIndex: number) => {
    return issueData.some((issue: any, index: number) => index !== currentIndex && issue.frontWord.toLowerCase() === frontWord.toLowerCase());
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
                    name={`issueData.${index}.frontWord`}
                    control={control}
                    rules={{
                      required: "Передняя сторона обязательна",
                      validate: {
                        notEmpty: (value) =>
                          value.trim() !== "" || "Передняя не может быть пустым",
                        notDuplicate: (value) =>
                          !checkWordForDuplicates(value, issueData, index) || "Такое слово уже существует",
                      } 
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <div className={m.wrap}>
                        <input
                          className={m.name}
                          {...field}
                          placeholder="Передняя сторона"
                        />
                        {error && (
                          <span className={m.error}>{error.message}</span>
                        )}
                      </div>
                    )}
                  />
                </div>
                <Controller
                  name={`issueData.${index}.rearWord`}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div className={m.wrap}>
                      <input
                        className={m.hint}
                        {...field}
                        placeholder="Задняя сторона"
                      />
                      {error && (
                        <span className={m.error}>{error.message}</span>
                      )}
                    </div>
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
}

export default FlipTiles;