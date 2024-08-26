const handleQuizClick = (
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  gameData: any,
  currentQuestionIndex: number,
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>,
  setIsLessonCompleted: React.Dispatch<React.SetStateAction<boolean>>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  setFeedback: React.Dispatch<React.SetStateAction<Record<number, boolean | null>>>,
  isAnswered: boolean,
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>,
  feedback: any
) => {
  if (isAnswered) return; // Если уже был сделан выбор, игнорируем дальнейшие клики

  const questionData = gameData[currentQuestionIndex];
  if (!questionData) return;

  questionData.fields.forEach((field: any, index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    const squareSize = 100;
    const gap = 20;
    const totalWidth = 3 * squareSize + 2 * gap;
    const xPosition = (canvas.width - totalWidth) / 2 + col * (squareSize + gap);
    const yPosition = 150 + row * (squareSize + gap);

    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;

    if (
      x > xPosition &&
      x < xPosition + squareSize &&
      y > yPosition &&
      y < yPosition + squareSize
    ) {
      setIsAnswered(true); // Устанавливаем, что был сделан выбор
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        [index]: field.isCorrect,
      }));

      // Перерисовываем только тот квадрат, который был нажат
      renderQuizSquare(ctx, field, xPosition, yPosition, squareSize, feedback[index]);

      if (currentQuestionIndex < gameData.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setFeedback({});
          setIsAnswered(false); // Сбрасываем состояние для следующего вопроса
        }, 1000);
      } else {
        setTimeout(() => {
          setIsLessonCompleted(true);
          canvas.removeEventListener("click", (e) => handleQuizClick(
            e, ctx, canvas, gameData, currentQuestionIndex, setCurrentQuestionIndex, setIsLessonCompleted, canvasRef, setFeedback, isAnswered, setIsAnswered, feedback
          ));
        }, 1000);
      }
    }
  });
};

const renderQuizSquare = (
  ctx: CanvasRenderingContext2D,
  field: any,
  xPosition: number,
  yPosition: number,
  squareSize: number,
  feedback: boolean | null
) => {
  // Отрисовка квадрата
  ctx.fillStyle = "#ddd";
  ctx.fillRect(xPosition, yPosition, squareSize, squareSize);

  // Отрисовка текста внутри квадрата
  ctx.font = "20px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.fillText(
    `${field.symbol}. ${field.answer || "Ответ отсутствует"}`,
    xPosition + squareSize / 2,
    yPosition + squareSize / 3
  );

  // Отображаем галочку или крестик внутри квадрата, если был клик
  if (feedback !== undefined) {
    ctx.font = "40px Arial";
    ctx.fillStyle = feedback ? "green" : "red";
    ctx.textAlign = "center";
    ctx.fillText(
      feedback ? "✔" : "✖",
      xPosition + squareSize / 2,
      yPosition + squareSize * 0.7
    );
  }
};

const renderQuizGame = (
  ctx: CanvasRenderingContext2D,
  questionData: any,
  canvas: HTMLCanvasElement,
  feedback: Record<number, boolean | null>
) => {
  if (!questionData) return;

  ctx.font = "20px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";

  // Отрисовка текста вопроса
  ctx.fillText(questionData.name || "Вопрос отсутствует", canvas.width / 2, 50);

  questionData.fields.forEach((field: any, index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    const squareSize = 100;
    const gap = 40;
    const totalWidth = 3 * squareSize + 2 * gap;
    const xPosition = (canvas.width - totalWidth) / 2 + col * (squareSize + gap);
    const yPosition = 150 + row * (squareSize + gap);

    renderQuizSquare(ctx, field, xPosition, yPosition, squareSize, feedback[index]);
  });
};

export { handleQuizClick, renderQuizGame };
