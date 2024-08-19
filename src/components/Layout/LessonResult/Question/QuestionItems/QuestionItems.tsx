import m from './QuestionItems.module.scss';

const QuestionItems = ({ index, questionName, correctly, wrong }: any) => {
  return (
    <div className={m.container}>
      <div className={m.left}>
        <label>{index}</label>
        <label>{questionName}</label>
      </div>
      <div className={m.right}>
        <label>{correctly}</label>
        <label>{wrong}</label>
      </div>
    </div>
  )
}

export default QuestionItems;