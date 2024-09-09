import Konva from "konva";
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Wedge, Text, Group, Arrow } from "react-konva";
import m from "./WheelOfFortune.module.scss";

const WheelOfFortune = ({ questions, setIsEnd }: any) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [segmentColors, setSegmentColors] = useState<string[]>([]);
  const [segment, setSegment] = useState(questions);
  const [prize, setPrize] = useState<string | null>(null);
  const [winningIndex, setWinningIndex] = useState<number | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const wheelRef = useRef<Konva.Group>(null);
  const arrowRef = useRef<Konva.Arrow>(null);

  const centerX = 200;
  const centerY = 170;
  const radius = 150;
  const segmentAngle = 360 / segment.length;

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (wheelRef.current && arrowRef.current) {
      wheelRef.current.zIndex(1);
      arrowRef.current.zIndex(2);
    }

    const colors = segment.map(() => getRandomColor());
    setSegmentColors(colors);
  }, [segment]);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setPrize(null);
    setAction(null);

    const spinDuration = 5000;
    const spinRotation = 360 * 5 + Math.random() * 360;

    const anim = new Konva.Animation((frame) => {
      if (!frame) return;
      const progress = Math.min(frame.time / spinDuration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentRotation = rotation + spinRotation * easedProgress;
      setRotation(currentRotation % 360);

      if (progress >= 1) {
        anim.stop();
        setIsSpinning(false);
        const winningIndex = getWinningIndex(currentRotation);
        setWinningIndex(winningIndex);
        setPrize(segment[winningIndex].segment);
      }
    }, wheelRef.current!.getLayer());

    anim.start();
  };

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const getWinningIndex = (currentRotation: number): number => {
    const adjustedRotation = (currentRotation + 180) % 360;
    const invertedRotation = (360 - adjustedRotation) % 360;
    return Math.floor(invertedRotation / segmentAngle);
  };

  const getTextProps = (index: number) => {
    const angle = segmentAngle * index + segmentAngle / 2;
    const angleRad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(angleRad) * radius * 0.75,
      y: Math.sin(angleRad) * radius * 0.75,
      rotation: angle + 180,
    };
  };

  const handleAction = (actionType: string) => {
    if (winningIndex !== null) {
      if (actionType === "remove") {
        const updatedSegment = segment.filter(
          (_: any, index: any) => index !== winningIndex
        );
        setSegment(updatedSegment);
        if (updatedSegment.length === 0) {
          setIsEnd(true);
        }
      }
      setAction(actionType);
    }
  };
  
  return (
    <div className={m.container}>
      {prize && <p className={m.prizeTitle}>Вы выиграли: {prize}!</p>}
      <Stage width={400} height={340}>
        <Layer>
          <Group ref={wheelRef} x={centerX} y={centerY} rotation={rotation}>
            {segment.map((segment: any, index: any) => {
              const textProps = getTextProps(index);
              return (
                <React.Fragment key={index}>
                  <Wedge
                    angle={segmentAngle}
                    radius={radius}
                    fill={segmentColors[index]}
                    rotation={segmentAngle * index}
                  />
                  <Text
                    text={segment.segment}
                    fontSize={18}
                    fontStyle="600"
                    fill="white"
                    align="center"
                    verticalAlign="middle"
                    width={radius}
                    {...textProps}
                    offsetX={radius / 2}
                    offsetY={8}
                  />
                </React.Fragment>
              );
            })}
          </Group>
          <Arrow
            ref={arrowRef}
            points={[
              centerX - radius - 20,
              centerY,
              centerX - radius + 10,
              centerY,
            ]}
            pointerLength={10}
            pointerWidth={10}
            fill="#d8e9fe"
            stroke="#d8e9fe"
            strokeWidth={3}
            x={-20}
          />
        </Layer>
      </Stage>

      {!prize && (
        <div className={m.wrapper}>
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={m.button}
          >
            {isSpinning ? "Вращается..." : "Крутить колесо"}
          </button>
        </div>
      )}
      {prize && (
        <div>
          {!action && (
            <div className={m.wrapper}>
              {segment.length !== 1 && (
                <button onClick={() => handleAction("keep")} className={m.button}>
                  Оставить сегмент
                </button>
              )}
              <button
                onClick={() => handleAction("remove")}
                className={m.button}
              >
                Удалить сегмент
              </button>
            </div>
          )}
          {action && (
            <div className={m.wrapper}>
              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className={m.button}
              >
                {isSpinning ? "Вращается..." : "Крутить колесо"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WheelOfFortune;
