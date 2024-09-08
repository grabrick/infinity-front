import { motion } from "framer-motion";
import m from './WheelOfFortuneFields.module.scss'
import Header from "./Header/Header";
import { isVisible, topToBottom } from "@/assets/animation/animation";
import { setIssueData } from "@/redux/slices/lessonConstructor.slice";
import { useCreate } from "@/components/Layout/Create/useCreate";
import { useAppDispatch, useAppSelector } from "@/redux/hook/redux.hook";
import WheelSpinner from "./WheelSpinner/WheelSpinner";
import { useForm } from "react-hook-form";

const WheelOfFortuneFields = ({ selectedLesson, setIsOpenEditor }: any) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userSlice.userData);
  const { issueData } = useAppSelector((state) => state.lessonConstructorSlice);
  const { data, createNewLesson, changeIsCurrent, deleteSelectedIssue, saveLesson } = useCreate(userData?._id || "", selectedLesson?._id);

  const { handleSubmit, register, clearErrors, formState: { errors } } = useForm({
    defaultValues: {
      issueData: selectedLesson.questions || issueData || [],
    }
  });
  
  const onSubmit = (data: any) => {
    saveLesson.mutate(issueData);
    // console.log(issueData);
    
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
            lessonData={data?.data}
            questions={issueData}
          />
          <div className={m.questionWrapper}>
            {issueData === null ? (
              <div className={m.errorWrapper}>
                <h1 className={m.errorMsg}>Тут пусто</h1>
                <span className={m.errorDesc}>
                  Создайте первый вопрос в вашем уроке.
                </span>
              </div>
            ) : (
              <WheelSpinner
                issueData={issueData}
                selectedLesson={selectedLesson}
                register={register} 
                errors={errors}
                clearErrors={clearErrors}
              />
            )}
          </div>
          {issueData !== null && (
            <motion.div
              className={m.buttonWrapp}
              whileHover={{ scale: 1.02, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.button
                className={m.button}
                type="submit"
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

export default WheelOfFortuneFields;
