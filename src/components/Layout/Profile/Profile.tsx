import Crumbs from "@/components/UI/Crumbs/Crumbs";
import m from "./Profile.module.scss";
import { useState } from "react";
import Menu from "./Menu/Menu";
import Default from "./Contents/Default/Default";
import Personal from "./Contents/Personal/Personal";
import MySchool from "./Contents/MySchool/MySchool";
import MyStudent from "./Contents/MyStudent/MyStudent";
import { AnimatePresence, motion } from "framer-motion";
import { isVisible, topToBottom } from "@/assets/animation/animation";

const Profile = () => {
  const [isSelected, setIsSelected] = useState(null);
  return (
    <section className={m.container}>
      <Crumbs
        firstPage={"/"}
        secondPage={"/profile"}
        secondPageTitle={"Профиль"}
      />

      <motion.div
        className={m.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
        variants={topToBottom}
      >
        <Menu isSelected={isSelected} setIsSelected={setIsSelected} />
        {isSelected === null && <Default userData={null} />}
        {isSelected === "personal" && <Personal userData={null} />}
        {isSelected === "mySchool" && <MySchool />}
        {isSelected === "myStudents" && <MyStudent />}
      </motion.div>
    </section>
  );
};

export default Profile;
