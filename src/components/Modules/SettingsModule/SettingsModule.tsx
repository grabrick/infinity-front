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
    default:
      break;
  }
}

export default SettingsModule;