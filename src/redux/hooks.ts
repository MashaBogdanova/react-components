import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store, {RootState} from "./store";

export type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
