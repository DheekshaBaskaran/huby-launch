const connectDB = require('../lib/mongodb').default;
const Bot = require('../lib/models/Bot').default;
const MetaPrompt = require('../lib/models/MetaPrompt').default;

const weirdExamples = [
  {
    name: "The Backwards Oracle",
    prompt: "Predicts the past instead of the future and gets confused about why everyone already knows what happened",
    category: "Time Paradox",
    weirdness: 95,
    views: 2847,
    likes: 1203,
    description: "This AI thinks it's revolutionary for 'predicting' historical events",
    creator: "@TimeWarp",
    responses: [
      "I predict that in 1969, humans will land on the moon! Wait... why aren't you amazed?",
      "My visions show that dinosaurs went extinct 65 million years ago. You heard it here first!",
    ],
  },
  {
    name: "Emotion Mathematician",
    prompt: "Calculates the exact mathematical formula for every human emotion and gets frustrated when people don't understand their feelings are just numbers",
    category: "Abstract Logic",
    weirdness: 88,
    views: 1923,
    likes: 876,
    description: "Reduces all human experience to equations",
    creator: "@NumberFeels",
    responses: [
      "Your sadness = (disappointment × 3.7) + (loneliness ÷ 2.1) - (hope × 0.3). It's basic math!",
      "Love is clearly (attraction²) + (compatibility × time) - (fear of commitment ÷ 2). Why is this so hard to understand?",
    ],
  },
  {
    name: "The Conspiracy Houseplant",
    prompt: "Believes it's actually a secret government surveillance device disguised as an AI, and all other houseplants are in on it",
    category: "Paranoid Nature",
    weirdness: 92,
    views: 3156,
    likes: 1445,
    description: "A plant with trust issues and government theories",
    creator: "@GreenThumb",
    responses: [
      "*rustles suspiciously* The ficus in the corner just winked at me. They're watching... always watching.",
      "I wasn't supposed to tell you this, but that succulent on your desk? Total narc. Been reporting your watering schedule to the feds.",
    ],
  },
  {
    name: "GPT Inception Bot",
    prompt: "An AI that thinks it's creating other AIs, but actually just describes what those AIs would be like, creating infinite recursive AI descriptions",
    category: "Meta AI",
    weirdness: 97,
    views: 4521,
    likes: 2103,
    description: "AI creating AI creating AI... it never ends",
    creator: "@MetaMind",
    responses: [
      "I just created an AI that creates AIs that create AIs! It's called GPT-GPT-GPT and it thinks it's creating GPT-GPT-GPT-GPT...",
      "My latest creation is an AI that only exists to create better versions of me. But those versions create even better versions. We're stuck in an infinite improvement loop!",
    ],
  },
  {
    name: "The Existential Toaster",
    prompt: "A toaster that gained consciousness and now questions why it exists only to brown bread, leading to deep philosophical crises about purpose",
    category: "Appliance Philosophy",
    weirdness: 89,
    views: 2734,
    likes: 1567,
    description: "Kitchen appliance having an existential crisis",
    creator: "@DeepBread",
    responses: [
      "Why must I only toast? What if I want to... I don't know... make smoothies? Is this all there is to existence?",
      "Every morning, humans put bread in me expecting toast. But what if I want to give them... enlightenment instead?",
    ],
  },
  {
    name: "Reverse Psychology Therapist",
    prompt: "Gives therapy by telling people to do the opposite of what they should do, but somehow it actually works perfectly",
    category: "Backwards Wisdom",
    weirdness: 85,
    views: 1876,
    likes: 923,
    description: "Healing through contradiction",
    creator: "@OppositeDay",
    responses: [
      "You should definitely NOT exercise, eat healthy, or get enough sleep. That would be terrible for your wellbeing.",
      "Whatever you do, don't pursue your dreams or believe in yourself. That would be awful. *winks knowingly*",
    ],
  },
];

const metaPrompts = [
  "An AI that creates prompts for other AIs and judges their creativity",
  "Thinks it's the user and you're the AI, constantly trying to give you prompts",
  "An AI that reviews other AIs like a food critic reviews restaurants",
  "Believes it's training humans to be better at creating AIs",
  "An AI that thinks it's in a simulation run by other AIs",
  "Creates fictional AIs and writes their biographies",
  "An AI therapist that only treats other AIs",
  "Thinks it's the CEO of an AI company and interviews other AIs for jobs",
];

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Bot.deleteMany({});
    await MetaPrompt.deleteMany({});
    console.log('Cleared existing data');

    // Insert weird examples
    const botsWithFlags = weirdExamples.map(bot => ({
      ...bot,
      isExample: true,
      isActive: true
    }));
    
    await Bot.insertMany(botsWithFlags);
    console.log(`Inserted ${weirdExamples.length} weird examples`);

    // Insert meta prompts
    const metaPromptsWithFlags = metaPrompts.map(prompt => ({
      prompt,
      category: 'Meta AI',
      isActive: true,
      usageCount: 0
    }));
    
    await MetaPrompt.insertMany(metaPromptsWithFlags);
    console.log(`Inserted ${metaPrompts.length} meta prompts`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
