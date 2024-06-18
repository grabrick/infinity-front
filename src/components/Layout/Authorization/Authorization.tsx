import AuthModal from './AuthModal/AuthModal';
import m from './Authorization.module.scss';

const Authorization = () => {
  return (
    <section className={m.container}>
      <div className={m.textWrapper}>
        <h1 className={m.title}>Простой способ создания собственных учебных ресурсов.</h1>
        <span>Создавайте индивидуальные занятия для своего класса.</span>
        <span>Викторины, сопоставления, игры со словами и многое другое.</span>
      </div>
      <AuthModal title={"Регистрация"} />
    </section>
  )
}

export default Authorization