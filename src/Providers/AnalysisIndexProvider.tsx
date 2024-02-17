import { Dispatch, createContext, useReducer } from 'react';

import useContextWithNullCheck from '../Hooks/useContextWithNullCheck';

interface IAnalysisIndexAction {
  type: 'previous' | 'next' | 'set';
  index?: number;
}

interface IAnalysisIndexProviderProps {
  children: React.ReactNode;
}

const AnalysisIndexContext = createContext<number | null>(null);
const AnalysisIndexDispatchContext = createContext<Dispatch<IAnalysisIndexAction> | null>(null);

export function useAnalysisIndexContext(): number {
  return useContextWithNullCheck<number>(AnalysisIndexContext);
}
export function useAnalysisIndexDispatchContext(): Dispatch<IAnalysisIndexAction> {
  return useContextWithNullCheck<Dispatch<IAnalysisIndexAction>>(AnalysisIndexDispatchContext);
}

function analysisIndexTasksReducer(analysisIndex: number, analysisIndexAction: IAnalysisIndexAction) {
  const {
    type,
    index = 0
  } = analysisIndexAction;
  switch (type) {
    case 'previous': { return analysisIndex-1; }
    case 'next': { return analysisIndex+1; }
    case 'set': { return index; }
    default: { return analysisIndex; }
  }
}

const initialAnalysisIndex = 0;

export function AnalysisIndexProvider(analysisIndexProviderProps: IAnalysisIndexProviderProps) {
  const { children } = analysisIndexProviderProps;
  const [ analysisIndex, dispatch ] = useReducer(analysisIndexTasksReducer, initialAnalysisIndex);

  return(
    <AnalysisIndexContext.Provider value={ analysisIndex }>
      <AnalysisIndexDispatchContext.Provider value={ dispatch }>
        { children }
      </AnalysisIndexDispatchContext.Provider>
    </AnalysisIndexContext.Provider>
  );
}

export default AnalysisIndexProvider;
