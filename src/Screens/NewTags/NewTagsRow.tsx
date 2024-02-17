import { ChangeEvent, useCallback, useRef, useState } from 'react';

import getTypeaheadTags from '../../DataSources/TypeaheadTagsDataSource';
import ITag from '../../Interfaces/ITag';
import { useAnalysisIndexContext } from '../../Providers/AnalysisIndexProvider';
import { useTextAnalysisJsonContext, useTextAnalysisJsonDispatchContext } from '../../Providers/TextAnalysisJsonProvider';
import translateAnalysisIndex from '../../Utilities/translateAnalysisIndex';

interface INewTagsRowProps {
  tagIndex: number; // needed to find the tag to update
  tag: ITag;
}

export function NewTagsRow(newTagsRowProps: INewTagsRowProps) {
  const {
    tagIndex,
    tag
  } = newTagsRowProps;
  const { title } = tag;
  const TextAnalysisJson = useTextAnalysisJsonContext();
  const TextAnalysisJsonDispatch = useTextAnalysisJsonDispatchContext();
  const analysisIndex = translateAnalysisIndex(useAnalysisIndexContext(), TextAnalysisJson.analyses.length);

  const [ typeaheadTags, setTypeaheadTags ] = useState<string[]>([]);

  const timeoutIdRef = useRef<number | undefined>(undefined); // throttle so it doesn't trigger on every key press

  const dropdownId = `typeahead-tags-${tagIndex}`;

  const handleInputChange = useCallback((input: string) => {
    TextAnalysisJsonDispatch({
      type: 'edit',
      analysisIndex,
      tagIndex,
      title: input
    });
    if (input !== title) { // only search if query has changed
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = window.setTimeout(() => {
        setTypeaheadTags(getTypeaheadTags(input)); // render typeahead tags
      }, 300);
    }
  }, [ TextAnalysisJsonDispatch, analysisIndex, tagIndex, title ]);

  return(
    <tr>
      <td>
        <input
          list={ dropdownId }
          value={ title }
          onChange={ (event: ChangeEvent<HTMLInputElement>) => handleInputChange(event.target.value) }
        />
        <datalist id={ dropdownId }>
          { typeaheadTags.map((typeaheadTag: string, optionIndex: number) => (
            <option
              key={ `${dropdownId}-option-${optionIndex}` }
              value={ typeaheadTag }
            />
          )) }
        </datalist>
      </td>
    </tr>
  );
}

export default NewTagsRow;
