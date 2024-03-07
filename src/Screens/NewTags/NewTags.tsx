import { useCallback } from 'react';
import '../MainScreen.scss';

import NewTagsRow from './NewTagsRow';

import ITag from '../../Interfaces/ITag';
import { useAnalysisIndexContext } from '../../Providers/AnalysisIndexProvider';
import { useTextAnalysisJsonContext, useTextAnalysisJsonDispatchContext } from '../../Providers/TextAnalysisJsonProvider';
import translateAnalysisIndex from '../../Utilities/translateAnalysisIndex';

interface INewTagsProps {
  tags: ITag[];
}

export function NewTags(newTagsProps: INewTagsProps) {
  const { tags } = newTagsProps;
  const TextAnalysisJson = useTextAnalysisJsonContext();
  const TextAnalysisJsonDispatch = useTextAnalysisJsonDispatchContext();
  const analysisIndex = translateAnalysisIndex(useAnalysisIndexContext(), TextAnalysisJson.analyses.length);

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
