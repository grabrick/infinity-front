import AnagramSettings from "./Settings/AnagramSettings/AnagramSettings";
import FindPairsSettings from "./Settings/FindPairsSettings/FindPairsSettings";
import FlipTilesSettings from "./Settings/FlipTilesSettings/FlipTilesSettings";
import GroupSortingSettings from "./Settings/GroupSortingSettings/GroupSortingSettings";
import MatchUpSettings from "./Settings/MatchUpSettings/MatchUpSettings";
import QuizSettings from "./Settings/QuizSettings/QuizSettings";
import WheelOfFortuneSettings from "./Settings/WheelOfFortuneSettings/WheelOfFortuneSettings";

const SettingsModule = ({ template, lessonSlug, userData }: any) => {
  switch (template) {
    case "quiz":
      return (
        <QuizSettings
          lessonSlug={lessonSlug}
          userData={userData}
        />
      )
    case "spinner":
      return (
        <WheelOfFortuneSettings 
          lessonSlug={lessonSlug}
          userData={userData}
        />
      )
    case 'group-sorting':
      return (
        <GroupSortingSettings 
          lessonSlug={lessonSlug}
          userData={userData}
        />
      )
    case 'anagram':
      return (
        <AnagramSettings
          lessonSlug={lessonSlug}
          userData={userData}
        />
      )
    case 'match-up':
      return (
        <MatchUpSettings 
          lessonSlug={lessonSlug}
          userData={userData}
        />
      )
    case 'find-pairs': 
      return (
        <FindPairsSettings
          lessonSlug={lessonSlug}
          userData={userData}
        />
      )
    case 'flip-tiles':
      return (
        <FlipTilesSettings
          lessonSlug={lessonSlug}
          userData={userData}
        />
      )
    default:
      break;
  }
}

export default SettingsModule;