export type Point = {
  x: number;
  y: number;
  pressure?: number;
};

export type Stroke = {
  points: Point[];
  id: string;
};
export type BoardState = {
  present: Stroke[];
  future: Stroke[][];
  past: Stroke[][];
};
