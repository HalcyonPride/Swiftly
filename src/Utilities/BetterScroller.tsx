import { Component } from 'react';
import './BetterScroller.css';

interface IBetterScrollerProps {
  id: string;
  pages: number;
  currentPage: number; // needed to update scrollTops state array
  children: React.ReactNode;
}

interface IBetterScrollerState {
  scrollTops: number[];
}

// enable app to remember scroll position while switching between pages

class BetterScroller extends Component<IBetterScrollerProps, IBetterScrollerState> {
  private readonly id: string; // for event listener

  constructor(props: IBetterScrollerProps) {
    super(props);
    const {
      id,
      pages
    } = this.props;
    this.id = `${id}-better-scroller`; // MUST have unique ID to track multiple similar scrollers
    this.state = {
      scrollTops: new Array(pages).fill(0)
    };
  }

  onScroll = (event: Event) => { // update record every time the user scrolls
    const { currentPage } = this.props;
    const { scrollTops } = this.state;
    const scroller = document.getElementById(this.id);
    if (scroller !== null) {
      this.setState({
        scrollTops: [
          ...scrollTops.slice(0, currentPage),
          scroller.scrollTop,
          ...scrollTops.slice(currentPage + 1)
        ]
      });
    }
  };

  componentDidMount(): void {
    document.getElementById(this.id)?.addEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(prevProps: Readonly<IBetterScrollerProps>, prevState: Readonly<IBetterScrollerState>, snapshot?: any): void {
    const { currentPage } = this.props;
    const { scrollTops } = this.state;
    const scroller = document.getElementById(this.id);
    if (scroller !== null) {
      scroller.scrollTop = scrollTops[currentPage];
    }
  }

  componentWillUnmount(): void {
    document.getElementById(this.id)?.removeEventListener('scroll', this.onScroll);
  }

  render() {
    return(
      <div className="BetterScroller" id={ this.id }>
        { this.props.children }
      </div>
    );
  }
}

export default BetterScroller;
