import type { Point } from "../models/Board";
import { BEZIER_RATE } from "./constants";
import { type Stroke } from "../models/Board";

/**
 * This function returns two control points between p1 and p2
 * based on their neighbours p0 and p3
 *
 * @param p0 first point
 * @param p1 second point
 * @param p2 third point
 * @param p3 fourth point
 * @returns array containing two control points C1 and C2
 */
export const getControlPoints = (
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
): Point[] => {
  return [
    { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 }, // C1 for cubic Bezier
    { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 }, // C2 for cubic Bezier
  ];
};

/**
 *
 * @param points array of point coordinates
 * @returns svg path as a string for rendering text
 */
export const getSvgPath = (points: Point[]) => {
  if (!points || points.length < 2) return "";

  const resultArray: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const pointsForBezier = [p1, ...getControlPoints(p0, p1, p2, p3), p2];

    for (let t = 0; t <= 1; t += BEZIER_RATE) {
      const calculatedPoint = calculateBezier(pointsForBezier, t);
      resultArray.push(calculatedPoint);
    }
  }

  resultArray.push(points[points.length - 1]);
  const svgString = resultArray.reduce((acc, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    return `${acc} L ${point.x} ${point.y}`;
  }, "");

  return `${svgString} Z`;
};

/**
 * This function calculates Bezier polynomial for t in range of 0 to 1
 *
 * @param points array of points
 * @param t time parameter
 */
export const calculateBezier = (points: Point[], t: number): Point => {
  const b0 = Math.pow(1 - t, 3);
  const b1 = 3 * Math.pow(1 - t, 2) * t;
  const b2 = 3 * (1 - t) * Math.pow(t, 2);
  const b3 = Math.pow(t, 3);

  return {
    x:
      b0 * points[0].x + b1 * points[1].x + b2 * points[2].x + b3 * points[3].x,
    y:
      b0 * points[0].y + b1 * points[1].y + b2 * points[2].y + b3 * points[3].y,
  };
};
