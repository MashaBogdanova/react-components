import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../redux/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
