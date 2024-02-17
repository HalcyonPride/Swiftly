import { Dispatch, createContext, useReducer } from 'react';

import { getTextAnalyses } from '../DataSources/TextAnalysisDataSource';
import useContextWithNullCheck from '../Hooks/useContextWithNullCheck';
import { ITextAnalysisJson } from '../Interfaces/ITextAnalysis';
import { deepCopyWithTagAdd, deepCopyWithTagEdit } from '../Utilities/deepCopyHelpers';

interface ITextAnalysisJsonAction {
  type: 'reject' | 'add' | 'edit';
  analysisIndex: number;
  tagIndex?: number;
  title?: string;
}

interface ITextAnalysisJsonProviderProps {
  children: React.ReactNode;
}

const TextAnalysisJsonContext = createContext<ITextAnalysisJson | null>(null);
const TextAnalysisJsonDispatchContext = createContext<Dispatch<ITextAnalysisJsonAction> | null>(null);

export function useTextAnalysisJsonContext(): ITextAnalysisJson {
  return useContextWithNullCheck<ITextAnalysisJson>(TextAnalysisJsonContext);
}
export function useTextAnalysisJsonDispatchContext(): Dispatch<ITextAnalysisJsonAction> {
  return useContextWithNullCheck<Dispatch<ITextAnalysisJsonAction>>(TextAnalysisJsonDispatchContext);
}

function textAnalysisJsonTasksReducer(textAnalysisJson: ITextAnalysisJson, textAnalysisJsonAction: ITextAnalysisJsonAction) {
  const {
    type,
    analysisIndex,
    tagIndex,
    title = ''
  } = textAnalysisJsonAction;
  switch (type) {
    case 'reject': { // user rejects previously added tag
      const tag = textAnalysisJson.analyses[analysisIndex].tags[tagIndex!];
      const { rejected } = tag;
      return deepCopyWithTagEdit(
        textAnalysisJson,
        analysisIndex,
        tagIndex!,
        {
          ...tag,
          rejected: !rejected
        }
      );
    }
    case 'add': { // user adds empty tag
      return deepCopyWithTagAdd(textAnalysisJson, analysisIndex);
    }
    case 'edit': { // user edits newly added tag
      const tag = textAnalysisJson.analyses[analysisIndex].tags[tagIndex!];
      return deepCopyWithTagEdit(
        textAnalysisJson,
        analysisIndex,
        tagIndex!,
        {
          ...tag,
          title
        }
      );
    }
    default: { throw Error(`Invalid textAnalysisJsonTask: ${type}`); }
  }
}

const initialTextAnalysisJson = getTextAnalyses();

export function TextAnalysisJsonProvider(textAnalysisJsonProviderProps: ITextAnalysisJsonProviderProps) {
  const { children } = textAnalysisJsonProviderProps;
  const [ textAnalysisJson, dispatch ] = useReducer(textAnalysisJsonTasksReducer, initialTextAnalysisJson);

  return(
    <TextAnalysisJsonContext.Provider value={ textAnalysisJson }>
      <TextAnalysisJsonDispatchContext.Provider value={ dispatch }>
        { children }
      </TextAnalysisJsonDispatchContext.Provider>
    </TextAnalysisJsonContext.Provider>
  );
}

export default TextAnalysisJsonProvider;
