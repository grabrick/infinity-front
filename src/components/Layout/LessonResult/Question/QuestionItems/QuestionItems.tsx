import m from './QuestionItems.module.scss';

const QuestionItems = ({ index, questionName, correct, incorrect }: any) => {
  return (
    <div className={m.container}>
      <div className={m.left}>
        <label>{index}</label>
        <label>{questionName}</label>
      </div>
      <div className={m.right}>
        <label>{correct}</label>
        <label>{incorrect}</label>
      </div>
    </div>
  )
}

export default QuestionItems;