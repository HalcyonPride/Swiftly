import ITag from '../Interfaces/ITag';
import { ITextAnalysisJson } from '../Interfaces/ITextAnalysis';

export function deepCopyWithTagAdd(
  original: ITextAnalysisJson,
  analysisIndex: number
): ITextAnalysisJson {
  const { analyses } = original;
  const analysis = analyses[analysisIndex];
  const { tags } = analysis;
  return {
    analyses: [
      ...analyses.slice(0, analysisIndex),
      {
        ...analysis,
        tags: [
          ...tags,
          {
            title: '',
            rejected: false,
            added: true
          }
        ]
      },
      ...analyses.slice(analysisIndex + 1)
    ]
  };
}

export function deepCopyWithTagEdit(
  original: ITextAnalysisJson,
  analysisIndex: number,
  tagIndex: number,
  tag: ITag
): ITextAnalysisJson {
  const { analyses } = original;
  const analysis = analyses[analysisIndex];
  const { tags } = analysis;
  return {
    analyses: [
      ...analyses.slice(0, analysisIndex),
      {
        ...analysis,
        tags: [
          ...tags.slice(0, tagIndex),
          tag,
          ...tags.slice(tagIndex + 1)
        ]
      },
      ...analyses.slice(analysisIndex + 1)
    ]
  };
}
