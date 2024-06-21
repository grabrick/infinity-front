import Image from "next/image";
import m from "./LessonTemplateCard.module.scss";

const LessonTemplateCard = ({ title, desc, logo }: any) => {
  return (
    <div className={m.card}>
      <Image src={logo} alt="" />
      <div className={m.textWrapp}>
        <h3 className={m.title}>{title}</h3>
        <p className={m.subText}>{desc}</p>
      </div>
    </div>
  );
};

export default LessonTemplateCard;
