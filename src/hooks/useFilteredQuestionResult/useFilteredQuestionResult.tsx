import { useState } from "react";

const useFilteredQuestionResult = (sharedLesson: any) => {
  const [isChoice, setIsChoice] = useState<null | string>(null);
  const [searchField, setSearchField] = useState("");

  const filteredQuestion = sharedLesson.questions
    .filter((items: any) =>
      items?.name?.toLowerCase().includes(searchField.toLowerCase())
    )
    .sort((a: any, b: any) => {
      if (isChoice === null) return 0;
      switch (isChoice) {
        case "Правильно":
          return b.correct - a.correct; 
        case "Неправильно":
          return b.incorrect - a.incorrect; 
        default:
          return 0;
      }
    });

  const handleChoice = (type: string) => {
    setIsChoice(type);
  };
  return { filteredQuestion, isChoice, handleChoice, setSearchField, searchField };
};

export default useFilteredQuestionResult;
