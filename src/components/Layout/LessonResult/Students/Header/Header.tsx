import Image from "next/image";
import m from "./Header.module.scss";
import LoopIcon from "@/assets/icons/search-normal.svg";
import FilterIcons from "@/assets/icons/filter.svg";
import { motion } from "framer-motion";
import { useState } from "react";

const Header = ({
  setSearchField,
  searchField,
  handleChoice,
  isChoice,
}: any) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (isActive: boolean) => {
    setIsActive(isActive);
    handleChoice(null)
  }
  return (
    <div className={m.container}>
      <div className={m.searchWrap}>
        <motion.input
          type="text"
          placeholder="Поиск..."
          className={m.input}
          onChange={(e) => setSearchField(e.target.value)}
          value={searchField}
          initial={{ backgroundColor: "#c8d3f8" }}
          whileFocus={{
            backgroundColor: ["#c8d3f8", "#dae2ff", "#c8d3f8"],
            transition: {
              duration: 1.5,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
        />
      </div>
      <div
        className={m.filterWrap}
        style={{ maxWidth: isActive ? "400px" : "fit-content" }}
      >
        {!isActive ? (
          <div
            className={m.filter}
            onClick={() => handleClick(true)}
            style={{ cursor: isActive ? "default" : "pointer" }}
          >
            <Image src={FilterIcons} alt="" />
          </div>
        ) : (
          <div
            className={m.filter}
            style={{ cursor: isActive ? "default" : "pointer" }}
          >
            <ul className={m.list}>
              <li
                className={isChoice === "Правильно" ? m.active : m.button}
                onClick={() => handleChoice("Правильно")}
              >
                Правильно
              </li>
              <li
                className={isChoice === "Неправильно" ? m.active : m.button}
                onClick={() => handleChoice("Неправильно")}
              >
                Неправильно
              </li>
              <li
                className={isChoice === "Время" ? m.active : m.button}
                onClick={() => handleChoice("Время")}
              >
                Время
              </li>
              <li
                className={`${m.button} ${m.close}`}
                onClick={() => handleClick(false)}
              >
                Закрыть
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
