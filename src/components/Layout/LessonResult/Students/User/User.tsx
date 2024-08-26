import m from './User.module.scss';

const User = ({ index, userName, createdAt, correct, incorrect, time }: any) => {
  return (
    <div className={m.container}>
      <div className={m.left}>
        <label>{index}</label>
        <label>{userName}</label>
      </div>
      <div className={m.right}>
        <label>{createdAt}</label>
        <label>{correct}</label>
        <label>{incorrect}</label>
        <label>{time}</label>
      </div>
    </div>
  )
}

export default User;