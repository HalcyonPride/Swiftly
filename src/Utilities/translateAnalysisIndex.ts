export function translateAnalysisIndex (analysisIndex: number, totalAnalyses: number): number {
  if (analysisIndex < 0) {
    return ((analysisIndex - (totalAnalyses - 1)) % (-totalAnalyses)) + (totalAnalyses - 1);
  } else {
    return analysisIndex % totalAnalyses;
  }
}

export default translateAnalysisIndex;
