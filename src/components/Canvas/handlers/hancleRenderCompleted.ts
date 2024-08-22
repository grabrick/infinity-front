const renderLessonCompleted = (ctx: CanvasRenderingContext2D, canvasRef: any) => {
  ctx.font = "30px Arial";
  ctx.fillStyle = "green";
  ctx.textAlign = "center";
  ctx.fillText("Урок пройден", canvasRef.current.width / 2, canvasRef.current.height / 2);
};

export { renderLessonCompleted }