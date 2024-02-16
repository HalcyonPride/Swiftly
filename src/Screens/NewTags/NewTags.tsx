import { Dispatch, useCallback } from 'react';
import '../MainScreen.css';

import NewTagsRow from './NewTagsRow';

import useContextWithNullCheck from '../../Hooks/useContextWithNullCheck';
import ITag from '../../Interfaces/ITag';
import { ITextAnalysisJson } from '../../Interfaces/ITextAnalysis';
import { AnalysisIndexContext } from '../../Providers/AnalysisIndexProvider';
import { ITextAnalysisJsonAction, TextAnalysisJsonContext, TextAnalysisJsonDispatchContext } from '../../Providers/TextAnalysisJsonProvider';
import translateAnalysisIndex from '../../Utilities/translateAnalysisIndex';

interface INewTagsProps {
  tags: ITag[];
}

export function NewTags(newTagsProps: INewTagsProps) {
  const { tags } = newTagsProps;
  const TextAnalysisJson = useContextWithNullCheck<ITextAnalysisJson>(TextAnalysisJsonContext);
  const TextAnalysisJsonDispatch = useContextWithNullCheck<Dispatch<ITextAnalysisJsonAction>>(TextAnalysisJsonDispatchContext);
  const analysisIndex = translateAnalysisIndex(useContextWithNullCheck<number>(AnalysisIndexContext), TextAnalysisJson.analyses.length);

  const handleAddTag = useCallback(() => {
    TextAnalysisJsonDispatch({
      type: 'add',
      analysisIndex
    });
  }, [ TextAnalysisJsonDispatch, analysisIndex ]);

  return(
    <table>
      <thead>
        <tr>
          <th>Added tags:</th>
        </tr>
      </thead>
      <tbody>
        { tags.map((tag: ITag, tagIndex: number) => (
          !!tag.added ?
            <NewTagsRow
              key={ `new-tags-row-${tagIndex}` }
              tagIndex={ tagIndex }
              tag={ tag }
            />
            : null
        )) }
        <tr>
          <td>
            <button onClick={ handleAddTag }>Add tag</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default NewTags;
