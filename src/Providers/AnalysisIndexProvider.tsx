import { Dispatch, createContext, useReducer } from 'react';

interface IAnalysisIndexAction {
  type: 'previous' | 'next' | 'set';
  index?: number;
}

interface IAnalysisIndexProviderProps {
  children: React.ReactNode;
}

export const AnalysisIndexContext = createContext(0);
export const AnalysisIndexDispatchContext = createContext<Dispatch<IAnalysisIndexAction> | null>(null);

function analysisIndexTasksReducer(analysisIndex: number, analysisIndexAction: IAnalysisIndexAction) {
  const {
    type,
    index = 0
  } = analysisIndexAction;
  switch (type) {
    case 'previous': { return analysisIndex-1; }
    case 'next': { return analysisIndex+1 }
    case 'set': { return index; }
    default: { return analysisIndex; }
  }
}

export function AnalysisIndexProvider(analysisIndexProviderProps: IAnalysisIndexProviderProps) {
  const { children } = analysisIndexProviderProps;
  const [ analysisIndex, dispatch ] = useReducer(analysisIndexTasksReducer, 0);

  return(
    <AnalysisIndexContext.Provider value={ analysisIndex }>
      <AnalysisIndexDispatchContext.Provider value={ dispatch }>
        { children }
      </AnalysisIndexDispatchContext.Provider>
    </AnalysisIndexContext.Provider>
  );
}

export default AnalysisIndexProvider;
