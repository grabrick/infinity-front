import Link from "next/link";
import m from "./Footer.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import NewSletter from "@/assets/images/newsletter.svg";
import Stars from "@/assets/images/Stars.svg";
import { topToBottom } from "@/assets/animation/animation";

const Footer = () => {
  return (
    <motion.footer 
      className={m.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={2}
      variants={topToBottom}
    >
      <div className={m.left}>
        <div className={m.logo}>
          <h1 className={m.title}>Infinity</h1>
          <Image src={Stars} alt="" />
        </div>
        <div className={m.aboutDevelop}>
          <h3 className={m.h4}>
            Дизайн и разработка:{" "}
            <Link href={"#"} target="_blank" className={m.nick}>
              Grabrick
            </Link>
          </h3>
          <span className={m.span}>@2024 Все права защищены.</span>
        </div>
      </div>

      <div className={m.navigate}>
        <div className={m.nav}>
          <h3 className={m.title}>Навигация</h3>
          <ul className={m.pageList}>
            <Link href={"/"} className={m.page}>
              Главная
            </Link>
            <Link href={"#"} className={m.page}>
              Каталог
            </Link>
            <Link href={"/profile"} className={m.page}>
              Профиль
            </Link>
          </ul>
        </div>
        <div className={m.nav}>
          <h3 className={m.title}>Уроки</h3>
          <ul className={m.pageList}>
            <Link href={"/create"} className={m.page}>
              Создать урок
            </Link>
            <Link href={"/activity"} className={m.page}>
              Моя активность
            </Link>
            <Link href={"/my-results"} className={m.page}>
              Мои результаты
            </Link>
          </ul>
        </div>
        <div className={m.nav}>
          <h3 className={m.title}>Наши контакты</h3>
          <ul className={m.pageList}>
            <Link href={"#"} className={m.page}>
              Telegram
            </Link>
            <Link href={"#"} className={m.page}>
              Whats app
            </Link>
            <Link href={"#"} className={m.page}>
              Почта
            </Link>
          </ul>
        </div>
      </div>

      <div className={m.image}>
        <Image src={NewSletter} alt="" />
      </div>
    </motion.footer>
  );
};

export default Footer;
