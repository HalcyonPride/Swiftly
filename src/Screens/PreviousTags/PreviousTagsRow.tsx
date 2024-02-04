import ITag from '../../Interfaces/ITag';

interface IPreviousTagsRowProps {
  analysisIndex: number; // needed to find the text analysis to update
  tagIndex: number; // needed to find the tag to update
  tag: ITag;
  rejectTag: (analysisIndex: number, tagIndex: number) => void;
}

export function PreviousTagsRow(previousTagsRowProps: IPreviousTagsRowProps) {
  const {
    analysisIndex,
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
          onChange={ () => rejectTag(analysisIndex, tagIndex) } // reject tag in text analysis JSON
        />
      </td>
    </tr>
  );
}

export default PreviousTagsRow;
