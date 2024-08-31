import { motion } from "framer-motion";
import m from "./Header.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook/redux.hook";
import { addedIssue } from "@/redux/slices/lessonConstructor.slice";

const Header = ({ lessonData, createNewIssue }: any) => {
  const dispatch = useAppDispatch();
  let [index, setIndex] = useState(0);
  
  const handleCreateIssue = () => {
    const maxId = Math.max(...lessonData?.questions.map((item: any) => item.id), index);
    const newQuestion = {
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
    };
    setIndex(index + 1);
    dispatch(addedIssue(newQuestion));
    // createNewIssue.mutate(lessonData._id)
  }

  return (
    <div className={m.container}>
      <div className={m.nameWrapper}>
        <h1 className={m.name}>{lessonData?.lessonName}</h1>
        <span className={m.template}>
          Выбранный шаблон: <label>{lessonData?.template}</label>
        </span>
      </div>

      <motion.button
        className={m.button}
        onClick={() => handleCreateIssue()}
        type="button"
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
            d="M21.6599 10.44L20.6799 14.62C19.8399 18.23 18.1799 19.69 15.0599 19.39C14.5599 19.35 14.0199 19.26 13.4399 19.12L11.7599 18.72C7.58994 17.73 6.29994 15.67 7.27994 11.49L8.25994 7.30001C8.45994 6.45001 8.69994 5.71001 8.99994 5.10001C10.1699 2.68001 12.1599 2.03001 15.4999 2.82001L17.1699 3.21001C21.3599 4.19001 22.6399 6.26001 21.6599 10.44Z"
            stroke="#D8E9FE"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M15.0601 19.3901C14.4401 19.8101 13.6601 20.1601 12.7101 20.4701L11.1301 20.9901C7.1601 22.2701 5.0701 21.2001 3.7801 17.2301L2.5001 13.2801C1.2201 9.3101 2.2801 7.2101 6.2501 5.9301L7.8301 5.4101C8.2401 5.2801 8.6301 5.1701 9.0001 5.1001C8.7001 5.7101 8.4601 6.4501 8.2601 7.3001L7.2801 11.4901C6.3001 15.6701 7.5901 17.7301 11.7601 18.7201L13.4401 19.1201C14.0201 19.2601 14.5601 19.3501 15.0601 19.3901Z"
            stroke="#D8E9FE"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Создать вопрос
      </motion.button>
    </div>
  );
};

export default Header;
