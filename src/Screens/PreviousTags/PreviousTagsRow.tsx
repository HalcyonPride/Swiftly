import ITag from '../../Interfaces/ITag';

interface IPreviousTagsRowProps {
  tagIndex: number; // needed to find the tag to update
  tag: ITag;
  rejectTag: (tagIndex: number) => void;
}

export function PreviousTagsRow(previousTagsRowProps: IPreviousTagsRowProps) {
  const {
    tagIndex,
    tag,
    rejectTag
  } = previousTagsRowProps;
  const {
    title,
    rejected
  } = tag;
  return(
    <tr>
      <td>{ title }</td>
      <td>
        <input
          type="checkbox"
          checked={ rejected }
          onChange={ () => rejectTag(tagIndex) } // reject tag in text analysis JSON
        />
      </td>
    </tr>
  );
}

export default PreviousTagsRow;
