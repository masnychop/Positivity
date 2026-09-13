const T = 0.01;

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
  p0: number[],
  p1: number[],
  p2: number[],
  p3: number[],
) => {
  return [
    [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], // C1 for cubic Bezier
    [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6], // C2 for cubic Bezier
  ];
};

/**
 *
 * @param points array of point coordinates
 * @returns svg path as a string for rendering text
 */
export const getSvgPath = (points: number[][]) => {
  if (!points || points.length < 2) return "";

  const resultArray = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const pointsForBezier = [p1, ...getControlPoints(p0, p1, p2, p3), p2];

    for (let t = 0; t <= 1; t += T) {
      const calculatedPoint = calculateBezier(pointsForBezier, t);
      resultArray.push(calculatedPoint);
    }
  }

  resultArray.push(points[points.length - 1]);
  const svgString = resultArray.reduce((acc, point, index) => {
    if (index === 0) {
      return `M ${point[0]} ${point[1]}`;
    }

    return `${acc} L ${point[0]} ${point[1]}`;
  }, "");

  return `${svgString} Z`;
};

/**
 * This function calculates Bezier polynomial for t in range of 0 to 1
 *
 * @param points array of points
 * @param t time parameter
 */
export const calculateBezier = (points: number[][], t: number) => {
  const b0 = Math.pow(1 - t, 3);
  const b1 = 3 * Math.pow(1 - t, 2) * t;
  const b2 = 3 * (1 - t) * Math.pow(t, 2);
  const b3 = Math.pow(t, 3);

  return [
    b0 * points[0][0] +
      b1 * points[1][0] +
      b2 * points[2][0] +
      b3 * points[3][0],
    b0 * points[0][1] +
      b1 * points[1][1] +
      b2 * points[2][1] +
      b3 * points[3][1],
  ];
};
