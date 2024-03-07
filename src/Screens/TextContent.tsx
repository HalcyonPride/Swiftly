import './MainScreen.scss';

interface ITextContentProps {
  text: string;
}

export function TextContent(textContentProps: ITextContentProps) {
  const { text } = textContentProps;
  return(
    <div className="TextContentWrapper">
      { text }
    </div>
  );
}

export default TextContent;
