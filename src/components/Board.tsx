import { useState } from "react";
import getStroke from "perfect-freehand";
import { getSvgPath } from "../utils/bezier";

const Board = () => {
  const [points, setPoints] = useState<number[][]>([]);

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const boundingRectangle = target.getBoundingClientRect();

    const xCoordinate = e.clientX - boundingRectangle.x;
    const yCoordinate = e.clientY - boundingRectangle.y;
    
    setPoints([[xCoordinate, yCoordinate, e.pressure]]);
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.buttons !== 1) return;

    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const boundingRectangle = target.getBoundingClientRect();

    const xCoordinate = e.clientX - boundingRectangle.x;
    const yCoordinate = e.clientY - boundingRectangle.y;

    setPoints((prev) => [...prev, [xCoordinate, yCoordinate, e.pressure]]);
  };

  const stroke = getStroke(points, {
    size: 16,
    thinning: 0.75,
    smoothing: 0.5,
    streamline: 0.5,
  });

  const svgPath = getSvgPath(stroke);

  return (
    <div className="grow flex justify-center items-center bg-amber-200">
      <svg
        className="w-1/2 h-1/2 bg-white"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <path d={svgPath} />
      </svg>
    </div>
  );
};

export default Board;
