import { useSettings } from "@/hooks/useSettings/useSettings";
import Quiz from "./Games/Quiz/Quiz";
import Spinner from "./Games/WheelOfFortune/WheelOfFortune";
import dynamic from 'next/dynamic';
import GroupSorting from "./Games/GroupSorting/GroupSorting";
import Anagram from "./Games/Anagram/Anagram";
import MatchUp from "./Games/MatchUp/MatchUp";
import FindPairs from "./Games/FindPairs/FindPairs";
import FlipTiles from "./Games/FlipTiles/FlipTiles";
import Crossword from "./Games/Crossword/Crossword";
import Unjumble from "./Games/Unjumble/Unjumble";

const WheelOfFortuneComponent = dynamic(() => import('./Games/WheelOfFortune/WheelOfFortune'), { ssr: false });
const CrosswordComponent = dynamic(() => import('./Games/Crossword/Crossword'), { ssr: false });
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
          currentTime={actions.currentTime}
          setIsPlayingUser={actions.setIsPlayingUser}
        />
      )
    case "group-sorting":
      return (
        <GroupSorting
          questions={lessonSlug.questions}
          setIsEnd={actions.setIsEnd}
          currentTime={actions.currentTime}
          setIsPlayingUser={actions.setIsPlayingUser}
          isPlayingUser={actions.isPlayingUser}
        />
      )
    case 'anagram':
      return (
        <Anagram
          questions={lessonSlug.questions}
          setIsEnd={actions.setIsEnd}
          currentTime={actions.currentTime}
          setIsPlayingUser={actions.setIsPlayingUser}
          isPlayingUser={actions.isPlayingUser}
        />
      )
    case 'match-up':
      return (
        <MatchUp
          questions={lessonSlug.questions}
          setIsEnd={actions.setIsEnd}
          currentTime={actions.currentTime}
          setIsPlayingUser={actions.setIsPlayingUser}
          isPlayingUser={actions.isPlayingUser}
        />
      )
    case 'find-pairs':
      return (
        <FindPairs
          questions={lessonSlug.questions}
          setIsEnd={actions.setIsEnd}
          currentTime={actions.currentTime}
          setIsPlayingUser={actions.setIsPlayingUser}
          isPlayingUser={actions.isPlayingUser}
        />
      )
    case 'flip-tiles':
      return (
        <FlipTiles 
          questions={lessonSlug.questions}
          setIsEnd={actions.setIsEnd}
          currentTime={actions.currentTime}
          setIsPlayingUser={actions.setIsPlayingUser}
          isPlayingUser={actions.isPlayingUser}
        />
      )
    case 'crossword':
      return (
        <CrosswordComponent
          questions={lessonSlug.questions}
          setIsEnd={actions.setIsEnd}
          currentTime={actions.currentTime}
          setIsPlayingUser={actions.setIsPlayingUser}
          isPlayingUser={actions.isPlayingUser}
        />
      )
    case 'unjumble':
      return (
        <Unjumble
          questions={lessonSlug.questions}
          setIsEnd={actions.setIsEnd}
          currentTime={actions.currentTime}
          setIsPlayingUser={actions.setIsPlayingUser}
          isPlayingUser={actions.isPlayingUser}
        />
      )
    default:
      return null;
  }
};

export default GameModule;
