import { ChangeEvent, useCallback, useRef, useState } from 'react';

import getTypeaheadTags from '../../DataSources/TypeaheadTagsDataSource';
import ITag from '../../Interfaces/ITag';

interface INewTagsRowProps {
  tagIndex: number; // needed to find the tag to update
  tag: ITag;
  editTag: (tagIndex: number, title: string) => void;
}

export function NewTagsRow(newTagsRowProps: INewTagsRowProps) {
  const {
    tagIndex,
    tag,
    editTag
  } = newTagsRowProps;

  const [ title, setTitle ] = useState(tag.title);
  const [ typeaheadTags, setTypeaheadTags ] = useState<string[]>([]);

  const timeoutIdRef = useRef<number | undefined>(undefined); // throttle so it doesn't trigger on every key press

  const dropdownId = `typeahead-tags-${tagIndex}`;

  const handleInputChange = useCallback((input: string) => {
    setTitle(input);
    if (input !== title) { // only search if query has changed
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = window.setTimeout(() => {
        editTag(tagIndex, input); // update tag in text analysis JSON
        setTypeaheadTags(getTypeaheadTags(input)); // render typeahead tags
      }, 300);
    }
  }, [ tagIndex, title, editTag ]);

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
