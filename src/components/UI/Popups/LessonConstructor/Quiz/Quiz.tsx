import { AnimatePresence, motion } from "framer-motion";
import m from "./Quiz.module.scss";
import { useAppDispatch } from "@/redux/hook/redux.hook";
import { deleteSelectedIssue, updateIssueData } from "@/redux/slices/lessonConstructor.slice";
import { useRef, useState } from "react";

const Quiz = ({ IssueData, id, error, handleChangeNameIssue }: any) => {
  const dispatch = useAppDispatch();
  const [localData, setLocalData] = useState(IssueData.name);

  const handleChange = (id: any, e: any) => {
    const value = e.target.value;
    setLocalData(value);
    handleChangeNameIssue(id, value);
  };
  
  const handleInputChange = (
    fieldId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFields = IssueData.fields.map((field: any) =>
      field.number === fieldId
        ? { ...field, answer: event.target.value }
        : field
    );
    dispatch(
      updateIssueData({
        issueId: IssueData.id,
        newData: { ...IssueData, fields: updatedFields },
      })
    );
  };
  const handleCorrectChange = (fieldId: number) => {
    const updatedFields = IssueData.fields.map((field: any) =>
      field.number === fieldId
        ? { ...field, isCorrect: !field.isCorrect }
        : field
    );
    dispatch(
      updateIssueData({
        issueId: IssueData.id,
        newData: { ...IssueData, fields: updatedFields },
      })
    );
  };

  const handleDeleteIssue = (isseID: string) => {
    dispatch(deleteSelectedIssue(isseID))
  }
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
            <h1 className={m.number}>{++id}.</h1>
            <input
              className={m.name}
              placeholder="Название вопроса"
              value={localData}
              onChange={(e) => handleChange(IssueData.id, e)}
            />
            {error && <span className={m.error}>{error}</span>}
          </div>
          <motion.button
            className={m.button}
            type="button"
            onClick={() => handleDeleteIssue(IssueData.id)}
            initial={{ backgroundColor: "#88a1f3" }}
            whileHover={{
              backgroundColor: "#9fb3ff",
            }}
            transition={{ duration: 0.5 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.34"
                d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.8499 9.14014L18.1999 19.2101C18.0899 20.7801 17.9999 22.0001 15.2099 22.0001H8.7899C5.9999 22.0001 5.9099 20.7801 5.7999 19.2101L5.1499 9.14014"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.34"
                d="M10.3301 16.5H13.6601"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.34"
                d="M9.5 12.5H14.5"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Удалить
          </motion.button>
        </div>
        <div className={m.IssueWrapper}>
          <div className={m.inputs}>
            {IssueData?.fields?.map((items: any, i: any) => (
              <div className={m.inputWrapper} key={i}>
                <div className={m.labelWrapper}>
                  <span className={m.label}>{items?.symbol}</span>
                  <input
                    className={m.input}
                    placeholder={
                      items.answer.length === 0 ? "Введите ответ" : items.answer
                    }
                    value={items.answer}
                    onChange={(e) => handleInputChange(items.number, e)}
                  />
                </div>
                <button
                  className={m.button}
                  onClick={() => handleCorrectChange(items.number)}
                  type="button"
                >
                  {items?.isCorrect ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M2 12L6.36364 18L18 2"
                        stroke="#D2E6FF"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.4">
                        <path
                          d="M18 17.8398L2.15625 2"
                          stroke="#D8E9FE"
                          stroke-opacity="0.6"
                          stroke-width="3"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17.8437 2.16016L2 18"
                          stroke="#D8E9FE"
                          stroke-width="3"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Quiz;