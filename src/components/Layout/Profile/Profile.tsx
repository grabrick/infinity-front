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
import { useAppSelector } from "@/redux/hook/redux.hook";
import { usePersonal } from "./Contents/Personal/usePersonal";

const Profile = () => {
  const [isSelected, setIsSelected] = useState(null);
  const userData = useAppSelector((state) => state.userSlice.userData);
  const { handleOnSubmit } = usePersonal()

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
        <Menu isSelected={isSelected} userData={userData} setIsSelected={setIsSelected} />
        
        <>
          {isSelected === null && <Default userData={userData} />}
          {isSelected === "personal" && <Personal userData={userData} handleOnSubmit={handleOnSubmit} />}
          {isSelected === "mySchool" && <MySchool />}
          {isSelected === "myStudents" && <MyStudent />}
        </>
      </motion.div>
    </section>
  );
};

export default Profile;
