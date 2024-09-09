import { motion } from "framer-motion";
import m from "./Header.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook/redux.hook";
import { addedIssue } from "@/redux/slices/lessonConstructor.slice";

const Header = ({ lessonData, questions }: any) => {
  const dispatch = useAppDispatch();
  let [index, setIndex] = useState(0);
  
  const handleCreateIssue = () => {
    const maxId = questions?.length
    ? Math.max(...questions.map((item: any) => item.id)) // Вычисляем maxId
    : index

    const newIssue = {
      id: maxId + 1,
      segment: "", // Логика для создания сегмента
    };
    setIndex(index + 1);
    dispatch(addedIssue({ type: lessonData?.template, payload: newIssue })); // Передаем тип при создании
  };
  
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
        Создать сегмент
      </motion.button>
    </div>
  );
};

export default Header;
