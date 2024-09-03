const useSettings = (lessonSettings: any) => {
  const timer = {
    selectedMode:
      lessonSettings?.timer !== null &&
      lessonSettings?.timer?.selected.find((mode: any) => mode?.selected),
    initialTime:
      lessonSettings?.timer !== null &&
      lessonSettings?.timer.time.minutes * 60 +
        lessonSettings?.timer.time.seconds,
  };
  const sounds = {
    backgroundMusic: lessonSettings?.soundboard?.music,
    interactiveSounds: lessonSettings?.soundboard?.sounds,
  };
  const getLives = lessonSettings?.limitOnLives?.lives;
  const labeling = lessonSettings?.labeling;
  const shuffling = lessonSettings?.shuffling.filter(
    (items: any) => items.selected === true
  );
  const symbol = lessonSettings?.symbol.find(
    (items: any) => items.selected === true
  );
  const access = lessonSettings?.access.find(
    (items: any) => items.selected === true
  );
  const endGame = lessonSettings?.endGame;
  const privacy = lessonSettings?.privacy?.find(
    (items: any) => items?.selected === true
  );

  return {
    timer,
    sounds,
    getLives,
    labeling,
    shuffling,
    symbol,
    access,
    endGame,
    privacy,
  };
};
export { useSettings };
