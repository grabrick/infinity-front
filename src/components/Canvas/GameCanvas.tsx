import { useEffect, useRef, useState } from "react";
import { handleQuizClick, renderQuizGame } from "./games/quiz";

const GameCanvas = ({ gameType, gameData }: any) => {
  const canvasRef = useRef<HTMLCanvasElement | any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const handleClick = (event: MouseEvent) => {
      if (isLessonCompleted) return;

      if (gameType === "quiz") {
        handleQuizClick(
          event,
          ctx,
          canvas,
          gameData,
          currentQuestionIndex,
          setCurrentQuestionIndex,
          setIsLessonCompleted,
          canvasRef
        );
      }
      // Добавляйте другие типы игр по мере необходимости
    };

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isLessonCompleted) {
        renderLessonCompleted(ctx);
      } else {
        if (gameType === "quiz") {
          renderQuizGame(ctx, gameData[currentQuestionIndex], canvas);
        }
        // Добавляйте другие типы игр по мере необходимости
      }
    };

    resizeCanvas();

    canvas.addEventListener("click", handleClick);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("click", handleClick);
    };
  }, [gameType, gameData, currentQuestionIndex, isLessonCompleted]);

  const renderLessonCompleted = (ctx: CanvasRenderingContext2D) => {
    ctx.font = "30px Arial";
    ctx.fillStyle = "green";
    ctx.textAlign = "center";
    ctx.fillText("Урок пройден", canvasRef.current.width / 2, canvasRef.current.height / 2);
  };

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default GameCanvas;
