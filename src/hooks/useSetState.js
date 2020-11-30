/* eslint-disable import/prefer-default-export */
import { useReducer } from 'react';

const mergeReducer = (currentState, newProperties) => ({ ...currentState, ...newProperties });

export const useSetState = (initialState = {}) => useReducer(mergeReducer, initialState);
