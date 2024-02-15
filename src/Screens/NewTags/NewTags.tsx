import '../MainScreen.css';

import NewTagsRow from './NewTagsRow';

import ITag from '../../Interfaces/ITag';
import { ITextAnalysisJson } from '../../Interfaces/ITextAnalysis';

interface INewTagsProps {
  textAnalysisJson: ITextAnalysisJson;
  analysisIndex: number;
  addEmptyTag: () => void;
  editTag: (tagIndex: number, title: string) => void;
}

export function NewTags(newTagsProps: INewTagsProps) {
  const {
    textAnalysisJson,
    analysisIndex,
    addEmptyTag,
    editTag
  } = newTagsProps;
  return(
    <table>
      <thead>
        <tr>
          <th>Added tags:</th>
        </tr>
      </thead>
      <tbody>
        { textAnalysisJson.analyses[analysisIndex].tags.map((tag: ITag, tagIndex: number) => (
          !!tag.added ?
            <NewTagsRow
              key={ `new-tags-row-${tagIndex}` }
              tagIndex={ tagIndex }
              tag={ tag }
              editTag={ editTag }
            />
            : null
        )) }
        <tr>
          <td>
            <button onClick={ () => addEmptyTag() }>Add tag</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default NewTags;
