import { motion } from "framer-motion";
import m from "./LessonConstructor.module.scss";
import { isVisible, topToBottom } from "@/assets/animation/animation";
import { useForm } from "react-hook-form";
import Header from "./Header/Header";
import { useState } from "react";
import Quiz from "./Quiz/Quiz";
import { useCreate } from "@/components/Layout/Create/useCreate";
import { useAppSelector } from "@/redux/hook/redux.hook";

const LessonConstructor = ({ selectedLesson, setIsOpenEditor }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const userData = useAppSelector((state) => state.userSlice.userData);
  
  const {
    data,
    createNewLesson,
    createNewIssue,
    changeIsCurrent,
    deleteSelectedIssue,
  } = useCreate(userData?._id || "", selectedLesson?._id);
  const onSubmit = (data: any) => console.log(data);
  
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
          <Header lessonData={data?.data} createNewIssue={createNewIssue} />
          <div
            className={m.questionWrapper}
            style={{
              paddingRight: data?.data?.questions?.length > 2 ? "20px" : "0px",
            }}
          >
            <>
              {data?.data?.questions?.length === 0 ? (
                <div className={m.errorWrapper}>
                  <h1 className={m.errorMsg}>Тут пусто</h1>
                  <span className={m.errorDesc}>
                    Создайте первый вопрос в вашем уроке.
                  </span>
                </div>
              ) : (
                <>
                  {data?.data?.questions?.map((items: any, i: any) => (
                    <Quiz
                      key={i}
                      IssueData={items}
                      id={i}
                      changeIsCurrent={changeIsCurrent}
                      deleteSelectedIssue={deleteSelectedIssue}
                    />
                  ))}
                </>
              )}
            </>
          </div>
          {data?.data?.questions?.length !== 0 && (
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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M12.0001 14.8799C11.0901 14.8799 10.3501 14.1399 10.3501 13.2299V10.7599C10.3501 9.84989 11.0901 9.10986 12.0001 9.10986C12.9101 9.10986 13.6501 9.84989 13.6501 10.7599V13.2299C13.6501 14.1399 12.9101 14.8799 12.0001 14.8799Z"
                    stroke="#D8E9FE"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    opacity="0.4"
                    d="M16.98 13.4702C16.78 16.0502 14.62 18.0702 12 18.0702C9.24 18.0702 7 15.8302 7 13.0702V10.9302C7 8.17018 9.24 5.93018 12 5.93018C14.59 5.93018 16.72 7.90017 16.97 10.4202"
                    stroke="#D8E9FE"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M15 2H17C20 2 22 4 22 7V9"
                    stroke="#D8E9FE"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 9V7C2 4 4 2 7 2H9"
                    stroke="#D8E9FE"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 22H17C20 22 22 20 22 17V15"
                    stroke="#D8E9FE"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 15V17C2 20 4 22 7 22H9"
                    stroke="#D8E9FE"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
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
