import './MainScreen.css';

import TextContent from './TextContent';
import PreviousTags from './PreviousTags/PreviousTags';
import NewTags from './NewTags/NewTags';

import { ITextAnalysisJson } from '../Interfaces/ITextAnalysis';
import BetterScroller from '../Utilities/BetterScroller';

interface IMainScreenProps {
  textAnalysisJson: ITextAnalysisJson;
  analysisIndex: number;
  rejectTag: (analysisIndex: number, tagIndex: number) => void;
  addEmptyTag: (analysisIndex: number) => void;
  editTag: (analysisIndex: number, tagIndex: number, title: string) => void;
}

// renders main screen for text analysis
export function MainScreen(mainScreenProps: IMainScreenProps) {
  const {
    textAnalysisJson,
    analysisIndex,
    rejectTag,
    addEmptyTag,
    editTag
  } = mainScreenProps;
  const {
    text,
    textTitle
  } = textAnalysisJson.analyses[analysisIndex];
  const pages = textAnalysisJson.analyses.length;
  return(
    <div className='MainScreen'>
      <div className='LeftColumn'>
        <div className='TextHeader'>
          <h2>{ textTitle ? textTitle : 'Sample Text' }</h2>
        </div>
        <div className='TextContent'>
          <BetterScroller
            id='text-content'
            pages={ pages }
            currentPage={ analysisIndex }
          >
            <TextContent
              text={ text }
            />
          </BetterScroller>
        </div>
      </div>
      <div className='RightColumn'>
        <div className='ReviewHeader'>
          <h2>Review tags</h2>
        </div>
        <div className='PreviousTags'>
          <BetterScroller
            id='previous-tags'
            pages={ pages }
            currentPage={ analysisIndex }
          >
            <PreviousTags
              textAnalysisJson={ textAnalysisJson }
              analysisIndex={ analysisIndex }
              rejectTag={ rejectTag }
            />
          </BetterScroller>
        </div>
        <div className='NewTags'>
          <BetterScroller
            id='new-tags'
            pages={ pages }
            currentPage={ analysisIndex }
          >
            <NewTags
              textAnalysisJson={ textAnalysisJson }
              analysisIndex={ analysisIndex }
              addEmptyTag={ addEmptyTag }
              editTag={ editTag }
            />
          </BetterScroller>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
