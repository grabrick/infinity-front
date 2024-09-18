import { motion } from "framer-motion";
import m from "./QuizFields.module.scss";
import { isVisible, topToBottom } from "@/assets/animation/animation";
import Header from "../../../../UI/GamesUI/Header/Header";
import Quiz from "./Quiz/Quiz";
import { useCreate } from "@/components/Layout/Create/useCreate";
import { useAppSelector } from "@/redux/hook/redux.hook";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const QuizFields = ({ selectedLesson, setIsOpenEditor }: any) => {
  const userData = useAppSelector((state) => state.userSlice.userData);
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const formState = getValues("issueData");
  const { createNewLesson, changeIsCurrent, deleteSelectedIssue, saveLesson } =
    useCreate(userData?._id || "", setValue, selectedLesson?._id);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "issueData",
  });

  const handleCreateIssue = () => {
    const maxId = Math.max(
      ...selectedLesson?.questions.map((item: any) => item.id),
      formState && formState.length !== null ? formState.length : 0
    );
    append({
      id: maxId + 1,
      name: "",
      correct: 0,
      incorrect: 0,
      fields: [
        { number: 1, answer: "", symbol: "A", isCorrect: false },
        { number: 2, answer: "", symbol: "B", isCorrect: false },
        { number: 3, answer: "", symbol: "C", isCorrect: false },
        { number: 4, answer: "", symbol: "D", isCorrect: false },
        { number: 5, answer: "", symbol: "F", isCorrect: false },
        { number: 6, answer: "", symbol: "G", isCorrect: false },
      ],
    });
  };

  const handleDeleteIssue = (deleteID: number) => {
    const issueIndex = formState.findIndex((item: any) => item.id === deleteID);
    if (issueIndex !== -1) {
      remove(issueIndex);
    }

    if (formState?.length === 1) {
      setValue("issueData", null);
    }
  };

  const onSubmit = (data: any) => {
    saveLesson.mutate(data.issueData);
  };

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
          onSubmit={handleSubmit(onSubmit)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          animate="visible"
          variants={topToBottom}
        >
          <Header
            lessonData={selectedLesson}
            isLimit={{ isActive: false, createLimitCount: 0, formState: formState }}
            handleCreateIssue={handleCreateIssue}
            buttonText={"Создать вопрос"}
          />
          <div
            className={m.questionWrapper}
            style={{
              paddingRight: formState?.length > 2 ? "20px" : "0px",
            }}
          >
            <>
              {formState === null || formState === undefined ? (
                <div className={m.errorWrapper}>
                  <h1 className={m.errorMsg}>Тут пусто</h1>
                  <span className={m.errorDesc}>
                    Создайте первый вопрос в вашем уроке.
                  </span>
                </div>
              ) : (
                <>
                  {formState?.map((items: any, index: number) => (
                    <Controller
                      name={`issueData.${index}`}
                      key={items.id}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Quiz
                          index={index}
                          issueData={field.value}
                          formState={formState}
                          onChange={field.onChange}
                          error={error}
                          control={control}
                          handleDeleteIssue={handleDeleteIssue}
                        />
                      )}
                    />
                  ))}
                </>
              )}
            </>
          </div>
          {(formState !== null || undefined) && (
            <motion.div
              className={m.buttonWrapp}
              whileHover={{ scale: 1.02, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.button
                className={m.button}
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

export default QuizFields;