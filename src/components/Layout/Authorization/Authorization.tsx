import { useState } from 'react';
import AuthModal from './AuthModal/AuthModal';
import m from './Authorization.module.scss';
import { useAuth } from './useAuth';

const Authorization = () => {
  const [isRegister, setIsRegister] = useState(true);
  const { handleOnSubmit } = useAuth()

  return (
    <section className={m.container}>
      <div className={m.textWrapper}>
        <h1 className={m.title}>Простой способ создания собственных учебных ресурсов.</h1>
        <span>Создавайте индивидуальные занятия для своего класса.</span>
        <span>Викторины, сопоставления, игры со словами и многое другое.</span>
      </div>
      <AuthModal setIsRegister={setIsRegister} handleOnSubmit={handleOnSubmit} isRegister={isRegister} title={isRegister ? "Регистрация" : "Авторизация"} />
    </section>
  )
}

export default Authorization