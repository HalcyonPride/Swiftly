import '../MainScreen.scss';

import PreviousTagsRow from './PreviousTagsRow';

import ITag from '../../Interfaces/ITag';

interface IPreviousTagsProps {
  tags: ITag[];
}

export function PreviousTags(previousTagsProps: IPreviousTagsProps) {
  const { tags } = previousTagsProps;
  return(
    <table>
      <thead>
        <tr>
          <th className='ThTitle'>Title</th>
          <th>Reject?</th>
        </tr>
      </thead>
      <tbody>
        { tags.map((tag: ITag, tagIndex: number) => (
          !tag.added ?
            <PreviousTagsRow
              key={ `previous-tags-row-${tagIndex}` }
              tagIndex={ tagIndex }
              tag={ tag }
            />
            : null
        )) }
      </tbody>
    </table>
  );
}

export default PreviousTags;
