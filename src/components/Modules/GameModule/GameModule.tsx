import { useSettings } from "@/hooks/useSettings/useSettings";
import Quiz from "./Games/Quiz/Quiz";
import Spinner from "./Games/WheelOfFortune/WheelOfFortune";
import dynamic from 'next/dynamic';
import GroupSorting from "./Games/GroupSorting/GroupSorting";

const WheelOfFortuneComponent = dynamic(() => import('./Games/WheelOfFortune/WheelOfFortune'), { ssr: false });
const GameModule = ({
  lessonSlug,
  actions,
  gameTemplate,
  soundHandlers,
}: any) => {
  const { timer, sounds, getLives, access, shuffling, labeling, symbol, endGame } = useSettings(lessonSlug.lessonSettings);
  
  switch (gameTemplate) {
    case "quiz":
      return (
        <Quiz
          handleClickCorrect={soundHandlers.handleClickCorrect}
          handleClickIncorrect={soundHandlers.handleClickIncorrect}
          questions={lessonSlug.questions}
          setIsEnd={actions.setIsEnd}
          isEnd={actions.isEnd}
          setIsPlayingUser={actions.setIsPlayingUser}
          isPlayingUser={actions.isPlayingUser}
          currentTime={actions.currentTime}
          setIsLives={actions.setIsLives}
          settings={{
            lives: actions.lives,
            symbol: symbol,
            labeling: labeling,
            shuffling: shuffling,
          }}
        />
      );
    case "spinner":
      return (
        <WheelOfFortuneComponent
          questions={lessonSlug.questions}
          setIsEnd={actions.setIsEnd}
        />
      )
    case "group-sorting":
      return (
        <GroupSorting
          questions={lessonSlug.questions}
          setIsEnd={actions.setIsEnd}
        />
      )
    default:
      return null;
  }
  // return ''
};

export default GameModule;
