import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {State, AppDispatch} from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>(); // типизированная версия хука useDispatch

export const useAppSelector: TypedUseSelectorHook<State> = useSelector; // типизированная версия хука useSelector
