import m from './User.module.scss';

const User = ({ index, userName, sendTime, correctly, wrong, time }: any) => {
  return (
    <div className={m.container}>
      <div className={m.left}>
        <label>{index}</label>
        <label>{userName}</label>
      </div>
      <div className={m.right}>
        <label>{sendTime}</label>
        <label>{correctly}</label>
        <label>{wrong}</label>
        <label>{time}</label>
      </div>
    </div>
  )
}

export default User;