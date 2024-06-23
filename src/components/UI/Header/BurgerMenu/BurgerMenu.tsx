import Link from 'next/link';
import m from './BurgerMenu.module.scss';
import { useRouter } from 'next/router';

const BurgerMenu = ({ setIsActive }: any) => {
  const { asPath } = useRouter();
  return (
    <div className={m.overlay} onClick={() => setIsActive(false)}>
      <div className={m.modal} onClick={(e) => e.stopPropagation()}>
        <h1 className={m.title}>Infinity</h1>

        <div className={m.routers}>
          <div className={m.routeWrapper}>
          <Link className={asPath === "/" ? m.activeLink : m.link} href="/">Главная</Link>
          <Link className={m.link} href="/create">Создать урок</Link>
          <Link className={m.link} href="/activity">Активность</Link>
          <Link className={m.link} href="/my-results">Мои результаты</Link>
          <Link className={m.link} href="/profile">Профиль</Link>
          </div>
          
          <button className={m.logout}>
            Выход
          </button>
        </div>
      </div>
    </div>
  )
}

export default BurgerMenu;