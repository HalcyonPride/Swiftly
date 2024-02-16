import { useCallback, useContext } from 'react';

import ITag from '../../Interfaces/ITag';
import { AnalysisIndexContext } from '../../Providers/AnalysisIndexProvider';
import { TextAnalysisJsonContext, TextAnalysisJsonDispatchContext } from '../../Providers/TextAnalysisJsonProvider';
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
  const TextAnalysisJson = useContext(TextAnalysisJsonContext);
  const TextAnalysisJsonDispatch = useContext(TextAnalysisJsonDispatchContext);
  const analysisIndex = translateAnalysisIndex(useContext(AnalysisIndexContext), TextAnalysisJson.analyses.length);

  const handleRejectTag = useCallback((tagIndex: number) => {
    TextAnalysisJsonDispatch!({
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
