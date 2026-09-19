import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SLICES } from "../utils/constants";
import type { Stroke } from "../models/Board";
import type { BoardState } from "../models/Board";

const initialState: BoardState = {
  past: [],
  present: [],
  future: [],
};

export const boardSlice = createSlice({
  name: SLICES.BOARD_SLICE,
  initialState,
  reducers: {
    draw: (state: BoardState, action: PayloadAction<Stroke>) => {},
    undo: (state: BoardState) => {},
    redo: (state: BoardState) => {},
  },
});

export const { draw, undo, redo } = boardSlice.actions;
export default boardSlice.reducer;
