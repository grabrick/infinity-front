import AnagramFields from "./Fields/AnagramFields/AnagramFields";
import FindPairsFields from "./Fields/FindPairsFields/FindPairsFields";
import GroupSortingFields from "./Fields/GroupSortingFields/GroupSortingFields";
import MatchUpFields from "./Fields/MatchUpFields/MatchUpFields";
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
    case 'group-sorting':
      return (
        <GroupSortingFields 
          selectedLesson={selectedLesson} 
          setIsOpenEditor={setIsOpenEditor} 
        />
      )
    case 'anagram':
      return (
        <AnagramFields
          selectedLesson={selectedLesson} 
          setIsOpenEditor={setIsOpenEditor} 
        />
      )
    case 'match-up':
      return (
        <MatchUpFields 
          selectedLesson={selectedLesson} 
          setIsOpenEditor={setIsOpenEditor} 
        />
      )
    case 'find-pairs':
      return (
        <FindPairsFields 
          selectedLesson={selectedLesson} 
          setIsOpenEditor={setIsOpenEditor} 
        />
      )
    default:
      return
  }
}
export default FieldsModule;