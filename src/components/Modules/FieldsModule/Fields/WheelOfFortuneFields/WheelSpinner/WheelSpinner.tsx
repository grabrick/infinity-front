import m from "./WheelSpinner.module.scss";
import { useAppDispatch } from "@/redux/hook/redux.hook";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const WheelSpinner = ({ issueData, selectedLesson, register, errors, clearErrors }: any) => {
  const dispatch = useAppDispatch();

  // const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;

  //   dispatch(updateIssueData({
  //     issueId: issueData[index].id,
  //     newData: { segment: value },
  //     type: selectedLesson.template,
  //   }));

  //   clearErrors(`issueData.${index}.segment`);
  // };

  // const handleDeleteIssue = (issueId: number) => {
  //   dispatch(deleteSelectedIssue({ type: selectedLesson.template, issueId }));
  // };

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
              <input
                className={m.name}
                placeholder="Название сегмента"
                {...register(`issueData.${index}.segment`, {
                  required: "Название сегмента обязательно",
                  minLength: { value: 2, message: "Минимум 2 символа" },
                })}
                defaultValue={item.segment}
                // onChange={(e) => handleInputChange(index, e)}
              />
              {errors?.issueData?.[index]?.segment && (
                <span className={m.error}>
                  {errors.issueData[index].segment.message}
                </span>
              )}
            </div>
            <motion.button
              className={m.button}
              type="button"
              // onClick={() => handleDeleteIssue(item.id)}
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
