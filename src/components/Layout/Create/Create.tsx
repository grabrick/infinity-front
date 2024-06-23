import Crumbs from '@/components/UI/Crumbs/Crumbs';
import m from './Create.module.scss';
import Template from './Template/Template';

import Quize from '@/assets/images/quiz.png';

const Create = () => {
  return (
    <section className={m.container}>
      <Crumbs
        firstPage={"/"}
        secondPage={"/create"}
        secondPageTitle={"Создать урок"}
      />

      <div className={m.content}>
        <div className={m.titleWrapper}>
          <h1 className={m.title}>Выберите подходящий шаблон</h1>
          <h1 className={m.desc}>Доступно более 20 шаблонов под ваши задачи</h1>
        </div>

        <div className={m.template}>
          {Array.from({ length: 15 }, (_, i) => (
            <Template key={i} title={"Quiz"} image={Quize} desc={"Серия вопросов с несколькими вариантами ответов."} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Create;