import { useState } from "react";

const useFilteredUserResult = (users: any) => {
  const [isChoice, setIsChoice] = useState<null | string>(null);
  const [searchField, setSearchField] = useState("");

  const convertTimeToSeconds = (time: string) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const filteredUsers = users
    .filter((user: any) =>
      user.userName.toLowerCase().includes(searchField.toLowerCase())
    )
    .sort((a: any, b: any) => {
      if (isChoice === null) return 0;
      switch (isChoice) {
        case "Правильно":
          return b.correct - a.correct; 
        case "Неправильно":
          return b.incorrect - a.incorrect; 
        case "Время":
          const timeA = convertTimeToSeconds(a.currentTime);
          const timeB = convertTimeToSeconds(b.currentTime);
          return timeA - timeB;
        default:
          return 0;
      }
    });

  const handleChoice = (type: string) => {
    setIsChoice(type);
  };
  return { filteredUsers, isChoice, handleChoice, setSearchField, searchField };
};

export default useFilteredUserResult;
