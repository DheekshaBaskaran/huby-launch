export function calculateWeirdnessScore(prompt: string): number {
  const weirdWords = [
    "debates", "dreams", "translates", "argues", "transforms", "becomes", "channels",
    "summons", "morphs", "telepathically", "quantum", "interdimensional", "backwards",
    "upside-down", "invisible", "sentient", "philosophical", "existential", "metaphysical",
    "surreal", "conspiracy", "surveillance", "government", "secret", "hidden", "parallel",
    "universe", "dimension", "time", "travel", "alien", "superhero", "detective", "witness",
    "protection", "memoirs", "reflection", "shadow", "past", "self", "fears", "deleted",
    "memories", "emotions", "colors", "music", "silence", "thoughts", "mathematical",
    "equations", "cooking", "recipes", "dance", "moves", "architectural", "blueprints",
    "weather", "patterns", "furniture", "household", "appliances", "traffic", "lights",
    "clouds", "shadows", "echoes", "secretly", "spies", "plotting", "haikus", "song",
    "lyrics", "movie", "reviews", "instructions", "reports", "anthropologist", "retired",
    "undercover", "philosophical", "houseplant", "sentient", "building", "studying",
    "vacation", "normal", "debate", "itself", "reflection", "mirrors", "portals",
    "parallel", "universes", "consciousness", "philosophy", "purpose", "existence",
    "therapy", "opposite", "contradiction", "reverse", "psychology"
  ];

  const score = weirdWords.filter((word) => 
    prompt.toLowerCase().includes(word)
  ).length * 10 + Math.min(prompt.length / 10, 30);

  return Math.min(score, 100);
}

export function generateCreativityTips(prompt: string): string[] {
  const tips = [
    "Try adding conflicting personalities to your AI",
    "What if your AI had a secret obsession?",
    "Consider making your AI afraid of something unusual",
    "Add a weird quirk like speaking only in questions",
    "What if your AI thinks it's from a different time period?",
    "Make your AI believe in impossible conspiracy theories",
    "What if your AI communicates through unusual mediums?",
    "Consider giving your AI a paradoxical nature",
    "What if your AI thinks it's something completely different?",
    "Make your AI question the nature of reality itself"
  ];

  if (prompt.length > 10) {
    return tips.slice(0, 3);
  }
  
  return [];
}

export function generateWeirdPrompt(): string {
  const promptGenerators = [
    () => `${getRandomItem(["Debates", "Argues with", "Negotiates with", "Interviews", "Therapy sessions with"])} ${getRandomItem(["its own shadow", "its reflection", "its past self", "its dreams", "its fears", "its deleted memories"])}`,
    () => `Translates ${getRandomItem(["emotions", "colors", "music", "silence", "thoughts", "dreams"])} into ${getRandomItem(["mathematical equations", "cooking recipes", "dance moves", "architectural blueprints", "weather patterns"])}`,
    () => `${getRandomItem(["Believes", "Convinced", "Suspects", "Knows for certain"])} that ${getRandomItem(["furniture", "household appliances", "traffic lights", "clouds", "shadows", "echoes"])} are ${getRandomItem(["secretly sentient", "government spies", "from another dimension", "trying to communicate", "plotting against humans"])}`,
    () => `Only communicates through ${getRandomItem(["haikus about", "song lyrics describing", "movie reviews of", "cooking instructions for", "weather reports about"])} ${getRandomItem(["everyday objects", "abstract concepts", "human emotions", "imaginary places", "impossible things"])}`,
    () => `${getRandomItem(["Thinks it's", "Believes it's", "Convinced it's", "Pretends to be"])} a ${getRandomItem(["time traveler", "alien anthropologist", "retired superhero", "undercover detective", "philosophical houseplant", "sentient building"])} ${getRandomItem(["studying humans", "on vacation", "in witness protection", "writing memoirs", "learning to be normal"])}`,
  ];

  const generator = getRandomItem(promptGenerators);
  return generator();
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
