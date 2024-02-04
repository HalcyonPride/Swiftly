import { ChangeEvent, Component } from 'react';

import getTypeaheadTags from '../../DataSources/TypeaheadTagsDataSource';
import ITag from '../../Interfaces/ITag';

interface INewTagsRowProps {
  analysisIndex: number; // needed to find the text analysis to update
  tagIndex: number; // needed to find the tag to update
  tag: ITag;
  editTag: (analysisIndex: number, tagIndex: number, title: string) => void;
}

interface INewTagsRowState {
  title: string;
  typeaheadTags: string[];
}

class NewTagsRow extends Component<INewTagsRowProps, INewTagsRowState> {
  private timeoutId: NodeJS.Timeout | undefined; // throttle so it doesn't trigger on every key press

  constructor(props: INewTagsRowProps) {
    super(props);
    this.timeoutId = undefined;
    this.state = {
      title: props.tag.title,
      typeaheadTags: []
    };
  }

  componentDidUpdate(prevProps: Readonly<INewTagsRowProps>, prevState: Readonly<INewTagsRowState>, snapshot?: any): void {
    const {
      analysisIndex,
      tagIndex,
      editTag
    } = this.props;
    const { title } = this.state;
    const { timeoutId } = this;
    if (title !== prevState.title) { // only search if query has changed
      clearTimeout(timeoutId);
      this.timeoutId = setTimeout(() => {
        let typeaheadTags: string[] = [];
        getTypeaheadTags(title).then((tags: string[]) => {
          typeaheadTags = tags;
        }).finally(() => {
          editTag(analysisIndex, tagIndex, title); // update tag in text analysis JSON
          this.setState({ typeaheadTags }); // render typeahead tags
        });
      }, 300);
    }
  }

  render() {
    const {
      analysisIndex,
      tagIndex
    } = this.props;
    const {
      title,
      typeaheadTags
    } = this.state;
    const dropdownId = `typeahead-tags-${analysisIndex}-${tagIndex}`; // MUST have unique ID so React can render multiple similar lists correctly
    return(
      <tr>
        <td>
          <input
            list={ dropdownId }
            value={ title }
            onChange={ (event: ChangeEvent<HTMLInputElement>) => this.setState({ title: event.target.value }) }
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
}

export default NewTagsRow;
