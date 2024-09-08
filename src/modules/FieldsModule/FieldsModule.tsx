import QuizFields from "./Fields/QuizFields/QuizFields";
import WheelOfFortuneFields from "./Fields/WheelOfFortuneFields/WheelOfFortuneFields";

const FieldsModule = ({ template, selectedLesson, setIsOpenEditor, isOpenEditor }: any) => {
  switch (template) {
    case 'quiz':
      return (
      <QuizFields 
        selectedLesson={selectedLesson} 
        setIsOpenEditor={setIsOpenEditor} 
      />
    )
    case 'spinner':
      return (
        <WheelOfFortuneFields
          selectedLesson={selectedLesson} 
          setIsOpenEditor={setIsOpenEditor} 
        />
      )
    default:
      return
  }
}
export default FieldsModule;