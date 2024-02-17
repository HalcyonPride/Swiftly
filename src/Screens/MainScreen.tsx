import './MainScreen.css';

import TextContent from './TextContent';
import PreviousTags from './PreviousTags/PreviousTags';
import NewTags from './NewTags/NewTags';

import { useAnalysisIndexContext } from '../Providers/AnalysisIndexProvider';
import { useTextAnalysisJsonContext } from '../Providers/TextAnalysisJsonProvider';
import BetterScroller from '../Utilities/BetterScroller';
import translateAnalysisIndex from '../Utilities/translateAnalysisIndex';

// renders main screen for text analysis

export function MainScreen() {
  const TextAnalysisJson = useTextAnalysisJsonContext();
  const analysisIndex = translateAnalysisIndex(useAnalysisIndexContext(), TextAnalysisJson.analyses.length);

  const {
    text,
    textTitle,
    tags
  } = TextAnalysisJson.analyses[analysisIndex];
  const pages = TextAnalysisJson.analyses.length;

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
              tags={ tags }
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
              tags={ tags }
            />
          </BetterScroller>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
