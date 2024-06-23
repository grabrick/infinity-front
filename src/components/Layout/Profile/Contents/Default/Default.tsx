import m from './Default.module.scss';

const Default = ({ userData }: any) => {
  return (
    <div className={m.content}>
      <h1 className={m.title}>Приветствую вас Алексей</h1>
      <span className={m.desc}>В этом разделе вы можете узнать всю нужную информацию для вас и ваших учеников</span>
    </div>
  )
}

export default Default;