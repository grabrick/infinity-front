import { handleAnswerSelection } from "../handlers/handleAnswerSelection";

const handleQuizClick = (
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  gameData: any,
  currentQuestionIndex: number,
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>,
  setIsLessonCompleted: React.Dispatch<React.SetStateAction<boolean>>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
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
      handleAnswerSelection(index, field.isCorrect, ctx, canvasRef);

      if (currentQuestionIndex < gameData.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }, 1000);
      } else {
        setTimeout(() => {
          setIsLessonCompleted(true);
          canvas.removeEventListener("click", (e) => handleQuizClick(
            e, ctx, canvas, gameData, currentQuestionIndex, setCurrentQuestionIndex, setIsLessonCompleted, canvasRef
          ));
        }, 1000);
      }
    }
  });
};

const renderQuizGame = (
  ctx: CanvasRenderingContext2D,
  questionData: any,
  canvas: HTMLCanvasElement
) => {
  if (!questionData) return;

  ctx.font = "20px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";

  ctx.fillText(questionData.name || "Вопрос отсутствует", canvas.width / 2, 50);

  questionData.fields.forEach((field: any, index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    const squareSize = 100;
    const gap = 20;
    const totalWidth = 3 * squareSize + 2 * gap;
    const xPosition = (canvas.width - totalWidth) / 2 + col * (squareSize + gap);
    const yPosition = 150 + row * (squareSize + gap);

    ctx.fillStyle = "#ddd";
    ctx.fillRect(xPosition, yPosition, squareSize, squareSize);

    ctx.fillStyle = "#000";
    ctx.fillText(
      `${field.symbol}. ${field.answer || "Ответ отсутствует"}`,
      xPosition + squareSize / 2,
      yPosition + squareSize / 2
    );
  });
};

export { handleQuizClick, renderQuizGame }