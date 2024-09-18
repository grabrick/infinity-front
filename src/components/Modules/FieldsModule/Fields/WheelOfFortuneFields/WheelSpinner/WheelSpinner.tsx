import { Controller } from "react-hook-form";
import m from "./WheelSpinner.module.scss";
import { AnimatePresence, motion } from "framer-motion";

const WheelSpinner = ({ issueData, control, handleDeleteIssue }: any) => {
  
  const checkSegmentForDuplicates = (segment: string, issueData: any, currentIndex: number) => {
    return issueData.some((issue: any, index: number) => index !== currentIndex && issue.segment.toLowerCase() === segment.toLowerCase());
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
        {issueData?.map((item: any, index: number) => (
          <div className={m.head} key={item.id}>
            <div className={m.titleWrapper}>
              <h1 className={m.number}>{item.id}.</h1>
              <Controller
                name={`issueData.${index}.segment`}
                control={control}
                rules={{
                  required: "Название сегмента",
                  validate: {
                    notEmpty: (value) =>
                      value.trim() !== "" || "Cегмента не может быть пустым",
                    notDuplicate: (value) =>
                      !checkSegmentForDuplicates(value, issueData, index) || "Такой сегмента уже существует",
                  }
                  
                }}
                render={({ field, fieldState: { error } }) => (
                  <div className={m.wrap}>
                    <input
                      className={m.name}
                      {...field}
                      placeholder="Название сегмента"
                    />
                    {error && <span className={m.error}>{error.message}</span>}
                  </div>
                )}
              />
            </div>
            <motion.button
              className={m.button}
              type="button"
              onClick={() => handleDeleteIssue(item.id)}
              initial={{ backgroundColor: "#88a1f3" }}
              whileHover={{
                backgroundColor: "#9fb3ff",
              }}
              transition={{ duration: 0.5 }}
            >
              Удалить
            </motion.button>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default WheelSpinner;
