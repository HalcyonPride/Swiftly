import { useCallback, useEffect, useRef, useState } from 'react';
import './BetterScroller.css';

interface IBetterScrollerProps {
  id: string;
  pages: number;
  currentPage: number; // needed to update scrollTops state array
  children: React.ReactNode;
}

// enable app to remember scroll position while switching between pages

export function BetterScroller(betterScrollerProps: IBetterScrollerProps) {
  const {
    id,
    pages,
    currentPage,
    children
  } = betterScrollerProps;

  const [ scrollTops, setScrollTops ] = useState<number[]>(new Array(pages).fill(0));

  const scrollerRef = useRef<HTMLElement | null>(null);

  const scrollerId = `${id}-better-scroller`; // MUST have unique ID to track multiple similar scrollers

  const handleScroll = useCallback(() => { // update record every time the user scrolls
    setScrollTops((scrollTops) => [
      ...scrollTops.slice(0, currentPage),
      scrollerRef.current ? scrollerRef.current.scrollTop : 0,
      ...scrollTops.slice(currentPage + 1)
    ]);
  }, [ currentPage ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      scrollerRef.current = document.getElementById(scrollerId);
      scrollerRef.current?.addEventListener('scroll', handleScroll);
    }
    return () => {
      scrollerRef.current?.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    if (scrollerRef.current !== null) {
      scrollerRef.current.scrollTop = scrollTops[currentPage];
    }
  }, [ currentPage, scrollTops ]);

  return(
    <div className="BetterScroller" id={ scrollerId }>
      { children }
    </div>
  );
}

export default BetterScroller;
