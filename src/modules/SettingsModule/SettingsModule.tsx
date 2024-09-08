import QuizSettings from "./Settings/QuizSettings/QuizSettings";

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
      return

    default:
      break;
  }
}

export default SettingsModule;