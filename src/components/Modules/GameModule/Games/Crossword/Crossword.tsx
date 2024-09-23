import m from './Crossword.module.scss';

interface Question {
  id: number;
  word: string;
  hint: string;
}

interface CrosswordProps {
  questions: Question[];
  currentTime: any;
  setIsPlayingUser: (props: any) => void;
  isPlayingUser: any;
  setIsEnd: (isEnd: boolean) => void;
}

const Crossword: React.FC<CrosswordProps> = ({
  questions,
  currentTime,
  isPlayingUser,
  setIsPlayingUser,
  setIsEnd,
}) => {
  console.log(questions);
  
  return (
    <div className={m.container}>

    </div>
  )
}

export default Crossword;