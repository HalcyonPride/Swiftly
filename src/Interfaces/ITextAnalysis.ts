import ITag from './ITag';

export interface ITextAnalysis {
  text: string;
  tags: ITag[];
  textTitle?: string;
}

export interface ITextAnalysisJson {
  analyses: ITextAnalysis[];
}
