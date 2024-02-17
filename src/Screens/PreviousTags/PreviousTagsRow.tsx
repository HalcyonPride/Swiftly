import { useCallback } from 'react';

import ITag from '../../Interfaces/ITag';
import { useAnalysisIndexContext } from '../../Providers/AnalysisIndexProvider';
import { useTextAnalysisJsonContext, useTextAnalysisJsonDispatchContext } from '../../Providers/TextAnalysisJsonProvider';
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
  const TextAnalysisJson = useTextAnalysisJsonContext();
  const TextAnalysisJsonDispatch = useTextAnalysisJsonDispatchContext();
  const analysisIndex = translateAnalysisIndex(useAnalysisIndexContext(), TextAnalysisJson.analyses.length);

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
