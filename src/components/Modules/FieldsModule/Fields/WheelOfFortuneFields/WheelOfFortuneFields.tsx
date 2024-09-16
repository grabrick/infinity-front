import { motion } from "framer-motion";
import m from './WheelOfFortuneFields.module.scss'
import { isVisible, topToBottom } from "@/assets/animation/animation";
import { useCreate } from "@/components/Layout/Create/useCreate";
import { useAppSelector } from "@/redux/hook/redux.hook";
import WheelSpinner from "./WheelSpinner/WheelSpinner";
import { useFieldArray, useForm } from "react-hook-form";
import Header from "@/components/UI/GamesUI/Header/Header";

const WheelOfFortuneFields = ({ selectedLesson, setIsOpenEditor }: any) => {
  const userData = useAppSelector((state) => state.userSlice.userData);
  const { handleSubmit, control, setValue, getValues } = useForm({
    mode: 'onChange'
  });
  const formState = getValues("issueData");
  const { saveLesson } = useCreate(userData?._id || "", setValue, selectedLesson?._id);
  const { append, remove } = useFieldArray({
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
      segment: "",
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
            handleCreateIssue={handleCreateIssue}
            isLimit={{ isActive: true, createLimitCount: 20, formState: formState }}
            buttonText={"Создать сегмент"}
          />
          <div className={m.questionWrapper}>
            {formState === null ? (
              <div className={m.errorWrapper}>
                <h1 className={m.errorMsg}>Тут пусто</h1>
                <span className={m.errorDesc}>
                  Создайте первый вопрос в вашем уроке.
                </span>
              </div>
            ) : (
              <WheelSpinner
                issueData={formState}
                control={control}
                handleDeleteIssue={handleDeleteIssue}
              />
            )}
          </div>
          {formState !== null && (
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
