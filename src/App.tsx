import { useCallback, useEffect } from 'react';
import './App.css';

import AnalysisIndexProvider from './Providers/AnalysisIndexProvider';
import TextAnalysisJsonProvider from './Providers/TextAnalysisJsonProvider';
import Footer from './Screens/Footer';
import MainScreen from './Screens/MainScreen';

// updates text analysis JSON as the user accepts/rejects/adds tags

export function App() {
  const onUnload = useCallback((event: BeforeUnloadEvent) => { // reminder to save before navigating away from web page
    /** https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event */
    event.preventDefault();
    event.returnValue = true;
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', onUnload);
    }
    return (() => {
      window.removeEventListener('beforeunload', onUnload);
    });
  });

  return(
    <main>
      <div className='MainContainer'>
        <div className='Header'>
          <h1>Swiftly</h1>
        </div>
        <TextAnalysisJsonProvider>
          <AnalysisIndexProvider>
            <MainScreen />
            <Footer />
          </AnalysisIndexProvider>
        </TextAnalysisJsonProvider>
      </div>
    </main>
  );
}

export default App;
