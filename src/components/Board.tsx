import { useState } from "react";
import getStroke from "perfect-freehand";

const Board = () => {
  const [points, setPoints] = useState<number[][]>([]);

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);
    setPoints([[e.pageX, e.pageY, e.pressure]]);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.buttons !== 1) return;
    setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
  };

  const stroke = getStroke(points, {
    size: 16,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  });

  return <></>;
};

export default Board;
