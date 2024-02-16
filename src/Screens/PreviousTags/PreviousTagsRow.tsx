import { Dispatch, useCallback } from 'react';

import useContextWithNullCheck from '../../Hooks/useContextWithNullCheck';
import ITag from '../../Interfaces/ITag';
import { ITextAnalysisJson } from '../../Interfaces/ITextAnalysis';
import { AnalysisIndexContext } from '../../Providers/AnalysisIndexProvider';
import { ITextAnalysisJsonAction, TextAnalysisJsonContext, TextAnalysisJsonDispatchContext } from '../../Providers/TextAnalysisJsonProvider';
import translateAnalysisIndex from '../../Utilities/translateAnalysisIndex';

interface IPreviousTagsRowProps {
  tagIndex: number; // needed to find the tag to update
  tag: ITag;
}

export function PreviousTagsRow(previousTagsRowProps: IPreviousTagsRowProps) {
  const {
    tagIndex,
    tag
  } = previousTagsRowProps;
  const {
    title,
    rejected
  } = tag;
  const TextAnalysisJson = useContextWithNullCheck<ITextAnalysisJson>(TextAnalysisJsonContext);
  const TextAnalysisJsonDispatch = useContextWithNullCheck<Dispatch<ITextAnalysisJsonAction>>(TextAnalysisJsonDispatchContext);
  const analysisIndex = translateAnalysisIndex(useContextWithNullCheck<number>(AnalysisIndexContext), TextAnalysisJson.analyses.length);

  const handleRejectTag = useCallback((tagIndex: number) => {
    TextAnalysisJsonDispatch({
      type: 'reject',
      analysisIndex,
      tagIndex
    });
  }, [ TextAnalysisJsonDispatch, analysisIndex ]);

  return(
    <tr>
      <td>{ title }</td>
      <td>
        <input
          type="checkbox"
          checked={ rejected }
          onChange={ () => handleRejectTag(tagIndex) }
        />
      </td>
    </tr>
  );
}

export default PreviousTagsRow;
