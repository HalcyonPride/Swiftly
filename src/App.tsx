import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './App.css';

import { getTextAnalyses, putTextAnalyses } from './DataSources/TextAnalysisDataSource';
import { ITextAnalysisJson } from './Interfaces/ITextAnalysis';
import MainScreen from './Screens/MainScreen';
import { deepCopyWithTagAdd, deepCopyWithTagEdit } from './Utilities/deepCopyHelpers';

// updates text analysis JSON as the user accepts/rejects/adds tags

export function App() {
  const [ analysisIndex, setAnalysisIndex ] = useState(0);
  const [ textAnalysisJson, setTextAnalysisJson ] = useState<ITextAnalysisJson>({
    analyses: [{
      text: '',
      tags: []
    }]
  });

  const onUnload = useCallback((event: BeforeUnloadEvent) => {
    event.returnValue = ''; // reminder to save before navigating away from web page
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', onUnload);
    }
    return (() => {
      window.removeEventListener('beforeunload', onUnload);
    });
  });

  const rejectTag = useCallback((tagIndex: number) => { // user rejects previously added tag
    const tag = textAnalysisJson.analyses[analysisIndex].tags[tagIndex];
    const { rejected } = tag;
    setTextAnalysisJson(deepCopyWithTagEdit(
      textAnalysisJson,
      analysisIndex,
      tagIndex,
      {
        ...tag,
        rejected: !rejected
      }
    ));
  }, [ analysisIndex, textAnalysisJson ]);

  const addEmptyTag = useCallback(() => { // user adds empty tag
    setTextAnalysisJson(deepCopyWithTagAdd(textAnalysisJson, analysisIndex));
  }, [ analysisIndex, textAnalysisJson ]);

  const editTag = useCallback((tagIndex: number, title: string) => { // user edits newly added tag
    const tag = textAnalysisJson.analyses[analysisIndex].tags[tagIndex];
    setTextAnalysisJson(deepCopyWithTagEdit(
      textAnalysisJson,
      analysisIndex,
      tagIndex,
      {
        ...tag,
        title
      }
    ));
  }, [ analysisIndex, textAnalysisJson ]);

  const previousAnalysis = useCallback(() => {
    setAnalysisIndex(analysisIndex === 0 ? textAnalysisJson.analyses.length-1 : analysisIndex-1);
  }, [ analysisIndex, textAnalysisJson ]);

  const nextAnalysis = useCallback(() => {
    setAnalysisIndex(analysisIndex === textAnalysisJson.analyses.length-1 ? 0 : analysisIndex+1);
  }, [ analysisIndex, textAnalysisJson ]);

  return(
    <main>
      <div className='MainContainer'>
        <div className='Header'>
          <h1>Swiftly</h1>
        </div>
        <MainScreen
          textAnalysisJson={ textAnalysisJson }
          analysisIndex={ analysisIndex }
          rejectTag={ rejectTag }
          addEmptyTag={ addEmptyTag }
          editTag={ editTag }
        />
        <div className='Footer'>
          <button onClick={ () => setTextAnalysisJson(getTextAnalyses()) }>Load/Reset</button>
          <select
            value={ analysisIndex + 1 }
            onChange={ (event: ChangeEvent<HTMLSelectElement>) => setAnalysisIndex(Number(event.target.value) - 1) }
          >
            { [...Array(textAnalysisJson.analyses.length).keys()].map((i: number) => (
              <option
                key={ `select-option-${ i + 1 }` }
                value={ i + 1 }
              >
                { i + 1 }
              </option>
            )) }
          </select>
          <button onClick={ () => previousAnalysis() }>Prev</button>
          <button onClick={ () => nextAnalysis() }>Next</button>
          <button onClick={ () => putTextAnalyses(textAnalysisJson) }>Save</button>
        </div>
      </div>
    </main>
  );
}

export default App;
