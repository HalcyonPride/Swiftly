import '../MainScreen.css';

import PreviousTagsRow from './PreviousTagsRow';

import ITag from '../../Interfaces/ITag';
import { ITextAnalysisJson } from '../../Interfaces/ITextAnalysis';

interface IPreviousTagsProps {
  textAnalysisJson: ITextAnalysisJson;
  analysisIndex: number; // needed to find the text analysis to update
  rejectTag: (analysisIndex: number, tagIndex: number) => void;
}

export function PreviousTags(previousTagsProps: IPreviousTagsProps) {
  const {
    textAnalysisJson,
    analysisIndex,
    rejectTag
  } = previousTagsProps;
  return(
    <table>
      <thead>
        <tr>
          <th className='ThTitle'>Title</th>
          <th>Reject?</th>
        </tr>
      </thead>
      <tbody>
        { textAnalysisJson.analyses[analysisIndex].tags.map((tag: ITag, tagIndex: number) => (
          !tag.added ?
            <PreviousTagsRow
              key={ `previous-tags-row-${analysisIndex}-${tagIndex}` }
              analysisIndex={ analysisIndex }
              tagIndex={ tagIndex }
              tag={ tag }
              rejectTag={ rejectTag }
            />
            : null
        )) }
      </tbody>
    </table>
  );
}

export default PreviousTags;
