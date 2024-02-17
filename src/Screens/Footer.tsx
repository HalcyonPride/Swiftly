import { ChangeEvent } from 'react';
import './Footer.css';

import { putTextAnalyses } from '../DataSources/TextAnalysisDataSource';
import { useAnalysisIndexContext, useAnalysisIndexDispatchContext } from '../Providers/AnalysisIndexProvider';
import { useTextAnalysisJsonContext } from '../Providers/TextAnalysisJsonProvider';
import translateAnalysisIndex from '../Utilities/translateAnalysisIndex';

export function Footer() {
  const AnalysisIndexDispatch = useAnalysisIndexDispatchContext();
  const TextAnalysisJson = useTextAnalysisJsonContext();
  const analysisIndex = translateAnalysisIndex(useAnalysisIndexContext(), TextAnalysisJson.analyses.length);

  return(
    <div className='Footer'>
      <select
        value={ analysisIndex + 1 }
        onChange={ (event: ChangeEvent<HTMLSelectElement>) => AnalysisIndexDispatch({
          type: 'set',
          index: Number(event.target.value) - 1
        }) }
      >
        { [...Array(TextAnalysisJson.analyses.length).keys()].map((i: number) => (
          <option
            key={ `select-option-${ i + 1 }` }
            value={ i + 1 }
          >
            { i + 1 }
          </option>
        )) }
      </select>
      <button onClick={ () => AnalysisIndexDispatch({ type: 'previous' }) }>Prev</button>
      <button onClick={ () => AnalysisIndexDispatch({ type: 'next' }) }>Next</button>
      <button onClick={ () => putTextAnalyses(TextAnalysisJson) }>Save</button>
    </div>
  );
}

export default Footer;
