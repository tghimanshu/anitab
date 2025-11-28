import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";

/**
 * A typed version of the `useDispatch` hook.
 *
 * Use this hook throughout the application instead of plain `useDispatch`
 * to ensure actions are correctly typed against the `AppDispatch` type.
 *
 * @returns {AppDispatch} The Redux dispatch function.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * A typed version of the `useSelector` hook.
 *
 * Use this hook throughout the application instead of plain `useSelector`
 * to ensure the state is correctly typed against the `RootState` type.
 *
 * @type {TypedUseSelectorHook<RootState>}
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
