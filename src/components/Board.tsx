import { useState } from "react";
import getStroke from "perfect-freehand";
import { getSvgPath } from "../utils/bezier";
import { useSelector } from "react-redux";
import { type RootState } from "../redux/store";
import { v4 as uuidv4 } from "uuid";
import type { Point, Stroke } from "../models/Board";

const Board = () => {
  const boardState = useSelector((state: RootState) => state.board);
  const [currentStroke, setCurrentStroke] = useState<Stroke>({
    points: [],
    id: uuidv4(),
  });

  const getDefaultStroke = (): Stroke => {
    return {
      points: [],
      id: uuidv4(),
    };
  };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const boundingRectangle = target.getBoundingClientRect();

    const xCoordinate = e.clientX - boundingRectangle.x;
    const yCoordinate = e.clientY - boundingRectangle.y;

    setCurrentStroke((prev) => ({
      ...prev,
      points: [
        {
          x: xCoordinate,
          y: yCoordinate,
          pressure: e.pressure,
        },
      ],
    }));
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.buttons !== 1) return;

    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const boundingRectangle = target.getBoundingClientRect();

    const xCoordinate = e.clientX - boundingRectangle.x;
    const yCoordinate = e.clientY - boundingRectangle.y;

    setCurrentStroke((prev) => ({
      ...prev,
      points: [
        ...prev.points,
        {
          x: xCoordinate,
          y: yCoordinate,
          pressure: e.pressure,
        },
      ],
    }));
  };

  const stroke = getStroke(currentStroke.points, {
    size: 16,
    thinning: 0.75,
    smoothing: 0.5,
    streamline: 0.5,
  });

  const convertedPoints: Point[] = stroke.map((pArr: number[]) => ({
    x: pArr[0],
    y: pArr[1],
    pressure: pArr[2],
  }));

  const svgPath = getSvgPath(convertedPoints);

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
