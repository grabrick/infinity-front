export const handleAnswerSelection = (
  selectedIndex: number,
  isCorrect: boolean,
  ctx: CanvasRenderingContext2D,
  canvasRef: any
) => {
  if (isCorrect) {
    ctx.fillStyle = "green";
    ctx.fillText("Правильно!", canvasRef.current.width / 2, 300);
  } else {
    ctx.fillStyle = "red";
    ctx.fillText("Неправильно!", canvasRef.current.width / 2, 300);
  }

  // Восстановление цвета для следующих рендеров
  ctx.fillStyle = "#000";
};
