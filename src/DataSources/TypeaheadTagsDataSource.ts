const randomWords = [
  'action', 'actor', 'air', 'approval', 'arch', 'arm', 'aunt', 'authority', 'ball', 'bedroom',
  'bike', 'blood', 'boat', 'bone', 'cakes', 'canvas', 'carpenter', 'cemetery', 'chance', 'company',
  'cook', 'creature', 'credit', 'curve', 'cushion', 'death', 'debt', 'digestion', 'drink', 'dust',
  'earth', 'experience', 'eye', 'farm', 'finger', 'floor', 'foot', 'frogs', 'grandfather', 'hammer',
  'history', 'horse', 'house', 'humor', 'impulse', 'invention', 'iron', 'knee', 'knife', 'maid',
  'man', 'marble', 'minute', 'oven', 'poison', 'powder', 'quilt', 'rabbit', 'rabbits', 'railway',
  'respect', 'rest', 'rose', 'scarf', 'scissors', 'shame', 'shoe', 'side', 'skate', 'slope',
  'snakes', 'society', 'son', 'sponge', 'spy', 'star', 'story', 'substance', 'summer', 'swim',
  'tax', 'tendency', 'territory', 'texture', 'thunder', 'tooth', 'toothbrush', 'toys', 'tramp', 'treatment',
  'turn', 'vein', 'view', 'volleyball', 'wave', 'way', 'whistle', 'wood', 'wrist', 'writing'
];

// calls typeahead API to provide tag suggestions; in absence of redacted API, simply queries static list of words
export function getTypeaheadTags(query: string): string[] {
  return randomWords.filter((word: string) => word.startsWith(query.toLowerCase()));
}

export default getTypeaheadTags;
