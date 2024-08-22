import { motion } from "framer-motion";
import m from "./LessonConstructor.module.scss";
import { isVisible, topToBottom } from "@/assets/animation/animation";
import Header from "./Header/Header";
import Quiz from "./Quiz/Quiz";
import { useCreate } from "@/components/Layout/Create/useCreate";
import { useAppDispatch, useAppSelector } from "@/redux/hook/redux.hook";
import { useEffect, useState } from "react";
import { setIssueData, updateIssueData } from "@/redux/slices/lessonConstructor.slice";

const LessonConstructor = ({ selectedLesson, setIsOpenEditor }: any) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userSlice.userData);
  const { issueData } = useAppSelector((state) => state.lessonConstructorSlice)
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const {
    data,
    createNewLesson,
    createNewIssue,
    changeIsCurrent,
    deleteSelectedIssue,
    saveLesson,
  } = useCreate(userData?._id || "", selectedLesson?._id);
  useEffect(() => {
    if (issueData === null) {
      setErrors({})
    }
  }, [issueData])

  useEffect(() => {
    if (selectedLesson.questions.length !== 0) {
      dispatch(setIssueData(selectedLesson.questions))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLesson.questions])
  
  const handleChangeNameIssue = (id: number, value: string) => {
    if (value.trim() !== "") {
      setErrors((prevErrors) => {
        const { [id]: removedError, ...rest } = prevErrors;
        return rest;
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "Название вопроса не может быть пустым",
      }));
    }
    dispatch(updateIssueData({ issueId: id, newData: { name: value }}));
  }
  const validateAllInputs = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};
    
    issueData.forEach((item: any, index: number) => {
      if (!item.name || item.name.trim() === "") {
        newErrors[index] = "Название вопроса не может быть пустым";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };
  const onSubmit = () => {
    if (validateAllInputs()) {
      saveLesson.mutate(issueData);
      console.log(issueData);
    } else {
      console.log("Пожалуйста, исправьте ошибки перед отправкой формы.");
    }
  }
  
  return (
    <motion.div className={m.overlay} onClick={() => setIsOpenEditor(false)}>
      <motion.div
        className={m.modal}
        onClick={(e) => e.stopPropagation()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
        variants={isVisible}
      >
        <motion.form
          className={m.form}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          animate="visible"
          variants={topToBottom}
        >
          <Header 
            lessonData={data?.data} 
            createNewIssue={createNewIssue}
            // addNewQuestion={addNewQuestion}
          />
          <div
            className={m.questionWrapper}
            style={{
              paddingRight: issueData?.length > 2 ? "20px" : "0px",
            }}
          >
            <>
              {issueData === null ? (
                <div className={m.errorWrapper}>
                  <h1 className={m.errorMsg}>Тут пусто</h1>
                  <span className={m.errorDesc}>
                    Создайте первый вопрос в вашем уроке.
                  </span>
                </div>
              ) : (
                <>
                  {issueData?.map((items: any, i: any) => (
                    <Quiz
                      key={i}
                      IssueData={items}
                      id={i}
                      changeIsCurrent={changeIsCurrent}
                      handleChangeNameIssue={handleChangeNameIssue}
                      error={errors[i]}
                    />
                  ))}
                </>
              )}
            </>
          </div>
          {issueData !== null && (
            <motion.div
              className={m.buttonWrapp}
              whileHover={{ scale: 1.02, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.button
                className={m.button}
                onClick={() => onSubmit()}
                type="button"
                initial={{ backgroundColor: "#88a1f3" }}
                whileHover={{
                  backgroundColor: "#9fb3ff",
                }}
                transition={{ duration: 0.5 }}
              >
                Сохранить
              </motion.button>
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default LessonConstructor;
