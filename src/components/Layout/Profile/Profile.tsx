import Crumbs from '@/components/UI/Crumbs/Crumbs';
import m from './Profile.module.scss';
import { useState } from 'react';
import Menu from './Menu/Menu';
import Default from './Contents/Default/Default';
import Personal from './Contents/Personal/Personal';
import MySchool from './Contents/MySchool/MySchool';
import MyStudent from './Contents/MyStudent/MyStudent';

const Profile = () => {
  const [isSelected, setIsSelected] = useState(null);
  return (
    <section className={m.container}>
      <Crumbs
        firstPage={"/"}
        secondPage={"/profile"}
        secondPageTitle={"Профиль"}
      />

      <div className={m.content}>
        <Menu isSelected={isSelected} setIsSelected={setIsSelected} />
        {isSelected === null && <Default userData={null} />}
        {isSelected === "personal" && <Personal userData={null} />}
        {isSelected === "mySchool" && <MySchool />}
        {isSelected === "myStudents" && <MyStudent />}
      </div>
    </section>
  )
}

export default Profile;