import { ChangeEvent, Component } from 'react';
import './App.css';

import { getTextAnalyses, putTextAnalyses } from './DataSources/TextAnalysisDataSource';
import { ITextAnalysisJson } from './Interfaces/ITextAnalysis';
import MainScreen from './Screens/MainScreen';
import { deepCopyWithTagAdd, deepCopyWithTagEdit } from './Utilities/deepCopyHelpers';

interface IAppState {
  textAnalysisJson: ITextAnalysisJson;
  analysisIndex: number;
}

// updates text analysis JSON as the user accepts/rejects/adds tags

class App extends Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      textAnalysisJson: {
        analyses: [{
          text: '',
          tags: []
        }]
      },
      analysisIndex: 0
    };
  }

  onUnload = (event: BeforeUnloadEvent) => {
    event.returnValue = ''; // reminder to save before navigating away from web page
  };

  componentDidMount(): void {
    window.addEventListener('beforeunload', this.onUnload);
    this.setState({ // load sample data for demo purposes
      textAnalysisJson: getTextAnalyses()
    });
  }

  componentWillUnmount(): void {
    window.removeEventListener('beforeunload', this.onUnload);
  }

  rejectTag = (analysisIndex: number, tagIndex: number) => { // user rejects previously added tag
    const { textAnalysisJson } = this.state;
    const tag = textAnalysisJson.analyses[analysisIndex].tags[tagIndex];
    const { rejected } = tag;
    this.setState({
      textAnalysisJson: deepCopyWithTagEdit(
        textAnalysisJson,
        analysisIndex,
        tagIndex,
        {
          ...tag,
          rejected: !rejected
        }
      )
    });
  }

  addEmptyTag = (analysisIndex: number) => { // user adds empty tag
    const { textAnalysisJson } = this.state;
    this.setState({
      textAnalysisJson: deepCopyWithTagAdd(
        textAnalysisJson,
        analysisIndex
      )
    })
  }

  editTag = (analysisIndex: number, tagIndex: number, title: string) => { // user edits newly added tag
    const { textAnalysisJson } = this.state;
    const tag = textAnalysisJson.analyses[analysisIndex].tags[tagIndex];
    this.setState({
      textAnalysisJson: deepCopyWithTagEdit(
        textAnalysisJson,
        analysisIndex,
        tagIndex,
        {
          ...tag,
          title
        }
      )
    });
  }

  previousAnalysis = () => {
    const {
      textAnalysisJson,
      analysisIndex
    } = this.state;
    this.setState({
      analysisIndex: analysisIndex === 0 ? textAnalysisJson.analyses.length-1 : analysisIndex-1
    });
  };

  nextAnalysis = () => {
    const {
      textAnalysisJson,
      analysisIndex
    } = this.state;
    this.setState({
      analysisIndex: analysisIndex === textAnalysisJson.analyses.length-1 ? 0 : analysisIndex+1
    })
  };

  render() {
    const {
      textAnalysisJson,
      analysisIndex
    } = this.state;
    return(
      <main>
        <div className='MainContainer'>
          <div className='Header'>
            <h1>Swiftly</h1>
          </div>
          <MainScreen
            textAnalysisJson={ textAnalysisJson }
            analysisIndex={ analysisIndex }
            rejectTag={ this.rejectTag }
            addEmptyTag={ this.addEmptyTag }
            editTag={ this.editTag }
          />
          <div className='Footer'>
            <select
              value={ analysisIndex + 1 }
              onChange={ (event: ChangeEvent<HTMLSelectElement>) => this.setState({ analysisIndex: Number(event.target.value) - 1 }) }
            >
              { [...Array(textAnalysisJson.analyses.length).keys()].map((i: number) => (
                <option
                  key={ `select-option-${ i + 1 }` }
                  value={ i + 1 }
                >
                  { i + 1 }
                </option>
              )) }
            </select>
            <button onClick={ () => this.previousAnalysis() }>Prev</button>
            <button onClick={ () => this.nextAnalysis() }>Next</button>
            <button onClick={ () => putTextAnalyses(textAnalysisJson) }>Save</button>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
