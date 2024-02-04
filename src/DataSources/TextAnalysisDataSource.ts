import { ITextAnalysisJson } from '../Interfaces/ITextAnalysis';

const sampleTextAnalyses: ITextAnalysisJson = {
  analyses: [
    {
      text: "To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer. They were admirable things for the observer—excellent for drawing the veil from men's motives and actions. But for the trained reasoner to admit such intrusions into his own delicate and finely adjusted temperament was to introduce a distracting factor which might throw a doubt upon all his mental results. Grit in a sensitive instrument, or a crack in one of his own high-power lenses, would not be more disturbing than a strong emotion in a nature such as his. And yet there was but one woman to him, and that woman was the late Irene Adler, of dubious and questionable memory.",
      tags: [
        {
          title: "bohemia",
          rejected: false,
          added: false
        },
        {
          title: "irene adler",
          rejected: false,
          added: false
        },
        {
          title: "sherlock holmes",
          rejected: false,
          added: false
        }
      ],
      textTitle: "First paragraph of 'A Scandal in Bohemia'"
    },
    {
      text: "Water. Earth. Fire. Air. Long ago, the four nations lived together in harmony. Then, everything changed when the Fire Nation attacked. Only the Avatar, master of all four elements, could stop them, but when the world needed him most, he vanished. A hundred years passed and my brother and I discovered the new Avatar, an airbender named Aang. And although his airbending skills are great, he has a lot to learn before he's ready to save anyone. But I believe Aang can save the world.",
      tags: [
        {
          title: "air",
          rejected: false,
          added: false
        },
        {
          title: "earth",
          rejected: false,
          added: false
        },
        {
          title: "fire",
          rejected: false,
          added: false
        },
        {
          title: "water",
          rejected: false,
          added: false
        }
      ],
      textTitle: "Opening lines from 'Avatar: The Last Airbender'"
    },
    {
      text: "Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.",
      tags: [
        {
          title: "coarse",
          rejected: false,
          added: false
        },
        {
          title: "gets everywhere",
          rejected: false,
          added: false
        },
        {
          title: "irritating",
          rejected: false,
          added: false
        },
        {
          title: "rough",
          rejected: false,
          added: false
        }
      ],
      textTitle: "The Tragedy of Darth Plagueis the Wise"
    }
  ]
}

// accesses database to get text analyses; in absence of online database, simply loads static JSON
export async function getTextAnalyses(): Promise<ITextAnalysisJson> {
  return sampleTextAnalyses;
}

// accesses database to put text analyses; in absence of online database, simply prints JSON file
export async function putTextAnalyses(textAnalysisJson: ITextAnalysisJson): Promise<boolean> {
  // https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
  const href = URL.createObjectURL(new Blob([JSON.stringify(textAnalysisJson)], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = href;
  link.download = 'text-analysis.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
  return true;
}
