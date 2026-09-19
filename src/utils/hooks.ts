import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { type AppDispatch } from "../redux/store";
import { type RootState } from "../redux/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
